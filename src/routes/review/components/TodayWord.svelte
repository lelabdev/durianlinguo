<script lang="ts">
	import FlashCard from '$components/FlashCard.svelte';
	import words from '$content/bisaya.json';

	function getDayOfYear() {
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 0);
		const diff = now.getTime() - start.getTime();
		const oneDay = 1000 * 60 * 60 * 24;
		return Math.floor(diff / oneDay);
	}

	const dayOfYear = getDayOfYear();
	const wordIndex = (dayOfYear - 1) % words.length;
	const todayWord = words[wordIndex];
	console.log(todayWord);
</script>

<div class="mb-8">
	<h2 class="mb-6 text-center text-xl font-bold text-woodBrown">Today's Word</h2>
	<FlashCard word={todayWord} />
</div>
