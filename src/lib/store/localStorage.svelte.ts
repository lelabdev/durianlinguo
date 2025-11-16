import { browser } from '$app/environment';

export class LocalStorage<T> {
	#value = $state<T>() as T;
	#saveTimeout: ReturnType<typeof setTimeout> | null = null;
	key: string = '';

	constructor(key: string, value: T) {
		this.key = key;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) {
				this.#value = this.deserialize(item);
			} else {
				this.#value = value;
				localStorage.setItem(this.key, this.serialize(this.#value));
			}
		} else {
			this.#value = value;
		}
	}

	get value(): T {
		return this.#value;
	}

	set value(newValue) {
		this.#value = newValue;
		if (browser) {
			// Debounce writes to avoid excessive localStorage operations
			if (this.#saveTimeout) clearTimeout(this.#saveTimeout);
			this.#saveTimeout = setTimeout(() => {
				localStorage.setItem(this.key, this.serialize(this.#value));
				this.#saveTimeout = null;
			}, 300);
		}
	}

	serialize(value: T): string {
		return JSON.stringify(value);
	}

	deserialize(value: string): T {
		return JSON.parse(value);
	}
}
