<script lang="ts">
	// --- Liste des mots (exemple)
	const words = [
		{ id: 1, word: 'salamat', pronunciation: 'sah-LAH-tam', translation: { en: 'thank you' } },
		{ id: 2, word: 'kumusta', pronunciation: 'koo-MOOS-tah', translation: { en: 'hello' } },
		{ id: 3, word: 'tubig', pronunciation: 'TOO-big', translation: { en: 'water' } },
		{ id: 4, word: 'kain', pronunciation: 'KAIN', translation: { en: 'eat' } },
		{ id: 5, word: 'pila man', pronunciation: 'PEE-lah mahn', translation: { en: 'how much?' } },
		{ id: 6, word: 'palihug', pronunciation: 'pah-LEE-hoog', translation: { en: 'please' } },
		{ id: 7, word: 'dili', pronunciation: 'DEE-lee', translation: { en: 'no' } },
		{ id: 8, word: 'oo', pronunciation: 'OH-oh', translation: { en: 'yes' } },
		{ id: 9, word: 'gusto ko', pronunciation: 'GOS-to ko', translation: { en: 'I want' } },
		{ id: 10, word: 'asa', pronunciation: 'AH-sah', translation: { en: 'where' } }
	];

	// --- État ---
	let currentIndex = 0;
	let selectedChoice = null;
	let feedback = null;
	let completed = false;

	// Mot actuel
	$: currentWord = words[currentIndex];

	// Générer 4 choix : 1 vrai, 3 faux
	$: choices = (function () {
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

	// --- Actions ---
	function checkAnswer(choice) {
		selectedChoice = choice;
		if (choice === currentWord.translation.en) {
			feedback = 'correct';
		} else {
			feedback = 'wrong';
		}
	}

	function nextWord() {
		if (currentIndex < words.length - 1) {
			currentIndex += 1;
			resetState();
		} else {
			completed = true;
			saveProgress();
		}
	}

	function resetState() {
		selectedChoice = null;
		feedback = null;
	}

	function saveProgress() {
		const today = new Date().toDateString();
		localStorage.setItem('learnProgress', today);
	}

	// Démarrer avec le premier mot
	resetState();
</script>

<div class="mx-auto flex min-h-screen max-w-md flex-col bg-white p-6">
	<!-- Barre de progression -->
	<div class="mb-6 text-center">
		<p class="text-sm text-gray-600">Learn new words</p>
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
			<div class="mb-4 text-4xl font-bold text-darkGray">{currentWord.word}</div>

			<!-- Prononciation -->
			<p class="mb-6 font-mono text-sm text-gray-600">{currentWord.pronunciation}</p>

			<!-- Question -->
			<p class="mb-4 text-gray-700">What does this mean?</p>

			<!-- Choix -->
			{#each choices as choice, i (i)}
				<button
					on:click={() => checkAnswer(choice)}
					disabled={feedback}
					class="{selectedChoice === choice
						? feedback === 'correct'
							? 'border-green-500 bg-green-100'
							: 'border-red-500 bg-red-100'
						: 'bg-gray-50 hover:bg-gray-100'}
          mb-2 w-full rounded-lg border-2 px-4 py-3 text-left transition"
				>
					{choice}
				</button>
			{/each}

			<!-- Feedback -->
			{#if feedback}
				<div
					class="mt-6 rounded-lg p-3 text-sm text-white
          {feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}"
				>
					{#if feedback === 'correct'}
						✅ Correct! "{currentWord.translation.en}".
					{:else}
						❌ Wrong. It means "{currentWord.translation.en}".
					{/if}
				</div>

				<!-- Bouton Suivant -->
				<button
					on:click={nextWord}
					class="mt-4 rounded-lg bg-deepGreen px-6 py-2 font-medium text-white transition hover:bg-green-700"
				>
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
				on:click={() => ((completed = false), (currentIndex = 0), resetState())}
				class="mt-6 rounded-lg bg-deepGreen px-6 py-2 font-medium text-white"
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
