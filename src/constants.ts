export interface Option {
  icon: string;
  text: string;
  subText?: string;
  type: string;
  color?: string;
}

export interface Question {
  emoji: string;
  text: string;
  options: Option[];
}

export interface Result {
  id: number;
  nameKo: string;
  nameEn: string;
  type: string;
  typeColor: string;
  title: string;
  desc: string;
  traits: string[];
}

export const QUESTIONS: Question[] = [
  {
    emoji: '🌅',
    text: '주말 아침, 눈을 떴을 때 당신의 모습은?',
    options: [
      { icon: 'event_available', text: '계획 세우기', subText: '이미 할 일 정해둠', type: 'fire', color: 'bg-orange-100 text-orange-500' },
      { icon: 'bed', text: '5분만 더...', subText: '잠만보처럼 휴식', type: 'normal', color: 'bg-slate-100 text-slate-500' },
      { icon: 'hiking', text: '바깥 공기', subText: '풀숲을 산책하기', type: 'grass', color: 'bg-green-100 text-green-500' },
      { icon: 'bolt', text: '두근두근', subText: '에너지 풀 충전!', type: 'electric', color: 'bg-yellow-100 text-yellow-500' },
    ]
  },
  {
    emoji: '🧃',
    text: '친구들 사이에서 당신은 어떤 존재인가요?',
    options: [
      { icon: 'celebration', text: '분위기 메이커', subText: '웃음을 책임진다', type: 'fairy', color: 'bg-pink-100 text-pink-500' },
      { icon: 'diversity_3', text: '든든한 친구', subText: '고민 해결사', type: 'water', color: 'bg-blue-100 text-blue-500' },
      { icon: 'leaderboard', text: '추진력 대장', subText: '나를 따르라!', type: 'fighting', color: 'bg-red-100 text-red-500' },
      { icon: 'visibility_off', text: '미스테리', subText: '조용한 관찰자', type: 'dark', color: 'bg-slate-800 text-slate-200' },
    ]
  },
  {
    emoji: '💥',
    text: '갑자기 스트레스 받는 일이 생겼다면?',
    options: [
      { icon: 'directions_run', text: '몸 움직이기', subText: '땀 흘리며 해소', type: 'fighting', color: 'bg-orange-100 text-orange-600' },
      { icon: 'headset', text: '혼자만의 시간', subText: '음악으로 정화', type: 'ghost', color: 'bg-purple-100 text-purple-500' },
      { icon: 'forum', text: '수다 떨기', subText: '친구에게 하소연', type: 'ice', color: 'bg-blue-50 text-blue-400' },
      { icon: 'psychology', text: '원인 분석', subText: '해결책부터 찾기', type: 'steel', color: 'bg-slate-200 text-slate-600' },
    ]
  },
  {
    emoji: '🌤️',
    text: '가장 좋아하는 날씨나 분위기는?',
    options: [
      { icon: 'wb_sunny', text: '뜨거운 햇살', subText: '열정적인 여름', type: 'dragon', color: 'bg-orange-100 text-orange-500' },
      { icon: 'ac_unit', text: '차가운 눈', subText: '고요한 겨울밤', type: 'ice', color: 'bg-blue-50 text-blue-400' },
      { icon: 'thunderstorm', text: '천둥 번개', subText: '짜릿한 에너지', type: 'poison', color: 'bg-purple-200 text-purple-700' },
      { icon: 'cloudy_snowing', text: '쌀쌀한 아침', subText: '미스테리한 안개', type: 'ground', color: 'bg-yellow-100 text-yellow-700' },
    ]
  },
  {
    emoji: '🍕',
    text: '메뉴를 결정할 때 당신의 스타일은?',
    options: [
      { icon: 'campaign', text: '강력 추천', subText: '먹고 싶은 거 어필', type: 'rock', color: 'bg-stone-200 text-stone-600' },
      { icon: 'check_circle', text: '아무거나 OK', subText: '다 맛있어~', type: 'normal', color: 'bg-slate-100 text-slate-500' },
      { icon: 'query_stats', text: '합리적 선택', subText: '리뷰와 평점 확인', type: 'psychic', color: 'bg-pink-100 text-pink-500' },
      { icon: 'eco', text: '건강 우선', subText: '프레시한 한 끼', type: 'grass', color: 'bg-green-100 text-green-500' },
    ]
  },
  {
    emoji: '🎮',
    text: '게임이나 승부에서 당신의 전략은?',
    options: [
      { icon: 'flash_on', text: '무조건 공격', subText: '화끈한 화력전', type: 'fire', color: 'bg-red-100 text-red-500' },
      { icon: 'shield', text: '철벽 방어', subText: '무너지지 않는 벽', type: 'steel', color: 'bg-slate-300 text-slate-700' },
      { icon: 'lightbulb', text: '지능적 플레이', subText: '상대 심리 이용', type: 'psychic', color: 'bg-pink-100 text-pink-500' },
      { icon: 'auto_awesome', text: '변칙 공격', subText: '게릴라 전술', type: 'ghost', color: 'bg-purple-100 text-purple-500' },
    ]
  },
  {
    emoji: '✨',
    text: '당신을 가장 잘 표현하는 키워드는?',
    options: [
      { icon: 'volcano', text: '압도적인', subText: '강력한 카리스마', type: 'dragon', color: 'bg-indigo-100 text-indigo-600' },
      { icon: 'waves', text: '유연한', subText: '어디든 적응하는', type: 'water', color: 'bg-blue-100 text-blue-500' },
      { icon: 'auto_fix_high', text: '사랑스러운', subText: '모두를 행복하게', type: 'fairy', color: 'bg-pink-50 text-pink-400' },
      { icon: 'diamond', text: '단단한', subText: '흔들리지 않는', type: 'rock', color: 'bg-stone-300 text-stone-700' },
    ]
  },
];

