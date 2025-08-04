<script module lang="ts">
	import { LocalStorage } from './localStorage.svelte';
	import type { Store, StoreWord } from '$lib/types';
	import type { Word } from '$lib/types';

	import rawDictionary from '$content/bisaya.json' assert { type: 'json' };

	const dictionary: Word[] = rawDictionary;

	function createAppStore() {
		const store = new LocalStorage<Store>('app-store', {
			version: '1.0.0',
			progress: {
				lastSession: Date.now(),
				nextNewWordId: 10
			},
			words: {}
		});

		function add(wordId: string | number) {
			const word = getWord(wordId)?.word;
			if (word == null) return;

			const newWord = {
				word,
				status: 'new' as const,
				streak: 0,
				mistakes: 0,
				nextReview: Date.now() + 86400000
			};

			console.log('newWord', newWord);

			store.value = {
				...store.value,
				words: {
					...store.value.words,
					[wordId]: newWord
				},
				progress: {
					...store.value.progress,
					lastSession: Date.now()
				}
			};
		}

		function update(wordId: string | number, updates: Partial<StoreWord>) {
			if (!store.value.words?.[wordId]) {
				add(wordId);
				return;
			}

			store.value = {
				...store.value,
				words: {
					...store.value.words,
					[wordId]: {
						...store.value.words[wordId],
						...updates
					}
				},
				progress: {
					...store.value.progress,
					lastSession: Date.now()
				}
			};
		}

		function getWord(wordId: string | number) {
			return dictionary && dictionary[+wordId] ? dictionary[+wordId] : null;
		}

		function getDueWords() {
			const words = store.value.words || {};

			return Object.entries(words)
				.filter(([_, data]) => data.status !== 'known')
				.map(([id, data]) => ({ id, ...data }));
		}

		return {
			add,
			update,
			getWord,
			getDueWords,
			get words() {
				return store.value.words;
			},
			get progress() {
				return store.value.progress;
			}
		};
	}

	export const appStore = createAppStore();
</script>
