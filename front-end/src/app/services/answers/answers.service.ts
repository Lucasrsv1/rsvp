import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IAnswers } from "src/app/interfaces/answers";

@Injectable({ providedIn: "root" })
export class AnswersService {
	constructor (private readonly http: HttpClient) { }

	public getAnswers (): Observable<IAnswers[]> {
		return this.http.get<IAnswers[]>(`${environment.API_URL}/v1/answers`);
	}
}
