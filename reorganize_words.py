#!/usr/bin/env python3
"""
Script to reorganize Bisaya words with new ID system and learning order.

New ID system: word-based (e.g., "kumusta" instead of 1)
New learning order: pedagogical progression from basic to advanced
"""

import json
import re
from typing import List, Dict

def word_to_id(word: str) -> str:
    """
    Convert word to ID format.
    - Replace spaces with hyphens
    - Keep only alphanumeric, hyphens, and underscores
    - Convert to lowercase
    """
    # Replace spaces with hyphens
    id_str = word.replace(" ", "-")
    # Remove special characters except hyphens and underscores
    id_str = re.sub(r'[^a-zA-Z0-9\-_]', '', id_str)
    # Convert to lowercase
    id_str = id_str.lower()
    return id_str

def get_learning_priority(word: Dict) -> tuple:
    """
    Return a tuple for sorting words in pedagogical order.
    Lower values = learned earlier.

    Priority system:
    1. Category priority (pedagogical order)
    2. Difficulty (easier first)
    3. Essential tags (survival/essential words first)
    4. Alphabetical (for consistency)
    """

    # Category priority mapping (lower = earlier in learning)
    category_priority = {
        "greetings": 1,
        "basic_words": 2,
        "pronouns": 3,
        "question_words": 4,
        "numbers": 5,
        "family": 6,
        "body": 7,
        "time": 8,
        "prepositions": 9,
        "verbs": 10,  # Will be sub-sorted by difficulty
        "descriptions": 11,
        "food": 12,
        "people": 13,
        "places": 14,
        "directions": 15,
        "transport": 16,
        "shopping": 17,
        "emotions": 18,
        "health": 19,
        "nature": 20,
        "travel": 21,
        "phrases": 22,
    }

    category = word.get("category", "")
    cat_priority = category_priority.get(category, 99)

    # Difficulty (1-4, lower is easier)
    difficulty = word.get("difficulty", 3)

    # Essential/survival tags boost (move earlier)
    tags = word.get("tags", [])
    is_essential = 0 if ("essential" in tags or "survival" in tags or "basic" in tags) else 1

    # Alphabetical for tie-breaking
    word_text = word.get("word", "")

    return (cat_priority, is_essential, difficulty, word_text)

def reorganize_words(input_file: str, output_file: str):
    """
    Load, reorganize, and save words with new ID system and order.
    """
    print(f"📖 Loading words from {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        words = json.load(f)

    print(f"✓ Loaded {len(words)} words")

    # Check for duplicate word-based IDs
    print("\n🔍 Generating new IDs...")
    new_ids = {}
    duplicates = []

    for word_obj in words:
        word_text = word_obj["word"]
        new_id = word_to_id(word_text)

        if new_id in new_ids:
            duplicates.append((word_text, new_id, new_ids[new_id]))
        else:
            new_ids[new_id] = word_text

    if duplicates:
        print("\n⚠️  Warning: Duplicate IDs found!")
        for word1, new_id, word2 in duplicates:
            print(f"  - '{word1}' and '{word2}' both map to ID '{new_id}'")
        print("\n  These will be made unique by appending numbers (e.g., 'word-2')")

    # Sort words by pedagogical priority
    print("\n📚 Sorting words in pedagogical order...")
    sorted_words = sorted(words, key=get_learning_priority)

    # Assign new IDs with duplicate handling
    used_ids = set()
    for i, word_obj in enumerate(sorted_words, 1):
        word_text = word_obj["word"]
        base_id = word_to_id(word_text)

        # Handle duplicates by appending numbers
        new_id = base_id
        counter = 2
        while new_id in used_ids:
            new_id = f"{base_id}-{counter}"
            counter += 1

        used_ids.add(new_id)
        word_obj["id"] = new_id
        word_obj["learningOrder"] = i  # Add explicit learning order field

    # Save reorganized words
    print(f"\n💾 Saving reorganized words to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(sorted_words, f, ensure_ascii=False, indent=2)

    print(f"✓ Saved {len(sorted_words)} words")

    # Print summary
    print("\n" + "="*60)
    print("📊 REORGANIZATION SUMMARY")
    print("="*60)

    print("\n🆔 ID System:")
    print(f"  Old: Numeric (1, 2, 3, ...)")
    print(f"  New: Word-based (kumusta, salamat, oo, ...)")

    print("\n📖 Learning Order (first 20 words):")
    for i, word in enumerate(sorted_words[:20], 1):
        category = word.get("category", "")
        difficulty = word.get("difficulty", "")
        word_text = word.get("word", "")
        new_id = word.get("id", "")
        tags = ", ".join(word.get("tags", [])[:2])

        print(f"  {i:3d}. [{new_id:20s}] {word_text:20s} (diff:{difficulty}, cat:{category})")

    print("\n📊 Category Distribution (in new order):")
    category_counts = {}
    for word in sorted_words:
        cat = word.get("category", "unknown")
        category_counts[cat] = category_counts.get(cat, 0) + 1

    # Show order of categories
    seen_categories = []
    for word in sorted_words:
        cat = word.get("category", "unknown")
        if cat not in seen_categories:
            seen_categories.append(cat)

    for i, cat in enumerate(seen_categories, 1):
        count = category_counts[cat]
        print(f"  {i:2d}. {cat:20s} ({count} words)")

    print("\n✅ Reorganization complete!")
    print(f"\n📄 New file: {output_file}")
    print("\n⚠️  Next steps:")
    print("  1. Review the new order in bisaya_reorganized.json")
    print("  2. Update code to use new ID system (string instead of number)")
    print("  3. Update appStore to handle ID migration for existing users")
    print("  4. Backup old bisaya.json before replacing")

if __name__ == "__main__":
    input_file = "/home/user/durianlinguo/src/content/bisaya.json"
    output_file = "/home/user/durianlinguo/src/content/bisaya_reorganized.json"

    reorganize_words(input_file, output_file)
