# Claude Project Documentation - Durianlinguo

## Project Overview

**Durianlinguo** (also known as "Sulti") is a free, open-source language learning web application designed to teach **Bisaya (Cebuano)** to English speakers. The app targets newcomers to Davao, Philippines, helping them learn 300 core words through interactive flashcards and spaced repetition.

**Creator:** Ludo Loops (French developer based in Davao)
**Contact:** contact@lelab.dev
**Status:** In active development
**Repository:** lelabdev/durianlinguo

## Tech Stack

### Core Framework
- **SvelteKit 2.22** - Full-stack Svelte 5 framework with file-based routing
- **Svelte 5** - Using modern runes (`$state`, `$derived`, `$effect`)
- **TypeScript 5** - Full type safety
- **Vite 7** - Build tool and dev server
- **pnpm** - Package manager

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS with `@tailwindcss/vite` plugin
- **DaisyUI 5** - Component library (custom theme: "bisaya-warmth")
- **@fontsource-variable/nunito** - Primary font
- **Lucide Svelte** - Icon library
- **Custom color palette:**
  - Primary Red: `#e63946`
  - Warm Yellow: `#f1c453`
  - Deep Green: `#2e8b57`
  - Soft Cream: `#f4f1de`

### Features & Plugins
- **mdsvex** - MDX support for Svelte (`.svx` files)
- **@inlang/paraglide-js** - Type-safe i18n (en/es locales)
- **@sveltejs/enhanced-img** - Optimized image handling
- **sveltekit-superforms** - Form validation with Zod
- **Zod 4** - Schema validation

### Deployment & Testing
- **@sveltejs/adapter-netlify** - Deployed to Netlify
- **Vitest 3** - Unit testing (client/server split config)
- **Playwright** - E2E testing
- **ESLint 9** - Linting with flat config
- **Prettier 3** - Code formatting

## Project Structure

```
/home/user/durianlinguo/
├── src/
│   ├── routes/                    # SvelteKit routing
│   │   ├── +layout.svelte         # Main layout with Header/Navbar
│   │   ├── +page.svelte           # Landing page
│   │   ├── learn/                 # 🎯 Main learning interface (flashcards)
│   │   ├── review/                # Progress dashboard
│   │   ├── all/                   # Browse all words by category
│   │   ├── test/                  # Test/practice page
│   │   └── demo/                  # Demo pages (i18n, etc.)
│   ├── lib/
│   │   ├── components/            # UI components
│   │   │   ├── FlashCard.svelte   # 🎯 Main flashcard component
│   │   │   ├── Header.svelte      # App header
│   │   │   ├── Navbar.svelte      # Bottom navigation
│   │   │   └── Head.svelte        # SEO/meta tags
│   │   ├── data/
│   │   │   └── lexicon.ts         # 🎯 Vocabulary loader & API
│   │   ├── learning/              # 🎯 Learning logic
│   │   │   ├── getTodayWords.ts   # Word selection algorithm
│   │   │   └── progress.ts        # Progress tracking & mastery
│   │   ├── store/
│   │   │   └── appStore.svelte    # 🎯 Central state (localStorage-based)
│   │   ├── types/
│   │   │   ├── lexicon.ts         # 🎯 Core type definitions
│   │   │   └── store.ts           # Store type definitions
│   │   ├── utils/                 # Utilities and icons
│   │   ├── schema/                # Data schemas
│   │   └── zod/                   # Zod validation schemas
│   ├── content/
│   │   ├── words/                 # 🎯 Vocabulary by category (22 files)
│   │   │   ├── _index.json        # Metadata
│   │   │   ├── greetings.json     # 7 words
│   │   │   ├── basic_words.json   # 13 words
│   │   │   ├── verbs.json         # 63 words
│   │   │   └── ... (19 more)      # Other categories
│   │   ├── learning-sequence.json # 🎯 Learning order (300 word IDs)
│   │   └── Why.svx                # Project manifesto (MDX)
│   ├── app.css                    # Global styles + custom theme
│   ├── app.html                   # HTML template
│   └── hooks.server.ts            # i18n middleware
├── static/                        # Static assets (favicons, etc.)
├── messages/                      # i18n files (en.json, es.json)
├── project.inlang/                # Inlang i18n config
├── ARCHITECTURE.md                # 🎯 Detailed architecture documentation
└── Configuration files

🎯 = Critical files for understanding core functionality
```

## Path Aliases (from svelte.config.js)

```javascript
$assets: './src/assets'
$ui: './src/lib/UI'
$components: './src/lib/components'
$content: './src/content'
$utils: './src/lib/utils'
$zod: './src/lib/zod'
```

## Key Concepts

