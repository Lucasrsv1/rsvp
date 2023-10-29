import { Injectable } from "@angular/core";

const APP_KEY_PREFIX = "RSVP_";

export enum LocalStorageKey {
	USER = "USER"
}

@Injectable({ providedIn: "root" })
export class LocalStorageService {
	constructor () { }

	public hasKey (key: LocalStorageKey, suffix = ""): boolean {
		return Boolean(this.get(key, null, suffix));
	}

	public get (key: LocalStorageKey, defaultValue: unknown = null, suffix = ""): string {
		return window.localStorage.getItem(APP_KEY_PREFIX + key + suffix) || String(defaultValue);
	}

	public set (key: LocalStorageKey, value: string, suffix = ""): void {
		window.localStorage.setItem(APP_KEY_PREFIX + key + suffix, value);
	}

	public delete (key: LocalStorageKey, suffix = ""): void {
		window.localStorage.removeItem(APP_KEY_PREFIX + key + suffix);
	}
}
