<script lang="ts">
	const { word } = $props();

	let flipped = $state(false);

	function toggleFlip() {
		return (flipped = !flipped);
	}

	export function reset() {
		flipped = false;
	}
</script>

<div class="flex justify-center">
	<button
		class="card-flip mx-auto h-64 w-xl max-w-md cursor-pointer rounded-xl"
		onclick={toggleFlip}
		aria-pressed={flipped}
		aria-label="Turn the card to see the translation"
		tabindex="0"
	>
		<div
			class="card-inner preserve-3d relative h-full w-full rounded-xl bg-white shadow-lg transition-all duration-500"
			style="transform: rotateY({flipped ? '180deg' : '0deg'});"
		>
			<!-- Card Front -->
			<div
				class="card-front absolute flex h-full w-full flex-col items-center justify-center p-6 text-center backface-hidden"
			>
				<div class="text-5xl font-bold text-darkGray">{word.word}</div>

				<p
					class="mt-4 rounded-lg bg-green-50 px-4 py-2 font-mono text-lg font-semibold text-darkGray"
				>
					<span class="text-sm font-bold text-deepGreen">🔊</span>
					{word.pronunciation}
				</p>

				<p class="mt-4 text-sm text-gray-500">Tap to reveal meaning</p>
			</div>

			<!-- Card Back -->
			<div
				class="card-back absolute flex h-full w-full rotate-y-180 transform flex-col items-center justify-center rounded-xl bg-white p-6 text-center backface-hidden"
			>
				<div class="text-4xl font-bold text-deepGreen">{word.translation.en}</div>

				<p
					class="mt-4 rounded-lg bg-green-50 px-4 py-2 font-mono text-lg font-semibold text-darkGray"
				>
					<span class="text-sm font-bold text-deepGreen">🔊</span>
					{word.pronunciation}
				</p>

				<p class="mt-3 text-sm text-gray-500">Try saying it!</p>
			</div>
		</div>
	</button>
</div>

<style>
	.preserve-3d {
		transform-style: preserve-3d;
	}

	.backface-hidden {
		backface-visibility: hidden;
	}

	.rotate-y-180 {
		transform: rotateY(180deg);
	}

	/* Transition douce */
	.card-inner {
		transition: transform 0.6s ease-in-out;
	}

	/* Typographie monospace claire */
	.font-mono {
		font-family: 'Courier New', Courier, monospace;
		letter-spacing: 0.5px;
	}
</style>
