// ===== APP STATE =====
let state = {
    currentLevel: 'beginner',
    currentWordIndex: 0,
    currentPhraseCategory: 'greetings',
    streak: 0,
    totalWordsLearned: 0,
    learnedWords: { beginner: [], intermediate: [], advanced: [] },
    lastVisit: null,
    quizIndex: 0,
    quizScore: 0,
    listeningIndex: 0,
    speakingIndex: 0,
    translateIndex: 0,
    translateDirection: 'pt-en',
    assessmentIndex: 0,
    assessmentScore: 0,
    userLevel: 'A1',
    totalQuizzes: 0,
    correctAnswers: 0,
    studyStartTime: null,
    totalStudyTime: 0,
    wordsToday: 0,
    lastStudyDate: null,
    achievements: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    createParticles();
    initCategories();
    updateStats();
    updateProgress();
    showDailyTip();
    updateDashboard();
    startStudyTimer();
    registerServiceWorker();
});

// Register Service Worker for PWA
let deferredPrompt = null;

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('✅ Service Worker registrado!', reg.scope))
            .catch(err => console.log('❌ Service Worker erro:', err));
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('📱 App pronto para instalar!');
        showInstallButton();
    });

    // Check if already installed
    window.addEventListener('appinstalled', () => {
        console.log('✅ App instalado com sucesso!');
        hideInstallButton();
        showToast('🎉 App instalado! Encontre na sua tela inicial.', 'success');
    });
}

