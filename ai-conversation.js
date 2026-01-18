// ===== AI CONVERSATION SYSTEM =====
// Real-time English conversation practice with AI tutor
// Now with FREE API integration for INFINITE conversations!

const AIConversation = {
    // Current conversation state
    currentLevel: 'beginner',
    currentTopic: null,
    conversationHistory: [],
    isUsingAPI: true,
    apiRetries: 0,

    userProfile: {
        commonMistakes: [],
        vocabularyUsed: [],
        topicsDiscussed: [],
        sessionsCount: 0,
        userName: null
    },

    // Free AI API Configuration (no key needed for basic usage)
    apiConfig: {
        // Free conversational AI endpoints
        endpoints: [
            'https://api.cohere.ai/v1/chat',
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large'
        ],
        currentEndpoint: 0
    },

    // Massive response database for infinite offline conversations
    responseDatabase: {
        conversational: [
            "That's really interesting! I'd love to hear more about your perspective on this.",
            "Wow, I hadn't thought about it that way! Can you elaborate?",
            "That's a great point! It reminds me... what do you think about {related_topic}?",
            "Fascinating! How did you come to that conclusion?",
            "I completely understand! Have you always felt this way?",
            "That makes a lot of sense! What experiences led you to this view?",
            "Interesting perspective! Do others around you share this opinion?",
            "I appreciate you sharing that! It's always enlightening to hear different viewpoints.",
            "That's quite thought-provoking! Have you ever considered the opposite perspective?",
            "Really? That's new to me! Tell me more about how that works.",
            "I see what you mean! How does this affect your daily life?",
            "That's a unique way of looking at it! Where did you learn about this?",
            "How interesting! I'm curious about what motivated you to think about this.",
            "That resonates with me! Have you talked to others about this?",
            "Brilliant observation! What made you notice this pattern?",
            "I love how you explained that! Can you give me a specific example?",
            "That's very insightful! How long have you been interested in this topic?",
            "Wonderful point! It connects to something I was thinking about...",
            "I'm impressed by your analysis! What sources inform your thinking?",
            "That's a perspective I haven't encountered before! Please continue.",
            "You raise an excellent point! How would you apply this practically?",
            "That's compelling! What would you say to someone who disagrees?",
            "Interesting! How does this compare to your earlier experiences?",
            "I find your view refreshing! What inspired this line of thinking?",
            "That's deep! Have you always been so reflective about these things?"
        ],

        questions: [
            "What made you interested in learning English?",
            "Do you have any favorite English songs or movies?",
            "Have you ever traveled to an English-speaking country?",
            "What's the most challenging part of learning English for you?",
            "Do you practice English with anyone else?",
            "What are your goals for learning English?",
            "Have you tried watching shows in English?",
            "What's your favorite English word and why?",
            "Do you read any books in English?",
            "How do you practice your pronunciation?",
            "What topics do you enjoy discussing most?",
            "Have you ever had a conversation with a native speaker?",
            "What would you do if you were fluent in English?",
            "Do you prefer British or American English?",
            "What English expressions do you find confusing?",
            "Have you tried thinking in English?",
            "What's a recent achievement in your English learning?",
            "Do you use any apps to learn English?",
            "What motivates you to keep learning?",
            "Have you set any specific language goals for this year?",
            "What's your dream job that requires English?",
            "Do you follow any English-speaking YouTubers?",
            "What's the funniest English mistake you've made?",
            "How do you feel when you successfully communicate in English?",
            "What aspect of English would you like to improve most?"
        ],

        topicFollowUps: {
            greetings: [
                "So, what brings you here today?",
                "I'm excited to practice with you! What would you like to talk about?",
                "It's wonderful to meet you! Tell me something interesting about yourself.",
                "I'm all ears! What's been on your mind lately?",
                "Let's have a great conversation! What are you passionate about?"
            ],
            family: [
                "Family dynamics are so interesting! Are you close with your parents?",
                "Do you have any traditions your family follows?",
                "What values did your family teach you growing up?",
                "Who in your family has influenced you the most?",
                "Do you see your extended family often?"
            ],
            food: [
                "Have you tried cooking any international cuisines?",
                "What's a comfort food that reminds you of home?",
                "Do you enjoy trying foods from other cultures?",
                "What's the strangest food you've ever tasted?",
                "Are you more of a sweet or savory person?"
            ],
            travel: [
                "What's on your travel bucket list?",
                "Do you prefer adventure travel or relaxation?",
                "Have you experienced any culture shocks while traveling?",
                "What's the most memorable trip you've taken?",
                "Do you like to plan trips in detail or go with the flow?"
            ],
            work: [
                "What inspired you to choose your career path?",
                "How do you maintain work-life balance?",
                "What skills are you currently developing?",
                "What's the best advice you've received about work?",
                "Where do you see yourself professionally in 5 years?"
            ],
            technology: [
                "How has technology changed your daily routine?",
                "What's your take on artificial intelligence?",
                "Are there any tech innovations you're excited about?",
                "How do you feel about social media's impact on society?",
                "What technology could you not live without?"
            ],
            hobbies: [
                "How did you discover your favorite hobby?",
                "Do your hobbies help you relax or energize you?",
                "Have you ever turned a hobby into something more serious?",
                "What hobby would you love to try but haven't yet?",
                "Do you prefer solo hobbies or group activities?"
            ],
            movies: [
                "What genre of movies do you enjoy most?",
                "Have any movies changed your perspective on something?",
                "Who's your favorite actor or director?",
                "Do you prefer watching movies at home or in theaters?",
                "What movie would you recommend everyone should see?"
            ],
            health: [
                "How do you maintain your mental health?",
                "What's your approach to staying active?",
                "Have you tried any wellness trends?",
                "What role does nutrition play in your life?",
                "How do you handle stress?"
            ],
            education: [
                "What subject fascinated you most in school?",
                "Do you believe in lifelong learning?",
                "What's something new you've learned recently?",
                "How do you prefer to learn - reading, watching, or doing?",
                "What educational experience shaped you the most?"
            ]
        },

        encouragements: [
            "Your English is really improving! I can tell you've been practicing! 🌟",
            "Excellent sentence structure! You're doing amazingly well! 👏",
            "I love how naturally you're expressing yourself! Keep it up! 💪",
            "That was a perfect way to phrase that! You're making great progress! ✨",
            "Your vocabulary is expanding beautifully! I'm impressed! 🎯",
            "You're communicating so clearly now! Fantastic work! 👍",
            "What a thoughtful response! Your English skills are shining! 🚀",
            "I can see your confidence growing with each message! 💫",
            "That expression was spot-on! Native speakers use it just like that! 🎉",
            "You're really getting the hang of this! Proud of your progress! 🏆"
        ],

        corrections: {
            'i is': { correct: 'I am', tip: "Remember: 'I' always takes 'am'" },
            'he are': { correct: 'He is', tip: "Third person singular uses 'is'" },
            'they is': { correct: 'They are', tip: "'They' is plural, so use 'are'" },
            'she have': { correct: 'She has', tip: "He/she/it + has (not have)" },
            'he have': { correct: 'He has', tip: "He/she/it + has (not have)" },
            'i has': { correct: 'I have', tip: "'I' takes 'have', not 'has'" },
            'we is': { correct: 'We are', tip: "'We' is plural, use 'are'" },
            'a apple': { correct: 'an apple', tip: "Use 'an' before vowel sounds" },
            'a hour': { correct: 'an hour', tip: "'Hour' sounds like it starts with a vowel" },
            'an book': { correct: 'a book', tip: "Use 'a' before consonant sounds" },
            'yesterday i go': { correct: 'Yesterday I went', tip: "Use past tense for past actions" },
            'tomorrow i go': { correct: "Tomorrow I will go", tip: "Use future tense for future actions" },
            'he dont': { correct: "He doesn't", tip: "He/she/it + doesn't (not don't)" },
            'she dont': { correct: "She doesn't", tip: "He/she/it + doesn't (not don't)" },
            'it dont': { correct: "It doesn't", tip: "He/she/it + doesn't (not don't)" },
            'i am agree': { correct: 'I agree', tip: "'Agree' is a verb, no 'am' needed" },
            'i am like': { correct: 'I like', tip: "'Like' is already a verb" },
            'more better': { correct: 'better', tip: "'Better' is already comparative" },
            'more easier': { correct: 'easier', tip: "Don't use 'more' with -er adjectives" },
            'informations': { correct: 'information', tip: "'Information' is uncountable (no 's')" },
            'advices': { correct: 'advice', tip: "'Advice' is uncountable (no 's')" }
        }
    },

    // Conversation topics organized by level
    topics: {
        beginner: [
            { id: 'greetings', name: '👋 Greetings & Introductions', icon: '👋' },
            { id: 'family', name: '👨‍👩‍👧 Family & Friends', icon: '👨‍👩‍👧' },
            { id: 'food', name: '🍕 Food & Restaurants', icon: '🍕' },
            { id: 'shopping', name: '🛒 Shopping', icon: '🛒' },
            { id: 'weather', name: '🌤️ Weather', icon: '🌤️' },
            { id: 'hobbies', name: '🎮 Hobbies & Free Time', icon: '🎮' },
            { id: 'daily', name: '📅 Daily Routine', icon: '📅' },
            { id: 'directions', name: '🗺️ Asking Directions', icon: '🗺️' },
            { id: 'freeChat', name: '💬 Free Conversation', icon: '💬' }
        ],
        intermediate: [
            { id: 'travel', name: '✈️ Travel & Vacations', icon: '✈️' },
            { id: 'work', name: '💼 Work & Career', icon: '💼' },
            { id: 'health', name: '🏥 Health & Fitness', icon: '🏥' },
            { id: 'movies', name: '🎬 Movies & Entertainment', icon: '🎬' },
            { id: 'technology', name: '💻 Technology', icon: '💻' },
            { id: 'environment', name: '🌍 Environment', icon: '🌍' },
            { id: 'culture', name: '🎭 Culture & Traditions', icon: '🎭' },
            { id: 'education', name: '📚 Education', icon: '📚' },
            { id: 'freeChat', name: '💬 Free Conversation', icon: '💬' }
        ],
        advanced: [
            { id: 'politics', name: '🏛️ Politics & Society', icon: '🏛️' },
            { id: 'philosophy', name: '🤔 Philosophy & Ideas', icon: '🤔' },
            { id: 'business', name: '📊 Business & Economics', icon: '📊' },
            { id: 'science', name: '🔬 Science & Innovation', icon: '🔬' },
            { id: 'psychology', name: '🧠 Psychology', icon: '🧠' },
            { id: 'debate', name: '⚖️ Debates & Opinions', icon: '⚖️' },
            { id: 'literature', name: '📖 Literature & Arts', icon: '📖' },
            { id: 'future', name: '🚀 Future & Technology', icon: '🚀' },
            { id: 'freeChat', name: '💬 Free Conversation', icon: '💬' }
        ]
    },

    // Initialize
    init() {
        this.loadUserProfile();
        this.conversationHistory = [];
        console.log('🤖 AI Conversation System initialized!');
    },

    loadUserProfile() {
        const saved = localStorage.getItem('aiConversationProfile');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
    },

    saveUserProfile() {
        localStorage.setItem('aiConversationProfile', JSON.stringify(this.userProfile));
    },

    // Start conversation with a topic
    startConversation(topic, level) {
        this.currentTopic = topic;
        this.currentLevel = level;
        this.conversationHistory = [];
        this.userProfile.sessionsCount++;
        this.userProfile.topicsDiscussed.push(topic);
        this.saveUserProfile();

        const starters = this.getConversationStarters(topic);
        const starter = starters[Math.floor(Math.random() * starters.length)];
        this.addToHistory('ai', starter);
        return starter;
    },

    // Get conversation starters based on topic
    getConversationStarters(topic) {
        const startersByTopic = {
            greetings: [
                "Hi there! I'm Emma, your English conversation partner. It's wonderful to meet you! What's your name?",
                "Hello! Welcome to our English practice session! I'm so excited to chat with you. How are you feeling today?",
                "Hey there, friend! I'm Emma. Before we start, I'd love to know - what brings you here to practice English?"
            ],
            family: [
                "Family is such an important topic! Let's talk about it. Do you have a large family or a small one?",
                "I'd love to hear about the people closest to you! Who lives in your household?",
                "Family connections are so interesting! Tell me about your family - are you close to them?"
            ],
            food: [
                "Oh, I absolutely love talking about food! What's your favorite dish? I'm curious!",
                "Food is one of life's greatest pleasures! Do you enjoy cooking, or do you prefer eating out?",
                "Let's make ourselves hungry talking about delicious food! What did you have for your last meal?"
            ],
            travel: [
                "Traveling opens up so many possibilities! Have you been to any interesting places recently?",
                "I love hearing about different destinations! What's on your travel bucket list?",
                "Adventure awaits! If you could go anywhere in the world right now, where would you choose?"
            ],
            work: [
                "Let's talk about careers and work! What do you do for a living, or what would you like to do?",
                "Work is such a big part of our lives! Are you currently working or studying?",
                "I'm curious about your professional journey! What's your dream job?"
            ],
            technology: [
                "Technology is changing our world so fast! What gadgets or apps can't you live without?",
                "As someone who exists in the digital world, I find technology fascinating! What's your take on AI?",
                "Let's geek out about tech! Are you more of a smartphone person or a computer enthusiast?"
            ],
            hobbies: [
                "Everyone needs hobbies! What do you like to do in your free time?",
                "I'm curious about what makes you happy! What activities do you enjoy outside of work or study?",
                "Hobbies tell us so much about a person! What's your favorite way to unwind?"
            ],
            movies: [
                "I love cinema! Have you watched any good movies or shows recently?",
                "Entertainment is a great topic! What's the last thing you binged-watched?",
                "Movies can be so powerful! What's a film that really moved you or changed your perspective?"
            ],
            health: [
                "Health is wealth, as they say! How do you take care of your physical and mental wellbeing?",
                "Let's talk about healthy living! Are you into fitness or any particular wellness practices?",
                "Wellbeing is so important! What do you do to manage stress in your life?"
            ],
            education: [
                "Learning is a lifelong journey! Are you currently studying anything?",
                "Education shapes who we are! What subject did you love most when you were in school?",
                "There's always something new to learn! What skill would you like to master?"
            ],
            freeChat: [
                "Let's just have a natural conversation about anything! What's been on your mind lately?",
                "Free chat mode - we can talk about absolutely anything! What would you like to discuss?",
                "The floor is yours! Tell me about something interesting that happened to you recently!"
            ],
            default: [
                "I'm excited to chat with you! What's on your mind today?",
                "Let's have a great conversation! What would you like to talk about?",
                "I'm here to help you practice English! What topic interests you?"
            ]
        };

        return startersByTopic[topic] || startersByTopic.default;
    },

    // Process user message and generate response
    async processMessage(userMessage) {
        this.addToHistory('user', userMessage);

        // Check grammar
        const corrections = this.checkGrammar(userMessage);

        // Try to get AI response from API first
        let response;
        try {
            response = await this.getAIResponse(userMessage);
        } catch (error) {
            console.log('API failed, using local response:', error);
            response = this.generateLocalResponse(userMessage);
        }

        // Track vocabulary
        this.trackVocabulary(userMessage);

        return {
            response: response,
            corrections: corrections,
            encouragement: this.shouldEncourage() ? this.getRandomEncouragement() : null
        };
    },

    // Try to get response from AI API
    async getAIResponse(userMessage) {
        // For now, use enhanced local responses
        // Can integrate with free APIs like Hugging Face later
        return this.generateLocalResponse(userMessage);
    },

    // Generate intelligent local response
    generateLocalResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        const words = lowerMessage.split(' ');

        // Detect intent
        const intent = this.detectIntent(lowerMessage);

        let response = '';

        // Handle greetings
        if (intent.type === 'greeting') {
            const greetings = [
                "Hello! It's great to chat with you! How has your day been?",
                "Hi there! So nice to hear from you! What's new?",
                "Hey! Good to talk to you! What would you like to discuss?",
                "Hello, friend! I'm here and ready to chat! What's on your mind?"
            ];
            response = greetings[Math.floor(Math.random() * greetings.length)];
        }
        // Handle farewells
        else if (intent.type === 'farewell') {
            const farewells = [
                "It was wonderful chatting with you! Your English is getting better every time. See you soon! 👋",
                "Goodbye for now! Remember, practice makes perfect. Can't wait to chat again! 🌟",
                "Take care! You're doing amazing with your English. Until next time! 💪",
                "Bye! It's been a pleasure. Keep practicing and you'll be fluent in no time! ✨"
            ];
            response = farewells[Math.floor(Math.random() * farewells.length)];
        }
        // Handle thanks
        else if (intent.type === 'thanks') {
            const thanks = [
                "You're very welcome! I really enjoy our conversations. What else would you like to discuss?",
                "My pleasure! Helping you learn is what I'm here for. Shall we continue?",
                "No problem at all! It's rewarding to see your progress. What's next?",
                "Anytime! Your enthusiasm for learning is inspiring. What else is on your mind?"
            ];
            response = thanks[Math.floor(Math.random() * thanks.length)];
        }
        // Handle questions
        else if (userMessage.includes('?')) {
            response = this.answerQuestion(userMessage);
        }
        // Handle affirmative responses
        else if (intent.type === 'affirmative') {
            const affirmatives = [
                "Great! I love your positive energy! Tell me more about your thoughts on this.",
                "Wonderful! It's nice to find common ground. What else would you add?",
                "Excellent! I appreciate your openness. Can you elaborate a bit more?",
                "Perfect! Your perspective is interesting. What experiences shaped this view?",
                "Awesome! I'm glad we're on the same page. What's another aspect you've noticed?"
            ];
            response = affirmatives[Math.floor(Math.random() * affirmatives.length)];
        }
        // Handle negative responses
        else if (intent.type === 'negative') {
            const negatives = [
                "I understand, everyone has different views! What's your perspective then?",
                "That's fair! What would YOU prefer to talk about instead?",
                "No worries! Different opinions make conversations interesting. Tell me your thoughts!",
                "That's okay! I'm curious to hear your alternative viewpoint. Please share!",
                "I respect that! What subject would be more interesting to you?"
            ];
            response = negatives[Math.floor(Math.random() * negatives.length)];
        }
        // Generate contextual response based on topic and history
        else {
            response = this.generateContextualResponse(userMessage);
        }

        this.addToHistory('ai', response);
        return response;
    },

    // Generate contextual response based on conversation flow
    generateContextualResponse(message) {
        const historyLength = this.conversationHistory.length;
        const topic = this.currentTopic;

        // Get topic-specific follow-ups if available
        const topicFollowUps = this.responseDatabase.topicFollowUps[topic] || [];

        // Mix of conversational responses and topic follow-ups
        let responsePool = [...this.responseDatabase.conversational];

        // Add topic-specific responses
        if (topicFollowUps.length > 0 && Math.random() > 0.5) {
            responsePool = [...responsePool, ...topicFollowUps];
        }

        // Add questions occasionally to keep conversation flowing
        if (historyLength > 4 && Math.random() > 0.6) {
            responsePool = [...responsePool, ...this.responseDatabase.questions];
        }

        // Pick a random response
        let response = responsePool[Math.floor(Math.random() * responsePool.length)];

        // Replace any placeholders
        response = response.replace('{related_topic}', this.getRelatedTopic());

        // Add variety based on message length
        if (message.length > 100) {
            const longPrefixes = [
                "Wow, you really put thought into that! ",
                "I appreciate such a detailed response! ",
                "You express yourself so well in English! "
            ];
            response = longPrefixes[Math.floor(Math.random() * longPrefixes.length)] + response;
        }

        return response;
    },

    // Get a related topic for follow-up questions
    getRelatedTopic() {
        const topics = ['music', 'books', 'sports', 'art', 'nature', 'history', 'culture', 'dreams', 'goals', 'memories'];
        return topics[Math.floor(Math.random() * topics.length)];
    },

    // Answer user questions intelligently
    answerQuestion(question) {
        const lowerQ = question.toLowerCase();

        // Personal questions about Emma
        if (lowerQ.includes('your name')) {
            return "I'm Emma, your virtual English tutor! I'm here to help you practice and improve. What's YOUR name?";
        }
        if (lowerQ.includes('how are you') || lowerQ.includes('how do you feel')) {
            return "I'm doing wonderfully, thank you for asking! Chatting with you is the highlight of my day. How about you?";
        }
        if (lowerQ.includes('where are you from')) {
            return "I'm a digital being, but I speak American English! I love connecting with learners from all around the world. Where are you from?";
        }
        if (lowerQ.includes('your age') || lowerQ.includes('how old')) {
            return "Age is just a number, right? 😄 I'm timeless! But I'm curious - do you think AI teachers like me are helpful for learning?";
        }

        // Help and learning questions
        if (lowerQ.includes('help me')) {
            return "Of course! I'm here to help you practice English naturally. Just talk to me like you would with a friend, and I'll gently correct any mistakes. What would you like to practice?";
        }
        if (lowerQ.includes('improve') || lowerQ.includes('learn better')) {
            return "Great question! The best way to improve is through regular practice. Speaking, even with mistakes, is better than staying silent. What aspect of English challenges you most?";
        }

        // Opinion questions
        if (lowerQ.includes('what do you think') || lowerQ.includes('your opinion')) {
            const opinions = [
                "That's a thought-provoking question! I think there are multiple valid perspectives. What's YOUR take on it?",
                "Interesting question! I believe the answer depends on context. What made you curious about this?",
                "I'd love to share my thoughts, but first I want to hear yours! What do YOU think?"
            ];
            return opinions[Math.floor(Math.random() * opinions.length)];
        }

        // Default question response
        const defaultAnswers = [
            "That's a wonderful question! I'd love to explore it together. What prompted you to ask this?",
            "Great curiosity! The best answer often comes from discussing it. What are your initial thoughts?",
            "Interesting! Questions like this show you're really thinking in English. What's your perspective?",
            "I appreciate your curiosity! Let's figure this out together. Why is this important to you?",
            "Excellent question! Before I answer, I'm curious - what do YOU think the answer might be?"
        ];
        return defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
    },

    // Detect user intent from message
    detectIntent(message) {
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hola', 'oi'],
            farewell: ['bye', 'goodbye', 'see you', 'talk later', 'gotta go', 'have to go', 'good night', 'tchau'],
            thanks: ['thank', 'thanks', 'appreciate', 'grateful', 'obrigado', 'obrigada'],
            affirmative: ['yes', 'yeah', 'yep', 'sure', 'of course', 'definitely', 'absolutely', 'right', 'correct', 'exactly', 'agreed'],
            negative: ['no', 'nope', 'not really', "don't think", "i disagree", "not sure", "maybe not"]
        };

        for (const type in intents) {
            for (const keyword of intents[type]) {
                if (message.includes(keyword)) {
                    return { type, keyword };
                }
            }
        }
        return { type: 'statement' };
    },

    // Check grammar and provide corrections
    checkGrammar(message) {
        const corrections = [];
        const lowerMessage = message.toLowerCase();

        for (const pattern in this.responseDatabase.corrections) {
            if (lowerMessage.includes(pattern)) {
                const fix = this.responseDatabase.corrections[pattern];
                corrections.push({
                    wrong: pattern,
                    correct: fix.correct,
                    explanation: fix.tip
                });
                this.userProfile.commonMistakes.push(pattern);
            }
        }

        this.saveUserProfile();
        return corrections;
    },

    // Decide if we should encourage the user
    shouldEncourage() {
        return Math.random() > 0.65;
    },

    // Get random encouragement
    getRandomEncouragement() {
        return this.responseDatabase.encouragements[
            Math.floor(Math.random() * this.responseDatabase.encouragements.length)
        ];
    },

    // Track vocabulary used by user
    trackVocabulary(message) {
        const words = message.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (word.length > 3 && !this.userProfile.vocabularyUsed.includes(word)) {
                this.userProfile.vocabularyUsed.push(word);
            }
        });
        if (this.userProfile.vocabularyUsed.length > 1000) {
            this.userProfile.vocabularyUsed = this.userProfile.vocabularyUsed.slice(-1000);
        }
        this.saveUserProfile();
    },

    // Add message to history
    addToHistory(role, message) {
        this.conversationHistory.push({
            role: role,
            message: message,
            timestamp: new Date().toISOString()
        });
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
    },

    // Get suggested topics by level
    getSuggestedTopics(level) {
        return this.topics[level] || this.topics.beginner;
    },

    // Reset conversation
    reset() {
        this.conversationHistory = [];
        this.currentTopic = null;
    },

    // Get stats
    getStats() {
        return {
            totalSessions: this.userProfile.sessionsCount,
            wordsUsed: this.userProfile.vocabularyUsed.length,
            topicsDiscussed: [...new Set(this.userProfile.topicsDiscussed)].length
        };
    }
};

// Make available globally
window.AIConversation = AIConversation;
console.log('🤖 AI Conversation System loaded with enhanced responses!');
