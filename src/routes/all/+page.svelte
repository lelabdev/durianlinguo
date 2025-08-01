<script lang="ts">
	import words from '$content/bisaya.json';
	import type { Word } from '$lib/types/word';
	import Table from './Table.svelte';

	function filterByCategory(category: string) {
		if (category === 'all') {
			return words;
		}
		return words.filter((word) => word.category === category);
	}

	function getCategories(words: Word[]): string[] {
		const categories = new Set<string>();
		words.forEach((word) => {
			if (word.category) {
				categories.add(word.category);
			}
		});
		return Array.from(categories);
	}

	function clickCategory(category: string) {
		selectedCategory = filterByCategory(category);
	}
	const categories: string[] = getCategories(words);

	let selectedCategory = $state(filterByCategory('all'));
</script>

<div class="overflow-x-auto">
	<div class="flex flex-row flex-wrap gap-6">
		<button class=" btn w-40 capitalize">All Words</button>
		{#each categories as category}
			<button class=" btn w-40 capitalize" onclick={() => clickCategory(category)}
				>{category}
			</button>
		{/each}
	</div>

	<Table bind:words={selectedCategory} />
</div>
