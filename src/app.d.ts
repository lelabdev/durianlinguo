// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

declare module '*.svx' {
	// You might need to adjust this depending on the content of your .svx files
	// For example, if they export components, you might need to declare them as such.
	const content: any; // Or a more specific type if known
	export default content;
}
