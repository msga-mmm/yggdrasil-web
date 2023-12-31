import { Endpoints } from "../../enums";

type FileRecord = {
	id: number;
	name: string;
	size: number;
};

export async function fetchFiles(): Promise<FileRecord[]> {
	const data = await fetch(Endpoints.files);
	return await data.json();
}

type CreateFileProps = {
	file: File;
};

export async function createFile({ file }: CreateFileProps): Promise<FileRecord> {
	const fileRecordData = new FormData();
	fileRecordData.append("file", file);

	const data = await fetch(Endpoints.files, {
		method: "POST",
		body: fileRecordData,
	});
	return await data.json();
}

export async function deleteFile(fileID: number): Promise<void> {
	await fetch(Endpoints.file(fileID), {
		method: "DELETE",
	});
}

export async function downloadFile(fileID: number): Promise<Blob> {
	const data = await fetch(Endpoints.fileDownload(fileID), {
		method: "GET",
	});

	return await data.blob()
}
