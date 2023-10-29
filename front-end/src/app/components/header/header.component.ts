import { Component } from "@angular/core";

import {
	faBars,
	faEnvelopeCircleCheck,
	faEnvelopeOpenText,
	faSignInAlt,
	faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import { IUsers } from "src/app/interfaces/users";

import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
	public faBars = faBars;
	public faEnvelopeCircleCheck = faEnvelopeCircleCheck;
	public faEnvelopeOpenText = faEnvelopeOpenText;
	public faSignInAlt = faSignInAlt;
	public faSignOutAlt = faSignOutAlt;

	public username = "";
	public isMenuCollapsed = true;

	constructor (private readonly authenticationService: AuthenticationService) {
		// Monitora login e logout
		this.authenticationService.$loggedClient.subscribe(user => {
			this.getUserInfo(user);
		});

		this.getUserInfo(this.authenticationService.getLoggedUser());
	}

	public get isLoggedIn (): boolean {
		return this.authenticationService.isLoggedIn();
	}

	public logout (): void {
		this.authenticationService.signOut();
	}

	private getUserInfo (user: IUsers | null): void {
		if (user)
			this.username = user.username;
	}
}
