// ===== AI CONVERSATION SYSTEM =====
// Real-time English conversation practice with AI tutor

const AIConversation = {
    // Current conversation state
    currentLevel: 'beginner', // beginner, intermediate, advanced
    currentTopic: null,
    conversationHistory: [],
    userProfile: {
        commonMistakes: [],
        vocabularyUsed: [],
        topicsDiscussed: [],
        sessionsCount: 0
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
            { id: 'directions', name: '🗺️ Asking Directions', icon: '🗺️' }
        ],
        intermediate: [
            { id: 'travel', name: '✈️ Travel & Vacations', icon: '✈️' },
            { id: 'work', name: '💼 Work & Career', icon: '💼' },
            { id: 'health', name: '🏥 Health & Fitness', icon: '🏥' },
            { id: 'movies', name: '🎬 Movies & Entertainment', icon: '🎬' },
            { id: 'technology', name: '💻 Technology', icon: '💻' },
            { id: 'environment', name: '🌍 Environment', icon: '🌍' },
            { id: 'culture', name: '🎭 Culture & Traditions', icon: '🎭' },
            { id: 'education', name: '📚 Education', icon: '📚' }
        ],
        advanced: [
            { id: 'politics', name: '🏛️ Politics & Society', icon: '🏛️' },
            { id: 'philosophy', name: '🤔 Philosophy & Ideas', icon: '🤔' },
            { id: 'business', name: '📊 Business & Economics', icon: '📊' },
            { id: 'science', name: '🔬 Science & Innovation', icon: '🔬' },
            { id: 'psychology', name: '🧠 Psychology', icon: '🧠' },
            { id: 'debate', name: '⚖️ Debates & Opinions', icon: '⚖️' },
            { id: 'literature', name: '📖 Literature & Arts', icon: '📖' },
            { id: 'future', name: '🚀 Future & Technology', icon: '🚀' }
        ]
    },

    // AI personality and conversation starters
    aiPersonality: {
        name: 'Emma',
        role: 'Native English Teacher',
        traits: ['friendly', 'patient', 'encouraging', 'helpful']
    },

    // Conversation templates by topic
    conversationTemplates: {
        greetings: {
            starters: [
                "Hi there! I'm Emma, your English conversation partner. What's your name?",
                "Hello! Nice to meet you! How are you doing today?",
                "Hey! Welcome to our English practice session! Tell me about yourself."
            ],
            responses: {
                name: [
                    "Nice to meet you, {name}! That's a lovely name. Where are you from?",
                    "Great to meet you, {name}! How long have you been learning English?",
                    "{name}, what a nice name! What do you like to do in your free time?"
                ],
                feeling: [
                    "I'm glad to hear that! What made your day good?",
                    "I hope things get better! Would you like to talk about something fun to cheer up?",
                    "That's wonderful! Do you have any plans for today?"
                ],
                location: [
                    "Oh, {location} sounds interesting! What's the weather like there?",
                    "I've heard great things about {location}! What do you like most about living there?",
                    "{location}! That's cool. Is it a big city or a small town?"
                ]
            },
            vocabulary: ['hello', 'hi', 'nice to meet you', 'how are you', 'fine', 'great', 'my name is', 'I am from'],
            corrections: {
                'i am': "Remember to capitalize 'I' - it should be 'I am'",
                'im': "The correct form is 'I'm' or 'I am'",
                'i m': "Use 'I'm' (with apostrophe) as a contraction"
            }
        },
        family: {
            starters: [
                "Let's talk about family! Do you have a big or small family?",
                "Family is so important! Tell me about your family.",
                "I'd love to hear about the people close to you. Who lives with you?"
            ],
            responses: {
                size: [
                    "A {size} family sounds {adjective}! Do you have any brothers or sisters?",
                    "That's nice! Are you close with your family members?",
                    "Family gatherings must be {adjective}! What do you usually do together?"
                ],
                siblings: [
                    "Having {number} sibling(s) must be fun! Are you the oldest or youngest?",
                    "Do you get along well with your sibling(s)?",
                    "That's great! What activities do you do together?"
                ]
            },
            vocabulary: ['mother', 'father', 'brother', 'sister', 'parents', 'siblings', 'grandmother', 'grandfather'],
            followUp: [
                "What does your {member} do for work?",
                "Do you look like your {member}?",
                "What's your favorite memory with your family?"
            ]
        },
        food: {
            starters: [
                "I love talking about food! What's your favorite dish?",
                "Are you hungry? Let's talk about delicious food!",
                "Food is one of my favorite topics! Do you like cooking?"
            ],
            responses: {
                favorite: [
                    "{food} is delicious! Do you know how to cook it?",
                    "Yum! I love {food} too! What restaurant makes the best one?",
                    "That sounds tasty! Is it a traditional dish from your country?"
                ],
                cooking: [
                    "That's impressive! What's your specialty dish?",
                    "I love home cooking! What did you cook recently?",
                    "Do you prefer cooking at home or eating out?"
                ]
            },
            vocabulary: ['delicious', 'tasty', 'cook', 'recipe', 'ingredients', 'restaurant', 'breakfast', 'lunch', 'dinner'],
            scenarios: [
                "Imagine we're at a restaurant. How would you order your food?",
                "Let's practice: You want to ask for the menu. What do you say?",
                "Role play: I'm a waiter. What would you like to order?"
            ]
        },
        travel: {
            starters: [
                "I love traveling! Have you ever been to another country?",
                "Let's dream about travel! Where would you like to go?",
                "Traveling opens your mind! What's the best trip you've ever taken?"
            ],
            responses: {
                destination: [
                    "{place} is amazing! What would you like to see there?",
                    "I've always wanted to visit {place}! What attracts you to it?",
                    "Great choice! Do you prefer beaches, mountains, or cities?"
                ],
                experience: [
                    "That sounds like an incredible experience! What was the highlight?",
                    "Wow! Did you try any local food there?",
                    "Amazing! Did you face any language barriers?"
                ]
            },
            vocabulary: ['flight', 'hotel', 'passport', 'luggage', 'tourist', 'adventure', 'culture', 'explore'],
            scenarios: [
                "Let's practice checking in at a hotel. What would you say?",
                "Imagine you're lost in a foreign city. How do you ask for help?",
                "You want to book a flight. What information do you need?"
            ]
        },
        work: {
            starters: [
                "Let's talk about careers! What do you do for a living?",
                "Work takes up a lot of our time! Do you enjoy your job?",
                "Career goals are important! What's your dream job?"
            ],
            responses: {
                job: [
                    "Being a {job} sounds interesting! What do you like most about it?",
                    "That's a great profession! What does a typical day look like for you?",
                    "{job}! That requires skill. How did you get into that field?"
                ],
                goals: [
                    "That's an ambitious goal! What steps are you taking to achieve it?",
                    "I believe you can do it! What skills do you need to develop?",
                    "Great ambition! Have you made a plan to reach that goal?"
                ]
            },
            vocabulary: ['salary', 'interview', 'resume', 'colleague', 'deadline', 'meeting', 'promotion', 'skills'],
            scenarios: [
                "Let's practice a job interview! Tell me about yourself.",
                "You need to ask for a day off. How do you approach your boss?",
                "Practice: You want to negotiate a higher salary. What do you say?"
            ]
        },
        technology: {
            starters: [
                "Technology is everywhere! What gadgets do you use daily?",
                "Let's talk tech! Are you into smartphones, computers, or gaming?",
                "The digital age is amazing! How has technology changed your life?"
            ],
            responses: {
                devices: [
                    "I love my {device} too! What do you use it for most?",
                    "Technology makes life easier! What app can't you live without?",
                    "That's cool! Do you consider yourself tech-savvy?"
                ],
                opinions: [
                    "That's an interesting perspective! Do you think AI will change everything?",
                    "I agree/disagree! What about privacy concerns?",
                    "Technology has pros and cons. What worries you about it?"
                ]
            },
            vocabulary: ['smartphone', 'laptop', 'internet', 'software', 'application', 'download', 'upload', 'wireless'],
            debates: [
                "Do you think social media is good or bad for society?",
                "Will robots take our jobs in the future?",
                "Is it okay to spend many hours on your phone?"
            ]
        }
    },

    // Grammar correction patterns
    grammarPatterns: {
        subjectVerb: {
            'i is': { correct: 'I am', explanation: "Use 'am' with 'I'" },
            'he are': { correct: 'He is', explanation: "Use 'is' with he/she/it" },
            'they is': { correct: 'They are', explanation: "Use 'are' with they/we/you" },
            'she have': { correct: 'She has', explanation: "Use 'has' with he/she/it" },
            'he have': { correct: 'He has', explanation: "Use 'has' with he/she/it" }
        },
        articles: {
            'a apple': { correct: 'an apple', explanation: "Use 'an' before vowel sounds" },
            'a hour': { correct: 'an hour', explanation: "Use 'an' before silent 'h'" },
            'an book': { correct: 'a book', explanation: "Use 'a' before consonant sounds" }
        },
        tenses: {
            'yesterday i go': { correct: 'Yesterday I went', explanation: "Use past tense for past actions" },
            'i am go': { correct: 'I am going / I go', explanation: "Use 'going' for continuous or base form for simple" },
            'he dont': { correct: "He doesn't", explanation: "Use 'doesn't' with he/she/it" }
        }
    },

    // Encouraging phrases
    encouragement: [
        "Great job! Your English is improving! 🌟",
        "Excellent sentence structure! Keep it up! 👏",
        "You're doing wonderfully! 💪",
        "That's a great way to express that! ✨",
        "I love how you used that word! 🎯",
        "Your pronunciation would be perfect! 👍",
        "You're making fantastic progress! 🚀"
    ],

    // Initialize conversation
    init() {
        this.loadUserProfile();
        this.conversationHistory = [];
    },

    // Load user profile from localStorage
    loadUserProfile() {
        const saved = localStorage.getItem('aiConversationProfile');
        if (saved) {
            this.userProfile = JSON.parse(saved);
        }
    },

    // Save user profile
    saveUserProfile() {
        localStorage.setItem('aiConversationProfile', JSON.stringify(this.userProfile));
    },

    // Start a new conversation
    startConversation(topic, level) {
        this.currentTopic = topic;
        this.currentLevel = level;
        this.conversationHistory = [];
        this.userProfile.sessionsCount++;
        this.userProfile.topicsDiscussed.push(topic);
        this.saveUserProfile();

        const template = this.conversationTemplates[topic];
        if (template) {
            const starter = template.starters[Math.floor(Math.random() * template.starters.length)];
            this.addToHistory('ai', starter);
            return starter;
        }

        return this.getGenericStarter(topic);
    },

    // Get generic starter for topics without templates
    getGenericStarter(topic) {
        const starters = [
            `Let's talk about ${topic}! What do you think about it?`,
            `I'm curious about your thoughts on ${topic}. Share with me!`,
            `${topic} is interesting! What's your experience with it?`
        ];
        const starter = starters[Math.floor(Math.random() * starters.length)];
        this.addToHistory('ai', starter);
        return starter;
    },

    // Process user message and generate response
    processMessage(userMessage) {
        // Add to history
        this.addToHistory('user', userMessage);

        // Check for grammar issues
        const corrections = this.checkGrammar(userMessage);

        // Generate AI response
        const response = this.generateResponse(userMessage);

        // Add vocabulary to user profile
        this.trackVocabulary(userMessage);

        return {
            response: response,
            corrections: corrections,
            encouragement: this.shouldEncourage() ? this.getEncouragement() : null
        };
    },

    // Check grammar in user message
    checkGrammar(message) {
        const corrections = [];
        const lowerMessage = message.toLowerCase();

        // Check all grammar patterns
        for (const category in this.grammarPatterns) {
            for (const pattern in this.grammarPatterns[category]) {
                if (lowerMessage.includes(pattern)) {
                    const fix = this.grammarPatterns[category][pattern];
                    corrections.push({
                        wrong: pattern,
                        correct: fix.correct,
                        explanation: fix.explanation
                    });
                    this.userProfile.commonMistakes.push(pattern);
                }
            }
        }

        // Check topic-specific corrections
        const template = this.conversationTemplates[this.currentTopic];
        if (template && template.corrections) {
            for (const pattern in template.corrections) {
                if (lowerMessage.includes(pattern)) {
                    corrections.push({
                        wrong: pattern,
                        correct: template.corrections[pattern],
                        explanation: template.corrections[pattern]
                    });
                }
            }
        }

        this.saveUserProfile();
        return corrections;
    },

    // Generate AI response based on context
    generateResponse(userMessage) {
        const template = this.conversationTemplates[this.currentTopic];
        const lowerMessage = userMessage.toLowerCase();
        const historyLength = this.conversationHistory.length;

        // Detect message intent
        const intent = this.detectIntent(lowerMessage);

        // Generate contextual response
        let response = '';

        // Check for questions
        if (userMessage.includes('?')) {
            response = this.answerQuestion(userMessage);
        }
        // Check for specific intents
        else if (intent.type === 'greeting') {
            response = "Hello! It's great to chat with you! " + this.getFollowUpQuestion();
        }
        else if (intent.type === 'farewell') {
            response = "It was wonderful talking to you! Keep practicing your English. See you next time! 👋";
        }
        else if (intent.type === 'thanks') {
            response = "You're welcome! I'm happy to help. " + this.getFollowUpQuestion();
        }
        else if (intent.type === 'affirmative') {
            response = this.respondToAffirmative();
        }
        else if (intent.type === 'negative') {
            response = this.respondToNegative();
        }
        // Generate topic-based response
        else if (template) {
            response = this.getTopicResponse(userMessage, template);
        }
        // Fallback response
        else {
            response = this.getFallbackResponse(userMessage);
        }

        // Add follow-up for conversation flow
        if (historyLength > 2 && historyLength % 4 === 0) {
            response += " " + this.getRandomFollowUp();
        }

        this.addToHistory('ai', response);
        return response;
    },

    // Detect user intent
    detectIntent(message) {
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
            farewell: ['bye', 'goodbye', 'see you', 'talk later', 'gotta go', 'have to go'],
            thanks: ['thank', 'thanks', 'appreciate', 'grateful'],
            affirmative: ['yes', 'yeah', 'yep', 'sure', 'of course', 'definitely', 'absolutely'],
            negative: ['no', 'nope', 'not really', "don't", "cant", "won't"],
            question: ['what', 'where', 'when', 'why', 'how', 'who', 'which', 'can you', 'could you']
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

    // Get topic-specific response
    getTopicResponse(message, template) {
        const responses = [
            "That's really interesting! Tell me more about that.",
            "I see! What made you think that way?",
            "Great point! How does that make you feel?",
            "Fascinating! Can you give me an example?",
            "I understand! What else can you share about this?",
            "That's a good observation! What do you think about...?",
            "Interesting perspective! Have you always felt this way?"
        ];

        // Try to use template responses
        if (template.responses) {
            const keys = Object.keys(template.responses);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const templateResponses = template.responses[randomKey];
            if (templateResponses && templateResponses.length > 0) {
                let response = templateResponses[Math.floor(Math.random() * templateResponses.length)];
                // Replace placeholders if possible
                response = response.replace('{name}', 'friend');
                response = response.replace('{location}', 'your place');
                response = response.replace('{food}', 'that');
                response = response.replace('{place}', 'there');
                response = response.replace('{job}', 'your job');
                return response;
            }
        }

        // Use scenarios occasionally
        if (template.scenarios && Math.random() > 0.7) {
            return template.scenarios[Math.floor(Math.random() * template.scenarios.length)];
        }

        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Answer user questions
    answerQuestion(question) {
        const lowerQ = question.toLowerCase();

        if (lowerQ.includes('your name')) {
            return "My name is Emma! I'm your English conversation partner. What's your name?";
        }
        if (lowerQ.includes('how are you')) {
            return "I'm doing great, thanks for asking! I love helping people learn English. How about you?";
        }
        if (lowerQ.includes('where are you from')) {
            return "I'm a virtual teacher, but I speak American English! Where are you from?";
        }
        if (lowerQ.includes('help me')) {
            return "Of course! I'm here to help you practice English. Just talk to me naturally, and I'll correct any mistakes and help you improve!";
        }
        if (lowerQ.includes('what should')) {
            return "That's a great question! It depends on what you want to achieve. What's your goal?";
        }

        // Default question response
        const answers = [
            "That's a great question! Let me think... What's your opinion on this?",
            "Interesting question! I'd love to hear what YOU think first!",
            "Good question! There are many ways to look at it. What do you believe?",
            "I appreciate your curiosity! Why did you ask that?"
        ];
        return answers[Math.floor(Math.random() * answers.length)];
    },

    // Respond to affirmative statements
    respondToAffirmative() {
        const responses = [
            "Great! Tell me more about it!",
            "Wonderful! I'm glad to hear that. What else?",
            "Excellent! Can you elaborate on that?",
            "Perfect! That's interesting. Why do you feel that way?",
            "Awesome! I'd love to hear more details!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Respond to negative statements
    respondToNegative() {
        const responses = [
            "I understand. Would you like to talk about something else?",
            "That's okay! Let's explore a different angle. What about...?",
            "No problem! Is there something you'd prefer to discuss?",
            "I see. Can you tell me why you feel that way?",
            "That's fine! What would you like to talk about instead?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Get fallback response
    getFallbackResponse(message) {
        const responses = [
            "That's interesting! Can you tell me more about that?",
            "I'd love to understand better. Could you explain?",
            "Fascinating! What made you think of that?",
            "Tell me more! I'm curious about your thoughts.",
            "That's a good point! How does it relate to your life?",
            "I appreciate you sharing that! What else is on your mind?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    // Get follow-up question
    getFollowUpQuestion() {
        const questions = [
            "What would you like to talk about?",
            "Is there anything specific you'd like to practice?",
            "What's on your mind today?",
            "What topics interest you?",
            "How can I help you improve today?"
        ];
        return questions[Math.floor(Math.random() * questions.length)];
    },

    // Get random follow-up to maintain conversation
    getRandomFollowUp() {
        const followUps = [
            "By the way, have I mentioned how well you're doing?",
            "That reminds me of something interesting...",
            "Speaking of which, what else interests you?",
            "On another note, how's your day going?",
            "Also, I'm curious about your thoughts on something else..."
        ];
        return followUps[Math.floor(Math.random() * followUps.length)];
    },

    // Should give encouragement
    shouldEncourage() {
        return Math.random() > 0.6;
    },

    // Get encouragement phrase
    getEncouragement() {
        return this.encouragement[Math.floor(Math.random() * this.encouragement.length)];
    },

    // Track vocabulary used
    trackVocabulary(message) {
        const words = message.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (word.length > 3 && !this.userProfile.vocabularyUsed.includes(word)) {
                this.userProfile.vocabularyUsed.push(word);
            }
        });
        // Keep only last 1000 words
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
        // Keep only last 50 messages
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
    },

    // Get conversation statistics
    getStats() {
        return {
            totalSessions: this.userProfile.sessionsCount,
            wordsUsed: this.userProfile.vocabularyUsed.length,
            topicsDiscussed: [...new Set(this.userProfile.topicsDiscussed)].length,
            commonMistakes: this.userProfile.commonMistakes.slice(-10)
        };
    },

    // Get suggested topics based on level
    getSuggestedTopics(level) {
        return this.topics[level] || this.topics.beginner;
    },

    // Reset conversation
    reset() {
        this.conversationHistory = [];
        this.currentTopic = null;
    }
};

// Make available globally
window.AIConversation = AIConversation;
console.log('🤖 AI Conversation System loaded!');
