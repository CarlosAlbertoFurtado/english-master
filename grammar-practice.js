// ===== GRAMMAR PRACTICE SYSTEM =====
// Study grammar and verb tenses with practical situations
// Integrated with AI for infinite resources

const GrammarPractice = {
    currentTense: null,
    currentLevel: 'beginner',
    score: { correct: 0, total: 0 },

    // Initialize the grammar practice system
    init() {
        this.score = { correct: 0, total: 0 };
        this.currentLevel = 'beginner';
        console.log('📖 Grammar Practice initialized!');
    },

    // Get current stats
    getStats() {
        return {
            correct: this.score.correct,
            total: this.score.total,
            percentage: this.score.total > 0
                ? Math.round((this.score.correct / this.score.total) * 100)
                : 0
        };
    },

    // Get tenses by level
    getTensesByLevel(level) {
        const tenses = [];
        for (const [key, tense] of Object.entries(this.verbTenses)) {
            if (tense.level === level) {
                tenses.push({ id: key, ...tense });
            }
        }
        return tenses;
    },

    // Get a specific tense
    getTense(tenseId) {
        return this.verbTenses[tenseId] || null;
    },

    // All verb tenses with explanations and examples
    verbTenses: {
        // PRESENT TENSES
        presentSimple: {
            name: 'Present Simple',
            namePort: 'Presente Simples',
            icon: '📍',
            level: 'beginner',
            usage: 'Habits, routines, general truths, permanent situations',
            usagePort: 'Hábitos, rotinas, verdades gerais, situações permanentes',
            structure: {
                affirmative: 'Subject + verb (+ s/es for he/she/it)',
                negative: 'Subject + do/does + not + verb',
                question: 'Do/Does + subject + verb?'
            },
            examples: [
                { en: 'I work at a hospital.', pt: 'Eu trabalho em um hospital.', context: 'Permanent job' },
                { en: 'She speaks three languages.', pt: 'Ela fala três idiomas.', context: 'Ability' },
                { en: 'The sun rises in the east.', pt: 'O sol nasce no leste.', context: 'General truth' },
                { en: 'He doesn\'t like coffee.', pt: 'Ele não gosta de café.', context: 'Preference' },
                { en: 'Do you play tennis?', pt: 'Você joga tênis?', context: 'Asking about habits' }
            ],
            situations: [
                { situation: 'Talking about your daily routine at work', prompt: 'What time ___ you usually ___ (wake up)?', answer: 'do/wake up' },
                { situation: 'Describing a friend\'s hobby', prompt: 'My friend ___ (play) guitar every weekend.', answer: 'plays' },
                { situation: 'At the doctor - describing symptoms', prompt: 'I ___ (feel) tired all the time.', answer: 'feel' },
                { situation: 'Job interview - talking about skills', prompt: 'I ___ (speak) English and Spanish fluently.', answer: 'speak' },
                { situation: 'Describing your city', prompt: 'My city ___ (have) beautiful beaches.', answer: 'has' }
            ],
            practice: [
                { question: 'She ___ (go) to the gym every morning.', answer: 'goes', options: ['go', 'goes', 'going', 'went'] },
                { question: 'They ___ (not/watch) TV on weekdays.', answer: "don't watch", options: ["don't watch", "doesn't watch", "not watch", "watching not"] },
                { question: '___ your brother ___ (work) from home?', answer: 'Does/work', options: ['Does/work', 'Do/works', 'Is/working', 'Has/worked'] },
                { question: 'Water ___ (boil) at 100 degrees Celsius.', answer: 'boils', options: ['boil', 'boils', 'boiling', 'is boiling'] },
                { question: 'I usually ___ (drink) coffee in the morning.', answer: 'drink', options: ['drink', 'drinks', 'am drinking', 'drank'] }
            ]
        },

        presentContinuous: {
            name: 'Present Continuous',
            namePort: 'Presente Contínuo',
            icon: '🔄',
            level: 'beginner',
            usage: 'Actions happening now, temporary situations, future arrangements',
            usagePort: 'Ações acontecendo agora, situações temporárias, planos futuros',
            structure: {
                affirmative: 'Subject + am/is/are + verb-ing',
                negative: 'Subject + am/is/are + not + verb-ing',
                question: 'Am/Is/Are + subject + verb-ing?'
            },
            examples: [
                { en: 'I am studying English right now.', pt: 'Eu estou estudando inglês agora.', context: 'Current action' },
                { en: 'She is working from home this week.', pt: 'Ela está trabalhando de casa esta semana.', context: 'Temporary situation' },
                { en: 'We are meeting them tomorrow.', pt: 'Nós vamos encontrá-los amanhã.', context: 'Future arrangement' },
                { en: 'He isn\'t listening to music.', pt: 'Ele não está ouvindo música.', context: 'Negative' },
                { en: 'Are you coming to the party?', pt: 'Você vai vir à festa?', context: 'Question about plans' }
            ],
            situations: [
                { situation: 'Phone call - explaining what you\'re doing', prompt: 'Sorry, I can\'t talk now. I ___ (cook) dinner.', answer: 'am cooking' },
                { situation: 'At a coffee shop with a friend', prompt: 'Look! That man ___ (take) photos of us.', answer: 'is taking' },
                { situation: 'Making plans for the weekend', prompt: 'We ___ (have) a barbecue on Saturday. Want to come?', answer: 'are having' },
                { situation: 'At work - describing current project', prompt: 'The team ___ (develop) a new app.', answer: 'is developing' },
                { situation: 'Noticing changes in behavior', prompt: 'He ___ (act) strangely lately.', answer: 'is acting' }
            ],
            practice: [
                { question: 'I ___ (read) an interesting book at the moment.', answer: 'am reading', options: ['read', 'am reading', 'reading', 'have read'] },
                { question: 'They ___ (not/play) football today because it\'s raining.', answer: "aren't playing", options: ["aren't playing", "don't play", "not playing", "haven't played"] },
                { question: '___ she ___ (work) on the project right now?', answer: 'Is/working', options: ['Is/working', 'Does/work', 'Has/worked', 'Did/work'] },
                { question: 'The children ___ (sleep) upstairs.', answer: 'are sleeping', options: ['sleep', 'are sleeping', 'sleeps', 'sleeping'] },
                { question: 'We ___ (meet) John for lunch tomorrow.', answer: 'are meeting', options: ['meet', 'are meeting', 'will meeting', 'have met'] }
            ]
        },

        presentPerfect: {
            name: 'Present Perfect',
            namePort: 'Presente Perfeito',
            icon: '✅',
            level: 'intermediate',
            usage: 'Past actions with present relevance, experiences, unfinished time periods',
            usagePort: 'Ações passadas com relevância presente, experiências, períodos não finalizados',
            structure: {
                affirmative: 'Subject + have/has + past participle',
                negative: 'Subject + have/has + not + past participle',
                question: 'Have/Has + subject + past participle?'
            },
            examples: [
                { en: 'I have visited Paris twice.', pt: 'Eu visitei Paris duas vezes.', context: 'Life experience' },
                { en: 'She has just finished her homework.', pt: 'Ela acabou de terminar a lição.', context: 'Recent action' },
                { en: 'We have known each other for 10 years.', pt: 'Nós nos conhecemos há 10 anos.', context: 'Duration' },
                { en: 'He hasn\'t arrived yet.', pt: 'Ele ainda não chegou.', context: 'Expectation' },
                { en: 'Have you ever tried sushi?', pt: 'Você já experimentou sushi?', context: 'Life experience question' }
            ],
            situations: [
                { situation: 'Job interview - talking about experience', prompt: 'I ___ (work) in marketing for five years.', answer: 'have worked' },
                { situation: 'Explaining why you\'re upset', prompt: 'Someone ___ (steal) my phone!', answer: 'has stolen' },
                { situation: 'Asking about travel experiences', prompt: '___ you ever ___ (be) to Japan?', answer: 'Have/been' },
                { situation: 'Explaining why you\'re full', prompt: 'I ___ already ___ (eat) lunch.', answer: 'have/eaten' },
                { situation: 'Updating on a project', prompt: 'We ___ (complete) the first phase.', answer: 'have completed' }
            ],
            practice: [
                { question: 'I ___ (never/see) such a beautiful sunset.', answer: 'have never seen', options: ['never saw', 'have never seen', 'never see', 'am never seeing'] },
                { question: 'She ___ (work) here since 2015.', answer: 'has worked', options: ['works', 'worked', 'has worked', 'is working'] },
                { question: 'They ___ (not/finish) the report yet.', answer: "haven't finished", options: ["haven't finished", "didn't finish", "don't finish", "aren't finishing"] },
                { question: '___ you ___ (read) this book?', answer: 'Have/read', options: ['Have/read', 'Did/read', 'Do/read', 'Are/reading'] },
                { question: 'We ___ (know) each other for many years.', answer: 'have known', options: ['know', 'knew', 'have known', 'are knowing'] }
            ]
        },

        // PAST TENSES
        pastSimple: {
            name: 'Past Simple',
            namePort: 'Passado Simples',
            icon: '⏪',
            level: 'beginner',
            usage: 'Completed actions in the past, specific time in the past',
            usagePort: 'Ações completas no passado, momento específico no passado',
            structure: {
                affirmative: 'Subject + verb (past form)',
                negative: 'Subject + did + not + verb',
                question: 'Did + subject + verb?'
            },
            examples: [
                { en: 'I visited my grandmother last weekend.', pt: 'Eu visitei minha avó no fim de semana passado.', context: 'Completed action' },
                { en: 'She graduated in 2020.', pt: 'Ela se formou em 2020.', context: 'Specific time' },
                { en: 'We didn\'t go to the party.', pt: 'Nós não fomos à festa.', context: 'Negative' },
                { en: 'Did you call him yesterday?', pt: 'Você ligou para ele ontem?', context: 'Question' },
                { en: 'They bought a new car last month.', pt: 'Eles compraram um carro novo mês passado.', context: 'Completed action' }
            ],
            situations: [
                { situation: 'Telling a friend about your vacation', prompt: 'We ___ (travel) to Italy last summer.', answer: 'traveled' },
                { situation: 'Explaining what happened at work', prompt: 'The meeting ___ (start) late because of the rain.', answer: 'started' },
                { situation: 'Describing your childhood', prompt: 'I ___ (live) in a small town when I was young.', answer: 'lived' },
                { situation: 'Talking about yesterday', prompt: 'I ___ (not/have) time to call you yesterday.', answer: "didn't have" },
                { situation: 'Asking about someone\'s day', prompt: 'What time ___ you ___ (leave) the office?', answer: 'did/leave' }
            ],
            practice: [
                { question: 'She ___ (buy) a new dress yesterday.', answer: 'bought', options: ['buy', 'bought', 'has bought', 'was buying'] },
                { question: 'We ___ (not/see) the movie last night.', answer: "didn't see", options: ["didn't see", "don't see", "haven't seen", "weren't seeing"] },
                { question: '___ they ___ (arrive) on time?', answer: 'Did/arrive', options: ['Did/arrive', 'Have/arrived', 'Were/arriving', 'Do/arrive'] },
                { question: 'I ___ (meet) her at the conference in 2019.', answer: 'met', options: ['meet', 'met', 'have met', 'was meeting'] },
                { question: 'The train ___ (leave) five minutes ago.', answer: 'left', options: ['leave', 'left', 'has left', 'was leaving'] }
            ]
        },

        pastContinuous: {
            name: 'Past Continuous',
            namePort: 'Passado Contínuo',
            icon: '🔙',
            level: 'intermediate',
            usage: 'Actions in progress at a specific time in the past, interrupted actions',
            usagePort: 'Ações em progresso em momento específico no passado, ações interrompidas',
            structure: {
                affirmative: 'Subject + was/were + verb-ing',
                negative: 'Subject + was/were + not + verb-ing',
                question: 'Was/Were + subject + verb-ing?'
            },
            examples: [
                { en: 'I was studying when you called.', pt: 'Eu estava estudando quando você ligou.', context: 'Interrupted action' },
                { en: 'They were playing football at 5pm yesterday.', pt: 'Eles estavam jogando futebol às 5h ontem.', context: 'Action at specific time' },
                { en: 'She wasn\'t listening to the teacher.', pt: 'Ela não estava ouvindo o professor.', context: 'Negative' },
                { en: 'Were you sleeping when I arrived?', pt: 'Você estava dormindo quando eu cheguei?', context: 'Question' },
                { en: 'While she was cooking, he was cleaning.', pt: 'Enquanto ela cozinhava, ele limpava.', context: 'Parallel actions' }
            ],
            situations: [
                { situation: 'Describing an alibi', prompt: 'At 9pm, I ___ (watch) TV at home.', answer: 'was watching' },
                { situation: 'Telling a story', prompt: 'While I ___ (walk) to work, I saw an accident.', answer: 'was walking' },
                { situation: 'Explaining why you missed a call', prompt: 'Sorry, I ___ (take) a shower when you called.', answer: 'was taking' },
                { situation: 'Describing what everyone was doing', prompt: 'The kids ___ (play) while the adults ___ (talk).', answer: 'were playing/were talking' },
                { situation: 'Recounting an event', prompt: 'What ___ you ___ (do) when the earthquake happened?', answer: 'were/doing' }
            ],
            practice: [
                { question: 'She ___ (read) a book when the lights went out.', answer: 'was reading', options: ['read', 'was reading', 'has read', 'reads'] },
                { question: 'We ___ (not/watch) TV when you arrived.', answer: "weren't watching", options: ["weren't watching", "didn't watch", "don't watch", "haven't watched"] },
                { question: 'What ___ they ___ (do) at midnight?', answer: 'were/doing', options: ['were/doing', 'did/do', 'have/done', 'are/doing'] },
                { question: 'I ___ (sleep) at 3am last night.', answer: 'was sleeping', options: ['sleep', 'slept', 'was sleeping', 'have slept'] },
                { question: 'While he ___ (drive), it started to rain.', answer: 'was driving', options: ['drove', 'was driving', 'is driving', 'drives'] }
            ]
        },

        pastPerfect: {
            name: 'Past Perfect',
            namePort: 'Passado Perfeito',
            icon: '⏮️',
            level: 'advanced',
            usage: 'Actions completed before another past action',
            usagePort: 'Ações completadas antes de outra ação passada',
            structure: {
                affirmative: 'Subject + had + past participle',
                negative: 'Subject + had + not + past participle',
                question: 'Had + subject + past participle?'
            },
            examples: [
                { en: 'I had already eaten when she arrived.', pt: 'Eu já tinha comido quando ela chegou.', context: 'Completed before' },
                { en: 'They had finished the project before the deadline.', pt: 'Eles tinham terminado o projeto antes do prazo.', context: 'Earlier completion' },
                { en: 'She hadn\'t seen the movie before.', pt: 'Ela não tinha visto o filme antes.', context: 'Negative' },
                { en: 'Had you met him before the party?', pt: 'Você tinha conhecido ele antes da festa?', context: 'Question' },
                { en: 'By the time we got there, the show had started.', pt: 'Quando chegamos, o show já tinha começado.', context: 'Narrative' }
            ],
            situations: [
                { situation: 'Explaining why you weren\'t hungry', prompt: 'I wasn\'t hungry because I ___ already ___ (eat).', answer: 'had/eaten' },
                { situation: 'Narrating a sequence of events', prompt: 'After she ___ (leave), I found her wallet.', answer: 'had left' },
                { situation: 'Describing a realization', prompt: 'I realized I ___ (forget) my keys at home.', answer: 'had forgotten' },
                { situation: 'Explaining previous experience', prompt: 'It was my first time in Paris. I ___ never ___ (be) there before.', answer: 'had/been' },
                { situation: 'Telling about a disappointment', prompt: 'When I arrived, the train ___ already ___ (depart).', answer: 'had/departed' }
            ],
            practice: [
                { question: 'By the time I arrived, they ___ (leave).', answer: 'had left', options: ['left', 'have left', 'had left', 'were leaving'] },
                { question: 'She ___ (not/finish) her homework before dinner.', answer: "hadn't finished", options: ["didn't finish", "hasn't finished", "hadn't finished", "wasn't finishing"] },
                { question: '___ you ___ (see) that movie before last night?', answer: 'Had/seen', options: ['Have/seen', 'Had/seen', 'Did/see', 'Were/seeing'] },
                { question: 'I wanted to watch the game, but it ___ already ___ (start).', answer: 'had/started', options: ['has/started', 'had/started', 'was/starting', 'did/start'] },
                { question: 'They ___ (never/travel) abroad before 2020.', answer: 'had never traveled', options: ['never traveled', 'have never traveled', 'had never traveled', 'were never traveling'] }
            ]
        },

        // FUTURE TENSES
        futurSimple: {
            name: 'Future Simple (Will)',
            namePort: 'Futuro Simples (Will)',
            icon: '🔮',
            level: 'beginner',
            usage: 'Predictions, spontaneous decisions, promises, offers',
            usagePort: 'Previsões, decisões espontâneas, promessas, ofertas',
            structure: {
                affirmative: 'Subject + will + verb',
                negative: 'Subject + will + not + verb',
                question: 'Will + subject + verb?'
            },
            examples: [
                { en: 'I will help you with your homework.', pt: 'Eu vou te ajudar com seu dever.', context: 'Promise' },
                { en: 'It will rain tomorrow.', pt: 'Vai chover amanhã.', context: 'Prediction' },
                { en: 'I\'ll have the pizza, please.', pt: 'Eu vou querer a pizza, por favor.', context: 'Spontaneous decision' },
                { en: 'She won\'t be late.', pt: 'Ela não vai se atrasar.', context: 'Negative' },
                { en: 'Will you marry me?', pt: 'Você vai casar comigo?', context: 'Question' }
            ],
            situations: [
                { situation: 'Making a promise to a friend', prompt: 'Don\'t worry, I ___ (call) you tonight.', answer: 'will call' },
                { situation: 'Weather forecast', prompt: 'Tomorrow ___ (be) sunny and warm.', answer: 'will be' },
                { situation: 'Offering help to someone', prompt: 'That looks heavy. I ___ (carry) it for you.', answer: 'will carry' },
                { situation: 'Making a prediction about the future', prompt: 'Technology ___ (change) our lives completely.', answer: 'will change' },
                { situation: 'Ordering at a restaurant', prompt: 'I\'ll have the salad and she ___ (have) the soup.', answer: 'will have' }
            ],
            practice: [
                { question: 'I promise I ___ (not/be) late again.', answer: "won't be", options: ["don't be", "won't be", "am not", "haven't been"] },
                { question: '___ you ___ (help) me move this table?', answer: 'Will/help', options: ['Will/help', 'Do/help', 'Are/helping', 'Have/helped'] },
                { question: 'She ___ (probably/get) the job.', answer: 'will probably get', options: ['probably gets', 'will probably get', 'probably getting', 'has probably got'] },
                { question: 'Don\'t worry, everything ___ (be) fine.', answer: 'will be', options: ['is', 'was', 'will be', 'has been'] },
                { question: 'I think it ___ (rain) later.', answer: 'will rain', options: ['rains', 'will rain', 'is raining', 'rained'] }
            ]
        },

        goingTo: {
            name: 'Future (Going to)',
            namePort: 'Futuro (Going to)',
            icon: '➡️',
            level: 'beginner',
            usage: 'Plans and intentions, predictions based on evidence',
            usagePort: 'Planos e intenções, previsões baseadas em evidências',
            structure: {
                affirmative: 'Subject + am/is/are + going to + verb',
                negative: 'Subject + am/is/are + not + going to + verb',
                question: 'Am/Is/Are + subject + going to + verb?'
            },
            examples: [
                { en: 'I am going to study medicine.', pt: 'Eu vou estudar medicina.', context: 'Plan/intention' },
                { en: 'Look at those clouds! It\'s going to rain.', pt: 'Olhe aquelas nuvens! Vai chover.', context: 'Prediction with evidence' },
                { en: 'They are going to get married next year.', pt: 'Eles vão se casar ano que vem.', context: 'Future plan' },
                { en: 'She isn\'t going to come to the party.', pt: 'Ela não vai vir à festa.', context: 'Negative' },
                { en: 'Are you going to travel this summer?', pt: 'Você vai viajar neste verão?', context: 'Question about plans' }
            ],
            situations: [
                { situation: 'Sharing your career plans', prompt: 'After graduation, I ___ (work) for a tech company.', answer: 'am going to work' },
                { situation: 'Warning someone based on what you see', prompt: 'Be careful! That box ___ (fall)!', answer: 'is going to fall' },
                { situation: 'Discussing weekend plans', prompt: 'We ___ (have) a party on Saturday.', answer: 'are going to have' },
                { situation: 'Talking about diet changes', prompt: 'I ___ (eat) more vegetables from now on.', answer: 'am going to eat' },
                { situation: 'Sharing new year resolutions', prompt: 'She ___ (learn) a new language this year.', answer: 'is going to learn' }
            ],
            practice: [
                { question: 'Look! The car ___ (crash)!', answer: 'is going to crash', options: ['will crash', 'is going to crash', 'crashes', 'crashed'] },
                { question: 'I ___ (visit) my parents next weekend.', answer: 'am going to visit', options: ['visit', 'am going to visit', 'will visit', 'visited'] },
                { question: 'They ___ (not/buy) a new car this year.', answer: "aren't going to buy", options: ["won't buy", "aren't going to buy", "don't buy", "didn't buy"] },
                { question: '___ you ___ (apply) for the job?', answer: 'Are/going to apply', options: ['Will/apply', 'Are/going to apply', 'Do/apply', 'Have/applied'] },
                { question: 'She ___ (start) her own business.', answer: 'is going to start', options: ['starts', 'is going to start', 'started', 'has started'] }
            ]
        },

        // CONDITIONALS
        conditionalZero: {
            name: 'Zero Conditional',
            namePort: 'Condicional Zero',
            icon: '🔬',
            level: 'intermediate',
            usage: 'Scientific facts, general truths, things that are always true',
            usagePort: 'Fatos científicos, verdades gerais, coisas sempre verdadeiras',
            structure: {
                affirmative: 'If + present simple, present simple',
                negative: 'If + present simple, present simple (with not)',
                question: 'Same structure in question form'
            },
            examples: [
                { en: 'If you heat water to 100°C, it boils.', pt: 'Se você aquecer água a 100°C, ela ferve.', context: 'Scientific fact' },
                { en: 'If it rains, the grass gets wet.', pt: 'Se chove, a grama fica molhada.', context: 'General truth' },
                { en: 'Plants die if they don\'t get water.', pt: 'Plantas morrem se não recebem água.', context: 'Natural law' }
            ],
            practice: [
                { question: 'If you ___ (mix) red and blue, you ___ (get) purple.', answer: 'mix/get', options: ['mix/get', 'mixed/got', 'will mix/will get', 'mixing/getting'] },
                { question: 'Water ___ (freeze) if the temperature ___ (drop) below 0°C.', answer: 'freezes/drops', options: ['freezes/drops', 'froze/dropped', 'will freeze/will drop', 'is freezing/is dropping'] }
            ]
        },

        conditionalFirst: {
            name: 'First Conditional',
            namePort: 'Primeira Condicional',
            icon: '🎯',
            level: 'intermediate',
            usage: 'Real, possible future situations',
            usagePort: 'Situações futuras reais e possíveis',
            structure: {
                affirmative: 'If + present simple, will + verb',
                negative: 'If + present simple, won\'t + verb',
                question: 'What will happen if...?'
            },
            examples: [
                { en: 'If it rains tomorrow, I will stay home.', pt: 'Se chover amanhã, eu vou ficar em casa.', context: 'Possible future' },
                { en: 'If you study hard, you will pass the exam.', pt: 'Se você estudar muito, vai passar na prova.', context: 'Likely result' },
                { en: 'I won\'t go if you don\'t come with me.', pt: 'Eu não vou se você não vier comigo.', context: 'Conditional threat' }
            ],
            situations: [
                { situation: 'Making a deal with someone', prompt: 'If you ___ (finish) your homework, I ___ (let) you play games.', answer: 'finish/will let' },
                { situation: 'Warning about consequences', prompt: 'If you ___ (not/leave) now, you ___ (miss) the train.', answer: "don't leave/will miss" },
                { situation: 'Making a promise', prompt: 'If I ___ (get) the job, I ___ (buy) you dinner.', answer: 'get/will buy' }
            ],
            practice: [
                { question: 'If she ___ (arrive) late, we ___ (start) without her.', answer: 'arrives/will start', options: ['arrives/will start', 'will arrive/start', 'arrived/would start', 'arriving/starting'] },
                { question: 'I ___ (call) you if I ___ (need) help.', answer: 'will call/need', options: ['call/need', 'will call/need', 'called/needed', 'would call/needed'] }
            ]
        },

        conditionalSecond: {
            name: 'Second Conditional',
            namePort: 'Segunda Condicional',
            icon: '💭',
            level: 'advanced',
            usage: 'Hypothetical, unlikely or imaginary situations',
            usagePort: 'Situações hipotéticas, improváveis ou imaginárias',
            structure: {
                affirmative: 'If + past simple, would + verb',
                negative: 'If + past simple, wouldn\'t + verb',
                question: 'What would you do if...?'
            },
            examples: [
                { en: 'If I won the lottery, I would travel the world.', pt: 'Se eu ganhasse na loteria, viajaria pelo mundo.', context: 'Imaginary situation' },
                { en: 'If she spoke English, she would get the job.', pt: 'Se ela falasse inglês, conseguiria o emprego.', context: 'Unreal present' },
                { en: 'What would you do if you were me?', pt: 'O que você faria se fosse eu?', context: 'Asking advice' }
            ],
            situations: [
                { situation: 'Dreaming about possibilities', prompt: 'If I ___ (have) more money, I ___ (buy) a bigger house.', answer: 'had/would buy' },
                { situation: 'Giving advice', prompt: 'If I ___ (be) you, I ___ (talk) to her about it.', answer: 'were/would talk' },
                { situation: 'Expressing regrets', prompt: 'If I ___ (know) the answer, I ___ (tell) you.', answer: 'knew/would tell' }
            ],
            practice: [
                { question: 'If I ___ (be) rich, I ___ (donate) to charity.', answer: 'were/would donate', options: ['am/will donate', 'were/would donate', 'was/donated', 'being/donating'] },
                { question: 'She ___ (accept) the job if the salary ___ (be) better.', answer: 'would accept/were', options: ['will accept/is', 'would accept/were', 'accepts/was', 'accepted/had been'] }
            ]
        }
    },

    // Initialize the grammar system
    init() {
        this.loadProgress();
        console.log('📖 Grammar Practice System initialized!');
    },

    loadProgress() {
        const saved = localStorage.getItem('grammarProgress');
        if (saved) {
            this.score = JSON.parse(saved);
        }
    },

    saveProgress() {
        localStorage.setItem('grammarProgress', JSON.stringify(this.score));
    },

    // Get all tenses by level
    getTensesByLevel(level) {
        return Object.entries(this.verbTenses)
            .filter(([key, tense]) => tense.level === level)
            .map(([key, tense]) => ({ id: key, ...tense }));
    },

    // Get a specific tense
    getTense(tenseId) {
        return this.verbTenses[tenseId];
    },

    // Generate random practice question
    getRandomQuestion(tenseId) {
        const tense = this.verbTenses[tenseId];
        if (!tense) return null;

        const questions = [...tense.practice, ...tense.situations.map(s => ({
            question: s.prompt,
            answer: s.answer,
            situation: s.situation
        }))];

        return questions[Math.floor(Math.random() * questions.length)];
    },

    // Check answer
    checkAnswer(userAnswer, correctAnswer) {
        const normalize = (str) => str.toLowerCase().trim().replace(/['']/g, "'");
        const correct = normalize(userAnswer) === normalize(correctAnswer);

        this.score.total++;
        if (correct) this.score.correct++;
        this.saveProgress();

        return correct;
    },

    // Get stats
    getStats() {
        return {
            correct: this.score.correct,
            total: this.score.total,
            percentage: this.score.total > 0 ? Math.round((this.score.correct / this.score.total) * 100) : 0
        };
    },

    // ===== AI-POWERED INFINITE QUESTION GENERATOR =====

    // Massive verb database for infinite generation
    verbDatabase: {
        regular: ['work', 'play', 'study', 'cook', 'clean', 'dance', 'listen', 'watch', 'walk', 'talk',
            'help', 'call', 'start', 'finish', 'open', 'close', 'love', 'like', 'want', 'need',
            'ask', 'answer', 'arrive', 'change', 'create', 'decide', 'explain', 'follow', 'happen',
            'improve', 'join', 'learn', 'live', 'move', 'order', 'plan', 'practice', 'remember',
            'save', 'travel', 'try', 'use', 'visit', 'wait', 'wash', 'work', 'enjoy', 'prefer'],
        irregular: {
            'be': { past: 'was/were', participle: 'been', thirdPerson: 'is' },
            'have': { past: 'had', participle: 'had', thirdPerson: 'has' },
            'do': { past: 'did', participle: 'done', thirdPerson: 'does' },
            'go': { past: 'went', participle: 'gone', thirdPerson: 'goes' },
            'get': { past: 'got', participle: 'got/gotten', thirdPerson: 'gets' },
            'make': { past: 'made', participle: 'made', thirdPerson: 'makes' },
            'say': { past: 'said', participle: 'said', thirdPerson: 'says' },
            'take': { past: 'took', participle: 'taken', thirdPerson: 'takes' },
            'come': { past: 'came', participle: 'come', thirdPerson: 'comes' },
            'see': { past: 'saw', participle: 'seen', thirdPerson: 'sees' },
            'know': { past: 'knew', participle: 'known', thirdPerson: 'knows' },
            'think': { past: 'thought', participle: 'thought', thirdPerson: 'thinks' },
            'give': { past: 'gave', participle: 'given', thirdPerson: 'gives' },
            'find': { past: 'found', participle: 'found', thirdPerson: 'finds' },
            'tell': { past: 'told', participle: 'told', thirdPerson: 'tells' },
            'write': { past: 'wrote', participle: 'written', thirdPerson: 'writes' },
            'read': { past: 'read', participle: 'read', thirdPerson: 'reads' },
            'eat': { past: 'ate', participle: 'eaten', thirdPerson: 'eats' },
            'drink': { past: 'drank', participle: 'drunk', thirdPerson: 'drinks' },
            'run': { past: 'ran', participle: 'run', thirdPerson: 'runs' },
            'speak': { past: 'spoke', participle: 'spoken', thirdPerson: 'speaks' },
            'sleep': { past: 'slept', participle: 'slept', thirdPerson: 'sleeps' },
            'swim': { past: 'swam', participle: 'swum', thirdPerson: 'swims' },
            'sing': { past: 'sang', participle: 'sung', thirdPerson: 'sings' },
            'drive': { past: 'drove', participle: 'driven', thirdPerson: 'drives' },
            'buy': { past: 'bought', participle: 'bought', thirdPerson: 'buys' },
            'bring': { past: 'brought', participle: 'brought', thirdPerson: 'brings' },
            'build': { past: 'built', participle: 'built', thirdPerson: 'builds' },
            'catch': { past: 'caught', participle: 'caught', thirdPerson: 'catches' },
            'choose': { past: 'chose', participle: 'chosen', thirdPerson: 'chooses' },
            'draw': { past: 'drew', participle: 'drawn', thirdPerson: 'draws' },
            'fall': { past: 'fell', participle: 'fallen', thirdPerson: 'falls' },
            'feel': { past: 'felt', participle: 'felt', thirdPerson: 'feels' },
            'fly': { past: 'flew', participle: 'flown', thirdPerson: 'flies' },
            'forget': { past: 'forgot', participle: 'forgotten', thirdPerson: 'forgets' },
            'grow': { past: 'grew', participle: 'grown', thirdPerson: 'grows' },
            'hear': { past: 'heard', participle: 'heard', thirdPerson: 'hears' },
            'keep': { past: 'kept', participle: 'kept', thirdPerson: 'keeps' },
            'leave': { past: 'left', participle: 'left', thirdPerson: 'leaves' },
            'lose': { past: 'lost', participle: 'lost', thirdPerson: 'loses' },
            'meet': { past: 'met', participle: 'met', thirdPerson: 'meets' },
            'pay': { past: 'paid', participle: 'paid', thirdPerson: 'pays' },
            'put': { past: 'put', participle: 'put', thirdPerson: 'puts' },
            'send': { past: 'sent', participle: 'sent', thirdPerson: 'sends' },
            'sit': { past: 'sat', participle: 'sat', thirdPerson: 'sits' },
            'spend': { past: 'spent', participle: 'spent', thirdPerson: 'spends' },
            'stand': { past: 'stood', participle: 'stood', thirdPerson: 'stands' },
            'teach': { past: 'taught', participle: 'taught', thirdPerson: 'teaches' },
            'throw': { past: 'threw', participle: 'thrown', thirdPerson: 'throws' },
            'understand': { past: 'understood', participle: 'understood', thirdPerson: 'understands' },
            'wear': { past: 'wore', participle: 'worn', thirdPerson: 'wears' },
            'win': { past: 'won', participle: 'won', thirdPerson: 'wins' }
        }
    },

    // Subjects for generation
    subjectDatabase: {
        singular: ['I', 'He', 'She', 'My friend', 'My brother', 'My sister', 'The teacher', 'The doctor', 'John', 'Maria'],
        plural: ['We', 'They', 'You', 'The students', 'My parents', 'My friends', 'The children', 'People'],
        firstPerson: ['I', 'We'],
        thirdPersonSingular: ['He', 'She', 'My friend', 'My brother', 'My sister', 'The teacher', 'The doctor', 'John', 'Maria']
    },

    // Time expressions by tense
    timeDatabase: {
        presentSimple: ['every day', 'usually', 'always', 'sometimes', 'often', 'never', 'on weekends', 'every morning', 'twice a week', 'rarely'],
        presentContinuous: ['right now', 'at the moment', 'currently', 'today', 'this week', 'these days', 'now', 'Look!'],
        presentPerfect: ['already', 'just', 'never', 'ever', 'recently', 'since 2020', 'for 5 years', 'yet', 'so far', 'lately'],
        pastSimple: ['yesterday', 'last week', 'in 2020', 'two days ago', 'last month', 'last night', 'when I was young', 'a year ago'],
        pastContinuous: ['at 7pm yesterday', 'when the phone rang', 'while you were sleeping', 'at that moment', 'all day yesterday', 'when I arrived'],
        pastPerfect: ['before I arrived', 'by the time', 'after she left', 'already', 'never before that day', 'by 2020'],
        futurSimple: ['tomorrow', 'next week', 'soon', 'later', 'next year', 'in the future', 'next month', 'someday'],
        goingTo: ['next month', 'this summer', 'soon', 'after graduation', 'next week', 'tonight', 'this weekend'],
        conditionalFirst: ['if it rains', 'if you study', 'if she calls', 'if we hurry', 'if they arrive early'],
        conditionalSecond: ['if I were rich', 'if she had time', 'if we lived there', 'if he knew', 'if they could']
    },

    // Situations for context
    situationDatabase: [
        'at work', 'at school', 'at home', 'at a restaurant', 'at the airport', 'at the hospital',
        'during a meeting', 'on vacation', 'at a party', 'in a job interview', 'at the gym',
        'shopping', 'cooking dinner', 'watching TV', 'on the phone', 'with friends'
    ],

    // Generate infinite grammar exercises - AI-POWERED
    generateInfiniteExercise(tenseId) {
        const tense = this.verbTenses[tenseId];
        if (!tense) return this.getRandomQuestion(tenseId);

        // Pick random verb
        const allVerbs = [...this.verbDatabase.regular, ...Object.keys(this.verbDatabase.irregular)];
        const verb = allVerbs[Math.floor(Math.random() * allVerbs.length)];

        // Pick random subject based on tense requirements
        const allSubjects = [...this.subjectDatabase.singular, ...this.subjectDatabase.plural];
        const subject = allSubjects[Math.floor(Math.random() * allSubjects.length)];

        // Pick time expression
        const times = this.timeDatabase[tenseId] || [''];
        const time = times[Math.floor(Math.random() * times.length)];

        // Pick situation
        const situation = this.situationDatabase[Math.floor(Math.random() * this.situationDatabase.length)];

        // Generate question and answer based on tense
        let question, answer, options;

        switch (tenseId) {
            case 'presentSimple':
                return this.generatePresentSimple(subject, verb, time, situation);
            case 'presentContinuous':
                return this.generatePresentContinuous(subject, verb, time, situation);
            case 'presentPerfect':
                return this.generatePresentPerfect(subject, verb, time, situation);
            case 'pastSimple':
                return this.generatePastSimple(subject, verb, time, situation);
            case 'pastContinuous':
                return this.generatePastContinuous(subject, verb, time, situation);
            case 'pastPerfect':
                return this.generatePastPerfect(subject, verb, time, situation);
            case 'futurSimple':
                return this.generateFutureSimple(subject, verb, time, situation);
            case 'goingTo':
                return this.generateGoingTo(subject, verb, time, situation);
            case 'conditionalFirst':
                return this.generateConditionalFirst(subject, verb, situation);
            case 'conditionalSecond':
                return this.generateConditionalSecond(subject, verb, situation);
            case 'conditionalZero':
                return this.generateConditionalZero(verb);
            default:
                return this.getRandomQuestion(tenseId);
        }
    },

    // PRESENT SIMPLE generator
    generatePresentSimple(subject, verb, time, situation) {
        const isThirdPerson = this.subjectDatabase.thirdPersonSingular.includes(subject);
        const conjugated = isThirdPerson ? this.conjugateThirdPerson(verb) : verb;
        const negativeAux = isThirdPerson ? "doesn't" : "don't";

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: conjugated },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `${negativeAux} ${verb}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) ${time}?`, a: isThirdPerson ? `Does/${verb}` : `Do/${verb}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'presentSimple', verb)
        };
    },

    // PRESENT CONTINUOUS generator
    generatePresentContinuous(subject, verb, time, situation) {
        const beForm = subject === 'I' ? 'am' :
            this.subjectDatabase.thirdPersonSingular.includes(subject) ? 'is' : 'are';
        const negForm = beForm === 'am' ? "am not" : beForm === 'is' ? "isn't" : "aren't";
        const ing = this.addIng(verb);

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: `${beForm} ${ing}` },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `${negForm} ${ing}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) ${time}?`, a: `${beForm.charAt(0).toUpperCase() + beForm.slice(1)}/${ing}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'presentContinuous', verb)
        };
    },

    // PRESENT PERFECT generator
    generatePresentPerfect(subject, verb, time, situation) {
        const hasForm = this.subjectDatabase.thirdPersonSingular.includes(subject) ? 'has' : 'have';
        const participle = this.getParticiple(verb);
        const negForm = hasForm === 'has' ? "hasn't" : "haven't";

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: `${hasForm} ${participle}` },
            { q: `${subject} ___ (not/${verb}) yet.`, a: `${negForm} ${participle}` },
            { q: `___ ${subject.toLowerCase()} ever ___ (${verb})?`, a: `${hasForm.charAt(0).toUpperCase() + hasForm.slice(1)}/${participle}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'presentPerfect', verb)
        };
    },

    // PAST SIMPLE generator
    generatePastSimple(subject, verb, time, situation) {
        const pastForm = this.getPastTense(verb);

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: pastForm },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `didn't ${verb}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) ${time}?`, a: `Did/${verb}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'pastSimple', verb)
        };
    },

    // PAST CONTINUOUS generator
    generatePastContinuous(subject, verb, time, situation) {
        const wasWere = this.subjectDatabase.plural.includes(subject) || subject === 'You' ? 'were' : 'was';
        const ing = this.addIng(verb);
        const negForm = wasWere === 'was' ? "wasn't" : "weren't";

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: `${wasWere} ${ing}` },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `${negForm} ${ing}` },
            { q: `What ___ ${subject.toLowerCase()} ___ (do) ${time}?`, a: `${wasWere}/doing` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'pastContinuous', verb)
        };
    },

    // PAST PERFECT generator
    generatePastPerfect(subject, verb, time, situation) {
        const participle = this.getParticiple(verb);

        const questionTypes = [
            { q: `${time}, ${subject.toLowerCase()} ___ already ___ (${verb}).`, a: `had/${participle}` },
            { q: `${subject} ___ (not/${verb}) before that.`, a: `hadn't ${participle}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) before?`, a: `Had/${participle}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'pastPerfect', verb)
        };
    },

    // FUTURE SIMPLE (will) generator
    generateFutureSimple(subject, verb, time, situation) {
        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: `will ${verb}` },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `won't ${verb}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) ${time}?`, a: `Will/${verb}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'futurSimple', verb)
        };
    },

    // GOING TO generator
    generateGoingTo(subject, verb, time, situation) {
        const beForm = subject === 'I' ? 'am' :
            this.subjectDatabase.thirdPersonSingular.includes(subject) ? 'is' : 'are';
        const negForm = beForm === 'am' ? "am not" : beForm === 'is' ? "isn't" : "aren't";

        const questionTypes = [
            { q: `${subject} ___ (${verb}) ${time}.`, a: `${beForm} going to ${verb}` },
            { q: `${subject} ___ (not/${verb}) ${time}.`, a: `${negForm} going to ${verb}` },
            { q: `___ ${subject.toLowerCase()} ___ (${verb}) ${time}?`, a: `${beForm.charAt(0).toUpperCase() + beForm.slice(1)}/going to ${verb}` }
        ];

        const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: selected.q,
            answer: selected.a,
            situation: `🎭 ${situation}`,
            generated: true,
            options: this.generateOptions(selected.a, 'goingTo', verb)
        };
    },

    // FIRST CONDITIONAL generator
    generateConditionalFirst(subject, verb, situation) {
        const scenarios = [
            { condition: 'study hard', result: 'pass the exam' },
            { condition: 'rain tomorrow', result: 'stay home' },
            { condition: 'have time', result: 'help you' },
            { condition: 'arrive early', result: 'get good seats' },
            { condition: 'call me', result: 'answer' }
        ];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        return {
            question: `If you ___ (${scenario.condition.split(' ')[0]}), I ___ (${scenario.result.split(' ')[0]}) you.`,
            answer: `${scenario.condition.split(' ')[0]}/will ${scenario.result.split(' ')[0]}`,
            situation: `🎭 ${situation}`,
            generated: true,
            options: [`${scenario.condition.split(' ')[0]}/will ${scenario.result.split(' ')[0]}`, `will ${scenario.condition.split(' ')[0]}/${scenario.result.split(' ')[0]}`, `${scenario.condition.split(' ')[0]}ed/would ${scenario.result.split(' ')[0]}`, `${scenario.condition.split(' ')[0]}/${scenario.result.split(' ')[0]}`]
        };
    },

    // SECOND CONDITIONAL generator
    generateConditionalSecond(subject, verb, situation) {
        const scenarios = [
            { condition: 'be rich', result: 'travel the world' },
            { condition: 'have more time', result: 'learn a new language' },
            { condition: 'live in Paris', result: 'visit museums every day' },
            { condition: 'win the lottery', result: 'buy a big house' },
            { condition: 'be you', result: 'accept the job' }
        ];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        return {
            question: `If I ___ (${scenario.condition}), I ___ (${scenario.result.split(' ')[0]}) ${scenario.result.split(' ').slice(1).join(' ')}.`,
            answer: `${scenario.condition === 'be rich' || scenario.condition === 'be you' ? 'were' : 'had'}/would ${scenario.result.split(' ')[0]}`,
            situation: `🎭 ${situation}`,
            generated: true,
            options: [`were/would ${scenario.result.split(' ')[0]}`, `am/will ${scenario.result.split(' ')[0]}`, `was/would ${scenario.result.split(' ')[0]}`, `be/will ${scenario.result.split(' ')[0]}`]
        };
    },

    // ZERO CONDITIONAL generator
    generateConditionalZero(verb) {
        const facts = [
            { condition: 'heat water to 100°C', result: 'boils' },
            { condition: 'mix red and blue', result: 'get purple' },
            { condition: "don't water plants", result: 'die' },
            { condition: 'freeze water', result: 'becomes ice' }
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];

        return {
            question: `If you ${fact.condition}, it ___.`,
            answer: fact.result,
            situation: '🔬 Scientific fact',
            generated: true,
            options: [fact.result, `will ${fact.result}`, `would ${fact.result}`, `${fact.result}s`]
        };
    },

    // Generate wrong options for multiple choice
    generateOptions(correctAnswer, tenseId, verb) {
        const wrongOptions = {
            presentSimple: [verb, verb + 's', 'is ' + verb + 'ing', 'will ' + verb],
            presentContinuous: [verb, verb + 's', 'was ' + verb + 'ing', verb + 'ed'],
            presentPerfect: ['have ' + verb, verb + 'ed', 'had ' + verb + 'ed', 'is ' + verb + 'ing'],
            pastSimple: [verb, 'is ' + verb + 'ing', 'has ' + verb + 'ed', 'will ' + verb],
            pastContinuous: [verb + 'ed', 'is ' + verb + 'ing', 'has ' + verb + 'ed', verb],
            pastPerfect: ['have ' + verb + 'ed', verb + 'ed', 'was ' + verb + 'ing', verb],
            futurSimple: [verb, verb + 's', 'is going to ' + verb, verb + 'ed'],
            goingTo: ['will ' + verb, verb, verb + 's', verb + 'ed']
        };

        let options = [correctAnswer];
        const wrongPool = wrongOptions[tenseId] || [verb, verb + 's', verb + 'ed', 'will ' + verb];

        while (options.length < 4) {
            const wrong = wrongPool[Math.floor(Math.random() * wrongPool.length)];
            if (!options.includes(wrong)) {
                options.push(wrong);
            }
        }

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    },

    // Helper: Add -ing to verb
    addIng(verb) {
        if (verb.endsWith('e') && !verb.endsWith('ee')) {
            return verb.slice(0, -1) + 'ing';
        }
        if (verb.endsWith('ie')) {
            return verb.slice(0, -2) + 'ying';
        }
        if (verb.match(/[aeiou][^aeiou]$/) && verb.length > 2 && !verb.endsWith('w') && !verb.endsWith('x')) {
            return verb + verb.slice(-1) + 'ing';
        }
        return verb + 'ing';
    },

    // Helper: Get past participle
    getParticiple(verb) {
        const irregular = this.verbDatabase.irregular[verb];
        if (irregular) return irregular.participle;
        return verb.endsWith('e') ? verb + 'd' : verb + 'ed';
    },

    // Helper: conjugate third person
    conjugateThirdPerson(verb) {
        const irregular = this.verbDatabase.irregular[verb];
        if (irregular && irregular.thirdPerson) return irregular.thirdPerson;

        if (verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2])) {
            return verb.slice(0, -1) + 'ies';
        }
        if (verb.match(/(s|sh|ch|x|z|o)$/)) {
            return verb + 'es';
        }
        return verb + 's';
    },

    // Helper: get past tense
    getPastTense(verb) {
        const irregular = this.verbDatabase.irregular[verb];
        if (irregular) return irregular.past;
        return verb.endsWith('e') ? verb + 'd' : verb + 'ed';
    }
};

// Make globally available
window.GrammarPractice = GrammarPractice;
console.log('📖 Grammar Practice System loaded with AI-powered infinite generation!');

