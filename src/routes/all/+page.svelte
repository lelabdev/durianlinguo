<script lang="ts">
	import words from '$content/bisaya.json';
	import type { Word } from '$lib/types/word';
	import Table from './Table.svelte';

	const getCategories = (wordList: Word[]): string[] =>
		[...new Set(wordList.map((w) => w.category).filter(Boolean))] as string[];

	const filterByCategory = (category: string): Word[] =>
		category === 'all' ? words : words.filter((w) => w.category === category);

	// Initialisation
	const categories: string[] = getCategories(words);
	let selectedCategory = $state<Word[]>(filterByCategory('all'));

	// Handlers
	const handleCategory = (category: string): void => {
		selectedCategory = filterByCategory(category);
		checked = false;
	};
	let checked = $state(false);
</script>

<div class="flex flex-col lg:flex-row">
	<div class="drawer lg:drawer-open">
		<input id="my-drawer" type="checkbox" bind:checked class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer" class="drawer-button btn btn-primary lg:hidden"
				>Filter categories</label
			>
		</div>
		<div class="drawer-side">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu min-h-full w-60 bg-base-200 p-4 text-base-content">
				<li>
					<button
						class=" btn mx-auto w-40 capitalize btn-ghost"
						onclick={() => handleCategory('all')}
					>
						All Words</button
					>
				</li>
				{#each categories as category}
					<li>
						<button
							class=" btn mx-auto w-40 capitalize btn-ghost"
							onclick={() => handleCategory(category)}
							>{category}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="overflow-x-auto">
		<Table bind:words={selectedCategory} />
	</div>
</div>