function showInstallButton() {
    // Create install banner if not exists
    if (!document.getElementById('installBanner')) {
        const banner = document.createElement('div');
        banner.id = 'installBanner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); 
                        background: linear-gradient(135deg, #6366f1, #8b5cf6); 
                        padding: 15px 25px; border-radius: 50px; 
                        box-shadow: 0 4px 20px rgba(99,102,241,0.5);
                        display: flex; align-items: center; gap: 15px; z-index: 9999;
                        animation: slideUp 0.5s ease;">
                <span style="font-size: 24px;">📱</span>
                <span style="color: white; font-weight: 600;">Instalar App</span>
                <button onclick="installApp()" style="background: white; color: #6366f1; 
                        border: none; padding: 8px 20px; border-radius: 25px; 
                        font-weight: 700; cursor: pointer;">INSTALAR</button>
                <button onclick="hideInstallButton()" style="background: transparent; 
                        border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
            </div>
        `;
        document.body.appendChild(banner);
    }
}

function hideInstallButton() {
    const banner = document.getElementById('installBanner');
    if (banner) banner.remove();
}

async function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Instalação:', outcome);
        deferredPrompt = null;
        hideInstallButton();
    } else {
        // Fallback instructions
        showToast('📱 Toque no menu do navegador (⋮) e selecione "Adicionar à tela inicial"', 'info');
    }
}

function loadState() {
    const saved = localStorage.getItem('englishMasterState');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
        checkStreak();
        resetDailyStats();
    }
}

function saveState() {
    state.lastVisit = new Date().toDateString();
    localStorage.setItem('englishMasterState', JSON.stringify(state));
}

function checkStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastVisit === yesterday) {
        state.streak++;
        showToast('🔥 Streak de ' + state.streak + ' dias!', 'success');
    } else if (state.lastVisit !== today) {
        if (state.streak > 0) state.streak = 1;
    }
    saveState();
}

function resetDailyStats() {
    const today = new Date().toDateString();
    if (state.lastStudyDate !== today) {
        state.wordsToday = 0;
        state.lastStudyDate = today;
        saveState();
    }
}

function startStudyTimer() {
    state.studyStartTime = Date.now();
    setInterval(() => {
        if (state.studyStartTime) {
            const elapsed = Math.floor((Date.now() - state.studyStartTime) / 60000);
            document.getElementById('studyTime').textContent = elapsed + 'm';
        }
    }, 60000);
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

function showDailyTip() {
    const tipEl = document.getElementById('dailyTip');
    if (tipEl && typeof dailyTips !== 'undefined') {
        const today = new Date().getDate();
        const tip = dailyTips[today % dailyTips.length];
        tipEl.querySelector('.tip-text').textContent = tip;
    }
}

function updateDashboard() {
    document.getElementById('wordsToday').textContent = state.wordsToday;
    const accuracy = state.totalQuizzes > 0
        ? Math.round((state.correctAnswers / state.totalQuizzes) * 100)
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('achievements').textContent = state.achievements.length;
}

// ===== NAVIGATION =====
function showSection(section) {
    const sections = ['heroSection', 'levelSection', 'vocabularySection', 'phrasesSection',
        'practiceSection', 'assessmentSection', 'grammarSection', 'verbsSection', 'infiniteSection', 'conversationSection', 'progressDashboard'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) {
            if (s === 'progressDashboard') {
                el.classList.toggle('hidden', section !== 'home');
            } else {
                el.classList.add('hidden');
            }
        }
    });

    if (section === 'vocabulary') {
        document.getElementById('levelSection').classList.remove('hidden');
    } else if (section === 'phrases') {
        document.getElementById('phrasesSection').classList.remove('hidden');
        loadPhrases();
    } else if (section === 'practice') {
        document.getElementById('practiceSection').classList.remove('hidden');
    } else if (section === 'assessment') {
        document.getElementById('assessmentSection').classList.remove('hidden');
        document.getElementById('assessmentIntro').classList.remove('hidden');
        document.getElementById('assessmentQuiz').classList.add('hidden');
        document.getElementById('assessmentResult').classList.add('hidden');
    } else if (section === 'grammar') {
        document.getElementById('grammarSection').classList.remove('hidden');
        showGrammarLevel('beginner');
    } else if (section === 'verbs') {
        document.getElementById('verbsSection').classList.remove('hidden');
        loadVerbs();
    } else if (section === 'infinite') {
        document.getElementById('infiniteSection').classList.remove('hidden');
    } else if (section === 'conversation') {
        document.getElementById('conversationSection').classList.remove('hidden');
        initConversation();
    } else {
        document.getElementById('heroSection').classList.remove('hidden');
        document.getElementById('progressDashboard').classList.remove('hidden');
    }
}

function goBack() {
    showSection('home');
}

function selectLevel(level) {
    state.currentLevel = level;
    state.currentWordIndex = 0;
    document.querySelectorAll('.level-card').forEach(c => c.classList.remove('active'));
    const selectedCard = document.querySelector(`[data-level="${level}"]`);
    if (selectedCard) selectedCard.classList.add('active');
    document.getElementById('levelSection').classList.add('hidden');
    document.getElementById('vocabularySection').classList.remove('hidden');
    initCategories();
    loadWord();
    saveState();
}

// ===== VOCABULARY =====
function initCategories() {
    const select = document.getElementById('categorySelect');
    if (!select) return;
    select.innerHTML = '<option value="all">Todas Categorias</option>';
    const cats = new Set();
    const vocab = vocabularyData[state.currentLevel] || [];
    vocab.forEach(w => cats.add(w.category));
    cats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

function loadWord() {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length === 0) return;

    const word = words[state.currentWordIndex];
    document.getElementById('wordCategory').textContent = word.category;
    document.getElementById('wordEnglish').textContent = word.word;
    document.getElementById('wordPhonetic').textContent = word.phonetic;
    document.getElementById('wordPortuguese').textContent = word.translation;
    document.getElementById('wordExample').textContent = `"${word.example}"`;
    document.getElementById('wordExamplePt').textContent = `"${word.examplePt}"`;
    document.getElementById('wordCounter').textContent = `${state.currentWordIndex + 1}/${words.length}`;

    document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function speakWord() {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length > 0) {
        speak(words[state.currentWordIndex].word);
    }
}

function speak(text, lang = 'en-US') {
    // Check if speech synthesis is available
    if (!('speechSynthesis' in window)) {
        showToast('🔇 Seu navegador não suporta áudio. Tente Chrome ou Safari.', 'error');
        return;
    }

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // iOS workaround: Cancel any previous speech first
    speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find an English voice
    let voices = speechSynthesis.getVoices();

    // iOS sometimes needs voices to load asynchronously
    if (voices.length === 0 && isIOS) {
        // Voices not loaded yet, wait for them
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            setVoiceAndSpeak();
        };
        // Also try to speak anyway (iOS fallback)
        setTimeout(() => {
            if (voices.length === 0) {
                try {
                    speechSynthesis.speak(utterance);
                } catch (e) {
                    console.warn('Speech failed:', e);
                }
            }
        }, 100);
    } else {
        setVoiceAndSpeak();
    }

    function setVoiceAndSpeak() {
        // Find best English voice
        const englishVoice = voices.find(v =>
            v.lang.startsWith('en') && v.localService
        ) || voices.find(v =>
            v.lang.startsWith('en')
        ) || voices.find(v =>
            v.lang === 'en-US'
        );

        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        // Error handling
        utterance.onerror = (event) => {
            console.error('Speech error:', event.error);
            if (event.error === 'not-allowed') {
                if (isIOS) {
                    showToast('📱 iPhone: Toque na tela primeiro para ativar o áudio.', 'warning');
                } else {
                    showToast('🔇 Áudio bloqueado. Interaja com a página primeiro.', 'warning');
                }
            }
        };

        // iOS workaround: Speak needs user gesture, so wrap in try-catch
        try {
            speechSynthesis.speak(utterance);

            // iOS bug: Sometimes speech stops mid-sentence, resume it
            if (isIOS) {
                const resumeInfinity = setInterval(() => {
                    if (!speechSynthesis.speaking) {
                        clearInterval(resumeInfinity);
                    } else {
                        speechSynthesis.pause();
                        speechSynthesis.resume();
                    }
                }, 5000);

                utterance.onend = () => {
                    clearInterval(resumeInfinity);
                };
            }
        } catch (e) {
            console.warn('Speech synthesis error:', e);
            if (isIOS) {
                showToast('📱 iPhone: Toque em qualquer botão primeiro para ativar o áudio.', 'warning');
            }
        }
    }
}

// iOS audio wake-up: Initialize speech on first touch
let audioInitialized = false;
document.addEventListener('touchstart', initAudioForIOS, { once: true });
document.addEventListener('click', initAudioForIOS, { once: true });

function initAudioForIOS() {
    if (audioInitialized) return;
    audioInitialized = true;

    // Wake up speech synthesis with empty utterance
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        speechSynthesis.speak(utterance);
        speechSynthesis.cancel();

        // Pre-load voices
        speechSynthesis.getVoices();
    }

    console.log('🔊 Audio initialized for iOS');
}

function nextWord() {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length > 0) {
        state.currentWordIndex = (state.currentWordIndex + 1) % words.length;
        loadWord();
        saveState();
    }
}

function previousWord() {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length > 0) {
        state.currentWordIndex = (state.currentWordIndex - 1 + words.length) % words.length;
        loadWord();
        saveState();
    }
}

function markWord(status) {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length === 0) return;

    const word = words[state.currentWordIndex];
    if (status === 'known' && !state.learnedWords[state.currentLevel].includes(word.word)) {
        state.learnedWords[state.currentLevel].push(word.word);
        state.totalWordsLearned++;
        state.wordsToday++;
        showToast('✅ Palavra aprendida!', 'success');
        checkAchievements();
    } else if (status === 'difficult') {
        showToast('📌 Marcada para revisar', 'info');
    } else if (status === 'learning') {
        showToast('📚 Continue praticando!', 'info');
    }
    updateStats();
    updateProgress();
    updateDashboard();
    saveState();
    nextWord();
}

function filterByCategory() {
    const cat = document.getElementById('categorySelect').value;
    const words = vocabularyData[state.currentLevel] || [];
    if (cat === 'all') {
        state.currentWordIndex = 0;
    } else {
        const idx = words.findIndex(w => w.category === cat);
        if (idx !== -1) state.currentWordIndex = idx;
    }
    loadWord();
}

// ===== PHRASES =====
function selectPhraseCategory(category) {
    state.currentPhraseCategory = category;
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`[data-category="${category}"]`);
    if (btn) btn.classList.add('active');
    loadPhrases();
}

function loadPhrases() {
    const container = document.getElementById('phrasesList');
    if (!container) return;
    const phrases = phrasesData[state.currentPhraseCategory] || [];
    container.innerHTML = phrases.map((p, i) => `
        <div class="phrase-card">
            <div class="phrase-content">
                <span class="phrase-english">${p.english}</span>
                <span class="phrase-portuguese">${p.portuguese}</span>
            </div>
            <div class="phrase-actions">
                <button class="btn-icon" onclick="speakPhrase('${p.english.replace(/'/g, "\\'")}')">🔊</button>
                <button class="btn-icon" onclick="practicePhrase('${p.english.replace(/'/g, "\\'")}')">🎤</button>
            </div>
        </div>
    `).join('');
}

function speakPhrase(text) {
    speak(text);
}

function practicePhrase(text) {
    document.getElementById('speakingPhrase').textContent = text;
    document.getElementById('speakingModal').classList.remove('hidden');
}

// ===== PRACTICE MODES =====
function startPractice(mode) {
    if (mode === 'listening') {
        state.listeningIndex = 0;
        document.getElementById('listeningModal').classList.remove('hidden');
        loadListening();
    } else if (mode === 'speaking') {
        state.speakingIndex = 0;
        document.getElementById('speakingModal').classList.remove('hidden');
        loadSpeaking();
    } else if (mode === 'quiz') {
        state.quizIndex = 0;
        state.quizScore = 0;
        document.getElementById('quizModal').classList.remove('hidden');
        loadQuiz();
    } else if (mode === 'translate') {
        state.translateIndex = 0;
        document.getElementById('translateModal').classList.remove('hidden');
        loadTranslation();
    }
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// Listening Practice
function loadListening() {
    const phrases = Object.values(phrasesData).flat();
    state.currentListeningPhrase = phrases[state.listeningIndex % phrases.length];
    document.getElementById('listeningInput').value = '';
    document.getElementById('listeningResult').classList.add('hidden');
}

function playListening() {
    if (state.currentListeningPhrase) {
        speak(state.currentListeningPhrase.english);
    }
}

function checkListening() {
    const input = document.getElementById('listeningInput').value.trim().toLowerCase();
    const correct = state.currentListeningPhrase.english.toLowerCase();
    const result = document.getElementById('listeningResult');
    result.classList.remove('hidden', 'result-correct', 'result-incorrect');

    state.totalQuizzes++;
    if (input === correct || similarity(input, correct) > 0.8) {
        result.classList.add('result-correct');
        result.innerHTML = `✅ Correto!<br>"${state.currentListeningPhrase.english}"`;
        state.correctAnswers++;
        state.totalWordsLearned++;
        state.wordsToday++;
    } else {
        result.classList.add('result-incorrect');
        result.innerHTML = `❌ Resposta correta:<br>"${state.currentListeningPhrase.english}"`;
    }
    updateDashboard();
    saveState();
}

function nextListening() {
    state.listeningIndex++;
    loadListening();
}

// Speaking Practice
function loadSpeaking() {
    const phrases = Object.values(phrasesData).flat();
    const phrase = phrases[state.speakingIndex % phrases.length];
    document.getElementById('speakingPhrase').textContent = phrase.english;
    document.getElementById('speakingResult').classList.add('hidden');
}

function startRecording() {
    const btn = document.getElementById('micBtn');
    const status = document.getElementById('recordingStatus');

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        if (isIOS) {
            showToast('📱 No iPhone, o reconhecimento de voz funciona melhor no Safari. Abra este link no Safari.', 'error');
        } else {
            showToast('❌ Seu navegador não suporta reconhecimento de voz. Use Chrome, Edge ou Safari.', 'error');
        }
        return;
    }

    // Check if running on HTTPS (required for speech recognition)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        showToast('⚠️ Gravação de voz requer HTTPS. Use o link do GitHub Pages.', 'error');
        return;
    }

    // Function to start recognition after permission
    function initRecognition() {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        btn.classList.add('recording');
        status.classList.remove('hidden');
        status.textContent = '🔴 Gravando... Fale agora!';

        try {
            recognition.start();
            showToast('🎤 Microfone ativado! Fale a frase em inglês.', 'info');
        } catch (e) {
            btn.classList.remove('recording');
            status.classList.add('hidden');
            if (isIOS) {
                showToast('📱 iPhone: Vá em Ajustes > Safari > Microfone e permita para este site.', 'error');
            } else {
                showToast('❌ Erro ao iniciar gravação: ' + e.message, 'error');
            }
            return;
        }

        // Timeout if no speech detected (longer for iOS)
        const timeoutDuration = isIOS ? 15000 : 10000;
        const timeout = setTimeout(() => {
            try { recognition.stop(); } catch (e) { }
            showToast('⏰ Tempo esgotado. Toque no microfone e fale novamente.', 'warning');
        }, timeoutDuration);

        recognition.onresult = (event) => {
            clearTimeout(timeout);
            const spoken = event.results[0][0].transcript;
            const confidence = event.results[0][0].confidence || 0.8; // iOS sometimes doesn't provide confidence
            const target = document.getElementById('speakingPhrase').textContent;
            const result = document.getElementById('speakingResult');
            result.classList.remove('hidden', 'result-correct', 'result-incorrect');

            const sim = similarity(spoken.toLowerCase(), target.toLowerCase());
            state.totalQuizzes++;

            if (sim > 0.7) {
                result.classList.add('result-correct');
                result.innerHTML = `✅ Excelente! (${Math.round(sim * 100)}% similar)<br>
                    🎤 Você disse: "${spoken}"<br>
                    📊 Confiança: ${Math.round(confidence * 100)}%`;
                state.correctAnswers++;
                state.wordsToday++;
            } else if (sim > 0.5) {
                result.classList.add('result-incorrect');
                result.innerHTML = `🟡 Quase lá! (${Math.round(sim * 100)}% similar)<br>
                    🎤 Você disse: "${spoken}"<br>
                    📝 Esperado: "${target}"`;
            } else {
                result.classList.add('result-incorrect');
                result.innerHTML = `🔄 Tente novamente<br>
                    🎤 Você disse: "${spoken}"<br>
                    📝 Esperado: "${target}"`;
            }
            updateDashboard();
            saveState();
        };

        recognition.onend = () => {
            clearTimeout(timeout);
            btn.classList.remove('recording');
            status.classList.add('hidden');
        };

        recognition.onerror = (event) => {
            clearTimeout(timeout);
            btn.classList.remove('recording');
            status.classList.add('hidden');

            let errorMsg = 'Erro no reconhecimento de voz';
            switch (event.error) {
                case 'no-speech':
                    errorMsg = '🔇 Nenhuma fala detectada. Fale mais alto e perto do microfone!';
                    break;
                case 'audio-capture':
                    if (isIOS) {
                        errorMsg = '📱 iPhone: Vá em Ajustes > Safari > Microfone e permita o acesso.';
                    } else {
                        errorMsg = '🎤 Microfone não encontrado. Verifique se está conectado.';
                    }
                    break;
                case 'not-allowed':
                    if (isIOS) {
                        errorMsg = '� iPhone: Permita o microfone em Ajustes > Safari > Microfone, ou toque em "Aa" na barra de endereço > Configurações do Site.';
                    } else {
                        errorMsg = '🚫 Permissão negada. Clique no cadeado na barra de endereço e permita o microfone.';
                    }
                    break;
                case 'network':
                    errorMsg = '🌐 Erro de rede. Verifique sua conexão com a internet.';
                    break;
                case 'aborted':
                    errorMsg = '⏹️ Gravação cancelada.';
                    break;
                case 'service-not-allowed':
                    if (isIOS) {
                        errorMsg = '📱 iPhone: Ative "Siri e Ditado" em Ajustes > Siri e Busca para usar o reconhecimento de voz.';
                    } else {
                        errorMsg = '❌ Serviço de reconhecimento não disponível.';
                    }
                    break;
                default:
                    errorMsg = `❌ Erro: ${event.error}. ${isIOS ? 'Tente reiniciar o Safari.' : ''}`;
            }
            showToast(errorMsg, 'error');
        };

        recognition.onspeechstart = () => {
            status.textContent = '🎙️ Ouvindo sua voz...';
        };

        recognition.onspeechend = () => {
            status.textContent = '⏳ Processando...';
        };
    }

    // iOS Safari doesn't need getUserMedia for speech recognition
    // In fact, calling getUserMedia first can cause issues on iOS
    if (isIOS || isSafari) {
        // For iOS/Safari, start recognition directly
        initRecognition();
    } else {
        // For other browsers, request microphone permission first
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    // Stop the stream immediately, we just needed permission
                    stream.getTracks().forEach(track => track.stop());
                    initRecognition();
                })
                .catch(err => {
                    console.error('Microphone error:', err);
                    let errorMsg = '🎤 Não foi possível acessar o microfone.';

                    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                        errorMsg = '🚫 Permissão de microfone negada. Clique no cadeado na barra de endereço e permita o acesso.';
                    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                        errorMsg = '🎤 Nenhum microfone encontrado. Conecte um microfone e tente novamente.';
                    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                        errorMsg = '⚠️ Microfone em uso por outro app. Feche outros apps e tente novamente.';
                    }

                    showToast(errorMsg, 'error');
                });
        } else {
            // Fallback: try to start recognition directly
            initRecognition();
        }
    }
}

function nextSpeaking() {
    state.speakingIndex++;
    loadSpeaking();
}

// Quiz
function loadQuiz() {
    const words = vocabularyData[state.currentLevel] || [];
    if (words.length === 0) return;

    if (state.quizIndex >= 10) {
        endQuiz();
        return;
    }

    const word = words[Math.floor(Math.random() * words.length)];
    document.getElementById('quizWord').textContent = word.word;
    document.getElementById('quizCounter').textContent = `Pergunta ${state.quizIndex + 1}/10`;
    document.getElementById('quizProgressBar').style.width = `${(state.quizIndex + 1) * 10}%`;
    document.getElementById('quizFeedback').classList.add('hidden');

    const options = [word.translation];
    while (options.length < 4) {
        const rand = words[Math.floor(Math.random() * words.length)].translation;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('quizOptions');
    container.innerHTML = options.map(o => `
        <button class="quiz-option" onclick="checkQuiz(this, '${o.replace(/'/g, "\\'")}', '${word.translation.replace(/'/g, "\\'")}')">${o}</button>
    `).join('');

    state.currentQuizWord = word;
}

function checkQuiz(btn, selected, correct) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(o => {
        o.disabled = true;
        if (o.textContent === correct) o.classList.add('correct');
    });

    state.totalQuizzes++;
    if (selected === correct) {
        btn.classList.add('correct');
        state.quizScore++;
        state.correctAnswers++;
    } else {
        btn.classList.add('incorrect');
    }

    updateDashboard();
    saveState();

    setTimeout(() => {
        state.quizIndex++;
        loadQuiz();
    }, 1000);
}

function endQuiz() {
    const container = document.getElementById('quizOptions');
    const feedback = document.getElementById('quizFeedback');
    container.innerHTML = '';
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
        <h3>🎉 Quiz Finalizado!</h3>
        <p>Você acertou ${state.quizScore}/10</p>
        <button class="btn btn-primary" onclick="closeModal('quizModal')">Fechar</button>
    `;
    state.totalWordsLearned += state.quizScore;
    state.wordsToday += state.quizScore;
    checkAchievements();
    updateStats();
    updateDashboard();
    saveState();
}