### 1. Learning Algorithm (Spaced Repetition)

**File:** `src/lib/learning/getTodayWords.ts`

- Selects 10 words per day (5 due + 5 new, or fill with available)
- Tracks word states: `new` → `learning` → `known`
- Uses spaced repetition intervals: 1, 1, 3, 7, 16, 30 days
- Mastery calculation (0-100): `(streak / (streak + mistakes)) * 100`
- Fisher-Yates shuffle for randomization

**Algorithm logic:**
1. Filter due words (nextReviewDate <= today)
2. Sort by nextReviewDate (oldest first)
3. Take up to 5 due words
4. Fill remaining slots with new words (never seen)
5. Shuffle for random presentation

### 2. Data Architecture (Separated Concerns)

**NEW ARCHITECTURE** - Vocabulary and learning order are now separated like SQL tables:

#### Vocabulary Files (`src/content/words/`)
- 22 category-based JSON files (greetings, verbs, food, etc.)
- Each word has a unique **word-based ID** (e.g., `"kumusta"`, `"salamat"`)
- IDs are **stable** and never change, even if learning order changes

#### Learning Sequence (`src/content/learning-sequence.json`)
- Array of 300 word IDs in pedagogical order
- Defines WHAT order to learn words
- Can be modified without affecting user data

#### Vocabulary Loader (`src/lib/data/lexicon.ts`)
- Centralized API for accessing vocabulary
- Uses `Map` for O(1) lookup: `getWordById("kumusta")`
- Functions:
  - `getAllWords()` - Get all 300 words
  - `getWordById(id)` - Fast lookup by ID
  - `getWordByOrder(position)` - Get word at learning position
  - `getLearningOrder(id)` - Find position of a word
  - `getWordsByCategory(cat)` - Filter by category

**Example Word Structure:**
```json
{
  "id": "kumusta",           // Word-based ID (stable, never changes)
  "word": "kumusta",
  "translation": { "en": "hello / how are you" },
  "pronunciation": "koo-MOOS-tah",
  "difficulty": 1,           // 1-4 scale
  "category": "greetings",
  "part_of_speech": "interjection",
  "tags": ["basic", "essential", "survival"]
}
```

**22 Categories:**
greetings (7), basic_words (13), pronouns (7), question_words (8), numbers (11), family (4), body (11), time (8), prepositions (12), verbs (63), descriptions (21), food (24), people (6), places (15), directions (20), transport (6), shopping (10), emotions (18), health (4), nature (15), travel (15), phrases (2)

### 3. State Management

**File:** `src/lib/store/appStore.svelte`

- Uses Svelte 5 runes for reactivity
- Persists to `localStorage` (key: `app-store`)
- Store structure:
  ```typescript
  {
    version: "1.0.0",
    progress: {
      lastSession: number,
      nextLearningOrder: number  // Position in learning sequence (0-300)
    },
    words: [
      {
        id: string,           // Word ID (e.g., "kumusta")
        word: string,
        status: 'new' | 'learning' | 'known',
        streak: number,       // Consecutive correct answers
        mistakes: number,     // Total wrong answers
        seen: number,         // Times reviewed
        mastery: number,      // 0-100 score
        nextReview: number    // Timestamp
      }
    ]
  }
  ```
- Methods: `add(wordId)`, `update(wordId, data)`, `getStoreWord(id)`, `getLexiconWord(id)`

**Key Benefit:** User stores word IDs (`"kumusta"`), not positions. Changing `learning-sequence.json` doesn't break user progress!

### 4. Flashcard Component

**File:** `src/lib/components/FlashCard.svelte`

- Shows Bisaya word + pronunciation
- 4 multiple-choice options (1 correct + 3 random from same category)
- Immediate feedback (green for correct, red for wrong)
- Card flip animation on answer
- Progress tracked in appStore

### 5. Internationalization (i18n)

- Using `@inlang/paraglide-js` for type-safe translations
- Configured locales: `en` (default), `es`
- Message files: `messages/en.json`, `messages/es.json`
- Middleware in `src/hooks.server.ts` handles locale routing
- Demo page: `/demo/paraglide-js`

## Development Commands

```bash
# Development server (with network access)
pnpm dev

# Type checking
pnpm check

# Build for production
pnpm build

# Preview production build
pnpm preview

# Code quality
pnpm format        # Format with Prettier
pnpm lint          # Check formatting + ESLint

# Testing
pnpm test:unit     # Run Vitest tests
pnpm test          # Run tests once (CI mode)
```

## Design System

### Custom DaisyUI Theme: "bisaya-warmth"

