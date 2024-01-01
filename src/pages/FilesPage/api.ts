import { useAuth } from "react-oidc-context";
import { Authorization, Endpoints } from "../../enums";
import { useCallback } from "react";

type FileRecord = {
	id: number;
	name: string;
	size: number;
};

type FetchWithToken = {
	token?: string;
};

export async function fetchFiles({
	token,
}: FetchWithToken): Promise<FileRecord[]> {
	const data = await fetch(Endpoints.files, {
		headers: {
			Authorization: Authorization.bearer(token),
		},
	});
	return await data.json();
}

export function useAuthenticatedFetchFiles() {
	const { user } = useAuth();
	const token = user?.access_token;

	const authenticatedFetchFiles = useCallback(
		async () => await fetchFiles({ token }),
		[token],
	);
	return authenticatedFetchFiles;
}

type CreateFileProps = FetchWithToken & {
	file: File;
};

async function createFile({
	file,
	token,
}: CreateFileProps): Promise<FileRecord> {
	const fileRecordData = new FormData();
	fileRecordData.append("file", file);

	const data = await fetch(Endpoints.files, {
		method: "POST",
		body: fileRecordData,
		headers: {
			Authorization: Authorization.bearer(token),
		},
	});
	return await data.json();
}

export function useAuthenticatedCreateFile() {
	const { user } = useAuth();
	const token = user?.access_token;

	const authenticatedCreateFile = useCallback(
		async (file: File ) => await createFile({ file, token }),
		[token],
	);
	return authenticatedCreateFile;
}

async function deleteFile(fileID: number, token?: string): Promise<void> {
	await fetch(Endpoints.file(fileID), {
		method: "DELETE",
		headers: {
			Authorization: Authorization.bearer(token),
		},
	});
}

export function useAuthenticatedDeleteFile() {
	const { user } = useAuth();
	const token = user?.access_token;

	const authenticatedDeleteFile = useCallback(
		async (fileID: number) => await deleteFile(fileID, token),
		[token],
	);
	return authenticatedDeleteFile;
}

async function downloadFile(fileID: number, token?: string): Promise<Blob> {
	const data = await fetch(Endpoints.fileDownload(fileID), {
		method: "GET",
		headers: {
			Authorization: Authorization.bearer(token),
		},
	});

	return await data.blob();
}

export function useAuthenticatedDownloadFile() {
	const { user } = useAuth();
	const token = user?.access_token;

	const authenticatedDownloadFile = useCallback(
		async (fileID: number) => await downloadFile(fileID, token),
		[token],
	);
	return authenticatedDownloadFile;
}
