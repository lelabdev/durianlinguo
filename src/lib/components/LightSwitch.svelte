<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import IconMoon from '@lucide/svelte/icons/moon';
	import IconSun from '@lucide/svelte/icons/sun';

	let checked = $state(false);

	$effect(() => {
		let mode = localStorage.getItem('mode') || 'light';
		checked = mode === 'dark';
	});

	const onCheckedChange = (event: { checked: boolean }) => {
		const mode = event.checked ? 'dark' : 'light';
		document.documentElement.setAttribute('data-mode', mode);
		localStorage.setItem('mode', mode);
		checked = event.checked;
	};
</script>

<svelte:head>
	<script>
		let mode = localStorage.getItem('mode') || 'light';
		document.documentElement.setAttribute('data-mode', mode);
	</script>
</svelte:head>

<Switch
	name="compact"
	controlWidth="w-10"
	{checked}
	{onCheckedChange}
	compact
	controlInactive="bg-transparent"
	controlActive="bg-transparent"
>
	{#snippet activeChild()}<IconMoon size="20" />{/snippet}
	{#snippet inactiveChild()}<IconSun size="20" />{/snippet}
</Switch>
