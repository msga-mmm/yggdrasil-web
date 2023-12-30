import { useFiles, useCreatFile, useDeleteFile } from "./queries";

export default function FilesPage() {
	const { data: files } = useFiles();
	const { mutate: createFile } = useCreatFile();
	const { mutate: deleteFile } = useDeleteFile();

	return (
		<div>
			<p>my files:</p>
			<ul>
				{files?.map(({ id, name }) => (
					<li key={id}>
						<p>{name}</p>
						<button onClick={() => deleteFile(id)}>delete</button>
					</li>
				))}
			</ul>
			<button onClick={() => createFile(files?.length ?? 0)}>
				upload file
			</button>
		</div>
	);
}
