export type Store = {
	version: string;
	progress: {
		lastSession: number;
		nextNewWordId: number;
	};
	words: StoreWord[];
};

export type StoreWord = {
	id: number;
	word: string;
	status: 'new' | 'learning' | 'known';
	streak: number;
	mistakes: number;
	seen: number;
	mastery: number;
	nextReview: number;
};
