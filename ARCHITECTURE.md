# 🏗️ Architecture du Vocabulaire - Durianlinguo

## 📁 Structure des Fichiers

### Ancienne Architecture (❌ Obsolète)
```
src/content/
  └── bisaya.json  (4240 lignes, 300 mots avec learningOrder)
```

### Nouvelle Architecture (✅ Actuelle)
```
src/content/
  ├── learning-sequence.json         (Séquence d'apprentissage - 300 IDs)
  └── words/                         (Vocabulaire séparé par catégorie)
      ├── _index.json               (Métadonnées : total, catégories, etc.)
      ├── greetings.json            (7 mots)
      ├── basic_words.json          (13 mots)
      ├── pronouns.json             (7 mots)
      ├── question_words.json       (8 mots)
      ├── numbers.json              (11 mots)
      ├── family.json               (4 mots)
      ├── body.json                 (11 mots)
      ├── time.json                 (8 mots)
      ├── prepositions.json         (12 mots)
      ├── verbs.json                (63 mots)
      ├── descriptions.json         (21 mots)
      ├── food.json                 (24 mots)
      ├── people.json               (6 mots)
      ├── places.json               (15 mots)
      ├── directions.json           (20 mots)
      ├── transport.json            (6 mots)
      ├── shopping.json             (10 mots)
      ├── emotions.json             (18 mots)
      ├── health.json               (4 mots)
      ├── nature.json               (15 mots)
      ├── travel.json               (15 mots)
      └── phrases.json              (2 mots)
```

## 🎯 Principes de Conception

### 1. Séparation des Responsabilités (SoC)

**Vocabulaire** et **Ordre d'Apprentissage** sont maintenant séparés, comme des tables SQL :

```sql
-- Table "words" (vocabulaire)
CREATE TABLE words (
    id VARCHAR PRIMARY KEY,  -- "kumusta", "salamat"
    word VARCHAR,
    translation JSON,
    difficulty INT,
    category VARCHAR,
    ...
);

-- Table "learning_sequence" (ordre)
CREATE TABLE learning_sequence (
    position INT PRIMARY KEY,  -- 1, 2, 3, ...
    word_id VARCHAR REFERENCES words(id)
);
```

### 2. Avantages de cette Architecture

#### ✅ **Flexibilité**
- Changer l'ordre d'apprentissage n'affecte PAS les données utilisateur
- L'utilisateur stocke uniquement les IDs de mots (ex: `"kumusta"`)
- Modifier `learning-sequence.json` ne casse pas les progressions existantes

#### ✅ **Maintenabilité**
- Fichiers plus petits et organisés par catégorie
- Facile d'ajouter/modifier des mots dans une catégorie spécifique
- Pas de gros fichier de 4000+ lignes

#### ✅ **Performance**
- Map lookup O(1) : `wordsById.get("kumusta")`
- Pas besoin de parcourir 300 mots pour trouver un mot
- Import sélectif possible (charger seulement certaines catégories)

#### ✅ **Évolutivité**
- Ajouter de nouvelles catégories facilement
- Supporter plusieurs ordres d'apprentissage (débutant, intermédiaire, etc.)
- Créer des parcours thématiques (voyage, business, etc.)

## 📦 Loader Central : `src/lib/data/lexicon.ts`

### API Publique

```typescript
// Récupérer tous les mots
const allWords = getAllWords();  // Lexicon[]

// Récupérer un mot par ID
const word = getWordById("kumusta");  // Lexicon | undefined

// Récupérer un mot par position dans l'ordre d'apprentissage
const firstWord = getWordByOrder(0);  // Lexicon | undefined

// Récupérer l'ordre d'apprentissage d'un mot
const order = getLearningOrder("kumusta");  // 0 (premier mot)

// Récupérer les mots par catégorie
const greetings = getWordsByCategory("greetings");  // Lexicon[]

// Nombre total de mots
const total = getTotalWords();  // 300
```

### Structure Interne

```typescript
// Map pour lookup rapide O(1)
const wordsById = new Map<string, Lexicon>();

// Séquence d'apprentissage (array d'IDs)
const learningOrder: string[] = [
  "kumusta",      // position 0
  "palihug",      // position 1
  "salamat",      // position 2
  // ...
];
```

## 💾 Données Utilisateur (localStorage)

### Structure du Store

```typescript
{
  "version": "1.0.0",
  "progress": {
    "lastSession": 1234567890,
    "nextLearningOrder": 10  // Prochain mot à apprendre (position dans learning-sequence)
  },
  "words": [
    {
      "id": "kumusta",        // ✅ ID stable, ne change jamais
      "word": "kumusta",
      "status": "learning",
      "streak": 3,
      "mistakes": 1,
      "seen": 5,
      "mastery": 60,
      "nextReview": 1234567890
    }
  ]
}
```

### Pourquoi cette structure ?

1. **ID stable** : L'utilisateur stocke `"kumusta"`, pas un numéro de position
2. **Indépendant de l'ordre** : Si on change `learning-sequence.json`, les données utilisateur restent intactes
3. **Traçabilité** : On sait exactement quel mot l'utilisateur a appris, peu importe quand

