<script lang="ts">
	import '../app.css';
	import Breakpoint from '$debug/breakpoint.svelte';
	import Header from '$components/Header.svelte';
	import Navbar from '$components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Sulti - Learn Bisaya</title>

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>

	<link
		href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header />
<main class="container mx-auto px-4 py-6">
	{@render children()}
</main>

<Breakpoint />
<Navbar />
