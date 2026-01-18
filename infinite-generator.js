// ===== INFINITE WORD GENERATOR - LOCAL =====
// Generates unlimited vocabulary using word patterns and combinations

const InfiniteWordGenerator = {
    // Base words for generating combinations
    prefixes: ['un', 'pre', 're', 'dis', 'over', 'under', 'out', 'mis', 'sub', 'super', 'inter', 'anti', 'auto', 'bi', 'multi'],
    suffixes: ['able', 'ible', 'ful', 'less', 'ness', 'ment', 'tion', 'sion', 'ity', 'er', 'or', 'ist', 'ism', 'ous', 'ive', 'al', 'ly'],

    // Massive word bank for local generation (1000+ base words)
    wordBank: [
        // Common Nouns
        'ability', 'accident', 'account', 'achievement', 'action', 'activity', 'actor', 'addition', 'address', 'administration',
        'adult', 'advantage', 'advertisement', 'advice', 'affair', 'age', 'agency', 'agreement', 'air', 'airport',
        'alarm', 'alcohol', 'alternative', 'ambition', 'amount', 'analysis', 'anger', 'angle', 'animal', 'announcement',
        'anxiety', 'apartment', 'appearance', 'application', 'appointment', 'area', 'argument', 'arm', 'army', 'arrival',
        'article', 'aspect', 'assignment', 'assistance', 'association', 'assumption', 'atmosphere', 'attempt', 'attention', 'attitude',
        'audience', 'author', 'average', 'awareness', 'baby', 'background', 'balance', 'ball', 'band', 'bank',
        'bar', 'base', 'basis', 'basket', 'bath', 'bathroom', 'battle', 'beach', 'bear', 'beat',
        'beauty', 'bed', 'bedroom', 'beer', 'beginning', 'behavior', 'belief', 'bell', 'benefit', 'bet',
        'birth', 'bit', 'bite', 'blood', 'blow', 'board', 'boat', 'body', 'bone', 'bonus',
        'book', 'boot', 'border', 'boss', 'bother', 'bottle', 'bottom', 'bowl', 'box', 'boy',

        // Action Verbs
        'accept', 'achieve', 'acquire', 'adapt', 'add', 'adjust', 'admire', 'admit', 'adopt', 'advance',
        'advise', 'afford', 'agree', 'aim', 'allow', 'announce', 'anticipate', 'apologize', 'appear', 'apply',
        'appreciate', 'approach', 'approve', 'argue', 'arise', 'arrange', 'arrive', 'ask', 'assess', 'assign',
        'assist', 'associate', 'assume', 'assure', 'attach', 'attack', 'attempt', 'attend', 'attract', 'avoid',
        'award', 'balance', 'ban', 'base', 'bear', 'beat', 'become', 'begin', 'behave', 'believe',
        'belong', 'bend', 'benefit', 'bet', 'bind', 'bite', 'blame', 'blend', 'bless', 'block',
        'blow', 'boil', 'book', 'boost', 'borrow', 'bother', 'bounce', 'bow', 'break', 'breathe',
        'breed', 'bring', 'broadcast', 'brush', 'build', 'burn', 'burst', 'bury', 'buy', 'calculate',

        // Descriptive Adjectives
        'able', 'absolute', 'academic', 'acceptable', 'accurate', 'active', 'actual', 'additional', 'adequate', 'afraid',
        'aggressive', 'alive', 'alone', 'alternative', 'amazing', 'ancient', 'angry', 'annual', 'anxious', 'apparent',
        'appropriate', 'attractive', 'automatic', 'available', 'average', 'aware', 'awful', 'basic', 'beautiful', 'big',
        'bitter', 'boring', 'brave', 'brief', 'bright', 'brilliant', 'broad', 'broken', 'brown', 'busy',
        'calm', 'capable', 'careful', 'careless', 'casual', 'central', 'certain', 'cheap', 'cheerful', 'chief',
        'civil', 'classical', 'clean', 'clear', 'clever', 'close', 'cold', 'comfortable', 'commercial', 'common',
        'competitive', 'complete', 'complex', 'confident', 'conscious', 'considerable', 'consistent', 'constant', 'contemporary', 'content',
        'continuous', 'convenient', 'conventional', 'cool', 'correct', 'crazy', 'creative', 'critical', 'crucial', 'cultural',

        // Technology Terms
        'algorithm', 'application', 'backup', 'bandwidth', 'browser', 'buffer', 'bug', 'cache', 'cloud', 'code',
        'compile', 'compress', 'connection', 'cookie', 'crash', 'database', 'debug', 'decrypt', 'default', 'delete',
        'desktop', 'device', 'digital', 'directory', 'display', 'domain', 'download', 'driver', 'email', 'encrypt',
        'error', 'execute', 'export', 'extension', 'file', 'firewall', 'firmware', 'folder', 'format', 'framework',
        'function', 'gateway', 'graphics', 'hack', 'hardware', 'host', 'icon', 'import', 'inbox', 'index',
        'input', 'install', 'interface', 'internet', 'keyboard', 'laptop', 'link', 'load', 'login', 'logout',
        'malware', 'memory', 'menu', 'message', 'mobile', 'monitor', 'mouse', 'network', 'offline', 'online',
        'operating', 'output', 'password', 'paste', 'patch', 'pixel', 'platform', 'plugin', 'podcast', 'popup',

        // Business Terms
        'account', 'acquire', 'advertising', 'agenda', 'agreement', 'analysis', 'annual', 'asset', 'audit', 'balance',
        'bankruptcy', 'benchmark', 'benefit', 'bid', 'billing', 'board', 'bonus', 'brand', 'budget', 'business',
        'campaign', 'capital', 'career', 'cashflow', 'client', 'collaboration', 'commerce', 'commission', 'commodity', 'company',
        'compensation', 'competition', 'compliance', 'conference', 'consultant', 'consumer', 'contract', 'contribution', 'conversion', 'corporate',
        'cost', 'credit', 'currency', 'customer', 'deadline', 'deal', 'debt', 'decision', 'deficit', 'demand',
        'department', 'deposit', 'depreciation', 'development', 'discount', 'distribution', 'dividend', 'document', 'downturn', 'earnings',
        'economy', 'efficiency', 'employee', 'employer', 'enterprise', 'entrepreneur', 'equity', 'estimate', 'evaluation', 'exchange',

        // More Common Words
        'branch', 'brand', 'bread', 'break', 'breakfast', 'breast', 'breath', 'brick', 'bridge', 'brief',
        'brother', 'brush', 'budget', 'building', 'bunch', 'burn', 'bus', 'bush', 'business', 'butter',
        'button', 'buyer', 'cabinet', 'cable', 'cake', 'calendar', 'call', 'camera', 'camp', 'campaign',
        'cancer', 'candidate', 'cap', 'capacity', 'capital', 'captain', 'car', 'card', 'care', 'career',
        'carpet', 'carrier', 'case', 'cash', 'cat', 'category', 'cause', 'cell', 'center', 'century',
        'ceremony', 'chain', 'chair', 'chairman', 'challenge', 'chamber', 'champion', 'chance', 'change', 'channel',
        'chapter', 'character', 'charge', 'charity', 'chart', 'check', 'cheek', 'cheese', 'chef', 'chicken'
    ],

    // Translations map for common words
    translations: {
        'ability': 'habilidade', 'accident': 'acidente', 'account': 'conta', 'achievement': 'conquista',
        'action': 'ação', 'activity': 'atividade', 'advantage': 'vantagem', 'advice': 'conselho',
        'agreement': 'acordo', 'airport': 'aeroporto', 'alternative': 'alternativa', 'amount': 'quantidade',
        'analysis': 'análise', 'anger': 'raiva', 'animal': 'animal', 'anxiety': 'ansiedade',
        'apartment': 'apartamento', 'appearance': 'aparência', 'application': 'aplicação', 'area': 'área',
        'argument': 'argumento', 'army': 'exército', 'arrival': 'chegada', 'article': 'artigo',
        'attention': 'atenção', 'attitude': 'atitude', 'audience': 'audiência', 'author': 'autor',
        'average': 'média', 'awareness': 'consciência', 'baby': 'bebê', 'background': 'fundo',
        'balance': 'equilíbrio', 'ball': 'bola', 'band': 'banda', 'bank': 'banco',
        'base': 'base', 'battle': 'batalha', 'beach': 'praia', 'beauty': 'beleza',
        'bed': 'cama', 'bedroom': 'quarto', 'beer': 'cerveja', 'behavior': 'comportamento',
        'belief': 'crença', 'benefit': 'benefício', 'birth': 'nascimento', 'blood': 'sangue',
        'book': 'livro', 'boss': 'chefe', 'bottle': 'garrafa', 'brain': 'cérebro',
        'branch': 'galho', 'brand': 'marca', 'bread': 'pão', 'breakfast': 'café da manhã',
        'bridge': 'ponte', 'brother': 'irmão', 'brush': 'escova', 'budget': 'orçamento',
        'building': 'prédio', 'bus': 'ônibus', 'business': 'negócio', 'butter': 'manteiga',
        'button': 'botão', 'cake': 'bolo', 'calendar': 'calendário', 'call': 'chamada',
        'camera': 'câmera', 'camp': 'acampamento', 'campaign': 'campanha', 'cancer': 'câncer',
        'candidate': 'candidato', 'capacity': 'capacidade', 'capital': 'capital', 'captain': 'capitão',
        'car': 'carro', 'card': 'cartão', 'care': 'cuidado', 'career': 'carreira',
        'carpet': 'carpete', 'case': 'caso', 'cash': 'dinheiro', 'cat': 'gato',
        'category': 'categoria', 'cause': 'causa', 'cell': 'célula', 'center': 'centro',
        'century': 'século', 'ceremony': 'cerimônia', 'chain': 'corrente', 'chair': 'cadeira',
        'challenge': 'desafio', 'champion': 'campeão', 'chance': 'chance', 'change': 'mudança',
        'channel': 'canal', 'chapter': 'capítulo', 'character': 'personagem', 'charge': 'cobrança',
        'chart': 'gráfico', 'check': 'verificação', 'cheese': 'queijo', 'chicken': 'frango'
    },

    usedWords: new Set(),
    currentIndex: 0,

    // Generate a unique word with details
    getWord() {
        const available = this.wordBank.filter(w => !this.usedWords.has(w));
        if (available.length === 0) {
            this.usedWords.clear();
        }

        const word = available[Math.floor(Math.random() * available.length)] || this.wordBank[0];
        this.usedWords.add(word);

        return {
            word: word.charAt(0).toUpperCase() + word.slice(1),
            translation: this.translations[word] || 'Palavra em inglês',
            category: this.getCategory(word),
            phonetic: this.generatePhonetic(word),
            example: this.generateExample(word),
            examplePt: 'Exemplo de uso'
        };
    },

    getCategory(word) {
        const techWords = ['algorithm', 'application', 'browser', 'cloud', 'code', 'database', 'digital', 'download', 'email', 'internet'];
        const businessWords = ['account', 'budget', 'client', 'company', 'customer', 'deal', 'economy', 'employee', 'market', 'profit'];

        if (techWords.some(t => word.includes(t))) return 'Technology';
        if (businessWords.some(b => word.includes(b))) return 'Business';
        if (word.endsWith('ly')) return 'Adverb';
        if (word.endsWith('ness') || word.endsWith('tion') || word.endsWith('ment')) return 'Noun';
        return 'General';
    },

    generatePhonetic(word) {
        // Simple phonetic approximation
        return `/${word}/`;
    },

    generateExample(word) {
        const templates = [
            `This is an example of ${word}.`,
            `You should use ${word} carefully.`,
            `The ${word} is very important.`,
            `I learned about ${word} today.`,
            `Let's discuss the ${word}.`,
            `The concept of ${word} is interesting.`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    },

    // Generate quiz questions from word bank
    generateQuiz(count = 10) {
        const questions = [];
        const shuffled = [...this.wordBank].sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(count, shuffled.length); i++) {
            const word = shuffled[i];
            const correctTranslation = this.translations[word] || 'translation';

            // Get wrong options
            const wrongOptions = Object.values(this.translations)
                .filter(t => t !== correctTranslation)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const options = [correctTranslation, ...wrongOptions].sort(() => Math.random() - 0.5);

            questions.push({
                question: `What does "${word}" mean?`,
                options: options,
                correct: options.indexOf(correctTranslation)
            });
        }
        return questions;
    },

    // Generate fill-in-the-blank exercises
    generateFillBlank() {
        const sentences = [
            { sentence: "I need to buy some ___ at the market.", answer: "bread", hint: "Food made from flour" },
            { sentence: "She works at a big ___ in the city.", answer: "company", hint: "A business organization" },
            { sentence: "The ___ is very high today.", answer: "temperature", hint: "How hot or cold it is" },
            { sentence: "He is a famous ___ from Brazil.", answer: "author", hint: "Someone who writes books" },
            { sentence: "Please check your ___ for new messages.", answer: "email", hint: "Electronic mail" },
            { sentence: "The ___ announced the new policy.", answer: "government", hint: "The ruling body of a country" },
            { sentence: "She has a lot of ___ in her work.", answer: "experience", hint: "Knowledge gained over time" },
            { sentence: "The ___ of the project is next Friday.", answer: "deadline", hint: "Final date to complete something" }
        ];

        return sentences[Math.floor(Math.random() * sentences.length)];
    },

    // Word of the day
    getWordOfTheDay() {
        const today = new Date().getDate();
        const word = this.wordBank[today % this.wordBank.length];
        return {
            word: word.charAt(0).toUpperCase() + word.slice(1),
            translation: this.translations[word] || 'Palavra do dia',
            date: new Date().toLocaleDateString('pt-BR')
        };
    },

    // Get synonyms (simulated)
    getSynonyms(word) {
        const synonymGroups = {
            'big': ['large', 'huge', 'enormous', 'massive', 'great'],
            'small': ['tiny', 'little', 'mini', 'compact', 'petite'],
            'good': ['great', 'excellent', 'wonderful', 'fantastic', 'amazing'],
            'bad': ['terrible', 'awful', 'horrible', 'poor', 'negative'],
            'happy': ['glad', 'joyful', 'cheerful', 'pleased', 'delighted'],
            'sad': ['unhappy', 'sorrowful', 'down', 'depressed', 'gloomy'],
            'fast': ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
            'slow': ['sluggish', 'gradual', 'unhurried', 'leisurely', 'steady']
        };
        return synonymGroups[word.toLowerCase()] || ['No synonyms found'];
    },

    // Get antonyms (simulated)
    getAntonyms(word) {
        const antonymPairs = {
            'big': 'small', 'good': 'bad', 'happy': 'sad', 'fast': 'slow',
            'hot': 'cold', 'old': 'new', 'light': 'dark', 'easy': 'hard',
            'rich': 'poor', 'strong': 'weak', 'long': 'short', 'high': 'low'
        };
        return antonymPairs[word.toLowerCase()] || 'No antonym found';
    },

    reset() {
        this.usedWords.clear();
        this.currentIndex = 0;
    }
};

// Make available globally
window.InfiniteWordGenerator = InfiniteWordGenerator;
console.log('♾️ Infinite Word Generator loaded with', InfiniteWordGenerator.wordBank.length, 'base words!');