function speakQuizWord() {
    speak(document.getElementById('quizWord').textContent);
}

// Translation
function loadTranslation() {
    const phrases = Object.values(phrasesData).flat();
    const phrase = phrases[state.translateIndex % phrases.length];
    state.currentTranslatePhrase = phrase;

    const display = document.getElementById('translatePhrase');
    display.textContent = state.translateDirection === 'pt-en' ? phrase.portuguese : phrase.english;
    document.getElementById('translateInput').value = '';
    document.getElementById('translateResult').classList.add('hidden');
}

function setTranslateDirection(dir) {
    state.translateDirection = dir;
    document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    loadTranslation();
}

function checkTranslation() {
    const input = document.getElementById('translateInput').value.trim().toLowerCase();
    const expected = state.translateDirection === 'pt-en'
        ? state.currentTranslatePhrase.english.toLowerCase()
        : state.currentTranslatePhrase.portuguese.toLowerCase();

    const result = document.getElementById('translateResult');
    result.classList.remove('hidden', 'result-correct', 'result-incorrect');

    state.totalQuizzes++;
    if (similarity(input, expected) > 0.7) {
        result.classList.add('result-correct');
        result.innerHTML = `✅ Correto!`;
        state.correctAnswers++;
        state.wordsToday++;
    } else {
        result.classList.add('result-incorrect');
        const correct = state.translateDirection === 'pt-en'
            ? state.currentTranslatePhrase.english
            : state.currentTranslatePhrase.portuguese;
        result.innerHTML = `❌ Resposta: "${correct}"`;
    }
    updateDashboard();
    saveState();
}

