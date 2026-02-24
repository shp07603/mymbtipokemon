# 나랑 닮은 포켓몬 찾기 (MBTI Pokemon Test)

## 프로젝트 개요
사용자의 성격 유형을 7가지 질문을 통해 분석하고, 그와 가장 잘 어울리는 포켓몬을 매칭해주는 대화형 웹 애플리케이션입니다.

## 주요 기능
- **성격 테스트 퀴즈:** 7개의 질문으로 구성된 심리 테스트.
- **애니메이션 효과:** 포켓볼 흔들림, 페이드 인/오른쪽 슬라이드 등 역동적인 UI.
- **결과 분석:** 응답 데이터를 기반으로 최적의 포켓몬 타입 산출.
- **결과 공유:** 클립보드 복사 또는 Web Share API를 통한 결과 공유.
- **반응형 디자인:** 모바일 및 데스크탑 환경 최적화.

## 기술 스택
- **Framework:** React (Vite)
- **Styling:** CSS (Modern CSS variables, Flexbox, Grid)
- **Icons/Images:** PokeAPI (Official Artwork)
- **Typography:** Google Fonts (Gaegu, Noto Sans KR)
- **Analytics:** Google Analytics (G-D1XH9D65KC)

## 디자인 가이드
- **Color Palette:**
  - Background: `#fdf8f0` (따스한 베이지)
  - Primary: `#ff6b35` (열정적인 오렌지)
  - Dark: `#2d2416` (깊은 갈색)
- **Typography:**
  - 제목: `Gaegu` (손글씨 느낌의 친근한 폰트)
  - 본문: `Noto Sans KR` (가독성 높은 고딕)

## 구현 계획
1.  **환경 설정:** React 프로젝트 기본 구조 유지 및 필요한 폰트 연결.
2.  **데이터 구성:** 질문(`QUESTIONS`)과 결과(`RESULTS`) 데이터를 상수로 분리.
3.  **컴포넌트 개발:**
    *   `StartScreen`: 인트로 및 시작 버튼.
    *   `QuizScreen`: 질문 카드 및 진행 바.
    *   `LoadingScreen`: 결과 계산 중 애니메이션.
    *   `ResultScreen`: 결과 상세 및 다시 하기/공유 버튼.
4.  **로직 구현:** 상태 관리(useState)를 통한 화면 전환 및 점수 계산 로직.
5.  **마무리:** Confetti(폭죽) 효과 및 반응형 디테일 수정.
