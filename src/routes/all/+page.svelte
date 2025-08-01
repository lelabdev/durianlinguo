<script lang="ts">
	import words from '$content/bisaya.json';
	import type { Word } from '$lib/types/word';
	import Table from './Table.svelte';

	const getCategories = (wordList: Word[]): string[] =>
		[...new Set(wordList.map((w) => w.category).filter(Boolean))].sort((a, b) =>
			(a as string).localeCompare(b as string)
		) as string[];

	const filterByCategory = (category: string): Word[] =>
		category === 'all' ? words : words.filter((w) => w.category === category);

	const categories: string[] = getCategories(words);
	let selectedCategory = $state<Word[]>(filterByCategory('all'));

	const handleCategory = (category: string): void => {
		selectedCategory = filterByCategory(category);
		checked = false;
	};
	let checked = $state(false);
</script>

<div class="flex min-h-screen flex-col lg:flex-row">
	<!-- Drawer avec taille fixe sur lg+ -->
	<div class="lg:w-60 lg:flex-shrink-0">
		<div class="drawer lg:drawer-open">
			<input id="my-drawer" type="checkbox" bind:checked class="drawer-toggle" />
			<div class="drawer-content">
				<!-- Page content here - seulement visible sur mobile -->
				<label for="my-drawer" class="drawer-button btn btn-primary lg:hidden">
					Filter categories
				</label>
			</div>
			<div class="drawer-side lg:pointer-events-auto lg:relative lg:transform-none lg:opacity-100">
				<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay lg:hidden"></label>
				<ul
					class="menu min-h-full w-60 bg-base-200 p-4 text-base-content lg:min-h-screen lg:rounded-none"
				>
					<li>
						<button
							class="btn mx-auto w-40 capitalize btn-ghost"
							onclick={() => handleCategory('all')}
						>
							All Words
						</button>
					</li>
					{#each categories as category}
						<li>
							<button
								class="btn mx-auto w-40 capitalize btn-ghost"
								onclick={() => handleCategory(category)}
							>
								{category}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<div class="flex-1 overflow-x-auto p-4">
		<Table bind:words={selectedCategory} />
	</div>
</div>
