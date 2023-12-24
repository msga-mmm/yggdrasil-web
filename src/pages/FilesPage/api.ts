import { Endpoints } from "../../enums";

type File = {
	id: number;
	name: string;
};

export async function fetchFiles(): Promise<File[]> {
	const data = await fetch(Endpoints.Files);
	return await data.json();
}

export async function createFile(filesCount: number): Promise<File> {
	const data = await fetch(Endpoints.Files, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: filesCount + 1,
			name: `file-${filesCount + 1}.pdf`,
		}),
	});
	return await data.json();
}
