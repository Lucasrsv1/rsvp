import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "../../services/authentication/authentication.service";

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
	constructor (
		private readonly router: Router,
		private readonly authenticationService: AuthenticationService
	) { }

	public canActivate (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		if (this.authenticationService.isLoggedIn()) {
			this.router.navigate(["home"]);
			return false;
		}

		return true;
	}
}
