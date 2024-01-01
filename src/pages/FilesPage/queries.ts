import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuthenticatedCreateFile, useAuthenticatedDeleteFile, useAuthenticatedFetchFiles } from "./api";

const filesKeys = {
	all: ["files"],
};

export function useFiles() {
	const fetchFiles = useAuthenticatedFetchFiles()

	return useQuery({
		queryKey: filesKeys.all,
		queryFn: fetchFiles,
	});
}

export function useCreatFile() {
	const queryClient = useQueryClient();
	const createFile = useAuthenticatedCreateFile()

	return useMutation({
		mutationFn: createFile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: filesKeys.all,
			});
		},
	});
}

export function useDeleteFile() {
	const queryClient = useQueryClient();
	const deleteFile = useAuthenticatedDeleteFile()

	return useMutation({
		mutationFn: deleteFile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: filesKeys.all,
			});
		},
	});
}