function nextTranslation() {
    state.translateIndex++;
    loadTranslation();
}

// ===== ASSESSMENT =====
function startAssessment() {
    state.assessmentIndex = 0;
    state.assessmentScore = 0;
    document.getElementById('assessmentIntro').classList.add('hidden');
    document.getElementById('assessmentResult').classList.add('hidden');
    document.getElementById('assessmentQuiz').classList.remove('hidden');
    loadAssessmentQuestion();
}

function loadAssessmentQuestion() {
    if (state.assessmentIndex >= assessmentQuestions.length) {
        showAssessmentResult();
        return;
    }

    const q = assessmentQuestions[state.assessmentIndex];
    document.getElementById('assessmentCounter').textContent = `Pergunta ${state.assessmentIndex + 1}/${assessmentQuestions.length}`;
    document.getElementById('assessmentProgressBar').style.width = `${((state.assessmentIndex + 1) / assessmentQuestions.length) * 100}%`;
    document.getElementById('assessmentQuestionText').textContent = q.question;

    const container = document.getElementById('assessmentOptions');
    container.innerHTML = q.options.map((o, i) => `
        <button class="quiz-option" onclick="checkAssessment(${i}, ${q.correct})">${o}</button>
    `).join('');
}

function checkAssessment(selected, correct) {
    const options = document.querySelectorAll('#assessmentOptions .quiz-option');
    options.forEach((o, i) => {
        o.disabled = true;
        if (i === correct) o.classList.add('correct');
        if (i === selected && i !== correct) o.classList.add('incorrect');
    });

    if (selected === correct) {
        state.assessmentScore++;
    }

    setTimeout(() => {
        state.assessmentIndex++;
        loadAssessmentQuestion();
    }, 800);
}

