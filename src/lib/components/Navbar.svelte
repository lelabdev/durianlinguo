<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const navItems = document.querySelectorAll('.nav-item');
		navItems.forEach((item) => {
			item.addEventListener('click', function () {
				navItems.forEach((i) => i.classList.remove('active'));
				this.classList.add('active');
			});
		});
	});

	const navLink = [
		{ label: 'learn', href: '/learn', icon: "<i class='fas fa-graduation-cap mb-1 text-xl'></i>" },
		{ label: 'Reviews', href: '/review', icon: "<i class='fas fa-sync-alt mb-1 text-xl'></i>" },
		{
			label: 'Phrases',
			href: '/phrases',
			icon: "<i class='fas fa-comment-dots mb-1 text-xl'></i>"
		},
		{ label: 'All', href: '/all', icon: "<i class='fas fa-heart mb-1 text-xl'></i>" }
	];
</script>

<nav class="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white px-6 py-3 text-black">
	<div class="flex justify-around">
		{#each navLink as link, i (i)}
			<a href={link.href}>
				<div class="nav-item flex flex-col items-center">
					{@html link.icon}
					<span class="text-xs">{link.label}</span>
				</div>
			</a>
		{/each}
	</div>
</nav>
