<script module lang="ts">
	import { LocalStorage } from './localStorage.svelte';
	import type { Store, StoreWord } from '$lib/types';
	import type { Lexicon } from '$lib/types';

	import { wordsById, getLearningOrder } from '$lib/data/lexicon';

	function createAppStore() {
		const store = new LocalStorage<Store>('app-store', {
			version: '1.0.0',
			progress: {
				lastSession: Date.now(),
				nextLearningOrder: 10
			},
			words: []
		});

		// ———————————————————————
		// ✅ Private function
		// ———————————————————————

		function getRawWords(): StoreWord[] {
			return Array.isArray(store.value.words) ? store.value.words : [];
		}

		function getLexiconWord(wordId: string): Lexicon | undefined {
			return wordsById.get(wordId);
		}

		// ———————————————————————
		// ✅ State change
		// ———————————————————————

		function add(wordId: string) {
			const lexiconWord = getLexiconWord(wordId);
			if (!lexiconWord) return;

			const newWord: StoreWord = {
				id: wordId,
				word: lexiconWord.word,
				status: 'new',
				streak: 0,
				mistakes: 0,
				seen: 0,
				mastery: 0,
				nextReview: Date.now() + 86_400_000 // 24h
			};

			const currentLearningOrder = getLearningOrder(wordId);
			const newNextOrder = currentLearningOrder >= 0 ? currentLearningOrder + 1 : store.value.progress.nextLearningOrder;

			store.value = {
				...store.value,
				words: [...getRawWords(), newWord],
				progress: {
					...store.value.progress,
					lastSession: Date.now(),
					nextLearningOrder: Math.max(store.value.progress.nextLearningOrder, newNextOrder)
				}
			};
		}

		function update(wordId: string, updates: Partial<StoreWord>) {
			const words = getRawWords();

			if (!words.find((w) => w.id === wordId)) {
				add(wordId);
				return;
			}

			store.value = {
				...store.value,
				words: words.map((word) => (word.id === wordId ? { ...word, ...updates } : word)),
				progress: {
					...store.value.progress,
					lastSession: Date.now()
				}
			};
		}

		// ———————————————————————
		// ✅ public
		// ———————————————————————

		return {
			// Actions
			add,
			update,

			get storeWords(): StoreWord[] {
				return getRawWords();
			},

			get dueWords(): StoreWord[] {
				return this.storeWords.filter((word) => word.status !== 'known');
			},

			get progress() {
				return store.value.progress;
			},

			getLexiconWord,
			getStoreWord(wordId: string): StoreWord | undefined {
				return this.storeWords.find((w) => w.id === wordId);
			}
		};
	}

	export const appStore = createAppStore();
</script>
