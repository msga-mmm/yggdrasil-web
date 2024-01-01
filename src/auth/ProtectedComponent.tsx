import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";

type ProtectedComponentProps = {
	children: ReactNode;
};

export function ProtectedComponent({ children }: ProtectedComponentProps) {
	const {
		isLoading,
		isAuthenticated,
		error,
		revokeTokens,
		removeUser,
		signinRedirect,
	} = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	if (isAuthenticated) {
		return (
			<div>
				{children}
				<button
					onClick={async () => {
						// clear user session, so login again will force to enter credentials again
						await revokeTokens();

						// logout user
						await removeUser();
					}}
				>
					Log out
				</button>
			</div>
		);
	}

	return <button onClick={() => void signinRedirect()}>Log in</button>;
}