## 🔄 Flux de Données

### 1. Chargement de l'Application

```
1. Import des fichiers JSON par catégorie
   ├── greetings.json → 7 mots
   ├── basic_words.json → 13 mots
   └── ... → 280 mots

2. Création de la Map wordsById
   Map { "kumusta" => {...}, "salamat" => {...}, ... }

3. Import de learning-sequence.json
   ["kumusta", "palihug", "salamat", ...]

4. Chargement du localStorage
   progress.nextLearningOrder = 10
```

### 2. Sélection des Mots du Jour

```typescript
function getTodayWords(limit: 10) {
  // 1. Récupérer les mots à réviser
  const dueWords = appStore.dueWords  // IDs: ["kumusta", "salamat"]
    .map(w => getWordById(w.id))      // Lexicon[]

  // 2. Si pas assez, ajouter de nouveaux mots
  const nextOrder = appStore.progress.nextLearningOrder;  // 10

  const newWords = getAllWords().filter(word => {
    const order = getLearningOrder(word.id);
    return order >= 0 && order < nextOrder && !appStore.getStoreWord(word.id);
  });

  // 3. Mélanger et retourner
  return shuffle([...dueWords, ...newWords]);
}
```

### 3. Progression de l'Utilisateur

```typescript
// Utilisateur réussit un mot
updateProgress("kumusta", true);

// Store met à jour
appStore.update("kumusta", {
  streak: 4,
  mastery: 75,
  nextReview: Date.now() + 7 * 86400000  // 7 jours
});

// Si c'est un nouveau mot, avancer nextLearningOrder
const order = getLearningOrder("kumusta");  // 0
appStore.progress.nextLearningOrder = Math.max(
  appStore.progress.nextLearningOrder,
  order + 1  // Maintenant à 1
);
```

## 📊 Comparaison Avant/Après

### Scénario : Réorganiser l'ordre d'apprentissage

**Avant** (avec `learningOrder` dans les mots) :
```
❌ Problème : Changer learningOrder = modifier bisaya.json
❌ Impact : Les IDs changent ? Les progressions utilisateur cassent
❌ Solution : Migration complexe des données
```

**Après** (avec `learning-sequence.json` séparé) :
```
✅ Solution : Modifier uniquement learning-sequence.json
✅ Impact : Zéro impact sur les données utilisateur
✅ Raison : Les IDs ("kumusta", "salamat") restent identiques
```

### Scénario : Ajouter un nouveau mot

**Avant** :
```
1. Modifier bisaya.json (4240 lignes)
2. Trouver le bon endroit (numéro d'ordre)
3. Décaler tous les IDs suivants ? 🤔
4. Migration utilisateur ? 😰
```

**Après** :
```
1. Ajouter le mot dans words/category.json (petit fichier)
2. Insérer l'ID dans learning-sequence.json à la position voulue
3. C'est tout ! ✨
```

## 🚀 Évolutions Futures Possibles

### 1. Parcours Multiples
```
src/content/
  ├── learning-sequences/
  │   ├── beginner.json       (300 mots, ordre débutant)
  │   ├── intermediate.json   (300 mots, ordre intermédiaire)
  │   └── thematic-travel.json (50 mots sur le voyage)
  └── words/ (inchangé)
```

### 2. Import Sélectif
```typescript
// Ne charger que certaines catégories
import greetings from '$content/words/greetings.json';
import basic_words from '$content/words/basic_words.json';

// Pour une app mobile avec contraintes mémoire
const essentialWords = [...greetings, ...basic_words];
```

### 3. Synchronisation Multi-Appareils
```typescript
// L'utilisateur stocke les IDs, facile à synchroniser
{
  "user": "john@example.com",
  "knownWords": ["kumusta", "salamat", "oo", ...],  // IDs stables
  "progress": { ... }
}
```

## 📝 Notes Techniques

### Pourquoi Map au lieu de Array ?

```typescript
// ❌ Array.find() : O(n) - lent pour 300 mots
const word = words.find(w => w.id === "kumusta");

// ✅ Map.get() : O(1) - instantané
const word = wordsById.get("kumusta");
```

### Pourquoi `learning-sequence.json` est un Array ?

```typescript
// Array d'IDs : facile de maintenir l'ordre
["kumusta", "palihug", "salamat", ...]

// Insertion facile
sequence.splice(5, 0, "new-word-id");

// Index = position d'apprentissage
const wordAt5 = sequence[5];
```

## 🎓 Conclusion

Cette architecture suit le principe de **séparation des préoccupations** :

- **Vocabulaire** (`words/`) : QU'EST-CE QUE les mots ? (définitions, traductions)
- **Ordre** (`learning-sequence.json`) : DANS QUEL ORDRE ? (pédagogie)
- **Progrès** (localStorage) : QUI a appris QUOI ? (utilisateur)

Chaque partie peut évoluer indépendamment sans casser les autres. 🎯
