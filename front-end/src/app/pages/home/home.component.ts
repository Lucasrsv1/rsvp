import { DataTableDirective } from "angular-datatables";
import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { Subject } from "rxjs";

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { BlockUI, NgBlockUI } from "ng-block-ui";

import { IAnswers } from "src/app/interfaces/answers";

import { AlertsService } from "src/app/services/alerts/alerts.service";
import { AnswersService } from "src/app/services/answers/answers.service";
import { UtilsService } from "src/app/services/utils/utils.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
	@BlockUI()
	private blockUI?: NgBlockUI;

	@ViewChild(DataTableDirective, { static: true })
	private dataTable?: DataTableDirective;

	public answers?: IAnswers[] = [];

	public faRefresh = faRefresh;
	public dtTrigger: Subject<any> = new Subject();
	public dtOptions: DataTables.Settings = {
		stateSave: true,
		language: this.utilsService.getDataTablesTranslation("Nenhuma resposta até o momento")
	};

	constructor (
		private readonly alertsService: AlertsService,
		private readonly answersService: AnswersService,
		private readonly utilsService: UtilsService
	) { }

	public ngOnInit (): void {
		this.refresh();
	}

	public ngAfterViewInit (): void {
		this.dtTrigger.next(this.dtOptions);
	}

	public ngOnDestroy (): void {
	  this.dtTrigger.unsubscribe();
	}

	public rerenderDatatables (): void {
		this.dataTable?.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.dtTrigger.next(this.dtOptions);
		});
	}

	public refresh (): void {
		this.blockUI?.start();
		this.getAnswers();
	}

	public getAnswers (): void {
		this.answersService.getAnswers().subscribe({
			next: answers => {
				if (this.blockUI) this.blockUI.stop();

				this.answers = answers;
				this.rerenderDatatables();
			},

			error: (error: HttpErrorResponse) => {
				if (this.blockUI) this.blockUI.stop();

				this.alertsService.httpErrorAlert(
					"Erro ao Obter as Respostas dos Convidados",
					"Não foi possível realizar a consulta, tente novamente.",
					error
				);
			}
		});
	}
}
