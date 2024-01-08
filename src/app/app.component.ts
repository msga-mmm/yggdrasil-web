import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Endpoints } from './api';
import { triggerBrowserFileDownload } from './utils';

type File = {
	id: number;
	name: string;
};

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [OidcSecurityService],
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
	title = 'yggdrasil-web';
	isAuthenticated = false;
	files: File[] = [];
	userData: any = null;
	fileToSubmit: any = null;

	constructor(
		public oidcSecurityService: OidcSecurityService,
		private http: HttpClient,
	) { }

	processError(err: any) {
		let message = '';
		if (err.error instanceof ErrorEvent) {
			message = err.error.message;
		} else {
			message = `Error Code: ${err.status}\nMessage: ${err.message}`;
		}
		console.log(message);
		return throwError(() => {
			message;
		});
	}

	ngOnInit() {
		this.oidcSecurityService
			.checkAuth()
			.subscribe((loginResponse: LoginResponse) => {
				const { isAuthenticated, userData } = loginResponse;

				this.isAuthenticated = isAuthenticated;
				this.userData = userData;

				if (isAuthenticated) this.loadFiles();
			});
	}

	// Auth

	login() {
		this.oidcSecurityService.authorize();
	}

	logout() {
		this.oidcSecurityService
			.logoff()
			.subscribe((result) => console.log(result));
	}

	// HTTP requests

	loadFiles() {
		this.getFiles().subscribe((result) => {
			this.files = result;
		});
	}

	getFiles(): Observable<File[]> {
		return this.http
			.get<File[]>(Endpoints.files)
			.pipe(retry(1), catchError(this.processError));
	}

	onFileChange(e: HTMLInputElement) {
		const file = e.files?.item(0);
		this.fileToSubmit = file;
	}

	onFileSubmit() {
		const fileRecordData = new FormData();
		fileRecordData.append('file', this.fileToSubmit);

		this.http
			.post<File>(Endpoints.files, fileRecordData)
			.pipe(retry(1), catchError(this.processError))
			.subscribe(() => {
				this.loadFiles();
			});
	}

	onDeleteFile(fileID: number) {
		this.http
			.delete(Endpoints.file(fileID))
			.pipe(retry(1), catchError(this.processError))
			.subscribe(() => {
				this.loadFiles();
			});
	}

	onFileDownload(fileID: number, name: string) {
		this.http
			.get(Endpoints.fileDownload(fileID), {
				responseType: 'blob',
			})
			.subscribe((blobData: Blob) => {
				triggerBrowserFileDownload(blobData, name);
			});
	}
}
