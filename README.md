# 🍈 Durianlinguo - Learn Bisaya

> **Learn the 300 core words of Bisaya (Cebuano) - the language of Davao, Philippines**

A free, open-source language learning app built with SvelteKit, featuring interactive flashcards and spaced repetition to help you connect with the local culture.

---

## 🎯 What is This?

**Durianlinguo** is a language learning app designed specifically for teaching **Bisaya (Cebuano)** to English speakers. Created by a French developer living in Davao, this app was born from the frustration of finding almost no learning materials for Bisaya.

### Why Bisaya?

If you're moving to Davao or visiting Mindanao, Bisaya is the language you'll hear every day. This app teaches you **300 core words** - not to make you fluent, but to help you:

- Order *taho* at the market
- Ask for directions
- Say "thank you" the right way
- Show respect for the local culture
- Feel a little more at home

As we say in Davao: **"Durian gyud!"** (For real!)

---

## ✨ Features

- **Interactive Flashcards** - Learn through multiple-choice quizzes
- **Spaced Repetition System** - Smart algorithm that shows you words when you need to review them
- **300 Curated Words** - Carefully selected core vocabulary organized by category
- **Pronunciation Guides** - Phonetic guides for every word
- **Progress Tracking** - Track your learning journey with mastery scores and streaks
- **Categories** - Greetings, food, family, numbers, directions, and more
- **Offline-First** - All progress saved locally in your browser

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gyud.dev

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Development Commands

```bash
# Development server (with network access)
pnpm dev

# Type checking
pnpm check

# Build for production
pnpm build

# Preview production build
pnpm preview

# Code formatting
pnpm format

# Linting
pnpm lint

# Run tests
pnpm test
```

---

## 🏗️ Tech Stack

- **Framework:** SvelteKit 2.22 (Svelte 5 with runes)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Build Tool:** Vite 7
- **Testing:** Vitest 3 + Playwright
- **Deployment:** Netlify
- **Internationalization:** @inlang/paraglide-js (en/es)

---

## 📁 Project Structure

```
src/
├── routes/              # SvelteKit file-based routing
│   ├── learn/          # Main learning interface
│   ├── review/         # Progress dashboard
│   ├── all/            # Browse all words
│   └── test/           # Practice tests
├── lib/
│   ├── components/     # Reusable UI components
│   ├── learning/       # Learning algorithm & progress tracking
│   ├── store/          # State management (localStorage)
│   └── types/          # TypeScript definitions
└── content/
    └── bisaya.json     # 300 word database
```

---

## 🎓 How It Works

### Learning Algorithm

The app uses a **spaced repetition system** to optimize your learning:

1. **10 words per day** - A manageable daily goal
2. **Smart scheduling** - Words reappear based on your performance
3. **Mastery levels** - Track your progress from "new" to "known"
4. **Adaptive intervals** - Review words at increasing intervals: 1, 1, 3, 7, 16, 30 days

### Word Data

Each word includes:
- **Bisaya word** - The original word in Cebuano
- **English translation** - Clear, simple translation
- **Pronunciation** - Phonetic guide (e.g., "koo-MOOS-tah")
- **Difficulty** - Rated 1-5
- **Category** - Greetings, food, family, etc.
- **Examples** - Usage in context

---

## 🎨 Design

The app features a custom DaisyUI theme called **"bisaya-warmth"** with Filipino-inspired warm colors:

- **Primary Red** (`#e63946`) - Warm and welcoming
- **Warm Yellow** (`#f1c453`) - Sunny and bright
- **Deep Green** (`#2e8b57`) - Natural and grounded
- **Soft Cream** (`#f4f1de`) - Comfortable background

Font: **Nunito Variable** - Clean, friendly, and readable

---

## 🤝 Contributing

This project is in active development and will be open-sourced once the first version is stable. We're looking for:

- **🎨 Designers** - Help refine the UI/UX
- **🗣️ Native Bisaya speakers** - Record pronunciations, verify translations
- **💬 Language teachers** - Help structure learning content
- **👨‍💻 Developers** - Add features, fix bugs, improve code

### Want to Help?

Email: **contact@lelab.dev**

---

## 📝 Roadmap

- [ ] Complete 300 word database with audio
- [ ] Add audio pronunciations by native speakers
- [ ] Implement daily streak system
- [ ] Add achievement badges
- [ ] Create lesson modules (beyond flashcards)
- [ ] Reverse learning direction (Bisaya → English)
- [ ] Mobile app (React Native or native)
- [ ] Community features (share progress, compete)

---

## 📄 License

This project will be open-sourced under the MIT License once v1.0 is released.

---

## 👨‍💻 Author

**Ludo Loops** - French developer based in Davao, Philippines

Built with love for the people of Mindanao and anyone who wants to learn their beautiful language.

---

## 🙏 Acknowledgments

- The people of Davao for their patience with my terrible Bisaya
- The local community for providing learning resources
- Everyone who believes language learning should be free and accessible

---

## 💬 Philosophy

> "It's not about fluency, but connection and respect."

Learning just 300 words won't make you fluent, but it will help you:
- Show respect for the local culture
- Make meaningful connections
- Navigate daily life more comfortably
- Feel more at home in Davao

Because if you live somewhere, if you love a place, you should be able to speak its language - not just survive in it.

---

**Durian gyud!** 🍈

---

## 📚 Resources

- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Bisaya/Cebuano Language Resources](https://en.wikipedia.org/wiki/Cebuano_language)
- [Davao City](https://en.wikipedia.org/wiki/Davao_City)

---

**Built with SvelteKit** | **Powered by Durian** 🍈 | **Made in Davao** 🇵🇭
