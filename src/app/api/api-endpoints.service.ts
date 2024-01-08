const SERVER_URL = "http://localhost:8080"

export const Endpoints = {
	files: `${SERVER_URL}/files` as const,
	file: (fileID: number) => `${Endpoints.files}/${fileID}` as const,
	fileDownload: (fileID: number) => `${Endpoints.file(fileID)}/download` as const,
}
