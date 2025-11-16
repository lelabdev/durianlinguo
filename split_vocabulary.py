#!/usr/bin/env python3
"""
Script to split bisaya.json into multiple files by category.
Also creates a clean learning sequence file.
"""

import json
import os
from pathlib import Path

def split_vocabulary():
    """Split vocabulary into separate files by category."""

    input_file = "/home/user/durianlinguo/src/content/bisaya.json"
    output_dir = "/home/user/durianlinguo/src/content/words"

    print(f"📖 Loading words from {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        words = json.load(f)

    print(f"✓ Loaded {len(words)} words")

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Group words by category
    words_by_category = {}
    learning_sequence = []

    for word in words:
        category = word.get('category', 'uncategorized')

        # Remove learningOrder from word data (will be in separate file)
        word_clean = {k: v for k, v in word.items() if k != 'learningOrder'}

        if category not in words_by_category:
            words_by_category[category] = []

        words_by_category[category].append(word_clean)
        learning_sequence.append(word['id'])

    # Save each category to a separate file
    print(f"\n💾 Saving {len(words_by_category)} categories...")

    for category, category_words in words_by_category.items():
        output_file = os.path.join(output_dir, f"{category}.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(category_words, f, ensure_ascii=False, indent=2)
        print(f"  ✓ {category:20s} ({len(category_words):3d} words) → {category}.json")

    # Save learning sequence
    sequence_file = "/home/user/durianlinguo/src/content/learning-sequence.json"
    print(f"\n📝 Saving learning sequence to {sequence_file}...")
    with open(sequence_file, 'w', encoding='utf-8') as f:
        json.dump(learning_sequence, f, ensure_ascii=False, indent=2)
    print(f"✓ Saved {len(learning_sequence)} word IDs in learning order")

    # Create index file with metadata
    index = {
        "total_words": len(words),
        "categories": sorted(list(words_by_category.keys())),
        "category_counts": {cat: len(words_by_category[cat]) for cat in sorted(words_by_category.keys())}
    }

    index_file = os.path.join(output_dir, "_index.json")
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=2)

    print(f"\n📊 Summary:")
    print(f"  Total words: {index['total_words']}")
    print(f"  Categories: {len(index['categories'])}")
    print(f"  Output directory: {output_dir}")

    print("\n✅ Split complete!")
    print(f"\n📁 Structure:")
    print(f"  src/content/words/")
    print(f"    ├── _index.json (metadata)")
    print(f"    ├── greetings.json")
    print(f"    ├── basic_words.json")
    print(f"    ├── ...")
    print(f"  src/content/learning-sequence.json (learning order)")

if __name__ == "__main__":
    split_vocabulary()
