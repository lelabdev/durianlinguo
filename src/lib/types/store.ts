export type Store = {
	version: string;
	progress: {
		lastSession: number;
		nextNewWordId: number;
	};
	words?: { [wordId: string]: StoreWord };
};

export type StoreWord = {
	status: 'new' | 'learning' | 'known';
	streak: number;
	mistakes: number;
	nextReview: number;
};
