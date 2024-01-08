export function triggerBrowserFileDownload(fileBlob: Blob, fileName: string) {
	const fileObjectUrl = URL.createObjectURL(fileBlob);
	const downloadFileLink = document.createElement('a');

	downloadFileLink.href = fileObjectUrl;
	downloadFileLink.download = fileName;

	document.body.appendChild(downloadFileLink);
	downloadFileLink.click();
	document.body.removeChild(downloadFileLink);

	URL.revokeObjectURL(fileObjectUrl);
}
