// Полная база данных инструментов с переводами на 3 языка
// Структурировано по категориям и подкатегориям

export const toolsDatabase = {
  // ============================================================================
  // КАТЕГОРИЯ 1: Персонализированное обучение
  // ============================================================================
  'personalized_learning': {
    category: {
      ru: 'Персонализированное обучение',
      kk: 'Жекелендірілген оқыту',
      en: 'Personalized Learning'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 1.1: Адаптивное обучение
      'adaptive_learning': {
        name: {
          ru: 'Адаптивное обучение',
          kk: 'Бейімделу оқыту',
          en: 'Adaptive Learning'
        },
        description: {
          ru: 'Платформы анализируют учебные данные, выстраивают индивидуальные траектории, адаптируют задания и уровень сложности в реальном времени.',
          kk: 'Платформалар оқу деректерін талдайды, жеке траекторияларды құрады, тапсырмалар мен күрделілік деңгейін нақты уақытта бейімдейді.',
          en: 'Platforms analyze learning data, build individual trajectories, adapt tasks and difficulty levels in real time.'
        },
        tools: [
          {
            name: 'Knewton Alta',
            functions: {
              ru: ['Адаптивные задания', 'Индивидуальная траектория', 'Аналитика прогресса', 'Персонализация контента'],
              kk: ['Бейімделген тапсырмалар', 'Жеке траектория', 'Прогресс аналитикасы', 'Контент жекелендіру'],
              en: ['Adaptive assignments', 'Individual trajectory', 'Progress analytics', 'Content personalization']
            },
            purpose: {
              ru: 'Адаптивное обучение математике и естественным наукам',
              kk: 'Математика мен жаратылыстану ғылымдарына бейімделген оқыту',
              en: 'Adaptive learning for mathematics and natural sciences'
            },
            link: 'https://www.knewton.com/alta/',
            color: '#E8F5E9'
          },
          {
            name: 'Century Tech',
            functions: {
              ru: ['ИИ-аналитика обучения', 'Персонализированные пути', 'Прогнозирование пробелов', 'Рекомендации контента'],
              kk: ['ЖИ-оқыту аналитикасы', 'Жекелендірілген жолдар', 'Олқылықтарды болжау', 'Контент ұсыныстары'],
              en: ['AI learning analytics', 'Personalized pathways', 'Gap prediction', 'Content recommendations']
            },
            purpose: {
              ru: 'Платформа для персонализированного обучения с ИИ-аналитикой',
              kk: 'ЖИ-аналитикасы бар жекелендірілген оқыту платформасы',
              en: 'Platform for personalized learning with AI analytics'
            },
            link: 'https://www.century.tech/',
            color: '#E3F2FD'
          },
          {
            name: 'DreamBox Learning',
            functions: {
              ru: ['Интерактивная математика', 'Адаптация в реальном времени', 'Игровые элементы', 'Детальная аналитика'],
              kk: ['Интерактивті математика', 'Нақты уақытта бейімделу', 'Ойын элементтері', 'Толық аналитика'],
              en: ['Interactive mathematics', 'Real-time adaptation', 'Game elements', 'Detailed analytics']
            },
            purpose: {
              ru: 'Адаптивное обучение математике для K-8',
              kk: 'K-8 үшін математикаға бейімделген оқыту',
              en: 'Adaptive mathematics learning for K-8'
            },
            link: 'https://www.dreambox.com/',
            color: '#F3E5F5'
          },
          {
            name: 'MagicSchool AI',
            functions: {
              ru: ['Генерация уроков', 'Адаптивные задания', 'Автоматизация планирования', 'ИИ-помощник учителя'],
              kk: ['Сабақтарды генерациялау', 'Бейімделген тапсырмалар', 'Жоспарлауды автоматтандыру', 'ЖИ-мұғалім көмекшісі'],
              en: ['Lesson generation', 'Adaptive assignments', 'Planning automation', 'AI teacher assistant']
            },
            purpose: {
              ru: 'ИИ-платформа для учителей с инструментами планирования и адаптации',
              kk: 'Жоспарлау және бейімдеу құралдары бар мұғалімдерге арналған ЖИ-платформа',
              en: 'AI platform for teachers with planning and adaptation tools'
            },
            link: 'https://www.magicschool.ai/',
            color: '#FFF3E0'
          },
          {
            name: 'SmartTutor',
            functions: {
              ru: ['Персональный репетитор', 'Адаптивные упражнения', 'Отслеживание прогресса', 'Мгновенная обратная связь'],
              kk: ['Жеке тьютор', 'Бейімделген жаттығулар', 'Прогрессті қадағалау', 'Жедел кері байланыс'],
              en: ['Personal tutor', 'Adaptive exercises', 'Progress tracking', 'Instant feedback']
            },
            purpose: {
              ru: 'Интеллектуальная система репетиторства с адаптацией',
              kk: 'Бейімделуі бар интеллектуалды репетиторлық жүйе',
              en: 'Intelligent tutoring system with adaptation'
            },
            link: 'https://www.smarttutor.com/',
            color: '#E1F5FE'
          },
          {
            name: 'ALEKS',
            functions: {
              ru: ['Диагностика знаний', 'Адаптивное обучение', 'Математические курсы', 'Детальные отчеты'],
              kk: ['Білімді диагностикалау', 'Бейімделген оқыту', 'Математикалық курстар', 'Толық есептер'],
              en: ['Knowledge diagnostics', 'Adaptive learning', 'Mathematics courses', 'Detailed reports']
            },
            purpose: {
              ru: 'Адаптивная система оценки и обучения математике',
              kk: 'Математиканы бағалаудың және оқытудың бейімделген жүйесі',
              en: 'Adaptive assessment and learning system for mathematics'
            },
            link: 'https://www.aleks.com/',
            color: '#FCE4EC'
          },
          {
            name: 'Squirrel AI',
            functions: {
              ru: ['ИИ-репетитор', 'Персонализация контента', 'Обнаружение пробелов', 'Адаптивные курсы'],
              kk: ['ЖИ-тьютор', 'Контентті жекелендіру', 'Олқылықтарды анықтау', 'Бейімделген курстар'],
              en: ['AI tutor', 'Content personalization', 'Gap detection', 'Adaptive courses']
            },
            purpose: {
              ru: 'Адаптивная обучающая система с ИИ',
              kk: 'ЖИ-мен бейімделген оқыту жүйесі',
              en: 'Adaptive learning system with AI'
            },
            link: 'https://squirrelai.com/',
            color: '#FFF9C4'
          },
          {
            name: 'GPTutor',
            functions: {
              ru: ['ИИ-объяснения', 'Пошаговые решения', 'Персонализированная помощь', 'Адаптивные подсказки'],
              kk: ['ЖИ-түсініктемелер', 'Қадамдық шешімдер', 'Жекелендірілген көмек', 'Бейімделген кеңестер'],
              en: ['AI explanations', 'Step-by-step solutions', 'Personalized help', 'Adaptive hints']
            },
            purpose: {
              ru: 'ИИ-репетитор для индивидуальной помощи студентам',
              kk: 'Студенттерге жеке көмек көрсету үшін ЖИ-тьютор',
              en: 'AI tutor for individual student assistance'
            },
            link: 'https://gptutor.ai/',
            color: '#E0F2F1'
          },
          {
            name: 'LangAI',
            functions: {
              ru: ['Изучение языков', 'Адаптивные уроки', 'Речевая практика', 'Персонализированный план'],
              kk: ['Тіл үйрену', 'Бейімделген сабақтар', 'Сөйлеу практикасы', 'Жекелендірілген жоспар'],
              en: ['Language learning', 'Adaptive lessons', 'Speech practice', 'Personalized plan']
            },
            purpose: {
              ru: 'Адаптивная платформа для изучения языков',
              kk: 'Тіл үйрену үшін бейімделген платформа',
              en: 'Adaptive platform for language learning'
            },
            link: 'https://lang.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'Carnegie Learning',
            functions: {
              ru: ['Математические курсы', 'Адаптивная практика', 'Когнитивная модель', 'Детальная аналитика'],
              kk: ['Математикалық курстар', 'Бейімделген практика', 'Когнитивті модель', 'Толық аналитика'],
              en: ['Math courses', 'Adaptive practice', 'Cognitive model', 'Detailed analytics']
            },
            purpose: {
              ru: 'Адаптивное обучение математике на основе когнитивной науки',
              kk: 'Когнитивті ғылымға негізделген математикаға бейімделген оқыту',
              en: 'Adaptive mathematics learning based on cognitive science'
            },
            link: 'https://www.carnegielearning.com/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://espacepress.com/',
          'https://reelmind.ai/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 1.2: Образовательная аналитика
      'educational_analytics': {
        name: {
          ru: 'Образовательная аналитика',
          kk: 'Білім беру аналитикасы',
          en: 'Educational Analytics'
        },
        description: {
          ru: 'Предоставляют дашборды с аналитикой успеваемости, прогнозируют пробелы знаний, оптимизируют поддержку студентов.',
          kk: 'Үлгерім аналитикасымен бақылау тақталарын ұсынады, білім олқылықтарын болжайды, студенттерді қолдауды оңтайландырады.',
          en: 'Provide dashboards with performance analytics, predict knowledge gaps, optimize student support.'
        },
        tools: [
          {
            name: 'EduAnalytics',
            functions: {
              ru: ['Дашборды успеваемости', 'Прогнозирование пробелов', 'Аналитика обучения', 'Визуализация данных'],
              kk: ['Үлгерім бақылау тақтасы', 'Олқылықтарды болжау', 'Оқыту аналитикасы', 'Деректерді визуализациялау'],
              en: ['Performance dashboards', 'Gap prediction', 'Learning analytics', 'Data visualization']
            },
            purpose: {
              ru: 'Комплексная аналитика образовательного процесса',
              kk: 'Білім беру процесінің кешенді аналитикасы',
              en: 'Comprehensive educational process analytics'
            },
            link: 'https://eduanalytics.com/',
            color: '#E8EAF6'
          },
          {
            name: 'Century Tech',
            functions: {
              ru: ['ИИ-аналитика', 'Персонализированные пути', 'Прогнозирование рисков', 'Рекомендации'],
              kk: ['ЖИ-аналитика', 'Жекелендірілген жолдар', 'Тәуекелдерді болжау', 'Ұсыныстар'],
              en: ['AI analytics', 'Personalized pathways', 'Risk prediction', 'Recommendations']
            },
            purpose: {
              ru: 'ИИ-платформа для аналитики и персонализации обучения',
              kk: 'Оқытуды аналитикалау және жекелендіру үшін ЖИ-платформа',
              en: 'AI platform for learning analytics and personalization'
            },
            link: 'https://www.century.tech/',
            color: '#E1BEE7'
          },
          {
            name: 'SchoolAI (Snorkl)',
            functions: {
              ru: ['Аналитика классов', 'Мониторинг прогресса', 'ИИ-инсайты', 'Отчеты для учителей'],
              kk: ['Сынып аналитикасы', 'Прогрессті бақылау', 'ЖИ-инсайттар', 'Мұғалімдерге есептер'],
              en: ['Class analytics', 'Progress monitoring', 'AI insights', 'Teacher reports']
            },
            purpose: {
              ru: 'Аналитическая платформа для школ с ИИ-инсайтами',
              kk: 'ЖИ-инсайттары бар мектептерге арналған аналитикалық платформа',
              en: 'School analytics platform with AI insights'
            },
            link: 'https://www.schoolai.com/',
            color: '#B2DFDB'
          },
          {
            name: 'Eduaide.AI',
            functions: {
              ru: ['Анализ успеваемости', 'Рекомендации по обучению', 'Автоматизация отчетов', 'Прогнозирование'],
              kk: ['Үлгерімді талдау', 'Оқыту бойынша ұсыныстар', 'Есептерді автоматтандыру', 'Болжау'],
              en: ['Performance analysis', 'Learning recommendations', 'Report automation', 'Forecasting']
            },
            purpose: {
              ru: 'ИИ-помощник для анализа и оптимизации обучения',
              kk: 'Оқытуды талдау және оңтайландыру үшін ЖИ-көмекші',
              en: 'AI assistant for learning analysis and optimization'
            },
            link: 'https://eduaide.ai/',
            color: '#C8E6C9'
          },
          {
            name: 'Smart Sparrow',
            functions: {
              ru: ['Адаптивные курсы', 'Аналитика обучения', 'Интерактивные уроки', 'Персонализация'],
              kk: ['Бейімделген курстар', 'Оқыту аналитикасы', 'Интерактивті сабақтар', 'Жекелендіру'],
              en: ['Adaptive courses', 'Learning analytics', 'Interactive lessons', 'Personalization']
            },
            purpose: {
              ru: 'Платформа для создания адаптивных интерактивных курсов',
              kk: 'Бейімделген интерактивті курстар жасау платформасы',
              en: 'Platform for creating adaptive interactive courses'
            },
            link: 'https://www.smartsparrow.com/',
            color: '#FFECB3'
          },
          {
            name: 'EduBot',
            functions: {
              ru: ['ИИ-чат бот', 'Аналитика взаимодействий', 'Автоматические ответы', 'Отчеты по студентам'],
              kk: ['ЖИ-чат бот', 'Өзара әрекеттесу аналитикасы', 'Автоматты жауаптар', 'Студенттер бойынша есептер'],
              en: ['AI chatbot', 'Interaction analytics', 'Automatic responses', 'Student reports']
            },
            purpose: {
              ru: 'ИИ-бот для аналитики и поддержки студентов',
              kk: 'Студенттерді талдау және қолдау үшін ЖИ-бот',
              en: 'AI bot for student analytics and support'
            },
            link: 'https://edubot.ai/',
            color: '#D1C4E9'
          },
          {
            name: 'Learnly',
            functions: {
              ru: ['Аналитика обучения', 'Персонализированные рекомендации', 'Отслеживание целей', 'Инсайты прогресса'],
              kk: ['Оқыту аналитикасы', 'Жекелендірілген ұсыныстар', 'Мақсаттарды қадағалау', 'Прогресс инсайттары'],
              en: ['Learning analytics', 'Personalized recommendations', 'Goal tracking', 'Progress insights']
            },
            purpose: {
              ru: 'Платформа для аналитики и оптимизации учебного процесса',
              kk: 'Оқу процесін талдау және оңтайландыру платформасы',
              en: 'Platform for learning process analytics and optimization'
            },
            link: 'https://learnly.ai/',
            color: '#FFCDD2'
          },
          {
            name: 'Classroom.ai',
            functions: {
              ru: ['Аналитика класса', 'Мониторинг вовлеченности', 'ИИ-рекомендации', 'Автоматические отчеты'],
              kk: ['Сынып аналитикасы', 'Қатысуды бақылау', 'ЖИ-ұсыныстар', 'Автоматты есептер'],
              en: ['Classroom analytics', 'Engagement monitoring', 'AI recommendations', 'Automatic reports']
            },
            purpose: {
              ru: 'ИИ-платформа для аналитики и управления классом',
              kk: 'Сыныпты талдау және басқару үшін ЖИ-платформа',
              en: 'AI platform for classroom analytics and management'
            },
            link: 'https://classroom.ai/',
            color: '#B2EBF2'
          },
          {
            name: 'Otter.ai',
            functions: {
              ru: ['Транскрипция лекций', 'Анализ вовлеченности', 'Автоматические заметки', 'Аналитика участия'],
              kk: ['Дәрістерді транскрипциялау', 'Қатысуды талдау', 'Автоматты жазбалар', 'Қатысу аналитикасы'],
              en: ['Lecture transcription', 'Engagement analysis', 'Automatic notes', 'Participation analytics']
            },
            purpose: {
              ru: 'Транскрипция и аналитика образовательных встреч',
              kk: 'Білім беру кездесулерін транскрипциялау және талдау',
              en: 'Transcription and analytics of educational meetings'
            },
            link: 'https://otter.ai/',
            color: '#F8BBD0'
          }
        ],
        sources: [
          'https://edubookzone.com/',
          'https://www.paradisosolutions.com/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 2: Интерактивные и опытно-ориентированные технологии
  // ============================================================================
  'interactive_technologies': {
    category: {
      ru: 'Интерактивные и опытно-ориентированные технологии',
      kk: 'Интерактивті және тәжірибеге бағдарланған технологиялар',
      en: 'Interactive and Experience-Oriented Technologies'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 2.1: Игровые и иммерсивные технологии
      'gaming_immersive': {
        name: {
          ru: 'Игровые и иммерсивные технологии',
          kk: 'Ойын және иммерсивті технологиялар',
          en: 'Gaming and Immersive Technologies'
        },
        description: {
          ru: 'VR/AR и сценарии погружения создают живые языковые среды, тренируют разговорные навыки на основе реальных ситуаций.',
          kk: 'VR/AR және иммерсивті сценарийлер тірі тілдік орталарды жасайды, нақты жағдайлар негізінде сөйлеу дағдыларын жаттықтырады.',
          en: 'VR/AR and immersion scenarios create living language environments, train conversational skills based on real situations.'
        },
        tools: [
          {
            name: 'Virti',
            functions: {
              ru: ['VR/AR обучение', 'Симуляции', 'Иммерсивные сценарии', 'Практические навыки'],
              kk: ['VR/AR оқыту', 'Симуляциялар', 'Иммерсивті сценарийлер', 'Практикалық дағдылар'],
              en: ['VR/AR training', 'Simulations', 'Immersive scenarios', 'Practical skills']
            },
            purpose: {
              ru: 'VR/AR платформа для иммерсивного обучения',
              kk: 'Иммерсивті оқыту үшін VR/AR платформа',
              en: 'VR/AR platform for immersive learning'
            },
            link: 'https://virti.com/',
            color: '#E8F5E9'
          },
          {
            name: 'Univerbal',
            functions: {
              ru: ['Разговорная практика', 'ИИ-собеседник', 'Реальные диалоги', 'Обратная связь'],
              kk: ['Сөйлеу практикасы', 'ЖИ-әңгімелесуші', 'Нақты диалогтар', 'Кері байланыс'],
              en: ['Conversation practice', 'AI conversation partner', 'Real dialogues', 'Feedback']
            },
            purpose: {
              ru: 'ИИ-платформа для практики разговорных навыков',
              kk: 'Сөйлеу дағдыларын жаттықтыру үшін ЖИ-платформа',
              en: 'AI platform for conversational skills practice'
            },
            link: 'https://univerbal.app/',
            color: '#E3F2FD'
          },
          {
            name: 'Lingobo',
            functions: {
              ru: ['Языковое погружение', 'VR среды', 'Интерактивные диалоги', 'Культурный контекст'],
              kk: ['Тілге батыру', 'VR ортасы', 'Интерактивті диалогтар', 'Мәдени контекст'],
              en: ['Language immersion', 'VR environments', 'Interactive dialogues', 'Cultural context']
            },
            purpose: {
              ru: 'VR-платформа для изучения языков через погружение',
              kk: 'Тілді батыру арқылы үйрену үшін VR-платформа',
              en: 'VR platform for language learning through immersion'
            },
            link: 'https://lingobo.com/',
            color: '#F3E5F5'
          },
          {
            name: 'HayaiLearn',
            functions: {
              ru: ['Быстрое обучение', 'Игровые механики', 'Адаптивный контент', 'Мотивационная система'],
              kk: ['Жылдам оқыту', 'Ойын механикасы', 'Бейімделген контент', 'Мотивациялық жүйе'],
              en: ['Fast learning', 'Game mechanics', 'Adaptive content', 'Motivation system']
            },
            purpose: {
              ru: 'Игровая платформа для ускоренного обучения',
              kk: 'Жылдамдатылған оқыту үшін ойын платформасы',
              en: 'Game platform for accelerated learning'
            },
            link: 'https://hayailearn.com/',
            color: '#FFF3E0'
          },
          {
            name: 'Immerse.com',
            functions: {
              ru: ['VR языковая среда', 'Реалистичные сценарии', 'Социальное обучение', 'Культурное погружение'],
              kk: ['VR тілдік ортасы', 'Шынайы сценарийлер', 'Әлеуметтік оқыту', 'Мәдени батыру'],
              en: ['VR language environment', 'Realistic scenarios', 'Social learning', 'Cultural immersion']
            },
            purpose: {
              ru: 'VR-платформа для изучения языков в реалистичной среде',
              kk: 'Шынайы ортада тілдерді үйрену үшін VR-платформа',
              en: 'VR platform for language learning in realistic environment'
            },
            link: 'https://immerse.com/',
            color: '#E1F5FE'
          },
          {
            name: 'Lingopie',
            functions: {
              ru: ['Обучение через видео', 'Интерактивные субтитры', 'Контекстное изучение', 'Практика восприятия'],
              kk: ['Бейне арқылы оқыту', 'Интерактивті субтитрлер', 'Контекстік үйрену', 'Қабылдау практикасы'],
              en: ['Video-based learning', 'Interactive subtitles', 'Contextual learning', 'Listening practice']
            },
            purpose: {
              ru: 'Изучение языков через просмотр видео с интерактивными функциями',
              kk: 'Интерактивті функциялары бар бейнені көру арқылы тілдерді үйрену',
              en: 'Language learning through watching videos with interactive features'
            },
            link: 'https://lingopie.com/',
            color: '#FCE4EC'
          },
          {
            name: 'Re:Eng',
            functions: {
              ru: ['Инженерные симуляции', 'Практические задачи', 'Интерактивные модели', '3D визуализация'],
              kk: ['Инженерлік симуляциялар', 'Практикалық тапсырмалар', 'Интерактивті модельдер', '3D визуализация'],
              en: ['Engineering simulations', 'Practical tasks', 'Interactive models', '3D visualization']
            },
            purpose: {
              ru: 'Платформа для изучения инженерии через симуляции',
              kk: 'Симуляциялар арқылы инженерияны үйрену платформасы',
              en: 'Platform for learning engineering through simulations'
            },
            link: 'https://reeng.ai/',
            color: '#FFF9C4'
          },
          {
            name: 'Sygmatic',
            functions: {
              ru: ['Языковые игры', 'Интерактивная практика', 'Адаптивный контент', 'Соревновательные элементы'],
              kk: ['Тілдік ойындар', 'Интерактивті практика', 'Бейімделген контент', 'Бәсекелестік элементтері'],
              en: ['Language games', 'Interactive practice', 'Adaptive content', 'Competitive elements']
            },
            purpose: {
              ru: 'Игровая платформа для изучения языков',
              kk: 'Тілдерді үйрену үшін ойын платформасы',
              en: 'Game platform for language learning'
            },
            link: 'https://sygmatic.com/',
            color: '#E0F2F1'
          },
          {
            name: 'LanglabAI',
            functions: {
              ru: ['ИИ-языковая лаборатория', 'Речевая практика', 'Произношение', 'Интерактивные упражнения'],
              kk: ['ЖИ-тілдік зертхана', 'Сөйлеу практикасы', 'Айту', 'Интерактивті жаттығулар'],
              en: ['AI language lab', 'Speech practice', 'Pronunciation', 'Interactive exercises']
            },
            purpose: {
              ru: 'ИИ-лаборатория для развития языковых навыков',
              kk: 'Тілдік дағдыларды дамыту үшін ЖИ-зертхана',
              en: 'AI laboratory for language skills development'
            },
            link: 'https://langlab.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'Flipchat',
            functions: {
              ru: ['Разговорный ИИ', 'Реальные диалоги', 'Практика общения', 'Коррекция произношения'],
              kk: ['Сөйлеу ЖИ', 'Нақты диалогтар', 'Қарым-қатынас практикасы', 'Айтуды түзету'],
              en: ['Conversational AI', 'Real dialogues', 'Communication practice', 'Pronunciation correction']
            },
            purpose: {
              ru: 'ИИ для практики разговорных навыков',
              kk: 'Сөйлеу дағдыларын жаттықтыру үшін ЖИ',
              en: 'AI for conversational skills practice'
            },
            link: 'https://flipchat.ai/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://www.techradar.com/best/best-ai-tools',
          'https://topai.tools/s/language-immersion'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 2.2: Виртуальные лаборатории и симуляции
      'virtual_labs': {
        name: {
          ru: 'Виртуальные лаборатории и симуляции',
          kk: 'Виртуалды зертханалар және симуляциялар',
          en: 'Virtual Laboratories and Simulations'
        },
        description: {
          ru: 'Используются для моделирования процессов, ролей, групповых упражнений и создания интерактивных ситуаций.',
          kk: 'Процестерді, рөлдерді, топтық жаттығуларды модельдеу және интерактивті жағдайларды жасау үшін қолданылады.',
          en: 'Used for modeling processes, roles, group exercises and creating interactive situations.'
        },
        tools: [
          {
            name: 'Virti',
            functions: {
              ru: ['VR симуляции', 'Ролевые сценарии', 'Практические навыки', 'Обучение в действии'],
              kk: ['VR симуляциялар', 'Рөлдік сценарийлер', 'Практикалық дағдылар', 'Іс-әрекеттегі оқыту'],
              en: ['VR simulations', 'Role-playing scenarios', 'Practical skills', 'Learning by doing']
            },
            purpose: {
              ru: 'VR платформа для практического обучения через симуляции',
              kk: 'Симуляциялар арқылы практикалық оқыту үшін VR платформа',
              en: 'VR platform for practical training through simulations'
            },
            link: 'https://virti.com/',
            color: '#E8F4F8'
          },
          {
            name: 'Interactive Tutor',
            functions: {
              ru: ['Интерактивные уроки', 'Виртуальные эксперименты', 'Практические задачи', 'Моделирование'],
              kk: ['Интерактивті сабақтар', 'Виртуалды эксперименттер', 'Практикалық тапсырмалар', 'Модельдеу'],
              en: ['Interactive lessons', 'Virtual experiments', 'Practical tasks', 'Modeling']
            },
            purpose: {
              ru: 'Платформа для интерактивного обучения с виртуальными экспериментами',
              kk: 'Виртуалды эксперименттері бар интерактивті оқыту платформасы',
              en: 'Platform for interactive learning with virtual experiments'
            },
            link: 'https://interactivetutor.com/',
            color: '#E8EAF6'
          },
          {
            name: 'Reelmind.ai',
            functions: {
              ru: ['Создание симуляций', 'Интерактивный контент', 'Виртуальные сценарии', 'Обучающие видео'],
              kk: ['Симуляциялар жасау', 'Интерактивті контент', 'Виртуалды сценарийлер', 'Оқыту бейнелері'],
              en: ['Simulation creation', 'Interactive content', 'Virtual scenarios', 'Educational videos']
            },
            purpose: {
              ru: 'Платформа для создания интерактивного образовательного контента',
              kk: 'Интерактивті білім беру контентін жасау платформасы',
              en: 'Platform for creating interactive educational content'
            },
            link: 'https://reelmind.ai/',
            color: '#E1BEE7'
          },
          {
            name: 'MagicSchool AI',
            functions: {
              ru: ['Генерация уроков', 'Интерактивные задания', 'Симуляции процессов', 'ИИ-помощник'],
              kk: ['Сабақтарды генерациялау', 'Интерактивті тапсырмалар', 'Процестерді симуляциялау', 'ЖИ-көмекші'],
              en: ['Lesson generation', 'Interactive assignments', 'Process simulations', 'AI assistant']
            },
            purpose: {
              ru: 'ИИ-инструмент для создания интерактивных уроков и симуляций',
              kk: 'Интерактивті сабақтар мен симуляцияларды жасау үшін ЖИ-құрал',
              en: 'AI tool for creating interactive lessons and simulations'
            },
            link: 'https://www.magicschool.ai/',
            color: '#B2DFDB'
          },
          {
            name: 'Synthesia',
            functions: {
              ru: ['ИИ-видео', 'Виртуальные преподаватели', 'Симуляция презентаций', 'Интерактивные лекции'],
              kk: ['ЖИ-бейне', 'Виртуалды оқытушылар', 'Презентацияларды симуляциялау', 'Интерактивті дәрістер'],
              en: ['AI video', 'Virtual instructors', 'Presentation simulation', 'Interactive lectures']
            },
            purpose: {
              ru: 'Создание видео с ИИ-аватарами для обучения',
              kk: 'Оқыту үшін ЖИ-аватарларымен бейне жасау',
              en: 'Creating videos with AI avatars for education'
            },
            link: 'https://www.synthesia.io/',
            color: '#C8E6C9'
          },
          {
            name: 'Re:Eng',
            functions: {
              ru: ['Инженерные симуляции', '3D моделирование', 'Виртуальные лаборатории', 'Практические эксперименты'],
              kk: ['Инженерлік симуляциялар', '3D модельдеу', 'Виртуалды зертханалар', 'Практикалық эксперименттер'],
              en: ['Engineering simulations', '3D modeling', 'Virtual laboratories', 'Practical experiments']
            },
            purpose: {
              ru: 'Платформа для инженерного обучения через виртуальные лаборатории',
              kk: 'Виртуалды зертханалар арқылы инженерлік оқыту платформасы',
              en: 'Platform for engineering education through virtual labs'
            },
            link: 'https://reeng.ai/',
            color: '#FFECB3'
          },
          {
            name: 'Lingopie',
            functions: {
              ru: ['Видео-обучение', 'Интерактивные субтитры', 'Контекстное изучение', 'Иммерсивная практика'],
              kk: ['Бейне-оқыту', 'Интерактивті субтитрлер', 'Контекстік үйрену', 'Иммерсивті практика'],
              en: ['Video learning', 'Interactive subtitles', 'Contextual learning', 'Immersive practice']
            },
            purpose: {
              ru: 'Изучение языков через развлекательный видео-контент',
              kk: 'Ойын-сауық бейне-контент арқылы тілдерді үйрену',
              en: 'Language learning through entertainment video content'
            },
            link: 'https://lingopie.com/',
            color: '#D1C4E9'
          },
          {
            name: 'Univerbal',
            functions: {
              ru: ['ИИ-диалоги', 'Речевые симуляции', 'Реалистичные разговоры', 'Адаптивная сложность'],
              kk: ['ЖИ-диалогтар', 'Сөйлеу симуляциялары', 'Шынайы әңгімелер', 'Бейімделген күрделілік'],
              en: ['AI dialogues', 'Speech simulations', 'Realistic conversations', 'Adaptive difficulty']
            },
            purpose: {
              ru: 'ИИ-симулятор для практики разговорного языка',
              kk: 'Сөйлеу тілін жаттықтыру үшін ЖИ-симулятор',
              en: 'AI simulator for conversational language practice'
            },
            link: 'https://univerbal.app/',
            color: '#FFCDD2'
          },
          {
            name: 'Immerse.com',
            functions: {
              ru: ['VR погружение', 'Групповое обучение', 'Социальные сценарии', 'Культурный опыт'],
              kk: ['VR батыру', 'Топтық оқыту', 'Әлеуметтік сценарийлер', 'Мәдени тәжірибе'],
              en: ['VR immersion', 'Group learning', 'Social scenarios', 'Cultural experience']
            },
            purpose: {
              ru: 'VR-платформа для групповых языковых занятий',
              kk: 'Топтық тілдік сабақтар үшін VR-платформа',
              en: 'VR platform for group language classes'
            },
            link: 'https://immerse.com/',
            color: '#B2EBF2'
          },
          {
            name: 'Brainly AI Companion',
            functions: {
              ru: ['ИИ-помощь в задачах', 'Пошаговые решения', 'Интерактивные объяснения', 'Симуляции примеров'],
              kk: ['Тапсырмаларда ЖИ-көмек', 'Қадамдық шешімдер', 'Интерактивті түсініктемелер', 'Мысалдарды симуляциялау'],
              en: ['AI homework help', 'Step-by-step solutions', 'Interactive explanations', 'Example simulations']
            },
            purpose: {
              ru: 'ИИ-помощник для решения учебных задач с интерактивными объяснениями',
              kk: 'Интерактивті түсініктемелері бар оқу тапсырмаларын шешу үшін ЖИ-көмекші',
              en: 'AI assistant for solving study tasks with interactive explanations'
            },
            link: 'https://brainly.com/ai',
            color: '#F8BBD0'
          }
        ],
        sources: [
          'https://topai.tools/',
          'https://reelmind.ai/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 3: Технологические платформы и инструменты
  // ============================================================================
  'tech_platforms': {
    category: {
      ru: 'Технологические платформы и инструменты для разработки образовательных решений',
      kk: 'Білім беру шешімдерін әзірлеуге арналған технологиялық платформалар мен құралдар',
      en: 'Technological Platforms and Tools for Educational Solutions Development'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 3.1: Платформы для создания контента
      'content_creation': {
        name: {
          ru: 'Платформы для создания контента',
          kk: 'Контент жасауға арналған платформалар',
          en: 'Content Creation Platforms'
        },
        description: {
          ru: 'Автоматическая генерация видео и визуального контента, переводы, SCORM-курсы, шаблоны для уроков.',
          kk: 'Бейне және визуалды контентті автоматты генерациялау, аудармалар, SCORM-курстар, сабақ үлгілері.',
          en: 'Automatic generation of video and visual content, translations, SCORM courses, lesson templates.'
        },
        tools: [
          {
            name: 'Reelmind.ai',
            functions: {
              ru: ['ИИ-видео генерация', 'Создание презентаций', 'Автоматические субтитры', 'Шаблоны уроков'],
              kk: ['ЖИ-бейне генерациясы', 'Презентациялар жасау', 'Автоматты субтитрлер', 'Сабақ үлгілері'],
              en: ['AI video generation', 'Presentation creation', 'Automatic subtitles', 'Lesson templates']
            },
            purpose: {
              ru: 'ИИ-платформа для создания образовательных видео и контента',
              kk: 'Білім беру бейнелері мен контентін жасау үшін ЖИ-платформа',
              en: 'AI platform for creating educational videos and content'
            },
            link: 'https://reelmind.ai/',
            color: '#E8F5E9'
          },
          {
            name: 'Synthesia',
            functions: {
              ru: ['ИИ-аватары', 'Видео-лекции', 'Многоязычность', 'Профессиональное озвучивание'],
              kk: ['ЖИ-аватарлар', 'Бейне-дәрістер', 'Көптілділік', 'Кәсіби дыбыстау'],
              en: ['AI avatars', 'Video lectures', 'Multilingualism', 'Professional voiceover']
            },
            purpose: {
              ru: 'Создание профессиональных обучающих видео с ИИ-аватарами',
              kk: 'ЖИ-аватарларымен кәсіби оқыту бейнелерін жасау',
              en: 'Creating professional training videos with AI avatars'
            },
            link: 'https://www.synthesia.io/',
            color: '#E3F2FD'
          },
          {
            name: 'Canva Magic Write',
            functions: {
              ru: ['ИИ-дизайн', 'Генерация графики', 'Шаблоны для образования', 'Визуальный контент'],
              kk: ['ЖИ-дизайн', 'Графиканы генерациялау', 'Білім беруге арналған үлгілер', 'Визуалды контент'],
              en: ['AI design', 'Graphics generation', 'Education templates', 'Visual content']
            },
            purpose: {
              ru: 'Создание визуального образовательного контента с помощью ИИ',
              kk: 'ЖИ көмегімен визуалды білім беру контентін жасау',
              en: 'Creating visual educational content using AI'
            },
            link: 'https://www.canva.com/ai-image-generator/',
            color: '#F3E5F5'
          },
          {
            name: 'Paradiso Solutions',
            functions: {
              ru: ['LMS платформа', 'SCORM-курсы', 'Создание контента', 'Интеграции'],
              kk: ['LMS платформасы', 'SCORM-курстар', 'Контент жасау', 'Интеграциялар'],
              en: ['LMS platform', 'SCORM courses', 'Content creation', 'Integrations']
            },
            purpose: {
              ru: 'Комплексная LMS для создания и управления образовательным контентом',
              kk: 'Білім беру контентін жасау және басқару үшін кешенді LMS',
              en: 'Comprehensive LMS for creating and managing educational content'
            },
            link: 'https://www.paradisosolutions.com/',
            color: '#FFF3E0'
          },
          {
            name: 'Curipod',
            functions: {
              ru: ['Интерактивные презентации', 'ИИ-генерация слайдов', 'Опросы в реальном времени', 'Вовлекающий контент'],
              kk: ['Интерактивті презентациялар', 'ЖИ-слайдтарды генерациялау', 'Нақты уақыттағы сауалнамалар', 'Тартымды контент'],
              en: ['Interactive presentations', 'AI slide generation', 'Real-time polls', 'Engaging content']
            },
            purpose: {
              ru: 'Создание интерактивных презентаций с ИИ-поддержкой',
              kk: 'ЖИ-қолдауымен интерактивті презентацияларды жасау',
              en: 'Creating interactive presentations with AI support'
            },
            link: 'https://curipod.com/',
            color: '#E1F5FE'
          },
          {
            name: 'Murf.ai',
            functions: {
              ru: ['ИИ-озвучка', 'Голосовой контент', 'Многоязычность', 'Профессиональные голоса'],
              kk: ['ЖИ-дыбыстау', 'Дауыстық контент', 'Көптілділік', 'Кәсіби дауыстар'],
              en: ['AI voiceover', 'Voice content', 'Multilingualism', 'Professional voices']
            },
            purpose: {
              ru: 'Создание профессиональной озвучки для образовательных материалов',
              kk: 'Білім беру материалдары үшін кәсіби дыбыстау жасау',
              en: 'Creating professional voiceover for educational materials'
            },
            link: 'https://murf.ai/',
            color: '#FCE4EC'
          },
          {
            name: 'Scribe',
            functions: {
              ru: ['Автоматические инструкции', 'Скриншоты процессов', 'Пошаговые гайды', 'Документация'],
              kk: ['Автоматты нұсқаулар', 'Процестердің скриншоттары', 'Қадамдық нұсқаулықтар', 'Құжаттама'],
              en: ['Automatic instructions', 'Process screenshots', 'Step-by-step guides', 'Documentation']
            },
            purpose: {
              ru: 'Автоматическое создание пошаговых инструкций и документации',
              kk: 'Қадамдық нұсқаулар мен құжаттаманы автоматты жасау',
              en: 'Automatic creation of step-by-step instructions and documentation'
            },
            link: 'https://scribehow.com/',
            color: '#FFF9C4'
          },
          {
            name: 'Camb.ai',
            functions: {
              ru: ['Преобразование контента', 'Адаптация материалов', 'Многоформатность', 'Доступность'],
              kk: ['Контентті түрлендіру', 'Материалдарды бейімдеу', 'Көп форматтылық', 'Қолжетімділік'],
              en: ['Content transformation', 'Material adaptation', 'Multi-format', 'Accessibility']
            },
            purpose: {
              ru: 'Адаптация образовательного контента для разных форматов',
              kk: 'Әр түрлі форматтар үшін білім беру контентін бейімдеу',
              en: 'Adapting educational content for different formats'
            },
            link: 'https://camb.ai/',
            color: '#E0F2F1'
          },
          {
            name: 'SlidesAI',
            functions: {
              ru: ['ИИ-презентации', 'Автогенерация слайдов', 'Дизайн шаблонов', 'Быстрое создание'],
              kk: ['ЖИ-презентациялар', 'Слайдтарды автогенерациялау', 'Үлгілердің дизайны', 'Жылдам жасау'],
              en: ['AI presentations', 'Slide auto-generation', 'Template design', 'Quick creation']
            },
            purpose: {
              ru: 'Быстрое создание профессиональных презентаций с помощью ИИ',
              kk: 'ЖИ көмегімен кәсіби презентацияларды жылдам жасау',
              en: 'Quick creation of professional presentations using AI'
            },
            link: 'https://www.slidesai.io/',
            color: '#F1F8E9'
          },
          {
            name: 'MagicSchool',
            functions: {
              ru: ['Генерация уроков', 'Создание материалов', 'ИИ-ассистент учителя', 'Шаблоны контента'],
              kk: ['Сабақтарды генерациялау', 'Материалдар жасау', 'ЖИ-мұғалім көмекшісі', 'Контент үлгілері'],
              en: ['Lesson generation', 'Material creation', 'AI teacher assistant', 'Content templates']
            },
            purpose: {
              ru: 'ИИ-инструмент для создания образовательных материалов',
              kk: 'Білім беру материалдарын жасау үшін ЖИ-құрал',
              en: 'AI tool for creating educational materials'
            },
            link: 'https://www.magicschool.ai/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://aiapps.com/',
          'https://topai.tools/',
          'https://www.techradar.com/',
          'https://reelmind.ai/',
          'https://www.paradisosolutions.com/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 3.2: Образовательные среды и LMS интеграции
      'lms_integration': {
        name: {
          ru: 'Образовательные среды и LMS интеграции',
          kk: 'Білім беру орталары және LMS интеграциялары',
          en: 'Educational Environments and LMS Integrations'
        },
        description: {
          ru: 'Интеграция с LMS, планирование уроков, автоматизация заданий, дашборды, управление классом.',
          kk: 'LMS-пен интеграция, сабақтарды жоспарлау, тапсырмаларды автоматтандыру, бақылау тақталары, сыныпты басқару.',
          en: 'LMS integration, lesson planning, task automation, dashboards, classroom management.'
        },
        tools: [
          {
            name: 'Canvas+ChatGPT (Gemini)',
            functions: {
              ru: ['LMS интеграция', 'ИИ-ассистент в Canvas', 'Автоматизация заданий', 'Помощь студентам'],
              kk: ['LMS интеграциясы', 'Canvas-та ЖИ-көмекші', 'Тапсырмаларды автоматтандыру', 'Студенттерге көмек'],
              en: ['LMS integration', 'AI assistant in Canvas', 'Task automation', 'Student assistance']
            },
            purpose: {
              ru: 'Интеграция ИИ-помощников в LMS Canvas для улучшения обучения',
              kk: 'Оқытуды жақсарту үшін Canvas LMS-ке ЖИ-көмекшілерді интеграциялау',
              en: 'Integration of AI assistants into Canvas LMS to enhance learning'
            },
            link: 'https://www.instructure.com/canvas',
            color: '#E8F5E9'
          },
          {
            name: 'SchoolAI',
            functions: {
              ru: ['Управление школой', 'ИИ-планирование', 'Аналитика классов', 'Интеграция с LMS'],
              kk: ['Мектепті басқару', 'ЖИ-жоспарлау', 'Сынып аналитикасы', 'LMS-пен интеграция'],
              en: ['School management', 'AI planning', 'Class analytics', 'LMS integration']
            },
            purpose: {
              ru: 'Комплексная платформа для управления школой с ИИ',
              kk: 'ЖИ-мен мектепті басқаруға арналған кешенді платформа',
              en: 'Comprehensive school management platform with AI'
            },
            link: 'https://www.schoolai.com/',
            color: '#E3F2FD'
          },
          {
            name: 'NotebookLM',
            functions: {
              ru: ['ИИ-заметки', 'Организация материалов', 'Умный поиск', 'Связи между темами'],
              kk: ['ЖИ-жазбалар', 'Материалдарды ұйымдастыру', 'Ақылды іздеу', 'Тақырыптар арасындағы байланыстар'],
              en: ['AI notes', 'Material organization', 'Smart search', 'Topic connections']
            },
            purpose: {
              ru: 'ИИ-блокнот для организации и анализа учебных материалов',
              kk: 'Оқу материалдарын ұйымдастыру және талдау үшін ЖИ-блокнот',
              en: 'AI notebook for organizing and analyzing study materials'
            },
            link: 'https://notebooklm.google/',
            color: '#F3E5F5'
          },
          {
            name: 'Notion AI',
            functions: {
              ru: ['ИИ-помощь в написании', 'Организация заметок', 'Управление проектами', 'Совместная работа'],
              kk: ['Жазуда ЖИ-көмек', 'Жазбаларды ұйымдастыру', 'Жобаларды басқару', 'Бірлескен жұмыс'],
              en: ['AI writing assistance', 'Note organization', 'Project management', 'Collaboration']
            },
            purpose: {
              ru: 'Универсальная платформа для организации учебных материалов с ИИ',
              kk: 'ЖИ-мен оқу материалдарын ұйымдастыру үшін әмбебап платформа',
              en: 'Universal platform for organizing study materials with AI'
            },
            link: 'https://www.notion.so/product/ai',
            color: '#FFF3E0'
          },
          {
            name: 'Copilot for Education',
            functions: {
              ru: ['ИИ-кодирование', 'Помощь в программировании', 'Обучение через практику', 'Автодополнение кода'],
              kk: ['ЖИ-кодтау', 'Бағдарламалауда көмек', 'Практика арқылы оқыту', 'Кодты автотолтыру'],
              en: ['AI coding', 'Programming assistance', 'Learning through practice', 'Code auto-completion']
            },
            purpose: {
              ru: 'ИИ-помощник для обучения программированию',
              kk: 'Бағдарламалауды оқыту үшін ЖИ-көмекші',
              en: 'AI assistant for teaching programming'
            },
            link: 'https://github.com/features/copilot',
            color: '#E1F5FE'
          },
          {
            name: 'ChatGPT',
            functions: {
              ru: ['Универсальный ИИ-помощник', 'Планирование уроков', 'Генерация контента', 'Помощь в обучении'],
              kk: ['Әмбебап ЖИ-көмекші', 'Сабақтарды жоспарлау', 'Контент генерациясы', 'Оқытуда көмек'],
              en: ['Universal AI assistant', 'Lesson planning', 'Content generation', 'Learning assistance']
            },
            purpose: {
              ru: 'Универсальный ИИ-ассистент для образования',
              kk: 'Білім беру үшін әмбебап ЖИ-көмекші',
              en: 'Universal AI assistant for education'
            },
            link: 'https://chat.openai.com/',
            color: '#FCE4EC'
          },
          {
            name: 'Eden LMS',
            functions: {
              ru: ['LMS платформа', 'Управление курсами', 'Аналитика студентов', 'ИИ-рекомендации'],
              kk: ['LMS платформасы', 'Курстарды басқару', 'Студент аналитикасы', 'ЖИ-ұсыныстар'],
              en: ['LMS platform', 'Course management', 'Student analytics', 'AI recommendations']
            },
            purpose: {
              ru: 'Современная LMS с ИИ-функциями',
              kk: 'ЖИ-функциялары бар заманауи LMS',
              en: 'Modern LMS with AI features'
            },
            link: 'https://edenlms.com/',
            color: '#FFF9C4'
          },
          {
            name: 'SmartSparrow',
            functions: {
              ru: ['Адаптивные курсы', 'Интеграция с LMS', 'Интерактивный контент', 'Аналитика обучения'],
              kk: ['Бейімделген курстар', 'LMS-пен интеграция', 'Интерактивті контент', 'Оқыту аналитикасы'],
              en: ['Adaptive courses', 'LMS integration', 'Interactive content', 'Learning analytics']
            },
            purpose: {
              ru: 'Платформа для создания адаптивного контента с LMS интеграцией',
              kk: 'LMS интеграциясымен бейімделген контент жасау платформасы',
              en: 'Platform for creating adaptive content with LMS integration'
            },
            link: 'https://www.smartsparrow.com/',
            color: '#E0F2F1'
          },
          {
            name: 'OpenAI in Canvas',
            functions: {
              ru: ['GPT интеграция', 'ИИ-помощь в LMS', 'Автоматизация', 'Умные подсказки'],
              kk: ['GPT интеграциясы', 'LMS-те ЖИ-көмек', 'Автоматтандыру', 'Ақылды кеңестер'],
              en: ['GPT integration', 'AI assistance in LMS', 'Automation', 'Smart hints']
            },
            purpose: {
              ru: 'Интеграция OpenAI в Canvas LMS',
              kk: 'OpenAI-ді Canvas LMS-ке интеграциялау',
              en: 'OpenAI integration into Canvas LMS'
            },
            link: 'https://www.instructure.com/',
            color: '#F1F8E9'
          },
          {
            name: 'Learnt.AI',
            functions: {
              ru: ['ИИ-обучение', 'Персонализация', 'Управление курсами', 'Аналитика прогресса'],
              kk: ['ЖИ-оқыту', 'Жекелендіру', 'Курстарды басқару', 'Прогресс аналитикасы'],
              en: ['AI learning', 'Personalization', 'Course management', 'Progress analytics']
            },
            purpose: {
              ru: 'ИИ-платформа для персонализированного обучения и управления',
              kk: 'Жекелендірілген оқыту және басқару үшін ЖИ-платформа',
              en: 'AI platform for personalized learning and management'
            },
            link: 'https://learnt.ai/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://reelmind.ai/',
          'https://ipst.education/',
          'https://www.paradisosolutions.com/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 4: Оценка и обратная связь
  // ============================================================================
  'assessment_feedback': {
    category: {
      ru: 'Оценка и обратная связь',
      kk: 'Бағалау және кері байланыс',
      en: 'Assessment and Feedback'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 4.1: Автоматизированное оценивание
      'automated_grading': {
        name: {
          ru: 'Автоматизированное оценивание',
          kk: 'Автоматтандырылған бағалау',
          en: 'Automated Grading'
        },
        description: {
          ru: 'Инструменты для массового исправления работ, тестов, автоматического формирования заданий и обратной связи.',
          kk: 'Жұмыстарды, тесттерді жаппай тексеру, тапсырмалар мен кері байланысты автоматты қалыптастыру құралдары.',
          en: 'Tools for mass grading of assignments, tests, automatic task generation and feedback.'
        },
        tools: [
          {
            name: 'Gradescope',
            functions: {
              ru: ['Автоматическая проверка', 'Оценка работ', 'ИИ-помощь в оценивании', 'Аналитика результатов'],
              kk: ['Автоматты тексеру', 'Жұмыстарды бағалау', 'Бағалауда ЖИ-көмек', 'Нәтижелерді талдау'],
              en: ['Automatic grading', 'Assignment evaluation', 'AI grading assistance', 'Results analytics']
            },
            purpose: {
              ru: 'Автоматизированная платформа для проверки студенческих работ',
              kk: 'Студенттік жұмыстарды тексеру үшін автоматтандырылған платформа',
              en: 'Automated platform for grading student assignments'
            },
            link: 'https://www.gradescope.com/',
            color: '#E8F5E9'
          },
          {
            name: 'GradeGenius',
            functions: {
              ru: ['ИИ-проверка эссе', 'Быстрое оценивание', 'Обратная связь', 'Анализ качества'],
              kk: ['Эсселерді ЖИ-тексеру', 'Жылдам бағалау', 'Кері байланыс', 'Сапаны талдау'],
              en: ['AI essay grading', 'Quick assessment', 'Feedback', 'Quality analysis']
            },
            purpose: {
              ru: 'ИИ для быстрой проверки письменных работ',
              kk: 'Жазбаша жұмыстарды жылдам тексеру үшін ЖИ',
              en: 'AI for quick grading of written assignments'
            },
            link: 'https://gradegenius.ai/',
            color: '#E3F2FD'
          },
          {
            name: 'AutoMark',
            functions: {
              ru: ['Автоматическая оценка', 'Проверка тестов', 'Массовое оценивание', 'Статистика'],
              kk: ['Автоматты бағалау', 'Тесттерді тексеру', 'Жаппай бағалау', 'Статистика'],
              en: ['Automatic assessment', 'Test checking', 'Mass grading', 'Statistics']
            },
            purpose: {
              ru: 'Автоматизация массового оценивания тестов и работ',
              kk: 'Тесттер мен жұмыстарды жаппай бағалауды автоматтандыру',
              en: 'Automation of mass grading of tests and assignments'
            },
            link: 'https://automark.ai/',
            color: '#F3E5F5'
          },
          {
            name: 'Class Companion',
            functions: {
              ru: ['ИИ-проверка', 'Обратная связь студентам', 'Оценка понимания', 'Рекомендации улучшения'],
              kk: ['ЖИ-тексеру', 'Студенттерге кері байланыс', 'Түсінуді бағалау', 'Жақсарту ұсыныстары'],
              en: ['AI checking', 'Student feedback', 'Understanding assessment', 'Improvement recommendations']
            },
            purpose: {
              ru: 'ИИ-компаньон для учителей в проверке и оценивании',
              kk: 'Тексеру және бағалауда мұғалімдерге арналған ЖИ-серік',
              en: 'AI companion for teachers in checking and assessment'
            },
            link: 'https://classcompanion.ai/',
            color: '#FFF3E0'
          },
          {
            name: 'CoGrader',
            functions: {
              ru: ['Совместное оценивание', 'ИИ-помощь', 'Стандартизация оценок', 'Обратная связь'],
              kk: ['Бірлескен бағалау', 'ЖИ-көмек', 'Бағаларды стандарттау', 'Кері байланыс'],
              en: ['Collaborative grading', 'AI assistance', 'Grade standardization', 'Feedback']
            },
            purpose: {
              ru: 'Платформа для совместного оценивания с ИИ-поддержкой',
              kk: 'ЖИ-қолдауымен бірлескен бағалау платформасы',
              en: 'Platform for collaborative grading with AI support'
            },
            link: 'https://cograder.com/',
            color: '#E1F5FE'
          },
          {
            name: 'Quillionz',
            functions: {
              ru: ['Генерация тестов', 'Автоматические вопросы', 'Проверка понимания', 'Разные типы вопросов'],
              kk: ['Тесттерді генерациялау', 'Автоматты сұрақтар', 'Түсінуді тексеру', 'Әр түрлі сұрақ түрлері'],
              en: ['Test generation', 'Automatic questions', 'Comprehension check', 'Various question types']
            },
            purpose: {
              ru: 'ИИ для автоматической генерации тестов и вопросов',
              kk: 'Тесттер мен сұрақтарды автоматты генерациялау үшін ЖИ',
              en: 'AI for automatic test and question generation'
            },
            link: 'https://www.quillionz.com/',
            color: '#FCE4EC'
          },
          {
            name: 'Quizizz AI',
            functions: {
              ru: ['Интерактивные тесты', 'ИИ-генерация вопросов', 'Игровое оценивание', 'Мгновенная обратная связь'],
              kk: ['Интерактивті тесттер', 'ЖИ-сұрақтарды генерациялау', 'Ойындық бағалау', 'Жедел кері байланыс'],
              en: ['Interactive quizzes', 'AI question generation', 'Game-based assessment', 'Instant feedback']
            },
            purpose: {
              ru: 'Платформа для создания интерактивных тестов с ИИ',
              kk: 'ЖИ-мен интерактивті тесттер жасау платформасы',
              en: 'Platform for creating interactive quizzes with AI'
            },
            link: 'https://quizizz.com/',
            color: '#FFF9C4'
          },
          {
            name: 'ChatGPT (автоген тестов)',
            functions: {
              ru: ['Генерация тестов', 'Создание вопросов', 'Варианты ответов', 'Оценочные рубрики'],
              kk: ['Тесттерді генерациялау', 'Сұрақтар жасау', 'Жауап нұсқалары', 'Бағалау рубрикалары'],
              en: ['Test generation', 'Question creation', 'Answer options', 'Grading rubrics']
            },
            purpose: {
              ru: 'Использование ChatGPT для автоматической генерации тестов',
              kk: 'Тесттерді автоматты генерациялау үшін ChatGPT пайдалану',
              en: 'Using ChatGPT for automatic test generation'
            },
            link: 'https://chat.openai.com/',
            color: '#E0F2F1'
          },
          {
            name: 'ScribeSense',
            functions: {
              ru: ['Распознавание почерка', 'Автоматическая оценка', 'Сканирование работ', 'Анализ ответов'],
              kk: ['Қолжазбаны тану', 'Автоматты бағалау', 'Жұмыстарды сканерлеу', 'Жауаптарды талдау'],
              en: ['Handwriting recognition', 'Automatic grading', 'Work scanning', 'Answer analysis']
            },
            purpose: {
              ru: 'Автоматическая проверка рукописных работ с помощью ИИ',
              kk: 'ЖИ көмегімен қолжазба жұмыстарды автоматты тексеру',
              en: 'Automatic grading of handwritten assignments using AI'
            },
            link: 'https://scribesense.com/',
            color: '#F1F8E9'
          },
          {
            name: 'Diffit',
            functions: {
              ru: ['Адаптация сложности', 'Дифференцированные задания', 'Уровни сложности', 'Персонализация'],
              kk: ['Күрделілікті бейімдеу', 'Дифференцирленген тапсырмалар', 'Күрделілік деңгейлері', 'Жекелендіру'],
              en: ['Difficulty adaptation', 'Differentiated assignments', 'Difficulty levels', 'Personalization']
            },
            purpose: {
              ru: 'Создание дифференцированных заданий разного уровня сложности',
              kk: 'Әр түрлі күрделілік деңгейіндегі дифференцирленген тапсырмалар жасау',
              en: 'Creating differentiated assignments of varying difficulty levels'
            },
            link: 'https://diffit.me/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://espacepress.com/',
          'https://ipst.education/',
          'https://www.wsj.com/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 4.2: Таблицы и аналитика успеваемости
      'performance_analytics': {
        name: {
          ru: 'Таблицы и аналитика успеваемости',
          kk: 'Кестелер және үлгерім аналитикасы',
          en: 'Tables and Performance Analytics'
        },
        description: {
          ru: 'Сводная аналитика по заданиям, успеваемости, посещаемости, времени выполнения, эмоциональному состоянию.',
          kk: 'Тапсырмалар, үлгерім, қатысу, орындау уақыты, эмоционалды жағдай бойынша жиынтық аналитика.',
          en: 'Summary analytics on assignments, performance, attendance, completion time, emotional state.'
        },
        tools: [
          {
            name: 'Gradescope',
            functions: {
              ru: ['Аналитика оценок', 'Статистика класса', 'Тренды успеваемости', 'Детальные отчеты'],
              kk: ['Бағалар аналитикасы', 'Сынып статистикасы', 'Үлгерім трендтері', 'Толық есептер'],
              en: ['Grade analytics', 'Class statistics', 'Performance trends', 'Detailed reports']
            },
            purpose: {
              ru: 'Комплексная аналитика оценок и успеваемости студентов',
              kk: 'Студенттердің бағалары мен үлгерімінің кешенді аналитикасы',
              en: 'Comprehensive analytics of student grades and performance'
            },
            link: 'https://www.gradescope.com/',
            color: '#E8F5E9'
          },
          {
            name: 'EduAnalytics',
            functions: {
              ru: ['Дашборды успеваемости', 'Визуализация данных', 'Прогнозная аналитика', 'Отчеты по студентам'],
              kk: ['Үлгерім бақылау тақтасы', 'Деректерді визуализациялау', 'Болжамды аналитика', 'Студенттер бойынша есептер'],
              en: ['Performance dashboards', 'Data visualization', 'Predictive analytics', 'Student reports']
            },
            purpose: {
              ru: 'Платформа для визуализации и анализа успеваемости',
              kk: 'Үлгерімді визуализациялау және талдау платформасы',
              en: 'Platform for visualizing and analyzing performance'
            },
            link: 'https://eduanalytics.com/',
            color: '#E3F2FD'
          },
          {
            name: 'SchoolAI',
            functions: {
              ru: ['Аналитика школы', 'Отчеты по классам', 'Мониторинг прогресса', 'Инсайты успеваемости'],
              kk: ['Мектеп аналитикасы', 'Сыныптар бойынша есептер', 'Прогрессті бақылау', 'Үлгерім инсайттары'],
              en: ['School analytics', 'Class reports', 'Progress monitoring', 'Performance insights']
            },
            purpose: {
              ru: 'ИИ-аналитика для управления школой и мониторинга успеваемости',
              kk: 'Мектепті басқару және үлгерімді бақылау үшін ЖИ-аналитика',
              en: 'AI analytics for school management and performance monitoring'
            },
            link: 'https://www.schoolai.com/',
            color: '#F3E5F5'
          },
          {
            name: 'Classroom.ai',
            functions: {
              ru: ['Аналитика класса', 'Отслеживание посещаемости', 'Анализ вовлеченности', 'Статистика заданий'],
              kk: ['Сынып аналитикасы', 'Қатысуды қадағалау', 'Қатысу талдауы', 'Тапсырмалар статистикасы'],
              en: ['Classroom analytics', 'Attendance tracking', 'Engagement analysis', 'Assignment statistics']
            },
            purpose: {
              ru: 'Комплексная аналитика классов с ИИ-инсайтами',
              kk: 'ЖИ-инсайттармен сыныптардың кешенді аналитикасы',
              en: 'Comprehensive classroom analytics with AI insights'
            },
            link: 'https://classroom.ai/',
            color: '#FFF3E0'
          },
          {
            name: 'Snorkl',
            functions: {
              ru: ['Аналитика обучения', 'Визуализация прогресса', 'Отчеты для учителей', 'Инсайты студентов'],
              kk: ['Оқыту аналитикасы', 'Прогрессті визуализациялау', 'Мұғалімдерге есептер', 'Студент инсайттары'],
              en: ['Learning analytics', 'Progress visualization', 'Teacher reports', 'Student insights']
            },
            purpose: {
              ru: 'Платформа для углубленной аналитики учебного процесса',
              kk: 'Оқу процесін терең талдау платформасы',
              en: 'Platform for in-depth learning process analytics'
            },
            link: 'https://snorkl.ai/',
            color: '#E1F5FE'
          },
          {
            name: 'EduBot',
            functions: {
              ru: ['Аналитика взаимодействий', 'Чат-статистика', 'Отчеты по вовлеченности', 'ИИ-инсайты'],
              kk: ['Өзара әрекеттесу аналитикасы', 'Чат-статистика', 'Қатысу бойынша есептер', 'ЖИ-инсайттар'],
              en: ['Interaction analytics', 'Chat statistics', 'Engagement reports', 'AI insights']
            },
            purpose: {
              ru: 'Аналитика взаимодействия студентов с ИИ-ботом',
              kk: 'Студенттердің ЖИ-ботпен өзара әрекеттесу аналитикасы',
              en: 'Analytics of student interactions with AI bot'
            },
            link: 'https://edubot.ai/',
            color: '#FCE4EC'
          },
          {
            name: 'SmartTutor',
            functions: {
              ru: ['Аналитика обучения', 'Отслеживание прогресса', 'Отчеты по навыкам', 'Рекомендации'],
              kk: ['Оқыту аналитикасы', 'Прогрессті қадағалау', 'Дағдылар бойынша есептер', 'Ұсыныстар'],
              en: ['Learning analytics', 'Progress tracking', 'Skills reports', 'Recommendations']
            },
            purpose: {
              ru: 'Детальная аналитика прогресса и навыков студентов',
              kk: 'Студенттердің прогрессі мен дағдыларының толық аналитикасы',
              en: 'Detailed analytics of student progress and skills'
            },
            link: 'https://www.smarttutor.com/',
            color: '#FFF9C4'
          },
          {
            name: 'ScribeSense',
            functions: {
              ru: ['Аналитика ответов', 'Статистика по заданиям', 'Отчеты по темам', 'Выявление пробелов'],
              kk: ['Жауаптар аналитикасы', 'Тапсырмалар бойынша статистика', 'Тақырыптар бойынша есептер', 'Олқылықтарды анықтау'],
              en: ['Answer analytics', 'Assignment statistics', 'Topic reports', 'Gap identification']
            },
            purpose: {
              ru: 'Аналитика результатов тестирования и выявление пробелов в знаниях',
              kk: 'Тестілеу нәтижелерін талдау және білімдегі олқылықтарды анықтау',
              en: 'Testing results analytics and knowledge gap identification'
            },
            link: 'https://scribesense.com/',
            color: '#E0F2F1'
          },
          {
            name: 'Otter.ai',
            functions: {
              ru: ['Аналитика участия', 'Статистика встреч', 'Вовлеченность студентов', 'Отчеты по обсуждениям'],
              kk: ['Қатысу аналитикасы', 'Кездесу статистикасы', 'Студенттердің қатысуы', 'Талқылаулар бойынша есептер'],
              en: ['Participation analytics', 'Meeting statistics', 'Student engagement', 'Discussion reports']
            },
            purpose: {
              ru: 'Аналитика участия и вовлеченности на занятиях',
              kk: 'Сабақтардағы қатысу мен белсенділік аналитикасы',
              en: 'Analytics of participation and engagement in classes'
            },
            link: 'https://otter.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'Curipod',
            functions: {
              ru: ['Аналитика вовлеченности', 'Статистика опросов', 'Отчеты по участию', 'Инсайты класса'],
              kk: ['Белсенділік аналитикасы', 'Сауалнамалар статистикасы', 'Қатысу бойынша есептер', 'Сынып инсайттары'],
              en: ['Engagement analytics', 'Poll statistics', 'Participation reports', 'Class insights']
            },
            purpose: {
              ru: 'Аналитика вовлеченности студентов в интерактивные презентации',
              kk: 'Интерактивті презентацияларға студенттердің белсенділік аналитикасы',
              en: 'Analytics of student engagement in interactive presentations'
            },
            link: 'https://curipod.com/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://edubookzone.com/',
          'https://ipst.education/',
          'https://www.paradisosolutions.com/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 5: Инклюзия и доступность
  // ============================================================================
  'inclusion_accessibility': {
    category: {
      ru: 'Инклюзия и доступность',
      kk: 'Инклюзия және қолжетімділік',
      en: 'Inclusion and Accessibility'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 5.1: Поддержка доступного обучения
      'accessible_learning': {
        name: {
          ru: 'Поддержка доступного обучения',
          kk: 'Қолжетімді оқытуды қолдау',
          en: 'Accessible Learning Support'
        },
        description: {
          ru: 'Транскрипты аудио, голосовой контент, адаптация чтения, переводы, интерфейсы для разных аудиторий.',
          kk: 'Аудио транскрипттері, дауыстық контент, оқуды бейімдеу, аудармалар, әр түрлі аудиторияларға арналған интерфейстер.',
          en: 'Audio transcripts, voice content, reading adaptation, translations, interfaces for different audiences.'
        },
        tools: [
          {
            name: 'Otter.ai',
            functions: {
              ru: ['Транскрипция аудио', 'Автоматические субтитры', 'Доступность контента', 'Переводы'],
              kk: ['Аудио транскрипциясы', 'Автоматты субтитрлер', 'Контент қолжетімділігі', 'Аудармалар'],
              en: ['Audio transcription', 'Automatic subtitles', 'Content accessibility', 'Translations']
            },
            purpose: {
              ru: 'Транскрипция и доступность аудио-контента для всех',
              kk: 'Барлығына арналған аудио-контенттің транскрипциясы және қолжетімділігі',
              en: 'Transcription and accessibility of audio content for everyone'
            },
            link: 'https://otter.ai/',
            color: '#E8F5E9'
          },
          {
            name: 'Murf.ai',
            functions: {
              ru: ['Озвучка текста', 'Доступный аудио-контент', 'Многоязычность', 'Естественные голоса'],
              kk: ['Мәтінді дыбыстау', 'Қолжетімді аудио-контент', 'Көптілділік', 'Табиғи дауыстар'],
              en: ['Text-to-speech', 'Accessible audio content', 'Multilingualism', 'Natural voices']
            },
            purpose: {
              ru: 'Создание голосового контента для доступного обучения',
              kk: 'Қолжетімді оқыту үшін дауыстық контент жасау',
              en: 'Creating voice content for accessible learning'
            },
            link: 'https://murf.ai/',
            color: '#E3F2FD'
          },
          {
            name: 'Camb.ai',
            functions: {
              ru: ['Адаптация контента', 'Упрощение текста', 'Доступность материалов', 'Мультиформатность'],
              kk: ['Контентті бейімдеу', 'Мәтінді жеңілдету', 'Материалдардың қолжетімділігі', 'Мультиформаттылық'],
              en: ['Content adaptation', 'Text simplification', 'Material accessibility', 'Multi-format']
            },
            purpose: {
              ru: 'Адаптация образовательных материалов для разных уровней',
              kk: 'Білім беру материалдарын әр түрлі деңгейлерге бейімдеу',
              en: 'Adapting educational materials for different levels'
            },
            link: 'https://camb.ai/',
            color: '#F3E5F5'
          },
          {
            name: 'Canva',
            functions: {
              ru: ['Визуальная адаптация', 'Доступный дизайн', 'Шаблоны инклюзии', 'Многоформатность'],
              kk: ['Визуалды бейімдеу', 'Қолжетімді дизайн', 'Инклюзия үлгілері', 'Көп форматтылық'],
              en: ['Visual adaptation', 'Accessible design', 'Inclusion templates', 'Multi-format']
            },
            purpose: {
              ru: 'Создание доступного визуального контента для всех учащихся',
              kk: 'Барлық оқушыларға арналған қолжетімді визуалды контент жасау',
              en: 'Creating accessible visual content for all learners'
            },
            link: 'https://www.canva.com/',
            color: '#FFF3E0'
          },
          {
            name: 'ScribeSense',
            functions: {
              ru: ['Распознавание почерка', 'Доступность для всех', 'Адаптивные форматы', 'Цифровизация работ'],
              kk: ['Қолжазбаны тану', 'Барлығына қолжетімділік', 'Бейімделген форматтар', 'Жұмыстарды цифрландыру'],
              en: ['Handwriting recognition', 'Accessibility for all', 'Adaptive formats', 'Work digitization']
            },
            purpose: {
              ru: 'Цифровизация и адаптация рукописных работ для доступности',
              kk: 'Қолжетімділік үшін қолжазба жұмыстарды цифрландыру және бейімдеу',
              en: 'Digitization and adaptation of handwritten work for accessibility'
            },
            link: 'https://scribesense.com/',
            color: '#E1F5FE'
          },
          {
            name: 'Diffit',
            functions: {
              ru: ['Адаптация сложности', 'Упрощение текстов', 'Доступные материалы', 'Разные уровни'],
              kk: ['Күрделілікті бейімдеу', 'Мәтіндерді жеңілдету', 'Қолжетімді материалдар', 'Әр түрлі деңгейлер'],
              en: ['Difficulty adaptation', 'Text simplification', 'Accessible materials', 'Different levels']
            },
            purpose: {
              ru: 'Адаптация учебных материалов под разные уровни учащихся',
              kk: 'Оқу материалдарын оқушылардың әр түрлі деңгейлеріне бейімдеу',
              en: 'Adapting learning materials to different student levels'
            },
            link: 'https://diffit.me/',
            color: '#FCE4EC'
          },
          {
            name: 'Lingopie',
            functions: {
              ru: ['Субтитры', 'Языковая доступность', 'Контекстное обучение', 'Адаптивные переводы'],
              kk: ['Субтитрлер', 'Тілдік қолжетімділік', 'Контекстік оқыту', 'Бейімделген аудармалар'],
              en: ['Subtitles', 'Language accessibility', 'Contextual learning', 'Adaptive translations']
            },
            purpose: {
              ru: 'Языковая доступность через интерактивные субтитры',
              kk: 'Интерактивті субтитрлер арқылы тілдік қолжетімділік',
              en: 'Language accessibility through interactive subtitles'
            },
            link: 'https://lingopie.com/',
            color: '#FFF9C4'
          },
          {
            name: 'Eduaide.AI',
            functions: {
              ru: ['ИИ-адаптация', 'Доступные материалы', 'Персонализация контента', 'Поддержка учащихся'],
              kk: ['ЖИ-бейімдеу', 'Қолжетімді материалдар', 'Контентті жекелендіру', 'Оқушыларды қолдау'],
              en: ['AI adaptation', 'Accessible materials', 'Content personalization', 'Student support']
            },
            purpose: {
              ru: 'ИИ-помощь в создании доступных учебных материалов',
              kk: 'Қолжетімді оқу материалдарын жасауда ЖИ-көмек',
              en: 'AI assistance in creating accessible learning materials'
            },
            link: 'https://eduaide.ai/',
            color: '#E0F2F1'
          },
          {
            name: 'Augmentative AI',
            functions: {
              ru: ['Альтернативная коммуникация', 'Поддержка ОВЗ', 'Адаптивные интерфейсы', 'Доступность'],
              kk: ['Балама коммуникация', 'МҚҚ қолдау', 'Бейімделген интерфейстер', 'Қолжетімділік'],
              en: ['Alternative communication', 'Special needs support', 'Adaptive interfaces', 'Accessibility']
            },
            purpose: {
              ru: 'Поддержка альтернативной коммуникации для учащихся с ОВЗ',
              kk: 'МҚҚ бар оқушыларға балама коммуникацияны қолдау',
              en: 'Alternative communication support for students with special needs'
            },
            link: 'https://augmentativeai.com/',
            color: '#F1F8E9'
          },
          {
            name: 'Brainly AI',
            functions: {
              ru: ['Доступная помощь', 'Объяснения на простом языке', 'Мультиязычность', 'Адаптивные ответы'],
              kk: ['Қолжетімді көмек', 'Қарапайым тілде түсініктемелер', 'Көптілділік', 'Бейімделген жауаптар'],
              en: ['Accessible help', 'Simple language explanations', 'Multilingualism', 'Adaptive answers']
            },
            purpose: {
              ru: 'Доступная помощь в выполнении заданий для всех учащихся',
              kk: 'Барлық оқушыларға тапсырмаларды орындауда қолжетімді көмек',
              en: 'Accessible homework assistance for all students'
            },
            link: 'https://brainly.com/ai',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://espacepress.com/',
          'https://www.paradisosolutions.com/',
          'https://shadhinlab.com/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 5.2: Инклюзивные технологии
      'inclusive_tech': {
        name: {
          ru: 'Инклюзивные технологии',
          kk: 'Инклюзивті технологиялар',
          en: 'Inclusive Technologies'
        },
        description: {
          ru: 'Поддержка обучающихся с ОВЗ, перевод жестового языка, адаптированный учебный материал, персональные ассистенты.',
          kk: 'МҚҚ бар оқушыларды қолдау, ым тілін аудару, бейімделген оқу материалы, жеке көмекшілер.',
          en: 'Support for students with special needs, sign language translation, adapted learning materials, personal assistants.'
        },
        tools: [
          {
            name: 'SchoolAI',
            functions: {
              ru: ['ИИ-поддержка ОВЗ', 'Адаптированные материалы', 'Инклюзивные инструменты', 'Персонализация'],
              kk: ['МҚҚ-ға ЖИ-қолдау', 'Бейімделген материалдар', 'Инклюзивті құралдар', 'Жекелендіру'],
              en: ['AI special needs support', 'Adapted materials', 'Inclusive tools', 'Personalization']
            },
            purpose: {
              ru: 'Платформа с инструментами для инклюзивного образования',
              kk: 'Инклюзивті білім беру құралдары бар платформа',
              en: 'Platform with tools for inclusive education'
            },
            link: 'https://www.schoolai.com/',
            color: '#E8F5E9'
          },
          {
            name: 'Diffit',
            functions: {
              ru: ['Адаптация текстов', 'Упрощение материалов', 'Разные уровни сложности', 'Инклюзивность'],
              kk: ['Мәтіндерді бейімдеу', 'Материалдарды жеңілдету', 'Әр түрлі күрделілік деңгейлері', 'Инклюзивтілік'],
              en: ['Text adaptation', 'Material simplification', 'Different difficulty levels', 'Inclusiveness']
            },
            purpose: {
              ru: 'Адаптация материалов для учащихся с разными потребностями',
              kk: 'Әр түрлі қажеттіліктері бар оқушыларға материалдарды бейімдеу',
              en: 'Adapting materials for students with different needs'
            },
            link: 'https://diffit.me/',
            color: '#E3F2FD'
          },
          {
            name: 'Brainly AI Companion',
            functions: {
              ru: ['Доступная помощь', 'Адаптивные объяснения', 'Поддержка разных уровней', 'Инклюзивный подход'],
              kk: ['Қолжетімді көмек', 'Бейімделген түсініктемелер', 'Әр түрлі деңгейлерді қолдау', 'Инклюзивті тәсіл'],
              en: ['Accessible help', 'Adaptive explanations', 'Different level support', 'Inclusive approach']
            },
            purpose: {
              ru: 'ИИ-помощник с инклюзивным подходом к обучению',
              kk: 'Оқытуға инклюзивті көзқарасы бар ЖИ-көмекші',
              en: 'AI assistant with inclusive approach to learning'
            },
            link: 'https://brainly.com/ai',
            color: '#F3E5F5'
          },
          {
            name: 'Canva',
            functions: {
              ru: ['Визуальная доступность', 'Инклюзивный дизайн', 'Адаптация графики', 'Универсальный дизайн'],
              kk: ['Визуалды қолжетімділік', 'Инклюзивті дизайн', 'Графиканы бейімдеу', 'Әмбебап дизайн'],
              en: ['Visual accessibility', 'Inclusive design', 'Graphics adaptation', 'Universal design']
            },
            purpose: {
              ru: 'Создание инклюзивных визуальных материалов',
              kk: 'Инклюзивті визуалды материалдар жасау',
              en: 'Creating inclusive visual materials'
            },
            link: 'https://www.canva.com/',
            color: '#FFF3E0'
          },
          {
            name: 'Murf.ai',
            functions: {
              ru: ['Озвучка для незрячих', 'Аудио-описания', 'Голосовой контент', 'Доступность'],
              kk: ['Соқырларға арналған дыбыстау', 'Аудио-сипаттамалар', 'Дауыстық контент', 'Қолжетімділік'],
              en: ['Voiceover for blind', 'Audio descriptions', 'Voice content', 'Accessibility']
            },
            purpose: {
              ru: 'Голосовой контент для учащихся с нарушениями зрения',
              kk: 'Көру қабілеті бұзылған оқушыларға арналған дауыстық контент',
              en: 'Voice content for visually impaired students'
            },
            link: 'https://murf.ai/',
            color: '#E1F5FE'
          },
          {
            name: 'Otter.ai',
            functions: {
              ru: ['Транскрипция для глухих', 'Субтитры в реальном времени', 'Текстовые версии', 'Доступность аудио'],
              kk: ['Саңырауларға арналған транскрипция', 'Нақты уақыттағы субтитрлер', 'Мәтіндік нұсқалар', 'Аудио қолжетімділігі'],
              en: ['Transcription for deaf', 'Real-time subtitles', 'Text versions', 'Audio accessibility']
            },
            purpose: {
              ru: 'Доступность аудио-контента для учащихся с нарушениями слуха',
              kk: 'Есту қабілеті бұзылған оқушыларға арналған аудио-контенттің қолжетімділігі',
              en: 'Audio content accessibility for hearing impaired students'
            },
            link: 'https://otter.ai/',
            color: '#FCE4EC'
          },
          {
            name: 'Eduaide.AI',
            functions: {
              ru: ['ИИ-адаптация для ОВЗ', 'Персонализированная поддержка', 'Инклюзивные материалы', 'Специальные функции'],
              kk: ['МҚҚ үшін ЖИ-бейімдеу', 'Жекелендірілген қолдау', 'Инклюзивті материалдар', 'Арнайы функциялар'],
              en: ['AI adaptation for special needs', 'Personalized support', 'Inclusive materials', 'Special features']
            },
            purpose: {
              ru: 'ИИ-инструмент для создания инклюзивных учебных материалов',
              kk: 'Инклюзивті оқу материалдарын жасау үшін ЖИ-құрал',
              en: 'AI tool for creating inclusive learning materials'
            },
            link: 'https://eduaide.ai/',
            color: '#FFF9C4'
          },
          {
            name: 'Lingopie',
            functions: {
              ru: ['Языковая поддержка', 'Интерактивные субтитры', 'Мультиязычность', 'Адаптация контента'],
              kk: ['Тілдік қолдау', 'Интерактивті субтитрлер', 'Көптілділік', 'Контентті бейімдеу'],
              en: ['Language support', 'Interactive subtitles', 'Multilingualism', 'Content adaptation']
            },
            purpose: {
              ru: 'Языковая доступность через видео с интерактивными субтитрами',
              kk: 'Интерактивті субтитрлері бар бейне арқылы тілдік қолжетімділік',
              en: 'Language accessibility through videos with interactive subtitles'
            },
            link: 'https://lingopie.com/',
            color: '#E0F2F1'
          },
          {
            name: 'Auris AI',
            functions: {
              ru: ['Аудио-адаптация', 'Поддержка слуха', 'Голосовые описания', 'Доступные интерфейсы'],
              kk: ['Аудио-бейімдеу', 'Есту қолдауы', 'Дауыстық сипаттамалар', 'Қолжетімді интерфейстер'],
              en: ['Audio adaptation', 'Hearing support', 'Voice descriptions', 'Accessible interfaces']
            },
            purpose: {
              ru: 'Аудио-поддержка для учащихся с различными потребностями',
              kk: 'Әр түрлі қажеттіліктері бар оқушыларға арналған аудио-қолдау',
              en: 'Audio support for students with various needs'
            },
            link: 'https://auris.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'TutorMe',
            functions: {
              ru: ['Инклюзивное репетиторство', 'Персональная поддержка', 'Адаптированные уроки', 'Специальные подходы'],
              kk: ['Инклюзивті тьюторлық', 'Жеке қолдау', 'Бейімделген сабақтар', 'Арнайы тәсілдер'],
              en: ['Inclusive tutoring', 'Personal support', 'Adapted lessons', 'Special approaches']
            },
            purpose: {
              ru: 'Инклюзивное репетиторство с адаптацией под потребности',
              kk: 'Қажеттіліктерге бейімделген инклюзивті тьюторлық',
              en: 'Inclusive tutoring adapted to needs'
            },
            link: 'https://tutorme.com/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://espacepress.com/',
          'https://www.paradisosolutions.com/',
          'https://shadhinlab.com/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 6: Создание образовательного контента
  // ============================================================================
  'content_creation_category': {
    category: {
      ru: 'Создание образовательного контента',
      kk: 'Білім беру контентін жасау',
      en: 'Educational Content Creation'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 6.1: Генерация текстовой информации
      'text_generation': {
        name: {
          ru: 'Генерация текстовой информации',
          kk: 'Мәтіндік ақпаратты генерациялау',
          en: 'Text Information Generation'
        },
        description: {
          ru: 'Генерация учебных текстов, вопросов, резюме, методичек, текстовой поддержки учебников.',
          kk: 'Оқу мәтіндерін, сұрақтарды, резюмелерді, әдістемелік нұсқауларды, оқулықтарға мәтіндік қолдауды генерациялау.',
          en: 'Generation of educational texts, questions, summaries, methodological guides, textbook support.'
        },
        tools: [
          {
            name: 'ChatGPT',
            functions: {
              ru: ['Генерация текстов', 'Создание вопросов', 'Резюмирование', 'Методические материалы'],
              kk: ['Мәтін генерациясы', 'Сұрақтар жасау', 'Резюмелеу', 'Әдістемелік материалдар'],
              en: ['Text generation', 'Question creation', 'Summarization', 'Methodological materials']
            },
            purpose: {
              ru: 'Универсальный ИИ для создания образовательных текстов',
              kk: 'Білім беру мәтіндерін жасау үшін әмбебап ЖИ',
              en: 'Universal AI for creating educational texts'
            },
            link: 'https://chat.openai.com/',
            color: '#E8F5E9'
          },
          {
            name: 'Quillionz',
            functions: {
              ru: ['Генерация вопросов', 'Создание тестов', 'Автоматические викторины', 'Разные типы вопросов'],
              kk: ['Сұрақтарды генерациялау', 'Тесттер жасау', 'Автоматты викториналар', 'Әр түрлі сұрақ түрлері'],
              en: ['Question generation', 'Test creation', 'Automatic quizzes', 'Various question types']
            },
            purpose: {
              ru: 'Автоматическая генерация вопросов и тестов из текста',
              kk: 'Мәтіннен сұрақтар мен тесттерді автоматты генерациялау',
              en: 'Automatic question and test generation from text'
            },
            link: 'https://www.quillionz.com/',
            color: '#E3F2FD'
          },
          {
            name: 'Learnt.AI',
            functions: {
              ru: ['ИИ-контент', 'Генерация уроков', 'Создание материалов', 'Персонализация текстов'],
              kk: ['ЖИ-контент', 'Сабақтарды генерациялау', 'Материалдар жасау', 'Мәтіндерді жекелендіру'],
              en: ['AI content', 'Lesson generation', 'Material creation', 'Text personalization']
            },
            purpose: {
              ru: 'ИИ-платформа для создания образовательного контента',
              kk: 'Білім беру контентін жасау үшін ЖИ-платформа',
              en: 'AI platform for educational content creation'
            },
            link: 'https://learnt.ai/',
            color: '#F3E5F5'
          },
          {
            name: 'NotebookLM',
            functions: {
              ru: ['ИИ-заметки', 'Резюмирование', 'Генерация материалов', 'Умная организация'],
              kk: ['ЖИ-жазбалар', 'Резюмелеу', 'Материалдар генерациясы', 'Ақылды ұйымдастыру'],
              en: ['AI notes', 'Summarization', 'Material generation', 'Smart organization']
            },
            purpose: {
              ru: 'ИИ-блокнот для создания и организации учебного контента',
              kk: 'Оқу контентін жасау және ұйымдастыру үшін ЖИ-блокнот',
              en: 'AI notebook for creating and organizing study content'
            },
            link: 'https://notebooklm.google/',
            color: '#FFF3E0'
          },
          {
            name: 'Notion AI',
            functions: {
              ru: ['ИИ-писатель', 'Генерация документов', 'Создание планов', 'Организация материалов'],
              kk: ['ЖИ-жазушы', 'Құжаттарды генерациялау', 'Жоспарлар жасау', 'Материалдарды ұйымдастыру'],
              en: ['AI writer', 'Document generation', 'Plan creation', 'Material organization']
            },
            purpose: {
              ru: 'ИИ-помощь в создании образовательной документации',
              kk: 'Білім беру құжаттамасын жасауда ЖИ-көмек',
              en: 'AI assistance in creating educational documentation'
            },
            link: 'https://www.notion.so/product/ai',
            color: '#E1F5FE'
          },
          {
            name: 'Copilot',
            functions: {
              ru: ['ИИ-помощь в написании', 'Генерация кода', 'Создание документации', 'Автодополнение'],
              kk: ['Жазуда ЖИ-көмек', 'Код генерациясы', 'Құжаттама жасау', 'Автотолтыру'],
              en: ['AI writing assistance', 'Code generation', 'Documentation creation', 'Auto-completion']
            },
            purpose: {
              ru: 'ИИ-помощник для создания технического и образовательного контента',
              kk: 'Техникалық және білім беру контентін жасау үшін ЖИ-көмекші',
              en: 'AI assistant for creating technical and educational content'
            },
            link: 'https://copilot.microsoft.com/',
            color: '#FCE4EC'
          },
          {
            name: 'Jenni AI',
            functions: {
              ru: ['ИИ-писатель', 'Академическое письмо', 'Генерация эссе', 'Редактирование текстов'],
              kk: ['ЖИ-жазушы', 'Академиялық жазу', 'Эссе генерациясы', 'Мәтіндерді өңдеу'],
              en: ['AI writer', 'Academic writing', 'Essay generation', 'Text editing']
            },
            purpose: {
              ru: 'ИИ для академического письма и создания образовательных текстов',
              kk: 'Академиялық жазу және білім беру мәтіндерін жасау үшін ЖИ',
              en: 'AI for academic writing and creating educational texts'
            },
            link: 'https://jenni.ai/',
            color: '#FFF9C4'
          },
          {
            name: 'Brainly AI Companion',
            functions: {
              ru: ['Генерация объяснений', 'Создание примеров', 'Методические советы', 'Учебные материалы'],
              kk: ['Түсініктемелер генерациясы', 'Мысалдар жасау', 'Әдістемелік кеңестер', 'Оқу материалдары'],
              en: ['Explanation generation', 'Example creation', 'Methodological advice', 'Study materials']
            },
            purpose: {
              ru: 'ИИ для создания объяснений и учебных материалов',
              kk: 'Түсініктемелер мен оқу материалдарын жасау үшін ЖИ',
              en: 'AI for creating explanations and study materials'
            },
            link: 'https://brainly.com/ai',
            color: '#E0F2F1'
          },
          {
            name: 'GPTutor',
            functions: {
              ru: ['Генерация объяснений', 'Создание примеров', 'Пошаговые решения', 'Учебные тексты'],
              kk: ['Түсініктемелер генерациясы', 'Мысалдар жасау', 'Қадамдық шешімдер', 'Оқу мәтіндері'],
              en: ['Explanation generation', 'Example creation', 'Step-by-step solutions', 'Study texts']
            },
            purpose: {
              ru: 'ИИ-репетитор для создания образовательных текстов и объяснений',
              kk: 'Білім беру мәтіндері мен түсініктемелерді жасау үшін ЖИ-тьютор',
              en: 'AI tutor for creating educational texts and explanations'
            },
            link: 'https://gptutor.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'Diffit',
            functions: {
              ru: ['Адаптация текстов', 'Генерация вопросов', 'Создание материалов', 'Разные уровни'],
              kk: ['Мәтіндерді бейімдеу', 'Сұрақтарды генерациялау', 'Материалдар жасау', 'Әр түрлі деңгейлер'],
              en: ['Text adaptation', 'Question generation', 'Material creation', 'Different levels']
            },
            purpose: {
              ru: 'Создание адаптированных текстов и материалов разного уровня',
              kk: 'Әр түрлі деңгейдегі бейімделген мәтіндер мен материалдар жасау',
              en: 'Creating adapted texts and materials of different levels'
            },
            link: 'https://diffit.me/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://teacheducator.com/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 6.2: Создание аудио и видео контента
      'audio_video_creation': {
        name: {
          ru: 'Создание аудио и видео контента',
          kk: 'Аудио және бейне контентін жасау',
          en: 'Audio and Video Content Creation'
        },
        description: {
          ru: 'Авто создание лекций с аватарами, голосовой озвучкой, видеоуроков, инструменты презентаций.',
          kk: 'Аватарлармен, дауыстық дыбыстаумен дәрістерді, бейнежаттығуларды автоматты жасау, презентация құралдары.',
          en: 'Auto creation of lectures with avatars, voice narration, video lessons, presentation tools.'
        },
        tools: [
          {
            name: 'Synthesia',
            functions: {
              ru: ['ИИ-видео генерация', 'Виртуальные преподаватели', 'Многоязычные видео', 'Профессиональная озвучка'],
              kk: ['ЖИ-бейне генерациясы', 'Виртуалды оқытушылар', 'Көптілді бейнелер', 'Кәсіби дыбыстау'],
              en: ['AI video generation', 'Virtual instructors', 'Multilingual videos', 'Professional voiceover']
            },
            purpose: {
              ru: 'Создание профессиональных обучающих видео с ИИ-аватарами',
              kk: 'ЖИ-аватарларымен кәсіби оқыту бейнелерін жасау',
              en: 'Creating professional training videos with AI avatars'
            },
            link: 'https://www.synthesia.io/',
            color: '#E8F5E9'
          },
          {
            name: 'Reelmind.ai',
            functions: {
              ru: ['ИИ-видео производство', 'Автоматические презентации', 'Видео-уроки', 'Образовательный контент'],
              kk: ['ЖИ-бейне өндіру', 'Автоматты презентациялар', 'Бейне-сабақтар', 'Білім беру контенті'],
              en: ['AI video production', 'Automatic presentations', 'Video lessons', 'Educational content']
            },
            purpose: {
              ru: 'ИИ-платформа для создания образовательных видео',
              kk: 'Білім беру бейнелерін жасау үшін ЖИ-платформа',
              en: 'AI platform for creating educational videos'
            },
            link: 'https://reelmind.ai/',
            color: '#E3F2FD'
          },
          {
            name: 'Murf.ai',
            functions: {
              ru: ['ИИ-озвучка', 'Профессиональные голоса', 'Многоязычность', 'Голосовые уроки'],
              kk: ['ЖИ-дыбыстау', 'Кәсіби дауыстар', 'Көптілділік', 'Дауыстық сабақтар'],
              en: ['AI voiceover', 'Professional voices', 'Multilingualism', 'Voice lessons']
            },
            purpose: {
              ru: 'Создание голосового контента для образовательных видео',
              kk: 'Білім беру бейнелеріне арналған дауыстық контент жасау',
              en: 'Creating voice content for educational videos'
            },
            link: 'https://murf.ai/',
            color: '#F3E5F5'
          },
          {
            name: 'Paradiso Solutions',
            functions: {
              ru: ['Видео-курсы', 'SCORM контент', 'Мультимедиа уроки', 'Презентации'],
              kk: ['Бейне-курстар', 'SCORM контенті', 'Мультимедиа сабақтар', 'Презентациялар'],
              en: ['Video courses', 'SCORM content', 'Multimedia lessons', 'Presentations']
            },
            purpose: {
              ru: 'Комплексная платформа для создания мультимедийного контента',
              kk: 'Мультимедиялық контент жасау үшін кешенді платформа',
              en: 'Comprehensive platform for multimedia content creation'
            },
            link: 'https://www.paradisosolutions.com/',
            color: '#FFF3E0'
          },
          {
            name: 'Camb.ai',
            functions: {
              ru: ['Видео-адаптация', 'Автоматические субтитры', 'Преобразование контента', 'Мультиформат'],
              kk: ['Бейнені бейімдеу', 'Автоматты субтитрлер', 'Контентті түрлендіру', 'Мультиформат'],
              en: ['Video adaptation', 'Automatic subtitles', 'Content transformation', 'Multi-format']
            },
            purpose: {
              ru: 'Адаптация видео-контента для разных форматов',
              kk: 'Бейне-контентті әр түрлі форматтарға бейімдеу',
              en: 'Adapting video content for different formats'
            },
            link: 'https://camb.ai/',
            color: '#E1F5FE'
          },
          {
            name: 'SlidesAI',
            functions: {
              ru: ['ИИ-презентации', 'Автогенерация слайдов', 'Визуальный дизайн', 'Быстрое создание'],
              kk: ['ЖИ-презентациялар', 'Слайдтарды автогенерациялау', 'Визуалды дизайн', 'Жылдам жасау'],
              en: ['AI presentations', 'Slide auto-generation', 'Visual design', 'Quick creation']
            },
            purpose: {
              ru: 'Автоматическое создание презентаций с помощью ИИ',
              kk: 'ЖИ көмегімен презентацияларды автоматты жасау',
              en: 'Automatic presentation creation using AI'
            },
            link: 'https://www.slidesai.io/',
            color: '#FCE4EC'
          },
          {
            name: 'MagicSchool',
            functions: {
              ru: ['Генерация видео-уроков', 'Создание материалов', 'ИИ-помощник', 'Мультимедиа контент'],
              kk: ['Бейне-сабақтарды генерациялау', 'Материалдар жасау', 'ЖИ-көмекші', 'Мультимедиа контент'],
              en: ['Video lesson generation', 'Material creation', 'AI assistant', 'Multimedia content']
            },
            purpose: {
              ru: 'ИИ-инструмент для создания мультимедийных уроков',
              kk: 'Мультимедиялық сабақтар жасау үшін ЖИ-құрал',
              en: 'AI tool for creating multimedia lessons'
            },
            link: 'https://www.magicschool.ai/',
            color: '#FFF9C4'
          },
          {
            name: 'Scribe',
            functions: {
              ru: ['Автоматические видео-гайды', 'Скринкасты', 'Пошаговые инструкции', 'Обучающие ролики'],
              kk: ['Автоматты бейне-нұсқаулықтар', 'Скринкасттар', 'Қадамдық нұсқаулар', 'Оқыту роликтері'],
              en: ['Automatic video guides', 'Screencasts', 'Step-by-step instructions', 'Tutorial videos']
            },
            purpose: {
              ru: 'Автоматическое создание обучающих видео-инструкций',
              kk: 'Оқыту бейне-нұсқауларын автоматты жасау',
              en: 'Automatic creation of tutorial video instructions'
            },
            link: 'https://scribehow.com/',
            color: '#E0F2F1'
          },
          {
            name: 'Curipod',
            functions: {
              ru: ['Интерактивные презентации', 'Видео-слайды', 'ИИ-генерация', 'Мультимедиа уроки'],
              kk: ['Интерактивті презентациялар', 'Бейне-слайдтар', 'ЖИ-генерация', 'Мультимедиа сабақтар'],
              en: ['Interactive presentations', 'Video slides', 'AI generation', 'Multimedia lessons']
            },
            purpose: {
              ru: 'Создание интерактивных мультимедийных презентаций',
              kk: 'Интерактивті мультимедиялық презентацияларды жасау',
              en: 'Creating interactive multimedia presentations'
            },
            link: 'https://curipod.com/',
            color: '#F1F8E9'
          },
          {
            name: 'Re:Eng',
            functions: {
              ru: ['Технические видео', 'Симуляции процессов', 'Видео-эксперименты', '3D визуализация'],
              kk: ['Техникалық бейнелер', 'Процестерді симуляциялау', 'Бейне-эксперименттер', '3D визуализация'],
              en: ['Technical videos', 'Process simulations', 'Video experiments', '3D visualization']
            },
            purpose: {
              ru: 'Создание технических обучающих видео с симуляциями',
              kk: 'Симуляциялармен техникалық оқыту бейнелерін жасау',
              en: 'Creating technical training videos with simulations'
            },
            link: 'https://reeng.ai/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://reelmind.ai/',
          'https://www.paradisosolutions.com/'
        ]
      }
    }
  },

  // ============================================================================
  // КАТЕГОРИЯ 7: Поддержка обучения (виртуальные ассистенты и платформы)
  // ============================================================================
  'learning_support': {
    category: {
      ru: 'Поддержка обучения (виртуальные ассистенты и платформы)',
      kk: 'Оқытуды қолдау (виртуалды көмекшілер және платформалар)',
      en: 'Learning Support (Virtual Assistants and Platforms)'
    },
    subcategories: {
      // ПОДКАТЕГОРИЯ 7.1: Виртуальные ассистенты
      'virtual_assistants': {
        name: {
          ru: 'Виртуальные ассистенты',
          kk: 'Виртуалды көмекшілер',
          en: 'Virtual Assistants'
        },
        description: {
          ru: 'Взаимодействие в чатах, помощь в решении задач, объяснение, генерация обратной связи, адаптация под вопрос.',
          kk: 'Чаттарда өзара әрекеттесу, есептерді шешуде көмек, түсіндіру, кері байланыс генерациясы, сұраққа бейімделу.',
          en: 'Chat interaction, problem-solving assistance, explanation, feedback generation, question adaptation.'
        },
        tools: [
          {
            name: 'ChatGPT',
            functions: {
              ru: ['Универсальный ИИ-чат', 'Помощь в задачах', 'Объяснения', 'Генерация материалов'],
              kk: ['Әмбебап ЖИ-чат', 'Тапсырмаларда көмек', 'Түсініктемелер', 'Материалдар генерациясы'],
              en: ['Universal AI chat', 'Problem assistance', 'Explanations', 'Material generation']
            },
            purpose: {
              ru: 'Универсальный ИИ-ассистент для образования',
              kk: 'Білім беру үшін әмбебап ЖИ-көмекші',
              en: 'Universal AI assistant for education'
            },
            link: 'https://chat.openai.com/',
            color: '#E8F5E9'
          },
          {
            name: 'Khanmigo',
            functions: {
              ru: ['ИИ-репетитор', 'Персонализированная помощь', 'Пошаговые объяснения', 'Адаптивное обучение'],
              kk: ['ЖИ-тьютор', 'Жекелендірілген көмек', 'Қадамдық түсініктемелер', 'Бейімделген оқыту'],
              en: ['AI tutor', 'Personalized help', 'Step-by-step explanations', 'Adaptive learning']
            },
            purpose: {
              ru: 'ИИ-репетитор от Khan Academy для персонализированного обучения',
              kk: 'Khan Academy-дан жекелендірілген оқытуға арналған ЖИ-тьютор',
              en: 'AI tutor from Khan Academy for personalized learning'
            },
            link: 'https://www.khanacademy.org/khan-labs',
            color: '#E3F2FD'
          },
          {
            name: 'Gemini for Education',
            functions: {
              ru: ['ИИ-помощник Google', 'Интеграция с Google Workspace', 'Помощь в обучении', 'Генерация контента'],
              kk: ['Google ЖИ-көмекшісі', 'Google Workspace интеграциясы', 'Оқытуда көмек', 'Контент генерациясы'],
              en: ['Google AI assistant', 'Google Workspace integration', 'Learning assistance', 'Content generation']
            },
            purpose: {
              ru: 'ИИ-ассистент Google для образования',
              kk: 'Білім беруге арналған Google ЖИ-көмекшісі',
              en: 'Google AI assistant for education'
            },
            link: 'https://gemini.google.com/edu',
            color: '#F3E5F5'
          },
          {
            name: 'EduBot',
            functions: {
              ru: ['ИИ-чатбот', 'Помощь студентам', 'Автоматические ответы', 'Обучающие диалоги'],
              kk: ['ЖИ-чатбот', 'Студенттерге көмек', 'Автоматты жауаптар', 'Оқыту диалогтары'],
              en: ['AI chatbot', 'Student assistance', 'Automatic responses', 'Educational dialogues']
            },
            purpose: {
              ru: 'ИИ-чатбот для поддержки студентов 24/7',
              kk: 'Студенттерді 24/7 қолдауға арналған ЖИ-чатбот',
              en: 'AI chatbot for 24/7 student support'
            },
            link: 'https://edubot.ai/',
            color: '#FFF3E0'
          },
          {
            name: 'Brainly AI Companion',
            functions: {
              ru: ['ИИ-помощь в ДЗ', 'Объяснения задач', 'Пошаговые решения', 'Обучающие подсказки'],
              kk: ['ҮТ-да ЖИ-көмек', 'Тапсырмаларды түсіндіру', 'Қадамдық шешімдер', 'Оқыту кеңестері'],
              en: ['AI homework help', 'Problem explanations', 'Step-by-step solutions', 'Learning hints']
            },
            purpose: {
              ru: 'ИИ-помощник для выполнения домашних заданий',
              kk: 'Үй тапсырмаларын орындауға арналған ЖИ-көмекші',
              en: 'AI assistant for homework completion'
            },
            link: 'https://brainly.com/ai',
            color: '#E1F5FE'
          },
          {
            name: 'SchoolAI',
            functions: {
              ru: ['ИИ-помощник школы', 'Поддержка учителей', 'Помощь студентам', 'Автоматизация задач'],
              kk: ['Мектептің ЖИ-көмекшісі', 'Мұғалімдерді қолдау', 'Студенттерге көмек', 'Тапсырмаларды автоматтандыру'],
              en: ['School AI assistant', 'Teacher support', 'Student help', 'Task automation']
            },
            purpose: {
              ru: 'ИИ-платформа для поддержки всего школьного сообщества',
              kk: 'Бүкіл мектеп қауымдастығын қолдауға арналған ЖИ-платформа',
              en: 'AI platform for supporting the entire school community'
            },
            link: 'https://www.schoolai.com/',
            color: '#FCE4EC'
          },
          {
            name: 'NeuroChat (пилот)',
            functions: {
              ru: ['Эмоциональный ИИ', 'Психологическая поддержка', 'Адаптивные диалоги', 'Эмпатичные ответы'],
              kk: ['Эмоционалды ЖИ', 'Психологиялық қолдау', 'Бейімделген диалогтар', 'Эмпатиялық жауаптар'],
              en: ['Emotional AI', 'Psychological support', 'Adaptive dialogues', 'Empathetic responses']
            },
            purpose: {
              ru: 'ИИ-чат с эмоциональной поддержкой студентов',
              kk: 'Студенттерді эмоционалды қолдаумен ЖИ-чат',
              en: 'AI chat with emotional student support'
            },
            link: 'https://neurochat.ai/',
            color: '#FFF9C4'
          },
          {
            name: 'TutorMe',
            functions: {
              ru: ['ИИ-репетитор', 'Персональная помощь', 'Разные предметы', 'Адаптивное обучение'],
              kk: ['ЖИ-тьютор', 'Жеке көмек', 'Әр түрлі пәндер', 'Бейімделген оқыту'],
              en: ['AI tutor', 'Personal assistance', 'Various subjects', 'Adaptive learning']
            },
            purpose: {
              ru: 'Платформа персонального репетиторства с ИИ',
              kk: 'ЖИ-мен жеке тьюторлық платформа',
              en: 'Personal tutoring platform with AI'
            },
            link: 'https://tutorme.com/',
            color: '#E0F2F1'
          },
          {
            name: 'QANDA',
            functions: {
              ru: ['Решение задач', 'Сканирование вопросов', 'Мгновенные ответы', 'Пошаговые решения'],
              kk: ['Есептерді шешу', 'Сұрақтарды сканерлеу', 'Жедел жауаптар', 'Қадамдық шешімдер'],
              en: ['Problem solving', 'Question scanning', 'Instant answers', 'Step-by-step solutions']
            },
            purpose: {
              ru: 'ИИ для мгновенного решения учебных задач',
              kk: 'Оқу тапсырмаларын жедел шешу үшін ЖИ',
              en: 'AI for instant solving of study problems'
            },
            link: 'https://qanda.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'SmartTutor',
            functions: {
              ru: ['Персональный ИИ-репетитор', 'Адаптивная помощь', 'Обучающие диалоги', 'Отслеживание прогресса'],
              kk: ['Жеке ЖИ-тьютор', 'Бейімделген көмек', 'Оқыту диалогтары', 'Прогрессті қадағалау'],
              en: ['Personal AI tutor', 'Adaptive assistance', 'Educational dialogues', 'Progress tracking']
            },
            purpose: {
              ru: 'Интеллектуальная система репетиторства с персонализацией',
              kk: 'Жекелендірумен интеллектуалды тьюторлық жүйе',
              en: 'Intelligent tutoring system with personalization'
            },
            link: 'https://www.smarttutor.com/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://en.wikipedia.org/',
          'https://teacheducator.com/',
          'https://www.aiapps.com/'
        ]
      },
      
      // ПОДКАТЕГОРИЯ 7.2: Платформы управления образовательной средой
      'educational_management': {
        name: {
          ru: 'Платформы управления образовательной средой',
          kk: 'Білім беру ортасын басқару платформалары',
          en: 'Educational Environment Management Platforms'
        },
        description: {
          ru: 'Организация расписаний, контроль прогресса, интерфейсы с LMS, аналитика и пользовательские дашборды.',
          kk: 'Кестелерді ұйымдастыру, прогрессті бақылау, LMS интерфейстері, аналитика және пайдаланушы бақылау тақталары.',
          en: 'Schedule organization, progress control, LMS interfaces, analytics and user dashboards.'
        },
        tools: [
          {
            name: 'Canvas+ChatGPT',
            functions: {
              ru: ['LMS с ИИ', 'Управление курсами', 'Автоматизация задач', 'ИИ-помощь студентам'],
              kk: ['ЖИ-мен LMS', 'Курстарды басқару', 'Тапсырмаларды автоматтандыру', 'Студенттерге ЖИ-көмек'],
              en: ['LMS with AI', 'Course management', 'Task automation', 'AI student assistance']
            },
            purpose: {
              ru: 'LMS Canvas с интеграцией ИИ для улучшенного управления обучением',
              kk: 'Оқытуды жақсартылған басқару үшін ЖИ интеграциясы бар Canvas LMS',
              en: 'Canvas LMS with AI integration for enhanced learning management'
            },
            link: 'https://www.instructure.com/canvas',
            color: '#E8F5E9'
          },
          {
            name: 'SchoolAI',
            functions: {
              ru: ['Управление школой', 'Планирование уроков', 'Контроль прогресса', 'Дашборды'],
              kk: ['Мектепті басқару', 'Сабақтарды жоспарлау', 'Прогрессті бақылау', 'Бақылау тақталары'],
              en: ['School management', 'Lesson planning', 'Progress control', 'Dashboards']
            },
            purpose: {
              ru: 'Комплексная платформа для управления школой и обучением',
              kk: 'Мектепті және оқытуды басқаруға арналған кешенді платформа',
              en: 'Comprehensive platform for school and learning management'
            },
            link: 'https://www.schoolai.com/',
            color: '#E3F2FD'
          },
          {
            name: 'NotebookLM',
            functions: {
              ru: ['ИИ-организация', 'Управление заметками', 'Планирование обучения', 'Умный поиск'],
              kk: ['ЖИ-ұйымдастыру', 'Жазбаларды басқару', 'Оқытуды жоспарлау', 'Ақылды іздеу'],
              en: ['AI organization', 'Note management', 'Learning planning', 'Smart search']
            },
            purpose: {
              ru: 'ИИ-блокнот для организации учебного процесса',
              kk: 'Оқу процесін ұйымдастыру үшін ЖИ-блокнот',
              en: 'AI notebook for learning process organization'
            },
            link: 'https://notebooklm.google/',
            color: '#F3E5F5'
          },
          {
            name: 'Learnt.AI',
            functions: {
              ru: ['ИИ-платформа обучения', 'Управление курсами', 'Аналитика прогресса', 'Персонализация'],
              kk: ['ЖИ-оқыту платформасы', 'Курстарды басқару', 'Прогресс аналитикасы', 'Жекелендіру'],
              en: ['AI learning platform', 'Course management', 'Progress analytics', 'Personalization']
            },
            purpose: {
              ru: 'ИИ-платформа для управления и персонализации обучения',
              kk: 'Оқытуды басқару және жекелендіру үшін ЖИ-платформа',
              en: 'AI platform for learning management and personalization'
            },
            link: 'https://learnt.ai/',
            color: '#FFF3E0'
          },
          {
            name: 'Snorkl',
            functions: {
              ru: ['Управление обучением', 'Аналитика классов', 'Планирование', 'Интеграция с LMS'],
              kk: ['Оқытуды басқару', 'Сынып аналитикасы', 'Жоспарлау', 'LMS интеграциясы'],
              en: ['Learning management', 'Class analytics', 'Planning', 'LMS integration']
            },
            purpose: {
              ru: 'Платформа для управления образовательным процессом',
              kk: 'Білім беру процесін басқару платформасы',
              en: 'Platform for educational process management'
            },
            link: 'https://snorkl.ai/',
            color: '#E1F5FE'
          },
          {
            name: 'Notion AI',
            functions: {
              ru: ['Планирование уроков', 'Организация материалов', 'Управление проектами', 'Дашборды'],
              kk: ['Сабақтарды жоспарлау', 'Материалдарды ұйымдастыру', 'Жобаларды басқару', 'Бақылау тақталары'],
              en: ['Lesson planning', 'Material organization', 'Project management', 'Dashboards']
            },
            purpose: {
              ru: 'Универсальная платформа для организации учебного процесса',
              kk: 'Оқу процесін ұйымдастыру үшін әмбебап платформа',
              en: 'Universal platform for learning process organization'
            },
            link: 'https://www.notion.so/product/ai',
            color: '#FCE4EC'
          },
          {
            name: 'Copilot for Education',
            functions: {
              ru: ['ИИ-помощь учителям', 'Планирование уроков', 'Создание материалов', 'Автоматизация'],
              kk: ['Мұғалімдерге ЖИ-көмек', 'Сабақтарды жоспарлау', 'Материалдар жасау', 'Автоматтандыру'],
              en: ['AI teacher assistance', 'Lesson planning', 'Material creation', 'Automation']
            },
            purpose: {
              ru: 'ИИ-помощник для учителей в планировании и управлении',
              kk: 'Мұғалімдерге жоспарлау және басқаруда ЖИ-көмекші',
              en: 'AI assistant for teachers in planning and management'
            },
            link: 'https://copilot.microsoft.com/education',
            color: '#FFF9C4'
          },
          {
            name: 'Curipod',
            functions: {
              ru: ['Интерактивные уроки', 'Управление классом', 'Вовлечение студентов', 'Аналитика'],
              kk: ['Интерактивті сабақтар', 'Сыныпты басқару', 'Студенттерді тарту', 'Аналитика'],
              en: ['Interactive lessons', 'Classroom management', 'Student engagement', 'Analytics']
            },
            purpose: {
              ru: 'Платформа для создания и управления интерактивными уроками',
              kk: 'Интерактивті сабақтарды жасау және басқару платформасы',
              en: 'Platform for creating and managing interactive lessons'
            },
            link: 'https://curipod.com/',
            color: '#E0F2F1'
          },
          {
            name: 'Eduaide.AI',
            functions: {
              ru: ['ИИ-планирование', 'Создание уроков', 'Управление материалами', 'Автоматизация задач'],
              kk: ['ЖИ-жоспарлау', 'Сабақтар жасау', 'Материалдарды басқару', 'Тапсырмаларды автоматтандыру'],
              en: ['AI planning', 'Lesson creation', 'Material management', 'Task automation']
            },
            purpose: {
              ru: 'ИИ-инструмент для планирования и управления учебным процессом',
              kk: 'Оқу процесін жоспарлау және басқару үшін ЖИ-құрал',
              en: 'AI tool for learning process planning and management'
            },
            link: 'https://eduaide.ai/',
            color: '#F1F8E9'
          },
          {
            name: 'MagicSchool AI',
            functions: {
              ru: ['ИИ-помощник учителя', 'Планирование уроков', 'Управление контентом', 'Дашборды'],
              kk: ['ЖИ-мұғалім көмекшісі', 'Сабақтарды жоспарлау', 'Контентті басқару', 'Бақылау тақталары'],
              en: ['AI teacher assistant', 'Lesson planning', 'Content management', 'Dashboards']
            },
            purpose: {
              ru: 'Комплексная ИИ-платформа для учителей',
              kk: 'Мұғалімдерге арналған кешенді ЖИ-платформа',
              en: 'Comprehensive AI platform for teachers'
            },
            link: 'https://www.magicschool.ai/',
            color: '#FBE9E7'
          }
        ],
        sources: [
          'https://reelmind.ai/',
          'https://ipst.education/',
          'https://edubookzone.com/'
        ]
      }
    }
  }
};

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

/**
 * Конвертирует структурированные данные в массив инструментов для базы данных
 * @param {string} language - язык (ru, kk, en)
 * @returns {Array} - массив инструментов
 */
export const convertToTools = (language = 'ru') => {
  const tools = [];
  
  Object.entries(toolsDatabase).forEach(([categoryKey, categoryData]) => {
    const categoryName = categoryData.category[language];
    
    Object.entries(categoryData.subcategories).forEach(([subcategoryKey, subcategoryData]) => {
      const subcategoryName = subcategoryData.name[language];
      const description = subcategoryData.description[language];
      
      subcategoryData.tools.forEach((tool, index) => {
        tools.push({
          title: tool.name,
          description: tool.purpose[language],
          functions: tool.functions[language],
          purpose: tool.purpose[language],
          category: categoryName,
          subcategory: subcategoryName,
          link: tool.link,
          color: tool.color,
          sources: subcategoryData.sources,
          categoryKey,
          subcategoryKey,
          order: index
        });
      });
    });
  });
  
  return tools;
};

/**
 * Получить все категории с переводами
 * @returns {Object} - объект с категориями на всех языках
 */
export const getAllCategoriesWithTranslations = () => {
  const result = {
    ru: {},
    kk: {},
    en: {}
  };
  
  Object.entries(toolsDatabase).forEach(([categoryKey, categoryData]) => {
    result.ru[categoryKey] = categoryData.category.ru;
    result.kk[categoryKey] = categoryData.category.kk;
    result.en[categoryKey] = categoryData.category.en;
  });
  
  return result;
};

/**
 * Получить все подкатегории с переводами
 * @returns {Object} - объект с подкатегориями на всех языках
 */
export const getAllSubcategoriesWithTranslations = () => {
  const result = {
    ru: {},
    kk: {},
    en: {}
  };
  
  Object.entries(toolsDatabase).forEach(([categoryKey, categoryData]) => {
    Object.entries(categoryData.subcategories).forEach(([subcategoryKey, subcategoryData]) => {
      result.ru[subcategoryKey] = subcategoryData.name.ru;
      result.kk[subcategoryKey] = subcategoryData.name.kk;
      result.en[subcategoryKey] = subcategoryData.name.en;
    });
  });
  
  return result;
};

/**
 * Получить статистику по инструментам
 * @returns {Object} - статистика
 */
export const getToolsStatistics = () => {
  let totalTools = 0;
  let categoriesCount = 0;
  let subcategoriesCount = 0;
  
  Object.entries(toolsDatabase).forEach(([categoryKey, categoryData]) => {
    categoriesCount++;
    Object.entries(categoryData.subcategories).forEach(([subcategoryKey, subcategoryData]) => {
      subcategoriesCount++;
      totalTools += subcategoryData.tools.length;
    });
  });
  
  return {
    totalTools,
    categoriesCount,
    subcategoriesCount,
    avgToolsPerSubcategory: (totalTools / subcategoriesCount).toFixed(1)
  };
};

console.log('Статистика базы данных:', getToolsStatistics());
