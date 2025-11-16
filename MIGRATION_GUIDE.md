# 🔄 Guide de Migration - Nouveau Système d'ID et Ordre d'Apprentissage

## 📋 Résumé des Changements

### ✅ Ce qui a été fait

1. **Nouveau système d'ID** : Les mots utilisent maintenant des IDs basés sur le texte au lieu de nombres
   - Ancien : `id: 1, 2, 3, ...`
   - Nouveau : `id: "kumusta", "salamat", "oo", ...`

2. **Nouvel ordre d'apprentissage pédagogique** : Les mots sont réorganisés dans un ordre logique
   - Commence par les salutations et mots de base
   - Progresse vers les catégories thématiques
   - Finit par le vocabulaire avancé

3. **Nouveau champ `learningOrder`** : Chaque mot a maintenant un ordre d'apprentissage explicite (1-300)

4. **Nouveau champ `nextLearningOrder`** : Remplace `nextNewWordId` pour suivre la progression

## 📁 Fichiers Modifiés

### Fichiers de contenu
- ✅ `src/content/bisaya.json` - Remplacé par la version réorganisée
- ✅ `src/content/bisaya_backup.json` - Sauvegarde de l'ancien fichier
- ✅ `src/content/bisaya_reorganized.json` - Version réorganisée
- ✅ `src/content/learning_order.json` - Nouveau fichier de mapping

### Types TypeScript
- ✅ `src/lib/types/lexicon.ts` - `id: string` + ajout de `learningOrder: number`
- ✅ `src/lib/types/store.ts` - `id: string` + `nextLearningOrder: number`

### Code applicatif
- ✅ `src/lib/store/appStore.svelte` - Signatures des fonctions mises à jour
- ✅ `src/lib/learning/getTodayWords.ts` - Utilise `learningOrder` au lieu de comparer les IDs
- ✅ `src/lib/learning/progress.ts` - Accepte des IDs string
- ✅ `src/routes/review/components/TodayWord.svelte` - Correction du calcul de date

## 🔍 Changements Détaillés

### 1. Structure des Mots (Lexicon)

**Avant :**
```json
{
  "id": 1,
  "word": "kumusta",
  "translation": { "en": "hello / how are you" },
  "difficulty": 1,
  "category": "greetings",
  ...
}
```

**Après :**
```json
{
  "id": "kumusta",
  "learningOrder": 1,
  "word": "kumusta",
  "translation": { "en": "hello / how are you" },
  "difficulty": 1,
  "category": "greetings",
  ...
}
```

### 2. Structure du Store

**Avant :**
```typescript
{
  progress: {
    lastSession: number,
    nextNewWordId: number  // 10
  },
  words: [{
    id: number,  // 1, 2, 3...
    ...
  }]
}
```

**Après :**
```typescript
{
  progress: {
    lastSession: number,
    nextLearningOrder: number  // 10
  },
  words: [{
    id: string,  // "kumusta", "salamat"...
    ...
  }]
}
```

### 3. Ordre d'Apprentissage Pédagogique

Les 300 mots sont maintenant organisés dans cet ordre :

1. **Salutations** (7 mots) - kumusta, palihug, salamat...
2. **Mots de base** (13 mots) - oo, dili, tabang...
3. **Pronoms** (7 mots) - ako, ikaw, siya...
4. **Mots questions** (8 mots) - diin, kinsa, unsa...
5. **Nombres** (11 mots) - usa, duha, tulo...
6. **Famille** (4 mots) - mama, papa, anak...
7. **Corps** (11 mots) - ulo, mata, kamot...
8. **Temps** (8 mots) - karon, ugma, gahapon...
9. **Prépositions** (12 mots) - sa, didto, dinhi...
10. **Verbes** (63 mots) - kaon, inom, lakaw...
11. **Descriptions** (21 mots) - dako, gamay, maayo...
12. **Nourriture** (24 mots) - bugas, kan-on, tubig...
13. **Personnes** (6 mots) - tawo, lalaki, babaye...
14. **Lieux** (15 mots) - balay, simbahan, eskwelahan...
15. **Directions** (20 mots) - tuo, wala, taas...
16. **Transport** (6 mots) - bus, jeep, taksi...
17. **Shopping** (10 mots) - tindahan, bayad, tag-pila...
18. **Émotions** (18 mots) - malipayon, sad, nasuko...
19. **Santé** (4 mots) - sakit, tambal, masakiton...
20. **Nature** (15 mots) - dagat, bukid, tubig...
21. **Voyage** (15 mots) - biyahe, hotel, airport...
22. **Phrases** (2 mots)

## 🔧 Migration des Données Utilisateurs

**⚠️ IMPORTANT** : Les utilisateurs existants ont des données dans localStorage avec les anciens IDs numériques.

### Options de Migration :

#### Option 1 : Reset complet (Simple mais perte de progrès)
Les utilisateurs commencent de zéro avec le nouvel ordre d'apprentissage.

#### Option 2 : Migration automatique (Recommandé)
Créer un script de migration qui :
1. Lit l'ancien store localStorage
2. Mappe les anciens IDs numériques vers les nouveaux IDs string
3. Sauvegarde le nouveau store

**Script de migration suggéré :**
```typescript
// À ajouter dans appStore.svelte ou un fichier de migration séparé

function migrateStore() {
  const oldStore = localStorage.getItem('app-store');
  if (!oldStore) return;

  const parsed = JSON.parse(oldStore);

  // Vérifier si c'est l'ancien format (nextNewWordId existe)
  if (parsed.progress?.nextNewWordId !== undefined) {
    // Créer un mapping ancien ID → nouveau ID
    const idMap = new Map();
    bisayaBackup.forEach((oldWord, index) => {
      const newWord = bisayaNew.find(w => w.word === oldWord.word);
      if (newWord) {
        idMap.set(oldWord.id, newWord.id);
      }
    });

    // Migrer les mots
    const migratedWords = parsed.words.map(word => ({
      ...word,
      id: idMap.get(word.id) || word.id
    }));

    // Créer le nouveau store
    const newStore = {
      ...parsed,
      progress: {
        ...parsed.progress,
        nextLearningOrder: parsed.progress.nextNewWordId
      },
      words: migratedWords
    };

    localStorage.setItem('app-store', JSON.stringify(newStore));
  }
}
```

## 📊 Bénéfices de la Réorganisation

1. **IDs plus lisibles** : `"kumusta"` au lieu de `1`
2. **Ordre pédagogique** : Apprentissage progressif naturel
3. **Maintenance facilitée** : Ajout/suppression de mots sans casser la numérotation
4. **Meilleure traçabilité** : Les IDs sont auto-descriptifs
5. **Flexibilité** : Le `learningOrder` peut être ajusté indépendamment de l'ID

## 🚀 Prochaines Étapes

1. ✅ Vérifier que le code compile (fait)
2. 🔲 Tester l'application localement
3. 🔲 Créer un script de migration pour les données utilisateur
4. 🔲 Tester la migration avec des données de test
5. 🔲 Déployer avec un message de migration pour les utilisateurs

## 📝 Notes Techniques

- **Compatibilité** : Le nouveau système n'est pas compatible avec l'ancien sans migration
- **Performance** : Les comparaisons de string sont légèrement plus lentes mais négligeable
- **Stockage** : Les IDs string prennent plus d'espace mais restent raisonnables (~5-15 caractères)