function showAssessmentResult() {
    document.getElementById('assessmentQuiz').classList.add('hidden');
    document.getElementById('assessmentResult').classList.remove('hidden');

    const percent = Math.round((state.assessmentScore / assessmentQuestions.length) * 100);
    let level, icon, description;

    if (percent >= 90) {
        level = 'C1 Avançado';
        icon = '🏆';
        description = 'Excelente! Você tem um nível avançado de inglês. Pode se comunicar com fluência em qualquer situação.';
    } else if (percent >= 75) {
        level = 'B2 Intermediário Superior';
        icon = '🥇';
        description = 'Muito bom! Você pode se comunicar com confiança em situações diversas.';
    } else if (percent >= 60) {
        level = 'B1 Intermediário';
        icon = '🥈';
        description = 'Bom progresso! Você consegue lidar com situações cotidianas do dia a dia.';
    } else if (percent >= 40) {
        level = 'A2 Básico';
        icon = '🥉';
        description = 'Você tem uma boa base! Continue praticando para melhorar seu vocabulário.';
    } else {
        level = 'A1 Iniciante';
        icon = '🌱';
        description = 'Você está começando! Foque no vocabulário básico e frases essenciais.';
    }

    state.userLevel = level;
    document.getElementById('currentLevel').textContent = level;
    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultLevel').textContent = `Seu Nível: ${level}`;
    document.getElementById('resultDescription').textContent = description;
    document.getElementById('resultScore').textContent = `${state.assessmentScore}/${assessmentQuestions.length}`;
    document.getElementById('resultPercent').textContent = `${percent}%`;

    saveState();
}

