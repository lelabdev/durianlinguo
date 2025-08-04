import { appStore } from '$lib/store/appStore.svelte';
import type { Lexicon } from '$lib/types';
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

export function getTodayWords(limit: number = 10): Lexicon[] {
	const lexicon: Lexicon[] = words;

	// This returns progress data {id, status, streak}, not full word objects.
	const dueWordsFromStore = appStore.dueWords;

	// We need to find the full word objects from bisaya.json using the IDs.
	const dueWordIds = new Set(dueWordsFromStore.map((w) => w.id));

	const dueWords: Lexicon[] = lexicon.filter((word) => dueWordIds.has(word.id));

	console.log('dueWords', dueWords);

	if (dueWords.length >= limit) {
		return shuffle(dueWords).slice(0, limit);
	}

	// 2. If we don't have enough due words, fill the rest with new words.
	const remainingSlots = limit - dueWords.length;
	const nextNewWordId = appStore.progress?.nextNewWordId ?? 10;
	console.log(remainingSlots);

	let newWords: Lexicon[] = lexicon.filter((word) => {
		return !appStore.getStoreWord(word.id) && Number(word.id) < nextNewWordId;
	});

	// 3. Combine due and new words, then shuffle them for a mixed learning session.
	return shuffle([...dueWords, ...newWords]);
}
