import { appStore } from '$lib/store/appStore.svelte';
import type { Word } from '$lib/types';
import words from '$content/bisaya.json';

export function getTodayWords(allWords: Word[] = words, limit: number = 10): Word[] {
	const now = Date.now();

	const dueWords = allWords
		.filter((word) => {
			const storeWord = appStore.getWord(word.id);
			return storeWord && storeWord.nextReview <= now;
		})
		.sort(() => Math.random() - 0.5);

	const remainingSlots = limit - dueWords.length;
	const newWords: Word[] = [];

	if (remainingSlots > 0) {
		console.log(remainingSlots);
		const nextNewWordId = appStore.words ? appStore.progress.nextNewWordId : 10;

		newWords.push(
			...allWords
				.filter((word) => {
					const wordId = word.id;
					return Number(wordId) < nextNewWordId && !appStore.getWord(wordId);
				})
				.slice(0, remainingSlots)
		);
	}

	return [...dueWords, ...newWords];
}
