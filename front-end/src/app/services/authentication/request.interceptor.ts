import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { AlertsService } from "../alerts/alerts.service";
import { AuthenticationService } from "./authentication.service";
import { LocalStorageKey, LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
export class RequestInterceptor implements HttpInterceptor {
	constructor (
		private readonly alertsService: AlertsService,
		private readonly authenticationService: AuthenticationService,
		private readonly localStorage: LocalStorageService
	) { }

	public intercept (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.authenticationService.isLoggedIn()) {
			const token = this.localStorage.get(LocalStorageKey.USER);
			req = req.clone({
				setHeaders: { "x-access-token": token }
			});
		}

		return next.handle(req).pipe(tap(
			() => { },
			(httpError: HttpErrorResponse) => {
				if ((httpError.error && httpError.error.expired) || (httpError.status === 403 && this.authenticationService.isLoggedIn())) {
					this.authenticationService.signOut();
					this.alertsService.show("Acesso Negado", "Sua sessão expirou. Por favor, faça login novamente.", "error");
				}
			}
		));
	}
}
