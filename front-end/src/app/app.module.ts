import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LOCALE_ID, NgModule } from "@angular/core";

import { BlockUIModule } from "ng-block-ui";
import { DataTablesModule } from "angular-datatables";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { defineLocale, ptBrLocale } from "ngx-bootstrap/chronos";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RequestInterceptor } from "./services/authentication/request.interceptor";

defineLocale("pt-br", ptBrLocale);
registerLocaleData(localePt);

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		DataTablesModule,
		BlockUIModule,
		ComponentsModule,
		BrowserAnimationsModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
