// Emulated Hello World Binding

import { WorkerEntrypoint } from "cloudflare:workers";

// import { HelloWorldObject } from "./object.worker";

// ENV configuration
interface Env {
	enable_timer: boolean;
	name: string;
	store: DurableObjectNamespace;
}

let inMemoryStore: string | null = null;

export class HelloWorld extends WorkerEntrypoint<Env> {
	async get(): Promise<string | null> {
		// const name = this.env.name;
		// const objectNamespace = this.env.store;
		// const id = this.env.store.idFromName(name);
		// const stub = objectNamespace.get(id);
		// return await stub.get();
		return inMemoryStore;
	}

	async set(value: string): Promise<void> {
		// const name = this.env.name;
		// const objectNamespace = this.env.store;
		// const id = this.env.store.idFromName(name);
		// const stub = objectNamespace.get(id);
		// await stub.set(value);
		inMemoryStore = value;
	}
}
