<script lang="ts">
	import Head from '$components/Head.svelte';
	import { getTodayWords, updateProgress } from '$lib/learning';
	import type { Lexicon } from '$lib/types';

	// --- Initial data ---
	const words: Lexicon[] = getTodayWords();

	// --- State ---
	let currentIndex = $state<number>(0);
	let selectedChoice = $state<null | string>(null);
	let feedback = $state<null | 'correct' | 'wrong'>(null);
	let completed = $state<boolean>(false);

	// --- Derived ---
	let currentWord = $derived.by(() => words[currentIndex]);

	let choices = $derived.by(() => {
		if (!currentWord) return [];
		const opts: string[] = [currentWord.translation.en];
		while (opts.length < 4) {
			const randomWord = words[Math.floor(Math.random() * words.length)];
			const translation: string = randomWord.translation.en;
			if (!opts.includes(translation)) {
				opts.push(translation);
			}
		}
		return opts.sort(() => Math.random() - 0.5);
	});

	// --- Actions ---
	function checkAnswer(choice: string | null) {
		selectedChoice = choice;
		if (choice === currentWord.translation.en) {
			feedback = 'correct';
			updateProgress(currentWord.id, true);
		} else {
			feedback = 'wrong';
			updateProgress(currentWord.id, false);
		}
	}

	function nextWord() {
		if (currentIndex < words.length - 1) {
			currentIndex += 1;
			resetState();
		} else {
			completed = true;
		}
	}

	function resetState() {
		selectedChoice = null;
		feedback = null;
	}

	// Initialize
	resetState();
</script>

<Head title="Learn Bisaya" />

{#if !completed}
	<div class="card">
		<h2>{currentWord.word}</h2>

		{#each choices as choice}
			<button
				disabled={!!feedback}
				class:selected={selectedChoice === choice}
				class:correct={feedback === 'correct' && choice === currentWord.translation.en}
				class:wrong={feedback === 'wrong' && choice === selectedChoice}
				onclick={() => checkAnswer(choice)}
			>
				{choice}
			</button>
		{/each}

		{#if feedback}
			<button onclick={nextWord}>Next Word →</button>
		{/if}
	</div>
{:else}
	<div class="completion">
		<h2>🎉 Session Complete!</h2>
		<p>You reviewed {words.length} words today.</p>
	</div>
{/if}
