export type Language = 'ko' | 'en' | 'ja';

export interface Option {
  icon: string;
  text: Record<Language, string>;
  subText?: Record<Language, string>;
  type: string;
  color?: string;
}

export interface Question {
  emoji: string;
  text: Record<Language, string>;
  options: Option[];
}

export interface Result {
  id: number;
  name: Record<Language, string>;
  type: Record<Language, string>;
  typeColor: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  traits: Record<Language, string[]>;
}

export const QUESTIONS: Question[] = [
  {
    emoji: '🌅',
    text: {
      ko: '주말 아침, 눈을 떴을 때 당신의 모습은?',
      en: 'Weekend morning, what do you look like when you wake up?',
      ja: '週末の朝、目が覚めた時のあなたの姿は？'
    },
    options: [
      { 
        icon: 'event_available', 
        text: { ko: '계획 세우기', en: 'Planning', ja: '計画を立てる' }, 
        subText: { ko: '이미 할 일 정해둠', en: 'Already decided', ja: 'すでに予定を決めている' }, 
        type: 'fire', 
        color: 'bg-orange-100 text-orange-500' 
      },
      { 
        icon: 'bed', 
        text: { ko: '5분만 더...', en: '5 more minutes...', ja: 'あと5分だけ…' }, 
        subText: { ko: '잠만보처럼 휴식', en: 'Resting like Snorlax', ja: 'カビゴンのように休息' }, 
        type: 'normal', 
        color: 'bg-slate-100 text-slate-500' 
      },
      { 
        icon: 'hiking', 
        text: { ko: '바깥 공기', en: 'Fresh air', ja: '外の空気' }, 
        subText: { ko: '풀숲을 산책하기', en: 'Walking in grass', ja: '草むらを散歩する' }, 
        type: 'grass', 
        color: 'bg-green-100 text-green-500' 
      },
      { 
        icon: 'bolt', 
        text: { ko: '두근두근', en: 'Excited', ja: 'ワクワク' }, 
        subText: { ko: '에너지 풀 충전!', en: 'Full energy!', ja: 'エネルギーフル充電！' }, 
        type: 'electric', 
        color: 'bg-yellow-100 text-yellow-500' 
      },
    ]
  },
  {
    emoji: '🧃',
    text: {
      ko: '친구들 사이에서 당신은 어떤 존재인가요?',
      en: 'What kind of person are you among friends?',
      ja: '友達の間で、あなたはどのような存在ですか？'
    },
    options: [
      { 
        icon: 'celebration', 
        text: { ko: '분위기 메이커', en: 'Mood maker', ja: 'ムードメーカー' }, 
        subText: { ko: '웃음을 책임진다', en: 'Responsible for laughs', ja: '笑いに責任を持つ' }, 
        type: 'fairy', 
        color: 'bg-pink-100 text-pink-500' 
      },
      { 
        icon: 'diversity_3', 
        text: { ko: '든든한 친구', en: 'Reliable friend', ja: '心強い友達' }, 
        subText: { ko: '고민 해결사', en: 'Problem solver', ja: '悩み相談役' }, 
        type: 'water', 
        color: 'bg-blue-100 text-blue-500' 
      },
      { 
        icon: 'leaderboard', 
        text: { ko: '추진력 대장', en: 'Driven leader', ja: '推進力リーダー' }, 
        subText: { ko: '나를 따르라!', en: 'Follow me!', ja: '私について来い！' }, 
        type: 'fighting', 
        color: 'bg-red-100 text-red-500' 
      },
      { 
        icon: 'visibility_off', 
        text: { ko: '미스테리', en: 'Mystery', ja: 'ミステリー' }, 
        subText: { ko: '조용한 관찰자', en: 'Quiet observer', ja: '静かな観察者' }, 
        type: 'dark', 
        color: 'bg-slate-800 text-slate-200' 
      },
    ]
  },
  {
    emoji: '💥',
    text: {
      ko: '갑자기 스트레스 받는 일이 생겼다면?',
      en: 'What if something stressful suddenly happens?',
      ja: '突然ストレスを感じることがあったら？'
    },
    options: [
      { 
        icon: 'directions_run', 
        text: { ko: '몸 움직이기', en: 'Moving body', ja: '体を動かす' }, 
        subText: { ko: '땀 흘리며 해소', en: 'Release with sweat', ja: '汗を流して解消' }, 
        type: 'fighting', 
        color: 'bg-orange-100 text-orange-600' 
      },
      { 
        icon: 'headset', 
        text: { ko: '혼자만의 시간', en: 'Time alone', ja: '一人の時間' }, 
        subText: { ko: '음악으로 정화', en: 'Purify with music', ja: '音楽で浄化' }, 
        type: 'ghost', 
        color: 'bg-purple-100 text-purple-500' 
      },
      { 
        icon: 'forum', 
        text: { ko: '수다 떨기', en: 'Chatting', ja: 'おしゃべり' }, 
        subText: { ko: '친구에게 하소연', en: 'Venting to friends', ja: '友達に愚痴をこぼす' }, 
        type: 'ice', 
        color: 'bg-blue-50 text-blue-400' 
      },
      { 
        icon: 'psychology', 
        text: { ko: '원인 분석', en: 'Cause analysis', ja: '原因分析' }, 
        subText: { ko: '해결책부터 찾기', en: 'Finding solutions first', ja: '解決策から探す' }, 
        type: 'steel', 
        color: 'bg-slate-200 text-slate-600' 
      },
    ]
  },
  {
    emoji: '🌤️',
    text: {
      ko: '가장 좋아하는 날씨나 분위기는?',
      en: 'Favorite weather or atmosphere?',
      ja: '一番好きな天気や雰囲気は？'
    },
    options: [
      { 
        icon: 'wb_sunny', 
        text: { ko: '뜨거운 햇살', en: 'Hot sunshine', ja: '熱い日差し' }, 
        subText: { ko: '열정적인 여름', en: 'Passionate summer', ja: '情熱的な夏' }, 
        type: 'dragon', 
        color: 'bg-orange-100 text-orange-500' 
      },
      { 
        icon: 'ac_unit', 
        text: { ko: '차가운 눈', en: 'Cold snow', ja: '冷たい雪' }, 
        subText: { ko: '고요한 겨울밤', en: 'Quiet winter night', ja: '静かな冬の夜' }, 
        type: 'ice', 
        color: 'bg-blue-50 text-blue-400' 
      },
      { 
        icon: 'thunderstorm', 
        text: { ko: '천둥 번개', en: 'Thunderstorm', ja: '雷雨' }, 
        subText: { ko: '짜릿한 에너지', en: 'Thrilling energy', ja: '刺激的なエネルギー' }, 
        type: 'poison', 
        color: 'bg-purple-200 text-purple-700' 
      },
      { 
        icon: 'cloudy_snowing', 
        text: { ko: '쌀쌀한 아침', en: 'Chilly morning', ja: '肌寒い朝' }, 
        subText: { ko: '미스테리한 안개', en: 'Mysterious fog', ja: 'ミステリアスな霧' }, 
        type: 'ground', 
        color: 'bg-yellow-100 text-yellow-700' 
      },
    ]
  },
  {
    emoji: '🍕',
    text: {
      ko: '메뉴를 결정할 때 당신의 스타일은?',
      en: 'What is your style when deciding a menu?',
      ja: 'メニューを決める時のあなたのスタイルは？'
    },
    options: [
      { 
        icon: 'campaign', 
        text: { ko: '강력 추천', en: 'Highly recommended', ja: '強力に推薦' }, 
        subText: { ko: '먹고 싶은 거 어필', en: 'Appeal what I want', ja: '食べたいものをアピール' }, 
        type: 'rock', 
        color: 'bg-stone-200 text-stone-600' 
      },
      { 
        icon: 'check_circle', 
        text: { ko: '아무거나 OK', en: 'Anything is OK', ja: '何でもOK' }, 
        subText: { ko: '다 맛있어~', en: 'Everything is delicious', ja: '全部美味しい〜' }, 
        type: 'normal', 
        color: 'bg-slate-100 text-slate-500' 
      },
      { 
        icon: 'query_stats', 
        text: { ko: '합리적 선택', en: 'Rational choice', ja: '合理的な選択' }, 
        subText: { ko: '리뷰와 평점 확인', en: 'Checking reviews', ja: 'レビューと評価を確認' }, 
        type: 'psychic', 
        color: 'bg-pink-100 text-pink-500' 
      },
      { 
        icon: 'eco', 
        text: { ko: '건강 우선', en: 'Health first', ja: '健康優先' }, 
        subText: { ko: '프레시한 한 끼', en: 'Fresh meal', ja: 'フレッシュな一食' }, 
        type: 'grass', 
        color: 'bg-green-100 text-green-500' 
      },
    ]
  },
  {
    emoji: '🎮',
    text: {
      ko: '게임이나 승부에서 당신의 전략은?',
      en: 'What is your strategy in a game or match?',
      ja: 'ゲームや勝負でのあなたの戦略は？'
    },
    options: [
      { 
        icon: 'flash_on', 
        text: { ko: '무조건 공격', en: 'Attack unconditionally', ja: '無条件に攻撃' }, 
        subText: { ko: '화끈한 화력전', en: 'Intense firepower', ja: '熱い火力戦' }, 
        type: 'fire', 
        color: 'bg-red-100 text-red-500' 
      },
      { 
        icon: 'shield', 
        text: { ko: '철벽 방어', en: 'Iron defense', ja: '鉄壁の防御' }, 
        subText: { ko: '무너지지 않는 벽', en: 'Unbreakable wall', ja: '崩れない壁' }, 
        type: 'steel', 
        color: 'bg-slate-300 text-slate-700' 
      },
      { 
        icon: 'lightbulb', 
        text: { ko: '지능적 플레이', en: 'Intelligent play', ja: '知的なプレイ' }, 
        subText: { ko: '상대 심리 이용', en: 'Using psychology', ja: '相手の心理を利用' }, 
        type: 'psychic', 
        color: 'bg-pink-100 text-pink-500' 
      },
      { 
        icon: 'auto_awesome', 
        text: { ko: '변칙 공격', en: 'Unpredictable attack', ja: '変則攻撃' }, 
        subText: { ko: '게릴라 전술', en: 'Guerrilla tactics', ja: 'ゲリラ戦術' }, 
        type: 'ghost', 
        color: 'bg-purple-100 text-purple-500' 
      },
    ]
  },
  {
    emoji: '✨',
    text: {
      ko: '당신을 가장 잘 표현하는 키워드는?',
      en: 'What keyword represents you best?',
      ja: 'あなたを最もよく表現するキーワードは？'
    },
    options: [
      { 
        icon: 'volcano', 
        text: { ko: '압도적인', en: 'Overwhelming', ja: '圧倒的な' }, 
        subText: { ko: '강력한 카리스마', en: 'Strong charisma', ja: '強力なカリスマ' }, 
        type: 'dragon', 
        color: 'bg-indigo-100 text-indigo-600' 
      },
      { 
        icon: 'waves', 
        text: { ko: '유연한', en: 'Flexible', ja: '柔軟な' }, 
        subText: { ko: '어디든 적응하는', en: 'Adapting anywhere', ja: 'どこにでも適応する' }, 
        type: 'water', 
        color: 'bg-blue-100 text-blue-500' 
      },
      { 
        icon: 'auto_fix_high', 
        text: { ko: '사랑스러운', en: 'Lovely', ja: '愛らしい' }, 
        subText: { ko: '모두를 행복하게', en: 'Making all happy', ja: 'みんなを幸せに' }, 
        type: 'fairy', 
        color: 'bg-pink-50 text-pink-400' 
      },
      { 
        icon: 'diamond', 
        text: { ko: '단단한', en: 'Solid', ja: '堅実な' }, 
        subText: { ko: '흔들리지 않는', en: 'Unshakable', ja: '揺るぎない' }, 
        type: 'rock', 
        color: 'bg-stone-300 text-stone-700' 
      },
    ]
  },
];

