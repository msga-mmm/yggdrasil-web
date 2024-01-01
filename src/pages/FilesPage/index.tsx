import { useRef } from "react";
import {
	useFiles,
	useCreatFile,
	useDeleteFile,
} from "./queries";
import { triggerBrowserFileDownload } from "../../utils";
import { useAuthenticatedDownloadFile } from "./api";
import { useAuth } from "react-oidc-context";

export default function FilesPage() {
	const { user } = useAuth()
	const { data: files } = useFiles();
	const { mutate: createFile } = useCreatFile();
	const { mutate: deleteFile } = useDeleteFile();
	const downloadFile = useAuthenticatedDownloadFile()
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div>
			<p>Logged in as: {user?.profile.preferred_username}</p>

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

					createFile(file);
				}}
			>
				upload file
			</button>
		</div>
	);
}
