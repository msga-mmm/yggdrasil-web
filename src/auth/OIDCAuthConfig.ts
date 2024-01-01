import { AuthProviderProps } from "react-oidc-context";

export const authProviderConfig: AuthProviderProps = {
	authority: "http://localhost:8180/realms/quickstart",
	client_id: "authz-servlet",
	client_secret: "secret",
	redirect_uri: "http://localhost:5173",
	onSigninCallback: (): void => {
		window.history.replaceState({}, document.title, window.location.pathname);
	},
};
