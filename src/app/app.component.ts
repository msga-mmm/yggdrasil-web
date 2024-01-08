import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from './api';
import { triggerBrowserFileDownload } from './utils';

type FileRecord = {
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
	files: FileRecord[] = [];
	userData: any = null;
	fileToSubmit: File | null | undefined = null;

	constructor(
		public oidcSecurityService: OidcSecurityService,
		private http: HttpClient,
	) { }

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

	getFiles(): Observable<FileRecord[]> {
		return this.http
			.get<FileRecord[]>(Endpoints.files)
	}

	onFileChange(e: HTMLInputElement) {
		const file = e.files?.item(0);
		this.fileToSubmit = file;
	}

	onFileSubmit() {
		if (!this.fileToSubmit)
			return

		const fileRecordData = new FormData();
		fileRecordData.append('file', this.fileToSubmit);

		this.http
			.post<FileRecord>(Endpoints.files, fileRecordData)
			.subscribe(() => {
				this.loadFiles();
			});
	}

	onDeleteFile(fileID: number) {
		this.http
			.delete(Endpoints.file(fileID))
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
