import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { IValidations } from "src/app/components/visual-validator/visual-validator.component";

import { AlertsService } from "src/app/services/alerts/alerts.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
	@BlockUI()
	private blockUI?: NgBlockUI;

	@ViewChild("usernameInput")
	private usernameInput?: ElementRef;

	public form: FormGroup;
	public validations: IValidations;

	constructor (
		private readonly formBuilder: FormBuilder,
		private readonly authenticationService: AuthenticationService,
		private readonly alertsService: AlertsService
	) {
		this.form = this.formBuilder.group({
			username: ["", Validators.required],
			senha: ["", Validators.required]
		});

		this.validations = {
			form: this.form,
			fields: {
				username: [{ key: "required" }],
				senha: [{ key: "required" }]
			}
		};
	}

	public login (): void {
		if (this.form.invalid)
			return this.alertsService.show("Atenção", "Usuário ou senha inválidos.", "error");

		if (this.blockUI)
			this.blockUI.start("Autenticando...");

		this.authenticationService.login(
			this.form.get("username")?.value,
			this.form.get("senha")?.value,
			this.blockUI
		);
	}

	public clear (): void {
		this.form.reset();
		if (this.usernameInput)
			this.usernameInput.nativeElement.focus();
	}
}