export const RESULTS: Record<string, Result> = {
  fire: {
    id: 6,
    name: { ko: '리자몽', en: 'Charizard', ja: 'リザードン' },
    type: { ko: '🔥 불꽃 타입', en: '🔥 Fire Type', ja: '🔥 ほのおタイプ' },
    typeColor: '#ff6b35',
    title: { ko: '당신은 리자몽입니다!', en: 'You are Charizard!', ja: 'あなたはリザードンです！' },
    desc: { 
      ko: '강렬한 카리스마와 넘치는 열정의 소유자예요. 목표를 향해 불꽃처럼 달려가는 타입이지만, 진심으로 인정한 사람에게는 한없이 의리 있는 면모도 있답니다.', 
      en: 'Possessor of intense charisma and overflowing passion. You are the type to run like a fire toward your goals, but you also have a very loyal side.', 
      ja: '強烈なカリスマ性と溢れる情熱の持ち主です。目標に向かって炎のように突き進むタイプですが、認めた相手には限りなく義理堅い一面もあります。' 
    },
    traits: { 
      ko: ['열정적', '카리스마', '자존심 강함', '의리있음', '리더십'], 
      en: ['Passionate', 'Charismatic', 'Proud', 'Loyal', 'Leadership'], 
      ja: ['情熱的', 'カリスマ', 'プライドが高い', '義理堅い', 'リーダーシップ'] 
    }
  },
  water: {
    id: 130,
    name: { ko: '갸라도스', en: 'Gyarados', ja: 'ギャラドス' },
    type: { ko: '💧 물 타입', en: '💧 Water Type', ja: '💧 みずタイプ' },
    typeColor: '#4fc3f7',
    title: { ko: '당신은 갸라도스입니다!', en: 'You are Gyarados!', ja: 'あなたはギャラドスです！' },
    desc: { 
      ko: '평소엔 조용하고 깊은 내면을 가지고 있지만, 한 번 폭발하면 누구도 막을 수 없는 강렬함을 품고 있어요. 시간이 지날수록 그 진가가 드러나는 타입이에요.', 
      en: 'Usually quiet with a deep inner self, but once you explode, you have an unstoppable intensity. Your true value reveals as time goes by.', 
      ja: '普段は静かで深い内面を持っていますが、一度爆発すると誰にも止められない強烈さを秘めています。時間が経つほどその真価が発揮されるタイプです。' 
    },
    traits: { 
      ko: ['포용력', '깊은 내면', '잠재력 폭발', '신뢰감', '독립적'], 
      en: ['Inclusive', 'Deep Inner', 'Potential', 'Reliable', 'Independent'], 
      ja: ['包容力', '深い内面', '潜在能力の爆発', '信頼感', '独立的'] 
    }
  },
  electric: {
    id: 25,
    name: { ko: '피카츄', en: 'Pikachu', ja: 'ピカチュウ' },
    type: { ko: '⚡ 전기 타입', en: '⚡ Electric Type', ja: '⚡ でんきタイプ' },
    typeColor: '#ffd600',
    title: { ko: '당신은 피카츄입니다!', en: 'You are Pikachu!', ja: 'あなたはピカチュウです！' },
    desc: { 
      ko: '어딜 가든 존재감이 넘치고 사람들을 자연스럽게 끌어당기는 에너지를 가지고 있어요! 밝고 활발한 성격으로 주변에 활력을 불어넣습니다.', 
      en: 'Possessing a presence that naturally attracts people wherever you go! You energize your surroundings with a bright and active personality.', 
      ja: 'どこに行っても存在感があり、人々を自然に惹きつけるエネルギーを持っています！明るく活発な性格で、周りに活力を与えます。' 
    },
    traits: { 
      ko: ['활발함', '긍정적', '인기쟁이', '에너지 넘침', '친화력'], 
      en: ['Active', 'Positive', 'Popular', 'Energetic', 'Friendly'], 
      ja: ['活発', '肯定的', '人気者', 'エネルギー溢れる', '親和力'] 
    }
  },
  grass: {
    id: 3,
    name: { ko: '이상해꽃', en: 'Venusaur', ja: 'フシギバナ' },
    type: { ko: '🌿 풀 타입', en: '🌿 Grass Type', ja: '🌿 くさタイプ' },
    typeColor: '#66bb6a',
    title: { ko: '당신은 이상해꽃입니다!', en: 'You are Venusaur!', ja: 'あなたはフシギバナです！' },
    desc: { 
      ko: '따뜻하고 안정적인 에너지를 가진 사람이에요. 주변 사람들이 당신 곁에 있으면 마음이 편안해진다고 해요. 천천히 하지만 확실하게 성장하는 스타일이에요.', 
      en: 'A person with warm and stable energy. People feel comfortable around you. You grow slowly but surely.', 
      ja: '温かく安定したエネルギーを持つ人です。周りの人はあなたのそばにいると心が安らぐと言います。ゆっくりですが、確実に成長するスタイルです。' 
    },
    traits: { 
      ko: ['따뜻함', '안정감', '끈기', '자연친화', '포용적'], 
      en: ['Warmth', 'Stability', 'Persistence', 'Eco-friendly', 'Inclusive'], 
      ja: ['温かさ', '安定感', '粘り強さ', '自然親和', '包容的'] 
    }
  },
  psychic: {
    id: 151,
    name: { ko: '뮤', en: 'Mew', ja: 'ミュウ' },
    type: { ko: '🔮 에스퍼 타입', en: '🔮 Psychic Type', ja: '🔮 エスパータイプ' },
    typeColor: '#ec407a',
    title: { ko: '당신은 뮤입니다!', en: 'You are Mew!', ja: 'あなたはミュウです！' },
    desc: { 
      ko: '희귀하고 신비로운 존재예요. 지적 호기심이 넘치고 창의력이 풍부해서 남들이 생각 못한 방식으로 문제를 해결해요. 잠재력은 무한해요 ✨', 
      en: 'A rare and mysterious presence. Overflowing with intellectual curiosity and creativity, you solve problems in ways others can\'t imagine.', 
      ja: '希少で神秘的な存在です。知的好奇心が旺盛で創造力豊かなので、他の人が思いつかない方法で問題を解決します。潜在能力は無限です✨' 
    },
    traits: { 
      ko: ['신비로움', '지적 호기심', '창의적', '유연함', '무한한 가능성'], 
      en: ['Mysterious', 'Curiosity', 'Creative', 'Flexible', 'Unlimited'], 
      ja: ['神秘的', '知的好奇心', '創造的', '柔軟', '無限の可能性'] 
    }
  },
  ghost: {
    id: 94,
    name: { ko: '팬텀', en: 'Gengar', ja: 'ゲンガー' },
    type: { ko: '👻 고스트 타입', en: '👻 Ghost Type', ja: '👻 ゴーストタイプ' },
    typeColor: '#7e57c2',
    title: { ko: '당신은 팬텀입니다!', en: 'You are Gengar!', ja: 'あなたはゲンガーです！' },
    desc: { 
      ko: '겉으로는 쿨하고 미스테리한 분위기를 풍기지만, 가까워지면 엄청나게 웃기고 유머 감각이 넘치는 반전 매력의 소유자예요! 독특한 취향과 시각을 가지고 있습니다.', 
      en: 'Cool and mysterious on the outside, but incredibly funny and full of humor once you get close. Possessing unique tastes and perspectives.', 
      ja: '外見はクールでミステリアスな雰囲気を醸し出していますが、親しくなるととても面白く、ユーモアセンス溢れるギャップ萌えの持ち主です！' 
    },
    traits: { 
      ko: ['미스테리', '반전매력', '유머감각', '독특함', '자기세계'], 
      en: ['Mysterious', 'Gap Charm', 'Humor', 'Unique', 'Inner World'], 
      ja: ['ミステリー', 'ギャップ魅力', 'ユーモアセンス', '独特', '自分だけの世界'] 
    }
  },
  normal: {
    id: 143,
    name: { ko: '잠만보', en: 'Snorlax', ja: 'カ비ゴン' },
    type: { ko: '⭐ 노멀 타입', en: '⭐ Normal Type', ja: '⭐ ノーマルタイプ' },
    typeColor: '#8d7b68',
    title: { ko: '당신은 잠만보입니다!', en: 'You are Snorlax!', ja: 'あなたはカ비ゴンです！' },
    desc: { 
      ko: '여유롭고 대범한 성격의 소유자예요. 무엇이든 크게 동요하지 않는 든든한 존재감을 가지고 있어요. 한번 마음먹으면 어마어마한 집중력을 발휘합니다.', 
      en: 'Possessor of a relaxed and bold personality. You have a reliable presence that doesn\'t get shaken easily. You show great focus once you decide.', 
      ja: 'ゆったりとして大胆な性格の持ち主です。何事にも動じない、心強い存在感を持っています。一度決めると凄まじい集中力を発휘합니다. ' 
    },
    traits: { 
      ko: ['여유로움', '든든함', '집중력', '대범함', '신뢰의 존재'], 
      en: ['Relaxed', 'Reliable', 'Focus', 'Bold', 'Trustworthy'], 
      ja: ['余裕', '心強い', '集中力', '大胆', '信頼の存在'] 
    }
  },
};

