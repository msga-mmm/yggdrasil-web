import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LogLevel, authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor()])),
		provideAuth({
			config: {
				authority: environment.auth.authority,
				redirectUrl: window.location.origin,
				postLogoutRedirectUri: window.location.origin,
				clientId: environment.auth.clientId,
				scope: 'openid profile email',
				responseType: 'code',
				silentRenew: true,
				useRefreshToken: true,
				logLevel: LogLevel.Debug,
				secureRoutes: [
					environment.backendBaseUrl
				],
			},
		}),
	],
};
