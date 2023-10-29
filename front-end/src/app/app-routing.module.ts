import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard } from "./guards/authentication/authentication.guard";
import { LoginGuard } from "./guards/login/login.guard";

import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
	// Public
	{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },

	// Restricted
	{ path: "home", component: HomeComponent, canActivate: [AuthenticationGuard] },

	// No match
	{ path: "**", redirectTo: "home" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
