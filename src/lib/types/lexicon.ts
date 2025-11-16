export type Lexicon = {
	id: string; // Changed from number to string (e.g., "kumusta" instead of 1)
	learningOrder: number; // Explicit learning order (1-300)
	word: string;
	translation: {
		en: string;
	};
	difficulty: number;
	category: string;
	part_of_speech: string;
	tags: string[];
	pronunciation: string;
};