export const RESULTS: Record<string, Result> = {
  fire: {
    id: 6,
    nameKo: '리자몽',
    nameEn: 'Charizard',
    type: '🔥 불꽃 타입',
    typeColor: '#ff6b35',
    title: '당신은 리자몽입니다!',
    desc: '강렬한 카리스마와 넘치는 열정의 소유자예요. 목표를 향해 불꽃처럼 달려가는 타입이지만, 진심으로 인정한 사람에게는 한없이 의리 있는 면모도 있답니다. 자존심이 강하고 지기 싫어하지만 그게 오히려 주변 사람들을 이끄는 힘이 돼요.',
    traits: ['열정적', '카리스마', '자존심 강함', '의리있음', '리더십']
  },
  water: {
    id: 130,
    nameKo: '갸라도스',
    nameEn: 'Gyarados',
    type: '💧 물 타입',
    typeColor: '#4fc3f7',
    title: '당신은 갸라도스입니다!',
    desc: '평소엔 조용하고 깊은 내면을 가지고 있지만, 한 번 폭발하면 누구도 막을 수 없는 강렬함을 품고 있어요. 겉모습에 속지 마세요 — 시간이 지날수록 그 진가가 드러나는 타입이에요. 믿음직하고 한번 맺은 인연을 소중히 여겨요.',
    traits: ['포용력', '깊은 내면', '잠재력 폭발', '신뢰감', '독립적']
  },
  electric: {
    id: 25,
    nameKo: '피카츄',
    nameEn: 'Pikachu',
    type: '⚡ 전기 타입',
    typeColor: '#ffd600',
    title: '당신은 피카츄입니다!',
    desc: '어딜 가든 존재감이 넘치고 사람들을 자연스럽게 끌어당기는 에너지를 가지고 있어요! 밝고 활발한 성격으로 주변에 활력을 불어넣고, 힘든 상황에서도 웃음을 잃지 않아요. 다들 당신 곁에 있으면 기분이 좋아진대요 😄',
    traits: ['활발함', '긍정적', '인기쟁이', '에너지 넘침', '친화력']
  },
  grass: {
    id: 3,
    nameKo: '이상해꽃',
    nameEn: 'Venusaur',
    type: '🌿 풀 타입',
    typeColor: '#66bb6a',
    title: '당신은 이상해꽃입니다!',
    desc: '따뜻하고 안정적인 에너지를 가진 사람이에요. 주변 사람들이 당신 곁에 있으면 마음이 편안해진다고 해요. 겉으론 느긋해 보여도 내면엔 강한 의지와 끈기가 숨어있어요. 천천히, 하지만 확실하게 성장하는 스타일이에요.',
    traits: ['따뜻함', '안정감', '끈기', '자연친화', '포용적']
  },
  psychic: {
    id: 151,
    nameKo: '뮤',
    nameEn: 'Mew',
    type: '🔮 에스퍼 타입',
    typeColor: '#ec407a',
    title: '당신은 뮤입니다!',
    desc: '희귀하고 신비로운 존재예요. 지적 호기심이 넘치고 창의력이 풍부해서 남들이 생각 못한 방식으로 문제를 해결해요. 모든 가능성에 열려있고, 어떤 상황에서도 유연하게 적응하는 능력을 가지고 있어요. 당신의 잠재력은 무한해요 ✨',
    traits: ['신비로움', '지적 호기심', '창의적', '유연함', '무한한 가능성']
  },
  ghost: {
    id: 94,
    nameKo: '팬텀',
    nameEn: 'Gengar',
    type: '👻 고스트 타입',
    typeColor: '#7e57c2',
    title: '당신은 팬텀입니다!',
    desc: '겉으로는 쿨하고 미스테리한 분위기를 풍기지만, 가까워지면 엄청나게 웃기고 유머 감각이 넘치는 반전 매력의 소유자예요! 독특한 취향과 시각을 가지고 있고, 남들 시선 신경 안 쓰고 자기 세계를 즐길 줄 알아요.',
    traits: ['미스테리', '반전매력', '유머감각', '독특함', '자기세계']
  },
  normal: {
    id: 143,
    nameKo: '잠만보',
    nameEn: 'Snorlax',
    type: '⭐ 노멀 타입',
    typeColor: '#8d7b68',
    title: '당신은 잠만보입니다!',
    desc: '여유롭고 대범한 성격의 소유자예요. 무엇이든 크게 동요하지 않는 든든한 존재감을 가지고 있어요. 한번 마음먹으면 어마어마한 집중력을 발휘하고, 주변 사람들이 의지하는 든든한 기둥 같은 존재예요. 느긋하지만 절대 만만한 게 아니에요!',
    traits: ['여유로움', '든든함', '집중력', '대범함', '신뢰의 존재']
  },
  dragon: {
    id: 149,
    nameKo: '망나뇽',
    nameEn: 'Dragonite',
    type: '🐉 드래곤 타입',
    typeColor: '#ffb347',
    title: '당신은 망나뇽입니다!',
    desc: '겉모습은 포근하고 친근하지만 내면엔 누구도 따라오기 힘든 강한 힘이 숨어있어요. 책임감이 강하고 한번 맡은 일은 끝까지 해내는 타입이에요. 주변 사람들에게 용기를 불어넣어주는 자연스러운 영웅 타입이에요!',
    traits: ['친근함', '강한 내면', '책임감', '용기', '든든한 영웅']
  },
  fighting: {
    id: 448,
    nameKo: '루카리오',
    nameEn: 'Lucario',
    type: '👊 격투 타입',
    typeColor: '#c0392b',
    title: '당신은 루카리오입니다!',
    desc: '정의롭고 강직한 성품을 지녔어요. 상대의 오라를 읽듯 타인의 감정을 잘 이해하며, 자신에게 엄격하고 끊임없이 수련하는 완벽주의자 기질이 있어요. 말보다는 행동으로 보여주는 듬직한 리더 스타일입니다.',
    traits: ['정의로움', '강직함', '통찰력', '자기관리', '행동파']
  },
  ice: {
    id: 131,
    nameKo: '라프라스',
    nameEn: 'Lapras',
    type: '❄️ 얼음 타입',
    typeColor: '#81d4fa',
    title: '당신은 라프라스입니다!',
    desc: '아름답고 부드러운 성격의 소유자예요. 타인을 돕는 것에 행복을 느끼며, 평화를 사랑하는 평화주의자입니다. 어려운 상황에서도 냉정함을 잃지 않고 지혜롭게 대처하는 능력이 있어요.',
    traits: ['상냥함', '평화주의', '지혜로움', '냉철함', '이타적']
  },
  fairy: {
    id: 700,
    nameKo: '님피아',
    nameEn: 'Sylveon',
    type: '✨ 페어리 타입',
    typeColor: '#f48fb1',
    title: '당신은 님피아입니다!',
    desc: '다정다감하고 애교가 넘치는 타입이에요. 주변 사람들과 소통하는 것을 좋아하며, 갈등을 중재하고 화합을 이끌어내는 능력이 탁월합니다. 겉모습은 귀엽지만 마음은 누구보다 단단하고 용감해요.',
    traits: ['다정함', '사교적', '중재자', '용감함', '사랑스러움']
  },
  steel: {
    id: 376,
    nameKo: '메타그로스',
    nameEn: 'Metagross',
    type: '⚙️ 강철 타입',
    typeColor: '#78909c',
    title: '당신은 메타그로스입니다!',
    desc: '컴퓨터보다 빠른 판단력과 논리적인 사고를 가졌어요. 어떤 복잡한 문제도 차분하게 분석해서 해결책을 찾아내죠. 감정에 휘둘리지 않고 목표를 향해 전략적으로 움직이는 타입입니다.',
    traits: ['논리적', '전략적', '냉철함', '문제해결', '안정감']
  },
  dark: {
    id: 197,
    nameKo: '블래키',
    nameEn: 'Umbreon',
    type: '🌙 악 타입',
    typeColor: '#37474f',
    title: '당신은 블래키입니다!',
    desc: '차분하고 이지적인 분위기를 풍기는 당신! 혼자 있는 시간을 즐길 줄 알며, 남들이 보지 못하는 이면을 꿰뚫어 보는 통찰력이 있어요. 과묵하지만 깊은 생각과 신념을 가지고 있어 은근히 팬이 많은 타입입니다.',
    traits: ['차분함', '통찰력', '독립적', '이지적', '신념']
  },
  poison: {
    id: 34,
    nameKo: '니드킹',
    nameEn: 'Nidoking',
    type: '🧪 독 타입',
    typeColor: '#9c27b0',
    title: '당신은 니드킹입니다!',
    desc: '강력한 파워와 거침없는 추진력을 가졌어요! 개성이 뚜렷하고 자신의 주관을 굽히지 않는 당당함이 매력입니다. 조금 거칠어 보일 수 있지만 내 사람이라고 생각하면 끝까지 책임지고 보호하는 든든한 면모가 있어요.',
    traits: ['추진력', '당당함', '책임감', '개성적', '강력함']
  },
  ground: {
    id: 445,
    nameKo: '한카리아스',
    nameEn: 'Garchomp',
    type: '🏜️ 땅 타입',
    typeColor: '#8d6e63',
    title: '당신은 한카리아스입니다!',
    desc: '빠르고 정확하게 목표를 달성하는 능력자예요! 현실적이고 실무적인 능력이 뛰어나며, 어떤 환경에서도 굴하지 않고 꿋꿋하게 자신의 길을 가는 스타일입니다. 실력으로 승부하는 진정한 실력자 타입이죠.',
    traits: ['현실적', '유능함', '목표지향', '강인함', '신속함']
  },
  rock: {
    id: 248,
    nameKo: '마기라스',
    nameEn: 'Tyranitar',
    type: '⛰️ 바위 타입',
    typeColor: '#afb42b',
    title: '당신은 마기라스입니다!',
    desc: '어떤 풍파에도 흔들리지 않는 바위 같은 의지를 가졌어요. 겉으로는 무뚝뚝해 보일 수 있지만 사실은 누구보다 속이 깊고 듬직한 사람입니다. 한번 믿음을 주면 절대 변하지 않는 의리파이기도 해요.',
    traits: ['강한 의지', '듬직함', '의리파', '무뚝뚝함', '속이 깊음']
  },
};