import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createFile, deleteFile, fetchFiles } from "./api";

const filesKeys = {
	all: ["files"],
};

export function useFiles() {
	return useQuery({
		queryKey: filesKeys.all,
		queryFn: fetchFiles,
	});
}

export function useCreatFile() {
	const queryClient = useQueryClient();

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

	return useMutation({
		mutationFn: deleteFile,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: filesKeys.all,
			});
		},
	});
}
