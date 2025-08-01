<script lang="ts">
	import { navLinks } from '$lib/links';
	import { page } from '$app/state';
</script>

<nav class="dock">
	{#each navLinks as link, i (i)}
		<a href={link.href}>
			<div
				class="{link.href == page.url.pathname
					? 'text-secondary'
					: 'text-base-content'} nav-item flex flex-col items-center"
			>
				<link.icon />
				<span class="text-xs">{link.label}</span>
			</div>
		</a>
	{/each}
</nav>
