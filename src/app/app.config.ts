import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LogLevel, authInterceptor, provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor()])),
		provideAuth({
			config: {
				authority: 'http://localhost:8180/realms/yggdrasil-web-auth',
				redirectUrl: window.location.origin,
				postLogoutRedirectUri: window.location.origin,
				clientId: 'yggdrasil-web',
				scope: 'openid profile email',
				responseType: 'code',
				silentRenew: true,
				useRefreshToken: true,
				logLevel: LogLevel.Debug,
				secureRoutes: [
					'http://localhost:8080'
				],
			},
		}),
	],
};
