import { appStore } from '$lib/store/appStore.svelte';

function calculateNextReview(streak: number): number {
	const intervals = [1, 1, 3, 7, 16, 30];
	const days = streak < intervals.length ? intervals[streak] : 30;
	return Date.now() + days * 86_400_000;
}

function calculateMastery(mastery: number, success: boolean): number {
	const maxMastery = 100;
	if (mastery >= maxMastery) {
		return maxMastery;
	}

	if (success) {
		const gain = 10 * (1 - mastery / maxMastery);
		return Math.min(maxMastery, mastery + Math.max(1, gain));
	} else {
		const loss = 5 * (mastery / maxMastery);
		return Math.max(0, mastery - Math.max(1.5, loss));
	}
}

export function updateProgress(wordId: number, success: boolean) {
	const storeWord = appStore.getStoreWord(wordId);

	if (!storeWord) {
		appStore.add(wordId);
		updateProgress(wordId, success);
		return;
	}

	const streak = success ? storeWord.streak + 1 : 0;
	const newMistakes = success ? storeWord.mistakes : storeWord.mistakes + 1;

	const mastery = calculateMastery(storeWord.mastery, success);

	const nextReview = calculateNextReview(streak);

	const status = streak >= 5 ? 'known' : 'learning';

	appStore.update(wordId, {
		streak,
		mistakes: newMistakes,
		seen: storeWord.seen + 1,
		mastery,
		nextReview,
		status
	});
}
