import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "../../services/authentication/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthenticationGuard implements CanActivate {
	constructor (
		private readonly router: Router,
		private readonly authenticationService: AuthenticationService
	) { }

	public canActivate (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		if (!this.authenticationService.isLoggedIn()) {
			this.router.navigate(["login"]);
			return false;
		}

		return true;
	}
}
