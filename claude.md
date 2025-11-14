# Claude Project Documentation - Durianlinguo

## Project Overview

**Durianlinguo** (also known as "Sulti") is a free, open-source language learning web application designed to teach **Bisaya (Cebuano)** to English speakers. The app targets newcomers to Davao, Philippines, helping them learn 300 core words through interactive flashcards and spaced repetition.

**Creator:** Ludo Loops (French developer based in Davao)
**Contact:** contact@lelab.dev
**Status:** In active development
**Repository:** gyud.dev

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
/home/user/gyud.dev/
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
│   │   ├── learning/              # 🎯 Learning logic
│   │   │   ├── getTodayWords.ts   # Word selection algorithm
│   │   │   └── progress.ts        # Progress tracking & mastery
│   │   ├── store/
│   │   │   └── appStore.svelte    # 🎯 Central state (localStorage-based)
│   │   ├── types/
│   │   │   └── lexicon.ts         # 🎯 Core type definitions
│   │   ├── utils/                 # Utilities and icons
│   │   ├── schema/                # Data schemas
│   │   └── zod/                   # Zod validation schemas
│   ├── content/
│   │   ├── bisaya.json            # 🎯 300 Bisaya words database
│   │   └── Why.svx                # Project manifesto (MDX)
│   ├── app.css                    # Global styles + custom theme
│   ├── app.html                   # HTML template
│   └── hooks.server.ts            # i18n middleware
├── static/                        # Static assets (favicons, etc.)
├── messages/                      # i18n files (en.json, es.json)
├── project.inlang/                # Inlang i18n config
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

### 2. State Management

**File:** `src/lib/store/appStore.svelte`

- Uses Svelte 5 runes for reactivity
- Persists to `localStorage` (key: `bisaya_progress`)
- Tracks per-word progress:
  ```typescript
  {
    wordId: string,
    streak: number,        // Consecutive correct answers
    mistakes: number,      // Total wrong answers
    mastery: number,       // 0-100 score
    nextReviewDate: string,
    state: 'new' | 'learning' | 'known'
  }
  ```
- Methods: `recordCorrect()`, `recordMistake()`, `getProgress()`

### 3. Word Data Model

**File:** `src/content/bisaya.json`

Each of 300 words contains:
```json
{
  "id": "unique-uuid",
  "bisaya": "Kumusta",
  "translation": "How are you?",
  "pronunciation": "koo-MOOS-tah",
  "difficulty": 1,          // 1-5 scale
  "category": "greetings",
  "partOfSpeech": "phrase",
  "tags": ["basic", "essential"],
  "example": "Kumusta ka?"  // Optional
}
```

**Categories:**
- greetings, basic_words, numbers, food, family, time, directions, questions, verbs, adjectives

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
- Edit `src/content/bisaya.json`
- Generate UUID for `id` field
- Include all required fields
- Choose appropriate category and difficulty

**Modifying learning algorithm:**
- See `src/lib/learning/getTodayWords.ts`
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

---

**Last Updated:** 2025-11-14
**Project Version:** 0.0.1
**Status:** Active Development
