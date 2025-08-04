import { appStore } from '$lib/store/appStore.svelte';
import type { Word } from '$lib/types';
import words from '$content/bisaya.json';

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function getTodayWords(limit: number = 10): Word[] {
	const allWords: Word[] = words;

	// This returns progress data {id, status, streak}, not full word objects.
	const dueWordsFromStore = appStore.getDueWords();

	console.log(dueWordsFromStore);

	// We need to find the full word objects from bisaya.json using the IDs.
	const dueWordIds = new Set(dueWordsFromStore.map((w) => +w.id));
	console.log(dueWordIds);

	const dueWords: Word[] = allWords.filter((word) => dueWordIds.has(word.id));

	console.log('dueWords', dueWords);

	if (dueWords.length >= limit) {
		return shuffle(dueWords).slice(0, limit);
	}

	// 2. If we don't have enough due words, fill the rest with new words.
	const remainingSlots = limit - dueWords.length;
	let newWords: Word[] = [];
	if (remainingSlots > 0) {
		const nextNewWordId = appStore.progress?.nextNewWordId ?? 10;

		newWords = allWords
			.filter((word) => {
				// A new word is one that is not in the store yet
				// and is within the range of words to be introduced.
				return !appStore.getWord(word.id) && Number(word.id) < nextNewWordId;
			})
			.slice(0, remainingSlots);
	}

	// 3. Combine due and new words, then shuffle them for a mixed learning session.
	return shuffle([...dueWords, ...newWords]);
}
