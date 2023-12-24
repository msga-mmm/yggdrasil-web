import { useFiles, useCreatFile } from "./queries";

export default function FilesPage() {
  const { data: files } = useFiles();
  const { mutate: createFile } = useCreatFile();

  return (
    <div>
      <p>my files:</p>
      <ul>{files?.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
      <button onClick={() => createFile(files?.length ?? 0)}>upload file</button>
    </div>
  );
}