Defined in `src/app.css`:
- Primary: Red (#e63946)
- Secondary: Yellow (#f1c453)
- Accent: Green (#2e8b57)
- Neutral: Gray tones
- Base: Cream (#f4f1de)

### Typography
- Font: Nunito Variable (loaded from @fontsource-variable)
- Headers: Bold, larger sizes
- Body: Regular weight

### Layout Patterns
- Mobile-first responsive design
- Bottom navigation bar (Navbar.svelte)
- Card-based UI with shadows and rounded corners
- Background pattern with durian-themed decorations

## Important Notes for AI Assistance

### When Working on Features:

1. **State Management:** Always use `appStore.svelte` for progress tracking
2. **Word Selection:** Use `getTodayWords()` - don't reinvent the algorithm
3. **Types:** Import from `$lib/types/lexicon` for type safety
4. **Styling:** Use Tailwind classes + DaisyUI components
5. **i18n:** Use Paraglide functions for translatable text

### Common Tasks:

**Adding a new word:**
1. Choose appropriate category
2. Add word to `src/content/words/[category].json`
3. Use word-based ID format: lowercase, hyphens for spaces (e.g., `"kumusta"`, `"ako-si"`)
4. Insert word ID into `src/content/learning-sequence.json` at desired position
5. Include all required fields (id, word, translation, pronunciation, difficulty, category, part_of_speech, tags)

**Changing learning order:**
- Simply reorder IDs in `src/content/learning-sequence.json`
- NO impact on existing user data (users store word IDs, not positions)
- NO migration needed

**Modifying learning algorithm:**
- See `src/lib/learning/getTodayWords.ts`
- Use `getLearningOrder(wordId)` to get word position
- Test changes don't break spaced repetition
- Consider mastery calculation impact

**Adding a new route:**
- Create `+page.svelte` in `src/routes/[path]/`
- Add navigation in `Navbar.svelte` if needed
- Use consistent layout patterns

**Styling changes:**
- Check `src/app.css` for theme variables
- Use DaisyUI component classes when possible
- Follow Tailwind utility-first approach

**Accessing vocabulary in code:**
```typescript
import { getAllWords, getWordById, getLearningOrder } from '$lib/data/lexicon';

// Get all words
const allWords = getAllWords();

// Get specific word
const word = getWordById("kumusta");

// Get learning position
const position = getLearningOrder("kumusta"); // Returns 0 (first word)
```

### Testing Strategy:

- Unit tests for learning algorithm logic
- Component tests for interactive elements
- E2E tests for critical user flows (learning, progress tracking)

### Deployment:

- Uses Netlify adapter
- Auto-deploys on push (configured in Netlify dashboard)
- Build command: `pnpm build`
- Output: `.netlify/` directory

## Philosophy & Goals

From `src/content/Why.svx`:

> "It's not about becoming fluent. It's about learning **300 core words** — enough to connect, to show respect, and to feel a little more at home."

**Target Audience:**
- Newcomers to Davao, Philippines
- Language learners interested in Bisaya/Cebuano
- People who want to show respect for local culture

**Future Plans:**
- Open source release (once v1 is stable)
- Reverse learning direction (Bisaya → English)
- Community contributions (native speakers, teachers, designers)
- Audio recordings of native pronunciation

## Git Workflow

**Main branch:** (to be determined - check with repository)
**Current branch:** `claude/analyze-project-docs-017dMMQHUyyHvjmssNHDVZK5`

**Commit conventions:**
- Clear, descriptive messages
- Reference feature/fix in message
- Use `auto-commit` for automated commits with timestamps

## Resources

- **Email:** contact@lelab.dev
- **Framework Docs:** https://svelte.dev/docs/kit
- **Bisaya Resources:** Community-sourced, local dictionaries
- **Design:** Filipino-inspired warm color palette

## Architecture Highlights

**See `ARCHITECTURE.md` for detailed documentation.**

### Separation of Concerns (SQL-like Design)

```
┌─────────────────────────────────────────────────────┐
│  VOCABULARY (words/*.json)                          │
│  - What are the words?                              │
│  - Definitions, translations, metadata              │
│  - 22 category files                                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  LEARNING ORDER (learning-sequence.json)            │
│  - In what order to learn?                          │
│  - Array of 300 word IDs                            │
│  - Can be changed without affecting users           │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  USER PROGRESS (localStorage)                       │
│  - Who learned what?                                │
│  - Stores word IDs (stable references)              │
│  - Independent of learning order changes            │
└─────────────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Modify learning order without breaking user data
- ✅ Small, maintainable category files
- ✅ O(1) word lookup with Map
- ✅ Future: Multiple learning paths (beginner, intermediate, thematic)

---

**Last Updated:** 2025-11-16
**Project Version:** 0.0.1
**Status:** Active Development
