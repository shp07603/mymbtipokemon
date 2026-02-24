import React, { useState } from 'react';
import './App.css';
import { QUESTIONS, RESULTS, type Result } from './constants';
import pokeball from './assets/pokeball.svg';

type Screen = 'START' | 'QUIZ' | 'LOADING' | 'RESULT';

function App() {
  const [screen, setScreen] = useState<Screen>('START');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<Result | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const startQuiz = () => {
    setAnswers([]);
    setQIndex(0);
    setScreen('QUIZ');
  };

  const retryQuiz = () => {
    startQuiz();
  };

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (qIndex + 1 < QUESTIONS.length) {
      setTimeout(() => {
        setQIndex(qIndex + 1);
      }, 380);
    } else {
      setTimeout(() => {
        processResult(newAnswers);
      }, 380);
    }
  };

  const processResult = async (finalAnswers: string[]) => {
    setScreen('LOADING');

    const scoreMap: Record<string, number> = {};
    finalAnswers.forEach((t) => {
      scoreMap[t] = (scoreMap[t] || 0) + 1;
    });
    setScores(scoreMap);

    const topType = Object.entries(scoreMap).sort((a, b) => b[1] - a[1])[0][0];
    const result = RESULTS[topType] || RESULTS.normal;

    await new Promise((r) => setTimeout(r, 2000));

    setFinalResult(result);
    setScreen('RESULT');
    launchConfetti(result.typeColor);
  };

  const launchConfetti = (color: string) => {
    const colors = [color, '#ffd700', '#ff6b35', '#ffffff', '#66bb6a', '#4fc3f7'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.cssText = `
          left:${Math.random() * 100}vw;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          width:${6 + Math.random() * 8}px;
          height:${6 + Math.random() * 8}px;
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          animation-duration:${1.5 + Math.random() * 2}s;
          animation-delay:${Math.random() * 0.5}s;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 30);
    }
  };

  const shareResult = () => {
    if (!finalResult) return;
    const text = `나랑 닮은 포켓몬은 ${finalResult.nameKo}이래! 🎉\n너는 어떤 포켓몬이야? 테스트해봐 👇`;
    if (navigator.share) {
      navigator.share({ title: '나랑 닮은 포켓몬은?', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('결과가 클립보드에 복사되었습니다!');
      });
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <header className="app-header">
          <span className="material-symbols-outlined icon-btn" onClick={() => screen !== 'START' && setScreen('START')}>
            {screen === 'START' ? 'menu' : 'arrow_back'}
          </span>
          <h2 className="header-title">Pokemon Quiz</h2>
          <span className="material-symbols-outlined icon-btn">account_circle</span>
        </header>

        {screen === 'START' && (
          <div className="screen active">
            <div className="start-wrap">
              <div className="hero-box">
                <img src={pokeball} className="pokeball-anim hero-icon" alt="Pokeball" />
                <div className="hero-overlay"></div>
                <div className="hero-tag-wrap">
                  <span className="start-tag">Trending Quiz</span>
                </div>
              </div>

              <h1 className="main-title">
                나랑 닮은<br />
                <span className="highlight">포켓몬</span>은 누구?
              </h1>
              <p className="start-desc">
                단 7개의 재미있는 질문으로 당신의 내면의 포켓몬과 배틀 스타일을 찾아보세요!
              </p>

              <div className="meta-stats">
                <div className="stat-box">
                  <span className="material-symbols-outlined">timer</span>
                  <span>2 Min</span>
                </div>
                <div className="stat-box">
                  <span className="material-symbols-outlined">quiz</span>
                  <span>7 Qs</span>
                </div>
                <div className="stat-box">
                  <span className="material-symbols-outlined">group</span>
                  <span>10k+</span>
                </div>
              </div>

              <div className="action-area">
                <button className="start-btn" onClick={startQuiz}>
                  <span>Start Quiz</span>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
              </div>

              <div className="start-info">
                <h3>성격 테스트란?</h3>
                <p>본 테스트는 일상적인 선택과 성향을 바탕으로 포켓몬 세계의 다양한 캐릭터들과 매칭해 드립니다.</p>
              </div>
            </div>
          </div>
        )}

        {screen === 'QUIZ' && (
          <div className="screen active quiz-screen">
            <section className="progress-section">
              <div className="progress-info">
                <span className="progress-label">Progress</span>
                <span className="progress-count">Question {qIndex + 1} of {QUESTIONS.length}</span>
              </div>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </section>

            <main className="quiz-main">
              <h1 className="question-text">{QUESTIONS[qIndex].text}</h1>
              
              <div className="options-grid">
                {QUESTIONS[qIndex].options.map((opt, i) => (
                  <button 
                    key={i} 
                    className="option-card"
                    onClick={() => handleAnswer(opt.type)}
                  >
                    <div className={`option-icon-box ${opt.color || 'bg-slate-100'}`}>
                      <span className="material-symbols-outlined">{opt.icon}</span>
                    </div>
                    <div className="option-info">
                      <p className="option-title">{opt.text}</p>
                      <p className="option-sub">{opt.subText}</p>
                    </div>
                  </button>
                ))}
              </div>
            </main>
          </div>
        )}

        {screen === 'LOADING' && (
          <div className="screen active loading-screen">
            <div className="loading-content">
              <img src={pokeball} className="loading-ball" alt="Loading" />
              <div className="loading-text">포켓몬 탐색 중...</div>
              <div className="loading-sub">당신과 닮은 포켓몬을 찾고 있어요 🔍</div>
            </div>
          </div>
        )}

        {screen === 'RESULT' && finalResult && (
          <div className="screen active result-screen">
            <div className="result-wrap">
              <div className="result-header">
                <div className="result-eyebrow">당신의 포켓몬은</div>
                <h1 className="result-main-title">{finalResult.title}</h1>
              </div>

              <div className="result-card" style={{ '--type-color': finalResult.typeColor } as React.CSSProperties}>
                <div className="result-mon-wrap">
                  <img
                    className="result-mon"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${finalResult.id}.png`}
                    alt={finalResult.nameKo}
                  />
                </div>
                <div className="result-badge-row">
                  <span className="result-type-badge" style={{ background: finalResult.typeColor }}>
                    {finalResult.type}
                  </span>
                </div>
                <h2 className="result-mon-name">{finalResult.nameKo}</h2>
                <p className="result-mon-en">{finalResult.nameEn}</p>
                <div className="result-divider"></div>
                <p className="result-desc-text">{finalResult.desc}</p>
                <div className="traits-row">
                  {finalResult.traits.map((trait, i) => (
                    <span key={i} className="trait-tag">{trait}</span>
                  ))}
                </div>
              </div>

              <div className="score-summary">
                {Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([type, count], i) => {
                    const r = RESULTS[type];
                    return (
                      <div key={i} className="score-chip">
                        <span className="score-chip-val">
                          {Math.round((count / QUESTIONS.length) * 100)}%
                        </span>
                        <span className="score-chip-label">{r ? r.nameKo : type}</span>
                      </div>
                    );
                  })}
              </div>

              <div className="result-actions">
                <button className="share-btn" onClick={shareResult}>
                  <span className="material-symbols-outlined">share</span>
                  결과 공유하기
                </button>
                <button className="retry-btn" onClick={retryQuiz}>
                  ↺ 다시 테스트하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <a className={`nav-item ${screen === 'START' ? 'active' : ''}`} onClick={() => setScreen('START')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="nav-label">Home</span>
          </a>
          <a className="nav-item">
            <span className="material-symbols-outlined">emoji_events</span>
            <span className="nav-label">Leaderboard</span>
          </a>
          <a className="nav-item">
            <span className="material-symbols-outlined">person</span>
            <span className="nav-label">Profile</span>
          </a>
        </nav>

        <footer className="footer">
          <div className="footer-links">
            <span onClick={() => setModalType('privacy')}>개인정보처리방침</span> | <span onClick={() => setModalType('terms')}>이용약관</span>
          </div>
          <p className="copyright">© 2026 Pokemon Quiz. All rights reserved.</p>
        </footer>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalType(null)}>✕</button>
            <h2 className="modal-title">{modalType === 'privacy' ? '개인정보처리방침' : '이용약관'}</h2>
            <div className="modal-body">
              {modalType === 'privacy' ? (
                <p>개인정보 처리방침 내용... (생략)</p>
              ) : (
                <p>이용약관 내용... (생략)</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;