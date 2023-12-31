import { useRef } from "react";
import {
	useFiles,
	useCreatFile,
	useDeleteFile,
} from "./queries";
import { downloadFile } from "./api";
import { triggerBrowserFileDownload } from "../../utils";

export default function FilesPage() {
	const { data: files } = useFiles();
	const { mutate: createFile } = useCreatFile();
	const { mutate: deleteFile } = useDeleteFile();
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div>
			<p>my files:</p>
			<ul>
				{files?.map(({ id, name }) => (
					<li key={id}>
						<p>{name}</p>
						<button onClick={() => deleteFile(id)}>delete</button>
						<button
							onClick={async () => {
								const fileBlob = await downloadFile(id);
								triggerBrowserFileDownload(fileBlob, name);
							}}
						>
							download
						</button>
					</li>
				))}
			</ul>

			<input ref={fileInputRef} type="file" />

			<button
				onClick={() => {
					const file = fileInputRef.current?.files?.item(0);

					if (file === null || file === undefined) return;

					createFile({
						file,
					});
				}}
			>
				upload file
			</button>
		</div>
	);
}
