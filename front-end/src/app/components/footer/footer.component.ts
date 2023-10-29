import { Component } from "@angular/core";

import {
	faEnvelope,
	faEnvelopeCircleCheck,
	faMapMarkerAlt,
	faMobileAlt
} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-footer",
	templateUrl: "./footer.component.html",
	styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
	public faEnvelope = faEnvelope;
	public faEnvelopeCircleCheck = faEnvelopeCircleCheck;
	public faMapMarkerAlt = faMapMarkerAlt;
	public faMobileAlt = faMobileAlt;

	public year = new Date().getFullYear();

	constructor () { }
}
