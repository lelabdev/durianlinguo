export type Store = {
	version: string;
	progress: {
		lastSession: number;
		nextLearningOrder: number; // Renamed from nextNewWordId - tracks learning progression (1-300)
	};
	words: StoreWord[];
};

export type StoreWord = {
	id: string; // Changed from number to string (e.g., "kumusta" instead of 1)
	word: string;
	status: 'new' | 'learning' | 'known';
	streak: number;
	mistakes: number;
	seen: number;
	mastery: number;
	nextReview: number;
};
