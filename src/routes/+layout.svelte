<script lang="ts">
	import '../app.css';
	import Breakpoint from '$debug/breakpoint.svelte';
	import Header from '$components/Header.svelte';
	import Navbar from '$components/Navbar.svelte';
	import '@fontsource-variable/nunito';

	let { children } = $props();
</script>

<svelte:head>
	<title>Durianlinguo - Learn Bisaya</title>

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

<div class="bg-base-200">
	<Header />
	<main class="container mx-auto px-4 py-6">
		{@render children()}
	</main>

	<Breakpoint />
	<Navbar />
</div>
