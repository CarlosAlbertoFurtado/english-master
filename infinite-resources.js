// ===== INFINITE RESOURCES - FREE APIs =====
// This file provides infinite vocabulary, quotes, and content from free APIs

const InfiniteResources = {
    // Free Dictionary API
    async getWordDefinition(word) {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data[0];
        } catch (e) {
            console.log('Dictionary API error:', e);
            return null;
        }
    },

    // Random Word API (free)
    async getRandomWords(count = 10) {
        try {
            const res = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.log('Random Word API error:', e);
            return [];
        }
    },

    // Quotable API - Free inspirational quotes
    async getRandomQuote() {
        try {
            const res = await fetch('https://api.quotable.io/random');
            if (!res.ok) return null;
            return await res.json();
        } catch (e) {
            console.log('Quote API error:', e);
            return null;
        }
    },

    // Generate infinite vocabulary from random words + definitions
    async generateInfiniteVocabulary(count = 20) {
        const words = await this.getRandomWords(count);
        const vocabulary = [];

        for (const word of words) {
            const definition = await this.getWordDefinition(word);
            if (definition && definition.meanings && definition.meanings.length > 0) {
                const meaning = definition.meanings[0];
                const def = meaning.definitions[0];
                vocabulary.push({
                    word: word,
                    translation: def.definition.substring(0, 50) + '...',
                    phonetic: definition.phonetic || '',
                    category: meaning.partOfSpeech || 'Word',
                    example: def.example || `The word "${word}" is useful.`,
                    examplePt: 'Pratique esta palavra!',
                    audio: definition.phonetics?.find(p => p.audio)?.audio || null
                });
            }
        }
        return vocabulary;
    },

    // Datamuse API - Find related words (synonyms, rhymes, etc.)
    async getRelatedWords(word, type = 'ml') {
        // Types: ml (means like), sl (sounds like), sp (spelled like), rel_syn (synonyms)
        try {
            const res = await fetch(`https://api.datamuse.com/words?${type}=${word}&max=10`);
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.log('Datamuse API error:', e);
            return [];
        }
    },

    // Generate infinite quiz questions from API words
    async generateInfiniteQuiz(count = 10) {
        const words = await this.getRandomWords(count * 2);
        const questions = [];

        for (let i = 0; i < Math.min(count, words.length); i++) {
            const word = words[i];
            const def = await this.getWordDefinition(word);

            if (def && def.meanings && def.meanings[0]) {
                const correctAnswer = def.meanings[0].definitions[0].definition.substring(0, 60);

                // Get wrong options from other words
                const wrongOptions = [];
                for (let j = i + 1; j < words.length && wrongOptions.length < 3; j++) {
                    const wrongDef = await this.getWordDefinition(words[j]);
                    if (wrongDef && wrongDef.meanings && wrongDef.meanings[0]) {
                        wrongOptions.push(wrongDef.meanings[0].definitions[0].definition.substring(0, 60));
                    }
                }

                if (wrongOptions.length >= 3) {
                    const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
                    questions.push({
                        question: `What does "${word}" mean?`,
                        options: options,
                        correct: options.indexOf(correctAnswer)
                    });
                }
            }
        }
        return questions;
    },

    // LibreTranslate API (free, self-hosted available)
    async translateText(text, sourceLang = 'en', targetLang = 'pt') {
        try {
            // Using MyMemory free translation API
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
            if (!res.ok) return text;
            const data = await res.json();
            return data.responseData?.translatedText || text;
        } catch (e) {
            console.log('Translation API error:', e);
            return text;
        }
    },

    // Cached words to avoid repetition
    usedWords: new Set(),

    // Get unique word (no repetition)
    async getUniqueWord() {
        let attempts = 0;
        while (attempts < 10) {
            const words = await this.getRandomWords(5);
            for (const word of words) {
                if (!this.usedWords.has(word)) {
                    this.usedWords.add(word);
                    return word;
                }
            }
            attempts++;
        }
        return null;
    },

    // Reset used words
    resetUsedWords() {
        this.usedWords.clear();
    }
};

// ===== SHARE FUNCTIONALITY =====
const ShareApp = {
    // Generate shareable link (when hosted on GitHub Pages)
    getShareLink() {
        return window.location.href;
    },

    // Share via Web Share API (mobile friendly)
    async shareApp() {
        const shareData = {
            title: 'English Master - Aprenda Inglês',
            text: '🇺🇸 Aprenda inglês de forma inteligente! Vocabulário infinito, Quiz, Listening e Speaking.',
            url: this.getShareLink()
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                showToast('✅ Compartilhado com sucesso!', 'success');
            } catch (e) {
                this.copyToClipboard();
            }
        } else {
            this.copyToClipboard();
        }
    },

    // Copy link to clipboard
    copyToClipboard() {
        const link = this.getShareLink();
        navigator.clipboard.writeText(link).then(() => {
            showToast('✅ Link copiado! Cole para compartilhar.', 'success');
        }).catch(() => {
            showToast('Link: ' + link, 'info');
        });
    },

    // Generate WhatsApp share link
    shareWhatsApp() {
        const text = encodeURIComponent('🇺🇸 Aprenda inglês comigo! Vocabulário infinito, Quiz e muito mais: ' + this.getShareLink());
        window.open(`https://wa.me/?text=${text}`, '_blank');
    },

    // Generate Telegram share link
    shareTelegram() {
        const text = encodeURIComponent('🇺🇸 Aprenda inglês comigo!');
        const url = encodeURIComponent(this.getShareLink());
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    }
};

// Make available globally
window.InfiniteResources = InfiniteResources;
window.ShareApp = ShareApp;

console.log('♾️ Infinite Resources loaded!');
console.log('📤 Share functionality ready!');
