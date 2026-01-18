// ===== VOCABULARY COMPILER =====
// This file combines all vocabulary into a single structure for use in the app
// Now with 2000+ words from multiple sources!

// Wait for DOM to be ready, then compile vocabulary
(function () {
    // Compile beginner level - house, furniture, animals, etc
    const beginnerWords = [];

    // From vocabulary.js
    if (typeof beginnerVocabulary !== 'undefined') {
        beginnerWords.push(...beginnerVocabulary);
    }

    // From vocabulary-nouns.js
    if (typeof nounsVocabulary !== 'undefined') {
        beginnerWords.push(...nounsVocabulary);
    }

    // From vocabulary-food-health.js
    if (typeof foodVocabulary !== 'undefined') {
        beginnerWords.push(...foodVocabulary);
    }
    if (typeof healthVocabulary !== 'undefined') {
        beginnerWords.push(...healthVocabulary);
    }

    // From vocabulary-misc.js
    if (typeof moreWordsVocabulary !== 'undefined') {
        beginnerWords.push(...moreWordsVocabulary);
    }

    // NEW: From vocabulary-mega-1.js (Home & Kitchen)
    if (typeof homeVocabulary !== 'undefined') {
        beginnerWords.push(...homeVocabulary);
    }

    // NEW: From vocabulary-mega-2.js (Animals & Nature)
    if (typeof animalsVocabulary2 !== 'undefined') {
        beginnerWords.push(...animalsVocabulary2);
    }
    if (typeof natureVocabulary2 !== 'undefined') {
        beginnerWords.push(...natureVocabulary2);
    }

    // Compile intermediate level - verbs, adjectives, professions, etc
    const intermediateWords = [];

    // From vocabulary-advanced.js
    if (typeof intermediateVocabulary !== 'undefined') {
        intermediateWords.push(...intermediateVocabulary);
    }

    // From vocabulary-verbs.js
    if (typeof verbsVocabulary !== 'undefined') {
        intermediateWords.push(...verbsVocabulary);
    }

    // From vocabulary-adj.js
    if (typeof verbsVocabulary2 !== 'undefined') {
        intermediateWords.push(...verbsVocabulary2);
    }
    if (typeof adjectivesVocabulary !== 'undefined') {
        intermediateWords.push(...adjectivesVocabulary);
    }

    // From vocabulary-misc.js
    if (typeof adverbsVocabulary !== 'undefined') {
        intermediateWords.push(...adverbsVocabulary);
    }
    if (typeof prepositionsVocabulary !== 'undefined') {
        intermediateWords.push(...prepositionsVocabulary);
    }
    if (typeof professionsVocabulary !== 'undefined') {
        intermediateWords.push(...professionsVocabulary);
    }

    // From vocabulary-business-emotions.js
    if (typeof emotionsVocabulary !== 'undefined') {
        intermediateWords.push(...emotionsVocabulary);
    }
    if (typeof relationshipsVocabulary !== 'undefined') {
        intermediateWords.push(...relationshipsVocabulary);
    }

    // NEW: From vocabulary-mega-3.js (Clothing & Transport)
    if (typeof clothingVocabulary2 !== 'undefined') {
        intermediateWords.push(...clothingVocabulary2);
    }
    if (typeof transportVocabulary2 !== 'undefined') {
        intermediateWords.push(...transportVocabulary2);
    }

    // Compile advanced level - business, entertainment, technology, etc
    const advancedWords = [];

    // From vocabulary-advanced.js
    if (typeof advancedVocabulary !== 'undefined') {
        advancedWords.push(...advancedVocabulary);
    }

    // From vocabulary-business-emotions.js
    if (typeof businessVocabulary2 !== 'undefined') {
        advancedWords.push(...businessVocabulary2);
    }
    if (typeof expressionsVocabulary2 !== 'undefined') {
        advancedWords.push(...expressionsVocabulary2);
    }

    // From vocabulary-food-health.js
    if (typeof entertainmentVocabulary !== 'undefined') {
        advancedWords.push(...entertainmentVocabulary);
    }
    if (typeof technologyVocabulary2 !== 'undefined') {
        advancedWords.push(...technologyVocabulary2);
    }

    // Create the compiled vocabularyData
    window.vocabularyData = {
        beginner: beginnerWords,
        intermediate: intermediateWords,
        advanced: advancedWords
    };

    // Log word counts for verification
    const total = beginnerWords.length + intermediateWords.length + advancedWords.length;
    console.log('📚 Vocabulary Loaded:');
    console.log('   Beginner:', beginnerWords.length, 'words');
    console.log('   Intermediate:', intermediateWords.length, 'words');
    console.log('   Advanced:', advancedWords.length, 'words');
    console.log('   ═══════════════════════════');
    console.log('   🎯 TOTAL:', total, 'words');

    // Update the stats display if element exists
    const totalWordsEl = document.getElementById('totalWords');
    if (totalWordsEl && total > 0) {
        totalWordsEl.textContent = total;
    }
})();
