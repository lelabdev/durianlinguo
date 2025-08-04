<script lang="ts">
	import { getTodayWords, updateProgress } from '$lib/learning';

	const words = getTodayWords();

	// console.log($inspect(words));

	// --- État ---
	let currentIndex = $state(0);
	let selectedChoice = $state<null | string>(null);
	let feedback = $state<null | 'correct' | 'wrong'>(null);
	let completed = $state(false);

	let currentWord = $derived(words[currentIndex]);

	// Generate 4 choices : 1 correct, 3 wrong
	let choices = $state<string[]>([]);

	$effect(() => {
		choices = (function () {
			const opts = [currentWord.translation.en];
			while (opts.length < 4) {
				const randomWord = words[Math.floor(Math.random() * words.length)];
				const translation = randomWord.translation.en;
				if (!opts.includes(translation)) {
					opts.push(translation);
				}
			}
			return opts.sort(() => Math.random() - 0.5);
		})();
	});

	// --- Actions ---
	function checkAnswer(choice: string | null) {
		selectedChoice = choice;
		if (choice === currentWord.translation.en) {
			feedback = 'correct';
			updateProgress(currentWord, true);
		} else {
			updateProgress(currentWord, false);
			feedback = 'wrong';
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

	// Démarrer avec le premier mot
	resetState();
</script>

<svelte:head>
	<title>Learning | Gyud</title>
</svelte:head>
<div
	class="mx-auto flex min-h-screen max-w-md flex-col rounded-2xl border-2 border-base-300 bg-base-100 p-6"
>
	<!-- Barre de progression -->
	<div class="mb-6 text-center">
		<p class="text-content-base text-sm">Learn new words</p>
		<div class="mt-1 h-2.5 w-full rounded-full bg-gray-200">
			<div
				class="h-2.5 rounded-full bg-deepGreen transition-all"
				style="width: {((currentIndex + 1) / words.length) * 100}%"
			></div>
		</div>
		<p class="mt-1 text-sm text-gray-500">
			Word {currentIndex + 1} / {words.length}
		</p>
	</div>

	<!-- Contenu principal -->
	{#if !completed}
		<div class="flex flex-1 flex-col items-center justify-center text-center">
			<!-- Mot en bisaya -->
			<div class="mb-4 text-4xl font-bold">{currentWord.word}</div>

			<!-- Prononciation -->

			<p
				class="mt-4 rounded-lg bg-green-50 px-4 py-2 font-mono text-lg font-semibold text-darkGray"
			>
				<span class="text-sm font-bold text-deepGreen">🔊</span>
				{currentWord.pronunciation}
			</p>

			<!-- Question -->
			<p class="mb-4">What does this mean?</p>

			{#each choices as choice, i (i)}
				<button
					onclick={() => checkAnswer(choice)}
					disabled={feedback == undefined ? false : true}
					class="{selectedChoice === choice
						? feedback === 'correct'
							? 'alert-outline alert alert-success'
							: 'alert-outline alert alert-error'
						: 'btn-neural btn'}
           mb-2 w-full justify-center transition"
				>
					{choice}
				</button>
			{/each}

			<!-- Feedback -->
			{#if feedback}
				<div
					class="alert-soft mt-6 alert text-sm
          {feedback === 'correct' ? 'alert-success' : 'alert-error'}"
				>
					<span>
						{#if feedback === 'correct'}
							✅ Correct! "{currentWord.translation.en}".
						{:else}
							❌ Wrong. It means "{currentWord.translation.en}".
						{/if}
					</span>
				</div>

				<!-- Bouton Suivant -->
				<button onclick={nextWord} class="btn mt-4 btn-primary">
					{currentIndex < words.length - 1 ? 'Next word' : 'Finish'}
				</button>
			{/if}
		</div>
	{:else}
		<!-- Écran de fin -->
		<div class="flex flex-1 flex-col items-center justify-center text-center">
			<div class="mb-4 text-6xl">🎉</div>
			<h2 class="mb-2 text-2xl font-bold text-darkGray">Great job!</h2>
			<p class="text-gray-600">You learned {words.length} new words today.</p>
			<button
				onclick={() => ((completed = false), (currentIndex = 0), resetState())}
				class="btn mt-6 btn-primary"
			>
				Review again
			</button>
		</div>
	{/if}
</div>

<style>
	:global(.bg-deepGreen) {
		background-color: #2e8b57;
	}
	:global(.text-deepGreen) {
		color: #2e8b57;
	}
	:global(.text-darkGray) {
		color: #2c3e50;
	}
	:global(.font-mono) {
		font-family: 'Courier New', monospace;
	}
</style>
