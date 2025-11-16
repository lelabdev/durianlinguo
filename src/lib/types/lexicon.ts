export type Lexicon = {
	id: string; // Word-based ID (e.g., "kumusta", "salamat")
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
