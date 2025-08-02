import appStore from '$lib/store/appStore.svelte';
import type { Word } from '$lib/types';

function calculateNextReview(streak: number): number {
	const intervals = [1, 1, 3, 7, 16, 30];
	const days = streak < intervals.length ? intervals[streak] : 30;
	return Date.now() + days * 86_400_000;
}

export function updateProgress(word: Word, success: boolean) {
	const storeWord = appStore.getWord(word.id);

	if (!storeWord) {
		appStore.add(word.id);
		return;
	}

	const newStreak = success ? storeWord.streak + 1 : 0;
	const newMistakes = success ? storeWord.mistakes : storeWord.mistakes + 1;
	const nextReview = calculateNextReview(newStreak);

	const status = newStreak >= 5 ? 'known' : 'learning';

	appStore.update(word.id, {
		streak: newStreak,
		mistakes: newMistakes,
		nextReview,
		status
	});
}