// ===== GRAMMAR =====
function showGrammarLevel(level) {
    document.querySelectorAll('.grammar-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    const container = document.getElementById('grammarContent');
    const lessons = grammarLessons[level] || [];

    container.innerHTML = lessons.map(lesson => `
        <div class="grammar-card">
            <h3>${lesson.title}</h3>
            <p class="grammar-content">${lesson.content}</p>
            <div class="grammar-examples">
                <h4>Exemplos:</h4>
                <ul>
                    ${lesson.examples.map(ex => `<li>"${ex}"</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// ===== IRREGULAR VERBS =====
function loadVerbs() {
    const container = document.getElementById('verbsList');
    if (!container) return;

    container.innerHTML = irregularVerbs.map(v => `
        <div class="verb-row">
            <span>${v.base}</span>
            <span>${v.past}</span>
            <span>${v.participle}</span>
            <span>${v.translation}</span>
            <button class="btn-icon-small" onclick="speakVerb('${v.base}, ${v.past}, ${v.participle}')">🔊</button>
        </div>
    `).join('');
}

function searchVerbs() {
    const query = document.getElementById('verbSearch').value.toLowerCase();
    const container = document.getElementById('verbsList');

    const filtered = irregularVerbs.filter(v =>
        v.base.toLowerCase().includes(query) ||
        v.translation.toLowerCase().includes(query)
    );

    container.innerHTML = filtered.map(v => `
        <div class="verb-row">
            <span>${v.base}</span>
            <span>${v.past}</span>
            <span>${v.participle}</span>
            <span>${v.translation}</span>
            <button class="btn-icon-small" onclick="speakVerb('${v.base}, ${v.past}, ${v.participle}')">🔊</button>
        </div>
    `).join('');
}

function speakVerb(text) {
    speak(text);
}

// ===== ACHIEVEMENTS =====
function checkAchievements() {
    const newAchievements = [];

    if (state.totalWordsLearned >= 10 && !state.achievements.includes('first10')) {
        newAchievements.push({ id: 'first10', name: '🌟 Primeiras 10 palavras!' });
    }
    if (state.totalWordsLearned >= 50 && !state.achievements.includes('first50')) {
        newAchievements.push({ id: 'first50', name: '⭐ 50 palavras aprendidas!' });
    }
    if (state.totalWordsLearned >= 100 && !state.achievements.includes('first100')) {
        newAchievements.push({ id: 'first100', name: '🏅 100 palavras!' });
    }
    if (state.streak >= 7 && !state.achievements.includes('week')) {
        newAchievements.push({ id: 'week', name: '🔥 1 semana de streak!' });
    }
    if (state.streak >= 30 && !state.achievements.includes('month')) {
        newAchievements.push({ id: 'month', name: '🏆 1 mês de streak!' });
    }

    newAchievements.forEach(a => {
        state.achievements.push(a.id);
        showToast(a.name, 'success');
    });

    saveState();
}

// ===== UTILITIES =====
function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function editDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function updateStats() {
    document.getElementById('streak').textContent = state.streak;
    // Show total available words from vocabularyData
    const totalAvailable = (vocabularyData.beginner?.length || 0) +
        (vocabularyData.intermediate?.length || 0) +
        (vocabularyData.advanced?.length || 0);
    document.getElementById('totalWords').textContent = totalAvailable || state.totalWordsLearned;
    document.getElementById('currentLevel').textContent = state.userLevel || 'A1 Básico';
}

function updateProgress() {
    const totals = {
        beginner: vocabularyData.beginner?.length || 300,
        intermediate: vocabularyData.intermediate?.length || 210,
        advanced: vocabularyData.advanced?.length || 125
    };

    ['beginner', 'intermediate', 'advanced'].forEach(lvl => {
        const bar = document.getElementById(`progress${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`);
        const count = document.getElementById(`count${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`);
        const learned = state.learnedWords[lvl]?.length || 0;
        const total = totals[lvl];
        if (bar) bar.style.width = `${Math.min((learned / total) * 100, 100)}%`;
        if (count) count.textContent = `${learned}/${total}`;
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===== INFINITE MODE =====
let currentInfiniteWord = null;
let infiniteQuizData = [];
let currentQuote = null;

async function startInfiniteVocab() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('infiniteWordCard').classList.remove('hidden');
    document.getElementById('infiniteQuizCard').classList.add('hidden');
    document.getElementById('quoteCard').classList.add('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    document.getElementById('loadingSpinner').classList.remove('hidden');

    try {
        const word = await InfiniteResources.getUniqueWord();
        if (word) {
            const definition = await InfiniteResources.getWordDefinition(word);
            if (definition && definition.meanings) {
                currentInfiniteWord = {
                    word: word,
                    phonetic: definition.phonetic || '',
                    category: definition.meanings[0].partOfSpeech || 'Word',
                    definition: definition.meanings[0].definitions[0].definition,
                    example: definition.meanings[0].definitions[0].example || ''
                };

                document.getElementById('infiniteWord').textContent = word;
                document.getElementById('infinitePhonetic').textContent = currentInfiniteWord.phonetic;
                document.getElementById('infiniteCategory').textContent = currentInfiniteWord.category;
                document.getElementById('infiniteDefinition').textContent = currentInfiniteWord.definition;
                document.getElementById('infiniteExample').textContent = currentInfiniteWord.example ? `"${currentInfiniteWord.example}"` : '';
            }
        }
    } catch (e) {
        showToast('Erro ao buscar palavra. Tente novamente.', 'error');
    }

    document.getElementById('loadingSpinner').classList.add('hidden');
}

function speakInfiniteWord() {
    if (currentInfiniteWord) {
        speak(currentInfiniteWord.word);
    }
}

function nextInfiniteWord() {
    startInfiniteVocab();
}

async function startInfiniteQuiz() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('infiniteWordCard').classList.add('hidden');
    document.getElementById('infiniteQuizCard').classList.remove('hidden');
    document.getElementById('quoteCard').classList.add('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    document.getElementById('loadingSpinner').classList.remove('hidden');

    showToast('🧠 Gerando quiz... isso pode levar alguns segundos', 'info');

    try {
        const word = await InfiniteResources.getUniqueWord();
        if (word) {
            const definition = await InfiniteResources.getWordDefinition(word);
            if (definition && definition.meanings) {
                const correctDef = definition.meanings[0].definitions[0].definition;

                // Get wrong options
                const wrongWords = await InfiniteResources.getRandomWords(3);
                const wrongOptions = [];
                for (const w of wrongWords) {
                    const d = await InfiniteResources.getWordDefinition(w);
                    if (d && d.meanings) {
                        wrongOptions.push(d.meanings[0].definitions[0].definition.substring(0, 80));
                    }
                }

                const options = [correctDef.substring(0, 80), ...wrongOptions.slice(0, 3)];
                options.sort(() => Math.random() - 0.5);

                document.getElementById('infiniteQuizQuestion').textContent = `What does "${word}" mean?`;
                const container = document.getElementById('infiniteQuizOptions');
                container.innerHTML = options.map((o, i) => `
                    <button class="quiz-option" onclick="checkInfiniteQuiz(this, '${i}', '${options.indexOf(correctDef.substring(0, 80))}')">${o}</button>
                `).join('');
            }
        }
    } catch (e) {
        showToast('Erro ao gerar quiz. Tente novamente.', 'error');
    }

    document.getElementById('loadingSpinner').classList.add('hidden');
}

function checkInfiniteQuiz(btn, selected, correct) {
    const options = document.querySelectorAll('#infiniteQuizOptions .quiz-option');
    options.forEach((o, i) => {
        o.disabled = true;
        if (i == correct) o.classList.add('correct');
    });

    if (selected == correct) {
        btn.classList.add('correct');
        showToast('✅ Correto!', 'success');
        state.correctAnswers++;
    } else {
        btn.classList.add('incorrect');
        showToast('❌ Incorreto', 'error');
    }
    state.totalQuizzes++;
    updateDashboard();
    saveState();
}

function nextInfiniteQuiz() {
    startInfiniteQuiz();
}

async function loadRandomQuote() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('infiniteWordCard').classList.add('hidden');
    document.getElementById('infiniteQuizCard').classList.add('hidden');
    document.getElementById('quoteCard').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    document.getElementById('loadingSpinner').classList.remove('hidden');

    try {
        const quote = await InfiniteResources.getRandomQuote();
        if (quote) {
            currentQuote = quote;
            document.getElementById('quoteText').textContent = `"${quote.content}"`;
            document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
        }
    } catch (e) {
        showToast('Erro ao buscar citação. Tente novamente.', 'error');
    }

    document.getElementById('loadingSpinner').classList.add('hidden');
}

function speakQuote() {
    if (currentQuote) {
        speak(currentQuote.content);
    }
}

function showShareOptions() {
    document.getElementById('infiniteContent').classList.add('hidden');
    document.getElementById('shareOptions').classList.remove('hidden');
}

// ===== NEW LOCAL INFINITE FUNCTIONS =====
let currentLocalWord = null;
let currentFillBlank = null;
let localQuizQuestions = [];
let localQuizIndex = 0;

function hideAllInfiniteCards() {
    const cards = ['infiniteWordCard', 'localWordCard', 'infiniteQuizCard', 'localQuizCard',
        'fillBlankCard', 'wordOfDayCard', 'synonymCard', 'quoteCard'];
    cards.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

function startLocalVocab() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    hideAllInfiniteCards();
    document.getElementById('localWordCard').classList.remove('hidden');

    if (typeof InfiniteWordGenerator !== 'undefined') {
        currentLocalWord = InfiniteWordGenerator.getWord();
        document.getElementById('localWord').textContent = currentLocalWord.word;
        document.getElementById('localCategory').textContent = currentLocalWord.category;
        document.getElementById('localPhonetic').textContent = currentLocalWord.phonetic;
        document.getElementById('localTranslation').textContent = currentLocalWord.translation;
        document.getElementById('localExample').textContent = currentLocalWord.example;
    } else {
        showToast('Gerador de palavras não disponível', 'error');
    }
}

function speakLocalWord() {
    if (currentLocalWord) {
        speak(currentLocalWord.word);
    }
}

function nextLocalWord() {
    startLocalVocab();
}

function startLocalQuiz() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    hideAllInfiniteCards();
    document.getElementById('localQuizCard').classList.remove('hidden');

    if (typeof InfiniteWordGenerator !== 'undefined') {
        localQuizQuestions = InfiniteWordGenerator.generateQuiz(10);
        localQuizIndex = 0;
        loadLocalQuizQuestion();
    } else {
        showToast('Gerador de quiz não disponível', 'error');
    }
}

function loadLocalQuizQuestion() {
    if (localQuizIndex >= localQuizQuestions.length) {
        showToast('🎉 Quiz completo!', 'success');
        localQuizIndex = 0;
        localQuizQuestions = InfiniteWordGenerator.generateQuiz(10);
    }

    const q = localQuizQuestions[localQuizIndex];
    if (q) {
        document.getElementById('localQuizQuestion').textContent = q.question;
        const container = document.getElementById('localQuizOptions');
        container.innerHTML = q.options.map((o, i) => `
            <button class="quiz-option" onclick="checkLocalQuiz(this, ${i}, ${q.correct})">${o}</button>
        `).join('');
    }
}

function checkLocalQuiz(btn, selected, correct) {
    const options = document.querySelectorAll('#localQuizOptions .quiz-option');
    options.forEach((o, i) => {
        o.disabled = true;
        if (i === correct) o.classList.add('correct');
    });

    if (selected === correct) {
        btn.classList.add('correct');
        showToast('✅ Correto!', 'success');
        state.correctAnswers++;
    } else {
        btn.classList.add('incorrect');
        showToast('❌ Incorreto', 'error');
    }
    state.totalQuizzes++;
    updateDashboard();
    saveState();
}

function nextLocalQuiz() {
    localQuizIndex++;
    loadLocalQuizQuestion();
}

function startFillBlanks() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    hideAllInfiniteCards();
    document.getElementById('fillBlankCard').classList.remove('hidden');
    document.getElementById('fillResult').classList.add('hidden');
    document.getElementById('fillInput').value = '';

    if (typeof InfiniteWordGenerator !== 'undefined') {
        currentFillBlank = InfiniteWordGenerator.generateFillBlank();
        document.getElementById('fillSentence').textContent = currentFillBlank.sentence;
        document.getElementById('fillHint').textContent = '💡 Dica: ' + currentFillBlank.hint;
    }
}

function checkFillBlank() {
    const input = document.getElementById('fillInput').value.trim().toLowerCase();
    const result = document.getElementById('fillResult');
    result.classList.remove('hidden');

    state.totalQuizzes++;
    if (input === currentFillBlank.answer.toLowerCase()) {
        result.className = 'fill-result result-correct';
        result.innerHTML = '✅ Correto! A resposta é: ' + currentFillBlank.answer;
        state.correctAnswers++;
        state.wordsToday++;
    } else {
        result.className = 'fill-result result-incorrect';
        result.innerHTML = '❌ A resposta correta é: ' + currentFillBlank.answer;
    }
    updateDashboard();
    saveState();
}

function nextFillBlank() {
    startFillBlanks();
}

function showWordOfDay() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    hideAllInfiniteCards();
    document.getElementById('wordOfDayCard').classList.remove('hidden');

    if (typeof InfiniteWordGenerator !== 'undefined') {
        const wod = InfiniteWordGenerator.getWordOfTheDay();
        document.getElementById('wodDate').textContent = '📅 ' + wod.date;
        document.getElementById('wodWord').textContent = wod.word;
        document.getElementById('wodTranslation').textContent = wod.translation;
    }
}

function speakWOD() {
    const word = document.getElementById('wodWord').textContent;
    if (word) speak(word);
}

const synonymBaseWords = ['big', 'small', 'good', 'bad', 'happy', 'sad', 'fast', 'slow'];
let currentSynonymWord = '';

function startSynonyms() {
    document.getElementById('infiniteContent').classList.remove('hidden');
    document.getElementById('shareOptions').classList.add('hidden');
    hideAllInfiniteCards();
    document.getElementById('synonymCard').classList.remove('hidden');

    currentSynonymWord = synonymBaseWords[Math.floor(Math.random() * synonymBaseWords.length)];
    document.getElementById('synonymWord').textContent = currentSynonymWord.charAt(0).toUpperCase() + currentSynonymWord.slice(1);

    if (typeof InfiniteWordGenerator !== 'undefined') {
        const synonyms = InfiniteWordGenerator.getSynonyms(currentSynonymWord);
        const antonym = InfiniteWordGenerator.getAntonyms(currentSynonymWord);

        document.getElementById('synonymList').innerHTML = synonyms.map(s =>
            `<span class="synonym-tag">${s}</span>`
        ).join('');
        document.getElementById('antonymWord').textContent = antonym;
    }
}

function nextSynonym() {
    startSynonyms();
}

// ===== AI CONVERSATION FUNCTIONS =====
let selectedConversationLevel = 'beginner';
let isVoiceInputActive = false;

function initConversation() {
    if (typeof AIConversation !== 'undefined') {
        AIConversation.init();
        loadTopics(selectedConversationLevel);
    }
}

function selectConversationLevel(level) {
    selectedConversationLevel = level;

    // Update button states
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('level' + level.charAt(0).toUpperCase() + level.slice(1)).classList.add('active');

    // Load topics for selected level
    loadTopics(level);
}

function loadTopics(level) {
    const topicGrid = document.getElementById('topicGrid');
    if (!topicGrid || typeof AIConversation === 'undefined') return;

    const topics = AIConversation.getSuggestedTopics(level);

    topicGrid.innerHTML = topics.map(topic => `
        <div class="topic-card" onclick="startConversationTopic('${topic.id}')">
            <span class="topic-icon">${topic.icon}</span>
            <span class="topic-name">${topic.name}</span>
        </div>
    `).join('');
}

function startConversationTopic(topicId) {
    if (typeof AIConversation === 'undefined') {
        showToast('Sistema de conversa não carregado', 'error');
        return;
    }

    // Hide setup, show chat
    document.getElementById('conversationSetup').classList.add('hidden');
    document.getElementById('chatContainer').classList.remove('hidden');

    // Clear previous messages
    document.getElementById('chatMessages').innerHTML = '';

    // Start conversation
    const starterMessage = AIConversation.startConversation(topicId, selectedConversationLevel);

    // Add AI message
    addChatMessage('ai', starterMessage);

    // Speak if auto-speak is enabled
    if (document.getElementById('autoSpeak')?.checked) {
        setTimeout(() => speak(starterMessage), 500);
    }
}

function addChatMessage(role, message) {
    const chatMessages = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;

    if (role === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">👩‍🏫</div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <button class="btn-speak-msg" onclick="speak('${message.replace(/'/g, "\\'")}')">🔊</button>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${message}</div>
            </div>
            <div class="message-avatar">👤</div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage('user', message);
    input.value = '';

    // Process with AI
    if (typeof AIConversation !== 'undefined') {
        const result = AIConversation.processMessage(message);

        // Show corrections if enabled and there are any
        if (result.corrections.length > 0 && document.getElementById('showCorrections')?.checked) {
            showGrammarCorrection(result.corrections);
        }

        // Show encouragement if any
        if (result.encouragement) {
            showEncouragement(result.encouragement);
        }

        // Add AI response with slight delay for natural feel
        setTimeout(() => {
            addChatMessage('ai', result.response);

            // Speak if auto-speak enabled
            if (document.getElementById('autoSpeak')?.checked) {
                const rate = document.getElementById('slowSpeech')?.checked ? 0.7 : 0.85;
                speakWithRate(result.response, rate);
            }
        }, 800);
    }
}

function speakWithRate(text, rate = 0.85) {
    if (!('speechSynthesis' in window)) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function showGrammarCorrection(corrections) {
    const container = document.getElementById('grammarCorrection');
    const content = document.getElementById('correctionContent');

    content.innerHTML = corrections.map(c => `
        <div class="correction-item">
            <span class="wrong">❌ "${c.wrong}"</span>
            <span class="arrow">→</span>
            <span class="correct">✅ "${c.correct}"</span>
            <p class="explanation">💡 ${c.explanation}</p>
        </div>
    `).join('');

    container.classList.remove('hidden');

    // Auto-hide after 8 seconds
    setTimeout(() => hideGrammarCorrection(), 8000);
}

function hideGrammarCorrection() {
    document.getElementById('grammarCorrection').classList.add('hidden');
}

function showEncouragement(text) {
    const container = document.getElementById('encouragement');
    document.getElementById('encouragementText').textContent = text;
    container.classList.remove('hidden');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        container.classList.add('hidden');
    }, 3000);
}

function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        showToast('Seu navegador não suporta entrada de voz', 'error');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.classList.add('recording');
    isVoiceInputActive = true;

    showToast('🎤 Fale sua mensagem em inglês...', 'info');

    try {
        recognition.start();
    } catch (e) {
        voiceBtn.classList.remove('recording');
        showToast('Erro ao iniciar reconhecimento de voz', 'error');
        return;
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('chatInput').value = transcript;
        voiceBtn.classList.remove('recording');
        isVoiceInputActive = false;

        // Auto-send after voice input
        setTimeout(() => sendChatMessage(), 300);
    };

    recognition.onerror = (event) => {
        voiceBtn.classList.remove('recording');
        isVoiceInputActive = false;

        if (event.error === 'no-speech') {
            showToast('Nenhuma fala detectada. Tente novamente.', 'warning');
        } else {
            showToast('Erro no reconhecimento: ' + event.error, 'error');
        }
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('recording');
        isVoiceInputActive = false;
    };
}

