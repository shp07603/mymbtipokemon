import React, { useState, useEffect } from 'react';
import './App.css';
import { QUESTIONS, RESULTS, type Result } from './constants';
import pokeball from './assets/pokeball.svg';
import BackgroundMusic from './BackgroundMusic';

type Screen = 'START' | 'QUIZ' | 'LOADING' | 'RESULT' | 'HISTORY';

interface HistoryItem {
  date: string;
  result: Result;
}

function App() {
  const [screen, setScreen] = useState<Screen>('START');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<Result | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  // Drawers
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightProfileOpen, setIsRightProfileOpen] = useState(false);

  // History
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('poke_mbti_history');
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToHistory = (res: Result) => {
    const newItem: HistoryItem = {
      date: new Date().toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      result: res
    };
    const updated = [newItem, ...historyList].slice(0, 10); // Keep last 10
    setHistoryList(updated);
    localStorage.setItem('poke_mbti_history', JSON.stringify(updated));
  };

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
    saveToHistory(result);
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

  // Marquee Pokemon IDs
  const marqueePokemons = [1, 4, 7, 25, 133, 143, 94, 151, 448, 700, 197, 445];

  return (
    <div className="app-container">
      <BackgroundMusic />
      <div className="app-content">
        {/* Header */}
        <header className="app-header">
          {screen === 'START' ? (
            <span className="material-symbols-outlined icon-btn" onClick={() => setIsLeftMenuOpen(true)}>menu</span>
          ) : (
            <span className="material-symbols-outlined icon-btn" onClick={() => setScreen('START')}>arrow_back</span>
          )}
          <h2 className="header-title">Pokemon Quiz</h2>
          <span className="material-symbols-outlined icon-btn" onClick={() => setIsRightProfileOpen(true)}>account_circle</span>
        </header>

        {screen === 'START' && (
          <div className="screen active">
            <div className="start-wrap">
              <div className="hero-box">
                {/* Marquee Animation */}
                <div className="marquee-container">
                  <div className="marquee-content">
                    {marqueePokemons.concat(marqueePokemons).map((id, index) => (
                      <img 
                        key={index}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                        alt="pokemon" 
                      />
                    ))}
                  </div>
                </div>

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
                <h3>내 안의 포켓몬을 깨워라! 🌟</h3>
                <p>본 테스트는 당신의 일상적인 선택과 성향을 바탕으로 포켓몬 세계의 다양한 캐릭터들과 매칭해 드립니다. 재미로 보는 심리테스트, 지금 바로 시작해보세요!</p>
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

        {screen === 'HISTORY' && (
          <div className="screen active">
            <h1 className="main-title" style={{marginTop: '20px'}}>나의 기록</h1>
            <p className="start-desc">이전에 테스트했던 결과들을 모아보세요.</p>
            
            {historyList.length === 0 ? (
              <div style={{textAlign: 'center', marginTop: '40px', color: 'var(--slate-400)'}}>
                <span className="material-symbols-outlined" style={{fontSize: '48px', marginBottom: '16px'}}>history</span>
                <p>아직 테스트 기록이 없습니다.</p>
              </div>
            ) : (
              <div className="history-list">
                {historyList.map((item, i) => (
                  <div key={i} className="history-item">
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.result.id}.png`} 
                      alt={item.result.nameKo} 
                      className="history-mon"
                    />
                    <div className="history-info">
                      <p className="history-date">{item.date}</p>
                      <p className="history-name">{item.result.nameKo}</p>
                      <span className="history-type" style={{background: item.result.typeColor}}>{item.result.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav">
          <a className={`nav-item ${screen === 'START' ? 'active' : ''}`} onClick={() => setScreen('START')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: screen === 'START' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
            <span className="nav-label">Home</span>
          </a>
          <a className={`nav-item ${screen === 'HISTORY' ? 'active' : ''}`} onClick={() => setScreen('HISTORY')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: screen === 'HISTORY' ? "'FILL' 1" : "'FILL' 0" }}>history</span>
            <span className="nav-label">History</span>
          </a>
          <a className="nav-item" onClick={() => setIsRightProfileOpen(true)}>
            <span className="material-symbols-outlined">person</span>
            <span className="nav-label">Profile</span>
          </a>
        </nav>

        <footer className="footer">
          <div className="footer-links">
            <button className="text-btn" onClick={() => setModalType('privacy')}>개인정보처리방침</button> | <button className="text-btn" onClick={() => setModalType('terms')}>이용약관</button>
          </div>
          <p className="copyright">© 2026 Pokemon Quiz. All rights reserved.</p>
        </footer>
      </div>

      {/* Modals for Privacy & Terms */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalType(null)}>✕</button>
            <h2 className="modal-title">{modalType === 'privacy' ? '개인정보처리방침' : '이용약관'}</h2>
            <div className="modal-body">
              {modalType === 'privacy' ? (
                <>
                  <p>본 사이트는 사용자의 개인정보를 중요하게 생각하며, 최소한의 데이터만을 일시적으로 처리합니다.</p>
                  <p>1. 어떠한 개인 식별 정보도 서버에 수집, 저장하지 않습니다.</p>
                  <p>2. 테스트 결과(히스토리)는 귀하의 기기(브라우저) 내부에만 저장됩니다.</p>
                  <p>3. 트래픽 분석(Google Analytics) 및 광고 게재(Google AdSense)를 위해 쿠키를 사용할 수 있습니다.</p>
                </>
              ) : (
                <>
                  <p><strong>제 1 조 (목적)</strong><br />본 서비스는 무료로 제공되는 심리/성향 테스트 웹 애플리케이션입니다.</p>
                  <p><strong>제 2 조 (저작권 및 면책 조항)</strong><br />본 사이트에서 사용된 포켓몬 관련 이미지, 이름, 데이터 등의 지식재산권은 원저작권자에게 있습니다. 본 테스트의 결과는 과학적 근거가 없으며 오직 흥미 위주의 콘텐츠입니다.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Left Menu Drawer */}
      {isLeftMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsLeftMenuOpen(false)}></div>
      )}
      <div className={`drawer drawer-left ${isLeftMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Menu</h2>
          <span className="material-symbols-outlined icon-btn" onClick={() => setIsLeftMenuOpen(false)}>close</span>
        </div>
        <div className="drawer-menu">
          <div className="drawer-menu-item" onClick={() => { setScreen('START'); setIsLeftMenuOpen(false); }}>
            <span className="material-symbols-outlined">home</span> 홈 화면
          </div>
          <div className="drawer-menu-item" onClick={() => { setScreen('HISTORY'); setIsLeftMenuOpen(false); }}>
            <span className="material-symbols-outlined">history</span> 나의 기록
          </div>
          <div className="drawer-menu-item" onClick={() => { setIsLeftMenuOpen(false); setModalType('privacy'); }}>
            <span className="material-symbols-outlined">policy</span> 개인정보처리방침
          </div>
        </div>
      </div>

      {/* Right Profile Drawer */}
      {isRightProfileOpen && (
        <div className="drawer-overlay" onClick={() => setIsRightProfileOpen(false)}></div>
      )}
      <div className={`drawer drawer-right ${isRightProfileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Profile Login</h2>
          <span className="material-symbols-outlined icon-btn" onClick={() => setIsRightProfileOpen(false)}>close</span>
        </div>
        <div className="login-form">
          <p style={{fontSize: '14px', color: 'var(--slate-600)', marginBottom: '8px'}}>기록을 영구적으로 저장하려면 로그인하세요.</p>
          <input type="email" placeholder="이메일 주소" className="login-input" />
          <input type="password" placeholder="비밀번호" className="login-input" />
          <button className="login-btn" onClick={() => { alert('준비중인 기능입니다.'); setIsRightProfileOpen(false); }}>로그인</button>
          
          <div style={{textAlign: 'center', marginTop: '16px', fontSize: '14px'}}>
            <a href="#" style={{color: 'var(--primary)', textDecoration: 'underline'}}>계정이 없으신가요?</a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
