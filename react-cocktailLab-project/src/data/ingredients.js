// 재료 타입 상수
export const INGREDIENT_TYPES = {
  RUM: 'RUM',
  WHISKEY: 'WHISKEY',
  GIN: 'GIN',
  VODKA: 'VODKA',
  TEQUILA: 'TEQUILA',
  BRANDY: 'BRANDY',
  LIQUEUR: 'LIQUEUR',
  VERMOUTH: 'VERMOUTH',
  BITTER: 'BITTER',
  JUICE: 'JUICE',
  SYRUP: 'SYRUP',
  SODA: 'SODA',
  FRUIT: 'FRUIT',
  HERB: 'HERB',
  GARNISH: 'GARNISH',
  ICE: 'ICE',
  OTHER: 'OTHER'
}

// 재료 데이터 배열 (타입별 가나다 순 정렬)
export const ingredients = [
  // === 럼 (RUM) ===
  { name: '골드 럼', type: INGREDIENT_TYPES.RUM, color: '#D4A574' },
  { name: '다크 럼', type: INGREDIENT_TYPES.RUM, color: '#8B4513' },
  { name: '마이어스 럼', type: INGREDIENT_TYPES.RUM, brand: '마이어스', color: '#8B4513' },
  { name: '바카디', type: INGREDIENT_TYPES.RUM, brand: '바카디', color: '#D4A574' },
  { name: '스파이시 럼', type: INGREDIENT_TYPES.RUM, color: '#CD853F' },
  { name: '캡틴 모건', type: INGREDIENT_TYPES.RUM, brand: '캡틴 모건', color: '#D4A574' },
  { name: '화이트 럼', type: INGREDIENT_TYPES.RUM, color: '#D4A574' },
  
  // === 위스키 (WHISKEY) ===
  { name: '아벨라워', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '아벨라워', color: '#D2691E' },
  { name: '아이리시 위스키', type: INGREDIENT_TYPES.WHISKEY, subType: '아이리시 위스키', color: '#D2691E' },
  { name: '와일드 터키', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', brand: '와일드 터키', color: '#D2691E' },
  { name: '야마자키', type: INGREDIENT_TYPES.WHISKEY, subType: '재패니즈 위스키', brand: '야마자키', color: '#D2691E' },
  { name: '불렛 버번', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', brand: '불렛', color: '#D2691E' },
  { name: '버번 위스키', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', color: '#D2691E' },
  { name: '스카치 위스키', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', color: '#D2691E' },
  { name: '제임슨', type: INGREDIENT_TYPES.WHISKEY, subType: '아이리시 위스키', brand: '제임슨', color: '#D2691E' },
  { name: '조니 워커 레드', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '조니 워커', color: '#CD853F' },
  { name: '조니 워커 블랙', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '조니 워커', color: '#8B4513' },
  { name: '짐빔', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', brand: '짐빔', color: '#D2691E' },
  { name: '크라운 로얄', type: INGREDIENT_TYPES.WHISKEY, subType: '캐나다 위스키', brand: '크라운 로얄', color: '#D2691E' },
  { name: '글렌리벳', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '글렌리벳', color: '#D2691E' },
  { name: '글렌피딕', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '글렌피딕', color: '#D2691E' },
  { name: '라갈루안', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '라갈루안', color: '#D2691E' },
  { name: '맥컬란 12년', type: INGREDIENT_TYPES.WHISKEY, subType: '스카치 위스키', brand: '맥컬란', color: '#CD853F' },
  { name: '메이커스 마크', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', brand: '메이커스 마크', color: '#D2691E' },
  { name: '히비키', type: INGREDIENT_TYPES.WHISKEY, subType: '재패니즈 위스키', brand: '히비키', color: '#D2691E' },
  { name: '잭 다니엘', type: INGREDIENT_TYPES.WHISKEY, subType: '버번 위스키', brand: '잭 다니엘', color: '#D2691E' },
  { name: '위스키', type: INGREDIENT_TYPES.WHISKEY, color: '#D2691E' },
  
  // === 진 (GIN) ===
  { name: '고든스', type: INGREDIENT_TYPES.GIN, brand: '고든스', color: '#F5F5DC' },
  { name: '봄베이 사파이어', type: INGREDIENT_TYPES.GIN, brand: '봄베이 사파이어', color: '#4169E1' },
  { name: '비피터', type: INGREDIENT_TYPES.GIN, brand: '비피터', color: '#F5F5DC' },
  { name: '런던 드라이 진', type: INGREDIENT_TYPES.GIN, color: '#F5F5DC' },
  { name: '탱커레이', type: INGREDIENT_TYPES.GIN, brand: '탱커레이', color: '#F5F5DC' },
  { name: '플리머스 진', type: INGREDIENT_TYPES.GIN, color: '#F5F5DC' },
  { name: '헨드릭스 진', type: INGREDIENT_TYPES.GIN, brand: '헨드릭스', color: '#F5F5DC' },
  { name: '진', type: INGREDIENT_TYPES.GIN, color: '#F5F5DC' },
  
  // === 보드카 (VODKA) ===
  { name: '그레이 구스', type: INGREDIENT_TYPES.VODKA, brand: '그레이 구스', color: 'rgba(255, 255, 255, 0.3)' },
  { name: '벨루가', type: INGREDIENT_TYPES.VODKA, brand: '벨루가', color: 'rgba(255, 255, 255, 0.3)' },
  { name: '보드카', type: INGREDIENT_TYPES.VODKA, color: 'rgba(255, 255, 255, 0.3)' },
  { name: '스미노프', type: INGREDIENT_TYPES.VODKA, brand: '스미노프', color: 'rgba(255, 255, 255, 0.3)' },
  { name: '앱솔루트', type: INGREDIENT_TYPES.VODKA, brand: '앱솔루트', color: 'rgba(255, 255, 255, 0.3)' },
  { name: '케틀 원', type: INGREDIENT_TYPES.VODKA, brand: '케틀 원', color: 'rgba(255, 255, 255, 0.3)' },
  { name: '핀란디아', type: INGREDIENT_TYPES.VODKA, brand: '핀란디아', color: 'rgba(255, 255, 255, 0.3)' },
  
  // === 테킬라 (TEQUILA) ===
  { name: '1800', type: INGREDIENT_TYPES.TEQUILA, brand: '1800', color: '#FFD700' },
  { name: '레포사도 테킬라', type: INGREDIENT_TYPES.TEQUILA, subType: '레포사도', color: '#FFD700' },
  { name: '돈 쥴리오', type: INGREDIENT_TYPES.TEQUILA, brand: '돈 쥴리오', color: '#FFD700' },
  { name: '블랑코 테킬라', type: INGREDIENT_TYPES.TEQUILA, subType: '블랑코', color: '#FFD700' },
  { name: '아네호 테킬라', type: INGREDIENT_TYPES.TEQUILA, subType: '아네호', color: '#D4A574' },
  { name: '테킬라', type: INGREDIENT_TYPES.TEQUILA, color: '#FFD700' },
  { name: '파트론', type: INGREDIENT_TYPES.TEQUILA, brand: '파트론', color: '#FFD700' },
  { name: '호세 쿠에르보', type: INGREDIENT_TYPES.TEQUILA, brand: '호세 쿠에르보', color: '#FFD700' },
  
  // === 브랜디/코냑 (BRANDY) ===
  { name: '레미 마르탱', type: INGREDIENT_TYPES.BRANDY, brand: '레미 마르탱', color: '#CD853F' },
  { name: '마르텔', type: INGREDIENT_TYPES.BRANDY, brand: '마르텔', color: '#CD853F' },
  { name: '브랜디', type: INGREDIENT_TYPES.BRANDY, color: '#CD853F' },
  { name: '아르마냑', type: INGREDIENT_TYPES.BRANDY, color: '#CD853F' },
  { name: '코냑', type: INGREDIENT_TYPES.BRANDY, color: '#CD853F' },
  { name: '헤네시', type: INGREDIENT_TYPES.BRANDY, brand: '헤네시', color: '#CD853F' },
  
  // === 리큐르 (LIQUEUR) ===
  { name: '베네딕틴', type: INGREDIENT_TYPES.LIQUEUR, brand: '베네딕틴', color: '#8B4513' },
  { name: '베일리스', type: INGREDIENT_TYPES.LIQUEUR, brand: '베일리스', color: '#8B4513' },
  { name: '블루 큐라소', type: INGREDIENT_TYPES.LIQUEUR, color: '#4169E1' },
  { name: '샤르트뢰즈', type: INGREDIENT_TYPES.LIQUEUR, brand: '샤르트뢰즈', color: '#90EE90' },
  { name: '샴페인 리큐르', type: INGREDIENT_TYPES.LIQUEUR, color: '#FFD700' },
  { name: '아마레토', type: INGREDIENT_TYPES.LIQUEUR, color: '#8B4513' },
  { name: '오렌지 리큐르', type: INGREDIENT_TYPES.LIQUEUR, color: '#FFA500' },
  { name: '카푸치노 리큐르', type: INGREDIENT_TYPES.LIQUEUR, color: '#8B4513' },
  { name: '카할루아', type: INGREDIENT_TYPES.LIQUEUR, brand: '카할루아', color: '#4B0082' },
  { name: '코인트로', type: INGREDIENT_TYPES.LIQUEUR, brand: '코인트로', color: '#FFA500' },
  { name: '그랜 마르니에', type: INGREDIENT_TYPES.LIQUEUR, brand: '그랜 마르니에', color: '#FFA500' },
  { name: '리몬첼로', type: INGREDIENT_TYPES.LIQUEUR, color: '#FFD700' },
  { name: '트리플 섹', type: INGREDIENT_TYPES.LIQUEUR, color: '#FFD700' },
  { name: '피치 리큐르', type: INGREDIENT_TYPES.LIQUEUR, color: '#FFB6C1' },
  
  // === 베르무트 (VERMOUTH) ===
  { name: '돈리치', type: INGREDIENT_TYPES.VERMOUTH, brand: '돈리치', color: '#F5F5DC' },
  { name: '드라이 베르무트', type: INGREDIENT_TYPES.VERMOUTH, color: '#F5F5DC' },
  { name: '마티니 드라이', type: INGREDIENT_TYPES.VERMOUTH, brand: '마티니', color: '#F5F5DC' },
  { name: '마티니 로쏘', type: INGREDIENT_TYPES.VERMOUTH, brand: '마티니', color: '#8B0000' },
  { name: '베르무트', type: INGREDIENT_TYPES.VERMOUTH, color: '#8B0000' },
  { name: '스위트 베르무트', type: INGREDIENT_TYPES.VERMOUTH, color: '#8B0000' },
  
  // === 비터 (BITTER) ===
  { name: '앵거스투라 비터', type: INGREDIENT_TYPES.BITTER, brand: '앵거스투라', color: '#2F4F4F' },
  { name: '오렌지 비터', type: INGREDIENT_TYPES.BITTER, color: '#FF8C00' },
  { name: '페이저스 비터', type: INGREDIENT_TYPES.BITTER, brand: '페이저스', color: '#2F4F4F' },
  { name: '페르노', type: INGREDIENT_TYPES.BITTER, brand: '페르노', color: '#2F4F4F' },
  
  // === 주스 (JUICE) ===
  { name: '그레이프프루트 주스', type: INGREDIENT_TYPES.JUICE, color: '#FF6347' },
  { name: '라임 주스', type: INGREDIENT_TYPES.JUICE, color: '#32CD32' },
  { name: '레몬 주스', type: INGREDIENT_TYPES.JUICE, color: '#FFD700' },
  { name: '망고 주스', type: INGREDIENT_TYPES.JUICE, color: '#FFD700' },
  { name: '복숭아 주스', type: INGREDIENT_TYPES.JUICE, color: '#FFB6C1' },
  { name: '사과 주스', type: INGREDIENT_TYPES.JUICE, color: '#FFA500' },
  { name: '오렌지 주스', type: INGREDIENT_TYPES.JUICE, color: '#FF8C00' },
  { name: '크랜베리 주스', type: INGREDIENT_TYPES.JUICE, color: '#DC143C' },
  { name: '토마토 주스', type: INGREDIENT_TYPES.JUICE, color: '#DC143C' },
  { name: '파인애플 주스', type: INGREDIENT_TYPES.JUICE, color: '#FFD700' },
  
  // === 시럽 (SYRUP) ===
  { name: '그레나딘 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#FF1493' },
  { name: '꿀', type: INGREDIENT_TYPES.SYRUP, color: '#FFD700' },
  { name: '메이플 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#8B4513' },
  { name: '바닐라 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#F5F5DC' },
  { name: '설탕', type: INGREDIENT_TYPES.SYRUP, color: '#FFFFFF' },
  { name: '심플 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#FFFFFF' },
  { name: '아가베 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#F5F5DC' },
  { name: '오렌지 시럽', type: INGREDIENT_TYPES.SYRUP, color: '#FF8C00' },
  
  // === 탄산음료 (SODA) ===
  { name: '스프라이트', type: INGREDIENT_TYPES.SODA, color: 'rgba(255, 255, 255, 0.5)' },
  { name: '소다수', type: INGREDIENT_TYPES.SODA, color: 'rgba(255, 255, 255, 0.5)' },
  { name: '클럽 소다', type: INGREDIENT_TYPES.SODA, color: 'rgba(255, 255, 255, 0.5)' },
  { name: '토닉 워터', type: INGREDIENT_TYPES.SODA, color: 'rgba(255, 255, 255, 0.5)' },
  { name: '진저 에일', type: INGREDIENT_TYPES.SODA, color: 'rgba(255, 255, 255, 0.5)' },
  { name: '콜라', type: INGREDIENT_TYPES.SODA, color: '#2F2F2F' },
  
  // === 과일 (FRUIT) ===
  { name: '라임', type: INGREDIENT_TYPES.FRUIT, color: '#32CD32' },
  { name: '레몬', type: INGREDIENT_TYPES.FRUIT, color: '#FFD700' },
  { name: '망고', type: INGREDIENT_TYPES.FRUIT, color: '#FFD700' },
  { name: '베리', type: INGREDIENT_TYPES.FRUIT, color: '#8B008B' },
  { name: '복숭아', type: INGREDIENT_TYPES.FRUIT, color: '#FFB6C1' },
  { name: '오렌지', type: INGREDIENT_TYPES.FRUIT, color: '#FF8C00' },
  { name: '자몽', type: INGREDIENT_TYPES.FRUIT, color: '#FF6347' },
  { name: '체리', type: INGREDIENT_TYPES.FRUIT, color: '#DC143C' },
  { name: '파인애플', type: INGREDIENT_TYPES.FRUIT, color: '#FFD700' },
  
  // === 허브 (HERB) ===
  { name: '로즈마리', type: INGREDIENT_TYPES.HERB, color: '#90EE90' },
  { name: '민트', type: INGREDIENT_TYPES.HERB, color: '#90EE90' },
  { name: '바질', type: INGREDIENT_TYPES.HERB, color: '#90EE90' },
  { name: '타임', type: INGREDIENT_TYPES.HERB, color: '#90EE90' },
  
  // === 가니시 (GARNISH) ===
  { name: '라임 웨지', type: INGREDIENT_TYPES.GARNISH, color: '#32CD32' },
  { name: '레몬 슬라이스', type: INGREDIENT_TYPES.GARNISH, color: '#FFD700' },
  { name: '올리브', type: INGREDIENT_TYPES.GARNISH, color: '#556B2F' },
  { name: '오렌지 슬라이스', type: INGREDIENT_TYPES.GARNISH, color: '#FF8C00' },
  { name: '파인애플 슬라이스', type: INGREDIENT_TYPES.GARNISH, color: '#FFD700' },
  { name: '체리', type: INGREDIENT_TYPES.GARNISH, color: '#DC143C' },
  
  // === 얼음 (ICE) ===
  { name: '구형 얼음', type: INGREDIENT_TYPES.ICE, color: '#87CEEB' },
  { name: '간얼음', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  { name: '부서진 얼음', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  { name: '슬래시드 아이스', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  { name: '스피어 아이스', type: INGREDIENT_TYPES.ICE, color: '#87CEEB' },
  { name: '얼음 조각', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  { name: '큐브', type: INGREDIENT_TYPES.ICE, color: '#E0F2F7' },
  { name: '큐브 아이스', type: INGREDIENT_TYPES.ICE, color: '#E0F2F7' },
  { name: '크래시드 아이스', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  { name: '큰 얼음', type: INGREDIENT_TYPES.ICE, color: '#ADD8E6' },
  { name: '록스 아이스', type: INGREDIENT_TYPES.ICE, color: '#ADD8E6' },
  { name: '칩 아이스', type: INGREDIENT_TYPES.ICE, color: '#B0E0E6' },
  
  // === 기타 (OTHER) ===
  { name: '락스', type: INGREDIENT_TYPES.OTHER, color: '#8a8a8a' },
  { name: '소금', type: INGREDIENT_TYPES.OTHER, color: '#FFFFFF' },
  { name: '타바스코', type: INGREDIENT_TYPES.OTHER, color: '#DC143C' },
  { name: '우스터 소스', type: INGREDIENT_TYPES.OTHER, color: '#8B4513' },
  { name: '와사비', type: INGREDIENT_TYPES.OTHER, color: '#90EE90' },
  { name: '후추', type: INGREDIENT_TYPES.OTHER, color: '#2F2F2F' },
]

// 타입별 재료 필터링
export const getIngredientsByType = (type) => {
  if (!type) return ingredients
  return ingredients.filter(ing => ing.type === type)
}

// 재료명으로 색상 가져오기
export const getIngredientColor = (ingredientName) => {
  const ingredient = ingredients.find(ing => ing.name === ingredientName)
  return ingredient?.color || '#D3D3D3'
}

// 재료명으로 재료 정보 가져오기
export const getIngredient = (ingredientName) => {
  return ingredients.find(ing => ing.name === ingredientName)
}

// 타입 목록 가져오기 (한글 이름 포함)
export const getIngredientTypeLabels = () => {
  return {
    [INGREDIENT_TYPES.RUM]: '럼',
    [INGREDIENT_TYPES.WHISKEY]: '위스키',
    [INGREDIENT_TYPES.GIN]: '진',
    [INGREDIENT_TYPES.VODKA]: '보드카',
    [INGREDIENT_TYPES.TEQUILA]: '테킬라',
    [INGREDIENT_TYPES.BRANDY]: '브랜디/코냑',
    [INGREDIENT_TYPES.LIQUEUR]: '리큐르',
    [INGREDIENT_TYPES.VERMOUTH]: '베르무트',
    [INGREDIENT_TYPES.BITTER]: '비터',
    [INGREDIENT_TYPES.JUICE]: '주스',
    [INGREDIENT_TYPES.SYRUP]: '시럽',
    [INGREDIENT_TYPES.SODA]: '탄산음료',
    [INGREDIENT_TYPES.FRUIT]: '과일',
    [INGREDIENT_TYPES.HERB]: '허브',
    [INGREDIENT_TYPES.GARNISH]: '가니시',
    [INGREDIENT_TYPES.ICE]: '얼음',
    [INGREDIENT_TYPES.OTHER]: '기타'
  }
}
