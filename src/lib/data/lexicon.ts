/**
 * Lexicon loader - Loads vocabulary from multiple category files
 * and combines them with the learning sequence.
 */

import type { Lexicon } from '$lib/types';

// Import all category files
import greetings from '$content/words/greetings.json';
import basic_words from '$content/words/basic_words.json';
import pronouns from '$content/words/pronouns.json';
import question_words from '$content/words/question_words.json';
import numbers from '$content/words/numbers.json';
import family from '$content/words/family.json';
import body from '$content/words/body.json';
import time from '$content/words/time.json';
import prepositions from '$content/words/prepositions.json';
import verbs from '$content/words/verbs.json';
import descriptions from '$content/words/descriptions.json';
import food from '$content/words/food.json';
import people from '$content/words/people.json';
import places from '$content/words/places.json';
import directions from '$content/words/directions.json';
import transport from '$content/words/transport.json';
import shopping from '$content/words/shopping.json';
import emotions from '$content/words/emotions.json';
import health from '$content/words/health.json';
import nature from '$content/words/nature.json';
import travel from '$content/words/travel.json';
import phrases from '$content/words/phrases.json';

// Import learning sequence (order of word IDs)
import learningSequence from '$content/learning-sequence.json';

/**
 * All words combined from all categories.
 * This creates a Map for O(1) lookup by ID.
 */
const allWordsArray: Lexicon[] = [
	...greetings,
	...basic_words,
	...pronouns,
	...question_words,
	...numbers,
	...family,
	...body,
	...time,
	...prepositions,
	...verbs,
	...descriptions,
	...food,
	...people,
	...places,
	...directions,
	...transport,
	...shopping,
	...emotions,
	...health,
	...nature,
	...travel,
	...phrases
];

/**
 * Map of word ID → word data for fast lookup
 */
export const wordsById = new Map<string, Lexicon>(
	allWordsArray.map((word) => [word.id, word])
);

/**
 * Learning sequence - Array of word IDs in pedagogical order
 */
export const learningOrder: string[] = learningSequence;

/**
 * Map of word ID → learning order index for O(1) lookup
 */
const orderByWordId = new Map<string, number>(
	learningOrder.map((id, index) => [id, index])
);

/**
 * Get learning order index for a word ID
 * Returns -1 if word not found in sequence
 */
export function getLearningOrder(wordId: string): number {
	return orderByWordId.get(wordId) ?? -1;
}

/**
 * Get word by ID
 */
export function getWordById(wordId: string): Lexicon | undefined {
	return wordsById.get(wordId);
}

/**
 * Get word by learning order index (0-based)
 */
export function getWordByOrder(order: number): Lexicon | undefined {
	const wordId = learningOrder[order];
	return wordId ? wordsById.get(wordId) : undefined;
}

/**
 * Get all words as array (useful for existing code compatibility)
 */
export function getAllWords(): Lexicon[] {
	return allWordsArray;
}

/**
 * Get words by category
 */
export function getWordsByCategory(category: string): Lexicon[] {
	return allWordsArray.filter((word) => word.category === category);
}

/**
 * Get total number of words
 */
export function getTotalWords(): number {
	return allWordsArray.length;
}

/**
 * Default export for backwards compatibility
 */
export default allWordsArray;
