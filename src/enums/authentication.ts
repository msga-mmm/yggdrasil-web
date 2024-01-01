export const Authorization = {
	bearer: (token?: string) => `Bearer ${token}` as const,
};
