export type Word = {
  id: number,
  word: string,
  translation: {
    en: string,
  },
  difficulty: number,
  category: string
  part_of_speech: string
  tags: string[],
  pronunciation: string
}
