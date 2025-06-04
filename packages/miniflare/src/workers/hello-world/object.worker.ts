import { KeyValueStorage, MiniflareDurableObject } from "miniflare:shared";

export class HelloWorldObject extends MiniflareDurableObject {
	#storage?: KeyValueStorage;
	get storage() {
		// `KeyValueStorage` can only be constructed once `this.blob` is initialised
		return (this.#storage ??= new KeyValueStorage(this));
	}

	async get() {
		const entry = await this.storage.get("default");

		if (!entry?.value) {
			return null;
		}

		const decoder = new TextDecoder();
		let decodedValue = "";

		if (entry.value) {
			for await (const chunk of entry.value) {
				decodedValue += decoder.decode(chunk, { stream: true });
			}
			decodedValue += decoder.decode();
		}

		return decodedValue;
	}

	async set(value: string) {
		const encoder = new TextEncoder();
		const encoded = encoder.encode(value);

		await this.storage.put({
			key: "default",
			value: new ReadableStream({
				start(controller) {
					controller.enqueue(encoded);
					controller.close();
				},
			}),
		});
	}
}