export const UI_TEXT: Record<Language, any> = {
  en: {
    title: "Who is my",
    highlight: "Pokemon?",
    startDesc: "Find your inner Pokemon and battle style with just 7 fun questions!",
    startBtn: "Start Quiz",
    trending: "Trending Quiz",
    stats: { time: "2 Min", qs: "7 Qs", users: "10k+" },
    progress: "Progress",
    questionOf: "Question {n} of {total}",
    loading: "Searching for Pokemon...",
    loadingSub: "Finding a Pokemon that resembles you 🔍",
    resultEyebrow: "Your Pokemon is",
    share: "Share Result",
    retry: "Retry Quiz",
    history: "My History",
    historyEmpty: "No history yet.",
    historyDesc: "Collect your previous test results.",
    home: "Home",
    profile: "Profile",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    drawerMenu: "Menu",
    drawerHome: "Home Screen",
    drawerHistory: "My History",
    drawerPolicy: "Privacy Policy",
    loginTitle: "Profile Login",
    loginSub: "Log in to save records permanently.",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    loginBtn: "Login",
    noAccount: "Don't have an account?",
    resultShareText: "My resembling Pokemon is {name}! 🎉 What about you? Test here 👇",
    copied: "Result copied to clipboard!",
    comingSoon: "Feature coming soon.",
    aboutTitle: "How the Pokemon MBTI Test Works 🌟",
    aboutDesc1: "Ever wondered which Pokemon matches your real-life personality? Our Pokemon MBTI Test uses advanced behavioral mapping to connect your 16 personality types with iconic Pokemon species.",
    aboutDesc2: "By analyzing 7 core traits—ranging from social energy to battle strategy—we provide a detailed breakdown of your inner Pokemon soulmate. Whether you're a strategic Metagross or a creative Mew, discover your hidden potential!"
  },
  ko: {
    title: "나랑 닮은",
    highlight: "포켓몬은 누구?",
    startDesc: "단 7개의 재미있는 질문으로 당신의 내면의 포켓몬과 배틀 스타일을 찾아보세요!",
    startBtn: "테스트 시작",
    trending: "인기 퀴즈",
    stats: { time: "2분", qs: "7문항", users: "1만+" },
    progress: "진행도",
    questionOf: "질문 {n} / {total}",
    loading: "포켓몬 탐색 중...",
    loadingSub: "당신과 닮은 포켓몬을 찾고 있어요 🔍",
    resultEyebrow: "당신의 포켓몬은",
    share: "결과 공유하기",
    retry: "다시 테스트하기",
    history: "나의 기록",
    historyEmpty: "아직 테스트 기록이 없습니다.",
    historyDesc: "이전에 테스트했던 결과들을 모아보세요.",
    home: "홈",
    profile: "프로필",
    footerPrivacy: "개인정보처리방침",
    footerTerms: "이용약관",
    drawerMenu: "메뉴",
    drawerHome: "홈 화면",
    drawerHistory: "나의 기록",
    drawerPolicy: "개인정보처리방침",
    loginTitle: "프로필 로그인",
    loginSub: "기록을 영구적으로 저장하려면 로그인하세요.",
    emailPlaceholder: "이메일 주소",
    passwordPlaceholder: "비밀번호",
    loginBtn: "로그인",
    noAccount: "계정이 없으신가요?",
    resultShareText: "나랑 닮은 포켓몬은 {name}이래! 🎉 너는 어떤 포켓몬이야? 테스트해봐 👇",
    copied: "결과가 클립보드에 복사되었습니다!",
    comingSoon: "준비중인 기능입니다.",
    aboutTitle: "포켓몬 MBTI 테스트의 원리 🌟",
    aboutDesc1: "현실의 당신은 포켓몬 세계에서 어떤 모습일까요? 포켓몬 MBTI 테스트는 16가지 성격 유형 데이터를 바탕으로 당신의 성향과 가장 일치하는 포켓몬을 매칭해 드립니다.",
    aboutDesc2: "사회적 에너지부터 배틀 전략까지, 7가지 핵심 질문을 통해 당신의 내면을 분석합니다. 전략적인 메타그로스부터 창의적인 뮤까지, 당신의 진정한 파트너를 지금 바로 찾아보세요!"
  },
  ja: {
    title: "私に似た",
    highlight: "ポケモンはだれ？",
    startDesc: "たった7つの楽しい質問で、あなたの 내なるポケモンとバトルスタイルを見つけましょう！",
    startBtn: "テスト開始",
    trending: "人気クイズ",
    stats: { time: "2分", qs: "7問", users: "1万+" },
    progress: "進捗",
    questionOf: "質問 {n} / {total}",
    loading: "ポケモン探索中...",
    loadingSub: "あなたに似たポケモンを探しています 🔍",
    resultEyebrow: "あなたのポケモンは",
    share: "結果を共有する",
    retry: "もう一度テストする",
    history: "自分の記録",
    historyEmpty: "まだ記録がありません。",
    historyDesc: "以前のテスト結果を確認しましょう。",
    home: "ホーム",
    profile: "プロフィール",
    footerPrivacy: "プライバシーポリシー",
    footerTerms: "利用規約",
    drawerMenu: "メニュー",
    drawerHome: "ホーム画面",
    drawerHistory: "自分の記録",
    drawerPolicy: "プライバシーポリシー",
    loginTitle: "プロフィールログイン",
    loginSub: "記録を永久に保存するにはログインしてください。",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード",
    loginBtn: "ログイン",
    noAccount: "アカウントをお持ちでないですか？",
    resultShareText: "私に似たポケモンは {name} だって！ 🎉 あなたはどのポケモン？ここでテストしてみて 👇",
    copied: "結果がクリップボードにコピーされました！",
    comingSoon: "準備中の機能です。",
    aboutTitle: "ポケモンMBTIテストの仕組み 🌟",
    aboutDesc1: "現実のあなたはポケモン界でどんな姿でしょうか？ポケモンMBTIテストは、16の性格診断アルゴリズムを用いて、あなたに最適なポケモンを導き出します。",
    aboutDesc2: "社交性からバトルの戦略まで、7つの質問であなたの深層心理を分析します。戦略的なメタグロスから創造的なミュウまで、あなたのパートナーを見つけましょう！"
  }
};