function toggleChatSettings() {
    document.getElementById('chatSettings').classList.toggle('hidden');
}

function endConversation() {
    if (typeof AIConversation !== 'undefined') {
        AIConversation.reset();
    }

    document.getElementById('chatContainer').classList.add('hidden');
    document.getElementById('conversationSetup').classList.remove('hidden');
    document.getElementById('chatMessages').innerHTML = '';

    showToast('Conversa encerrada. Escolha um novo tema!', 'info');
}

// Initialize conversation when section is shown
document.addEventListener('DOMContentLoaded', () => {
    // Will be called when conversation section is shown
});

// ===== AI CONVERSATION FUNCTIONS =====
let selectedConversationLevel = 'beginner';

function initConversation() {
    if (typeof AIConversation !== 'undefined') {
        AIConversation.init();
        loadTopics(selectedConversationLevel);
    } else {
        console.error('AIConversation not loaded!');
    }
}

function selectConversationLevel(level) {
    selectedConversationLevel = level;
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    const btnId = 'level' + level.charAt(0).toUpperCase() + level.slice(1);
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');
    loadTopics(level);
}

function loadTopics(level) {
    const topicGrid = document.getElementById('topicGrid');
    if (!topicGrid || typeof AIConversation === 'undefined') return;

    const topics = AIConversation.getSuggestedTopics(level);
    topicGrid.innerHTML = topics.map(topic => `
        <div class="topic-card" onclick="startConversationTopic('${topic.id}')">
            <span class="topic-icon">${topic.icon}</span>
            <span class="topic-name">${topic.name}</span>
        </div>
    `).join('');
}

