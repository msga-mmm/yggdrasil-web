import { useQuery } from "@tanstack/react-query";

type File = {
  id: number;
  name: string;
};

function Files() {
  const { data: files } = useQuery({
    queryKey: ["files"],
    queryFn: async (): Promise<File[]> => {
      const data = await fetch("http://localhost:8080/files");
      return await data.json();
    },
  });

  return (
    <div>
      <p>my files:</p>
      <ul>
        {files?.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <button>upload file</button>
    </div>
  );
}

export default Files;
