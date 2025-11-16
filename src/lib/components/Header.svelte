<script lang="ts">
	import logo from '$lib/assets/logo.png?enhanced';
	import InstallButton from '$components/InstallButton.svelte';
</script>

<header class="sticky flex flex-row items-center justify-between bg-transparent px-6 pt-4">
	<a href="/" class="flex items-center gap-4">
		<enhanced:img src={logo} alt="Durian logo" class="h-18 w-18" />

		<h2 class="text-2xl font-bold text-woodBrown">Pagsulti gyud ta!</h2>
	</a>

	<InstallButton />
</header>
