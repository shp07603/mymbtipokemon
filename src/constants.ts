export interface Option {
  icon: string;
  text: string;
  type: string;
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
    text: '주말 아침, 눈을 떴을 때 드는 첫 생각은?',
    options: [
      { icon: '🔥', text: '오늘 뭐 할지 이미 계획 세워뒀지!', type: 'fire' },
      { icon: '💤', text: '조금만 더... 5분만 더 자야지', type: 'normal' },
      { icon: '🌿', text: '창문 열고 바깥 공기나 마셔야겠다', type: 'grass' },
      { icon: '⚡', text: '벌써 할 게 너무 많아서 두근두근', type: 'electric' },
    ]
  },
  {
    emoji: '🧃',
    text: '친구들 사이에서 나는 보통 어떤 사람인가요?',
    options: [
      { icon: '😄', text: '분위기 메이커! 웃음을 책임진다', type: 'electric' },
      { icon: '🤗', text: '다들 고민을 털어놓는 든든한 친구', type: 'water' },
      { icon: '🎯', text: '목표가 뚜렷하고 추진력 있는 리더', type: 'fire' },
      { icon: '🌙', text: '조용하지만 관찰력 있는 미스테리한 존재', type: 'ghost' },
    ]
  },
  {
    emoji: '💥',
    text: '갑자기 엄청 스트레스받는 일이 생겼다! 나는?',
    options: [
      { icon: '🏃', text: '일단 밖으로 나가서 몸을 움직인다', type: 'fire' },
      { icon: '🎵', text: '혼자 방에서 음악 들으며 감정 정리', type: 'ghost' },
      { icon: '☕', text: '친구한테 전화해서 하소연한다', type: 'water' },
      { icon: '📚', text: '원인을 분석하고 해결책부터 찾는다', type: 'psychic' },
    ]
  },
  {
    emoji: '🌤️',
    text: '가장 좋아하는 날씨는 뭔가요?',
    options: [
      { icon: '☀️', text: '화창하고 뜨거운 여름 햇살', type: 'fire' },
      { icon: '🌧️', text: '창밖에 빗소리 들으며 집에 있는 날', type: 'water' },
      { icon: '⛈️', text: '번개치고 천둥 울리는 드라마틱한 날', type: 'electric' },
      { icon: '🌫️', text: '안개 낀 쌀쌀한 가을 아침', type: 'ghost' },
    ]
  },
  {
    emoji: '🍕',
    text: '친구들이랑 뭐 먹을지 정할 때 나는?',
    options: [
      { icon: '🙋', text: '내가 먹고 싶은 거 바로 말한다', type: 'fire' },
      { icon: '🤷', text: '아무거나 괜찮아~ 다 맛있어', type: 'normal' },
      { icon: '📊', text: '모두의 의견을 취합해서 합리적으로 결정', type: 'psychic' },
      { icon: '🥗', text: '건강한 거 먹자고 슬쩍 유도한다', type: 'grass' },
    ]
  },
  {
    emoji: '🎮',
    text: '게임을 한다면 어떤 스타일?',
    options: [
      { icon: '⚔️', text: '무조건 공격! 화력으로 밀어붙인다', type: 'fire' },
      { icon: '🏰', text: '방어 위주, 절대 무너지지 않는 철벽', type: 'water' },
      { icon: '🧠', text: '전략 세우고 상대를 심리적으로 압박', type: 'psychic' },
      { icon: '👻', text: '게릴라 전술, 나타났다 사라졌다', type: 'ghost' },
    ]
  },
  {
    emoji: '✨',
    text: '마지막! 나를 가장 잘 표현하는 단어는?',
    options: [
      { icon: '🌋', text: '열정적인', type: 'fire' },
      { icon: '🌊', text: '포용력있는', type: 'water' },
      { icon: '⚡', text: '에너지넘치는', type: 'electric' },
      { icon: '🔮', text: '신비로운', type: 'psychic' },
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
    typeColor: '#5c6bc0',
    title: '당신은 망나뇽입니다!',
    desc: '겉모습은 포근하고 친근하지만 내면엔 누구도 따라오기 힘든 강한 힘이 숨어있어요. 책임감이 강하고 한번 맡은 일은 끝까지 해내는 타입이에요. 주변 사람들에게 용기를 불어넣어주는 자연스러운 영웅 타입이에요!',
    traits: ['친근함', '강한 내면', '책임감', '용기', '든든한 영웅']
  },
};
