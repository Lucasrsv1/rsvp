import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";

import jwtDecode from "jwt-decode";
import { NgBlockUI } from "ng-block-ui";
import { sha512 } from "js-sha512";

import { environment } from "src/environments/environment";
import { IUsers } from "src/app/interfaces/users";

import { AlertsService } from "../alerts/alerts.service";
import { LocalStorageKey, LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
	public $loggedClient = new BehaviorSubject<IUsers | null>(null);

	constructor (
		private readonly http: HttpClient,
		private readonly router: Router,
		private readonly alertsService: AlertsService,
		private readonly localStorage: LocalStorageService
	) { }

	public login (username: string, password: string, blockUI?: NgBlockUI): void {
		// Faz o hash da senha antes de fazer o login
		password = sha512(password);

		this.http.post<{ token: string }>(
			`${environment.API_URL}/v1/login`,
			{ username, password }
		).subscribe({
			next: response => {
				if (blockUI) blockUI.stop();

				this.localStorage.set(LocalStorageKey.USER, response.token);
				this.router.navigate(["home"]);
				this.$loggedClient.next(this.getLoggedUser());
			},
			error: (error: HttpErrorResponse) => {
				if (blockUI) blockUI.stop();

				this.alertsService.httpErrorAlert(
					"Falha ao Entrar",
					"Não foi possível fazer login, tente novamente.",
					error
				);
			}
		});
	}

	public signOut (): void {
		this.localStorage.delete(LocalStorageKey.USER);
		this.$loggedClient.next(null);
		this.router.navigate(["login"]);
	}

	public isLoggedIn (): boolean {
		const user = this.getLoggedUser();
		return Boolean(user && user.username);
	}

	public getLoggedUser (): IUsers | null {
		const token = this.localStorage.get(LocalStorageKey.USER);
		try {
			return (token ? jwtDecode(token) : null) as IUsers;
		} catch (error) {
			return null;
		}
	}
}