function startConversationTopic(topicId) {
    if (typeof AIConversation === 'undefined') {
        showToast('Sistema de conversa não carregado', 'error');
        return;
    }

    document.getElementById('conversationSetup').classList.add('hidden');
    document.getElementById('chatContainer').classList.remove('hidden');
    document.getElementById('chatMessages').innerHTML = '';

    const starterMessage = AIConversation.startConversation(topicId, selectedConversationLevel);
    addChatMessage('ai', starterMessage);

    const autoSpeak = document.getElementById('autoSpeak');
    if (autoSpeak && autoSpeak.checked) {
        setTimeout(() => speak(starterMessage), 500);
    }
}

function addChatMessage(role, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;

    const safeMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');

    if (role === 'ai') {
        messageDiv.innerHTML = `
            <div class="message-avatar">👩‍🏫</div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <button class="btn-speak-msg" onclick="speak('${safeMessage}')">🔊</button>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${message}</div>
            </div>
            <div class="message-avatar">👤</div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    addChatMessage('user', message);
    input.value = '';

    if (typeof AIConversation !== 'undefined') {
        const result = await AIConversation.processMessage(message);

        const showCorrections = document.getElementById('showCorrections');
        if (result.corrections && result.corrections.length > 0 && showCorrections && showCorrections.checked) {
            showGrammarCorrection(result.corrections);
        }

        if (result.encouragement) {
            showEncouragement(result.encouragement);
        }

        setTimeout(() => {
            addChatMessage('ai', result.response);
            const autoSpeak = document.getElementById('autoSpeak');
            if (autoSpeak && autoSpeak.checked) {
                speak(result.response);
            }
        }, 600);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function showGrammarCorrection(corrections) {
    const container = document.getElementById('grammarCorrection');
    const content = document.getElementById('correctionContent');
    if (!container || !content) return;

    content.innerHTML = corrections.map(c => `
        <div class="correction-item">
            <span class="wrong">❌ "${c.wrong}"</span>
            <span class="arrow">→</span>
            <span class="correct">✅ "${c.correct}"</span>
            <p class="explanation">💡 ${c.explanation}</p>
        </div>
    `).join('');

    container.classList.remove('hidden');
    setTimeout(() => hideGrammarCorrection(), 8000);
}

function hideGrammarCorrection() {
    const el = document.getElementById('grammarCorrection');
    if (el) el.classList.add('hidden');
}

function showEncouragement(text) {
    const container = document.getElementById('encouragement');
    const textEl = document.getElementById('encouragementText');
    if (!container || !textEl) return;

    textEl.textContent = text;
    container.classList.remove('hidden');
    setTimeout(() => container.classList.add('hidden'), 3000);
}
