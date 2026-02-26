import React, { useState, useEffect } from 'react';
import './App.css';
import { QUESTIONS, RESULTS, UI_TEXT, type Result, type Language } from './constants';
import pokeball from './assets/pokeball.svg';
import BackgroundMusic from './BackgroundMusic';

type Screen = 'START' | 'QUIZ' | 'LOADING' | 'RESULT' | 'HISTORY';

interface HistoryItem {
  date: string;
  result: Result;
  lang: Language;
}

function App() {
  const [lang, setLang] = useState<Language>('en'); // Default language is English
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

  const t = UI_TEXT[lang];

  // Load history & language on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('poke_mbti_history');
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory));
      } catch (e) {}
    }
    const savedLang = localStorage.getItem('poke_mbti_lang') as Language;
    if (savedLang && ['ko', 'en', 'ja'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('poke_mbti_lang', newLang);
  };

  const saveToHistory = (res: Result) => {
    const newItem: HistoryItem = {
      date: new Date().toLocaleString(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US', { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      result: res,
      lang: lang
    };
    const updated = [newItem, ...historyList].slice(0, 10);
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
    
    const name = finalResult.name[lang];
    const desc = finalResult.desc[lang];
    const traits = finalResult.traits[lang].map(t => `#${t}`).join(' ');
    const shareUrl = 'https://mypokemon.win/';

    // Rich share text
    const shareText = `${t.resultEyebrow} [${finalResult.title[lang]}]\n\n"${desc}"\n\n${traits}\n\n${t.resultShareText.replace('{name}', name)}`;
    
    if (navigator.share) {
      navigator.share({ 
        title: `${t.resultEyebrow}: ${name}`, 
        text: shareText,
        url: shareUrl
      }).catch(() => {
        copyToClipboard(`${shareText}\n\n${shareUrl}`);
      });
    } else {
      copyToClipboard(`${shareText}\n\n${shareUrl}`);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert(t.copied);
      });
    }
  };

  // Marquee Pokemon IDs
  const marqueePokemons = [1, 4, 7, 25, 133, 143, 94, 151, 448, 700, 197, 445];

  return (
    <div className="app-container">
      <BackgroundMusic />
      {/* Hidden H1 for SEO keyword optimization */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
        Pokemon MBTI Test - Which Pokemon Are You? - Personality Quiz
      </h1>
      <main className="app-content">
        {/* Header */}
        <header className="app-header">
          {screen === 'START' ? (
            <button className="icon-btn" onClick={() => setIsLeftMenuOpen(true)} aria-label="Open Menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
          ) : (
            <button className="icon-btn" onClick={() => setScreen('START')} aria-label="Go Home">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <h2 className="header-title">Pokemon Quiz</h2>
          <button className="icon-btn" onClick={() => setIsRightProfileOpen(true)} aria-label="Profile">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </header>

        {screen === 'START' && (
          <article className="screen active">
            <div className="start-wrap">
              <section className="hero-box" aria-label="Pokemon Showcase">
                <div className="marquee-container">
                  <div className="marquee-content">
                    {marqueePokemons.concat(marqueePokemons).map((id, index) => (
                      <img 
                        key={index}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                        alt="Pokemon Artwork" 
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-tag-wrap">
                  <span className="start-tag">{t.trending}</span>
                </div>
              </section>

              <nav className="lang-switcher" aria-label="Language selection">
                <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLang('en')}>EN</button>
                <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => changeLang('ko')}>KO</button>
                <button className={`lang-btn ${lang === 'ja' ? 'active' : ''}`} onClick={() => changeLang('ja')}>JA</button>
              </nav>

              <header className="title-area">
                <h1 className="main-title">
                  {t.title}<br />
                  <span className="highlight">{t.highlight}</span>
                </h1>
                <p className="start-desc">{t.startDesc}</p>
              </header>

              <section className="meta-stats" aria-label="Quiz Statistics">
                <div className="stat-box">
                  <span className="material-symbols-outlined" aria-hidden="true">timer</span>
                  <span>{t.stats.time}</span>
                </div>
                <div className="stat-box">
                  <span className="material-symbols-outlined" aria-hidden="true">quiz</span>
                  <span>{t.stats.qs}</span>
                </div>
                <div className="stat-box">
                  <span className="material-symbols-outlined" aria-hidden="true">group</span>
                  <span>{t.stats.users}</span>
                </div>
              </section>

              <div className="action-area">
                <button className="start-btn" onClick={startQuiz}>
                  <span>{t.startBtn}</span>
                  <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
                </button>
              </div>

              <section className="start-info" aria-labelledby="about-heading">
                <h2 id="about-heading" style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>{t.aboutTitle}</h2>
                <p>{t.aboutDesc1}</p>
                <p style={{ marginTop: '8px' }}>{t.aboutDesc2}</p>
              </section>
            </div>
          </article>
        )}

        {screen === 'QUIZ' && (
          <section className="screen active quiz-screen">
            <div className="progress-section">
              <div className="progress-info">
                <span className="progress-label">{t.progress}</span>
                <span className="progress-count">{t.questionOf.replace('{n}', (qIndex + 1).toString()).replace('{total}', QUESTIONS.length.toString())}</span>
              </div>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <article className="quiz-main">
              <h2 className="question-text">{QUESTIONS[qIndex].text[lang]}</h2>
              <div className="options-grid">
                {QUESTIONS[qIndex].options.map((opt, i) => (
                  <button 
                    key={i} 
                    className="option-card"
                    onClick={() => handleAnswer(opt.type)}
                  >
                    <div className={`option-icon-box ${opt.color || 'bg-slate-100'}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">{opt.icon}</span>
                    </div>
                    <div className="option-info">
                      <p className="option-title">{opt.text[lang]}</p>
                      {opt.subText && <p className="option-sub">{opt.subText[lang]}</p>}
                    </div>
                  </button>
                ))}
              </div>
            </article>
          </section>
        )}

        {screen === 'LOADING' && (
          <section className="screen active loading-screen">
            <div className="loading-content">
              <img src={pokeball} className="loading-ball" alt="Loading Spinner" />
              <div className="loading-text">{t.loading}</div>
              <div className="loading-sub">{t.loadingSub}</div>
            </div>
          </section>
        )}

        {screen === 'RESULT' && finalResult && (
          <article className="screen active result-screen">
            <div className="result-wrap">
              <header className="result-header">
                <div className="result-eyebrow">{t.resultEyebrow}</div>
                <h1 className="result-main-title">{finalResult.title[lang]}</h1>
              </header>

              <section className="result-card" style={{ '--type-color': finalResult.typeColor } as React.CSSProperties}>
                <div className="result-mon-wrap">
                  <img
                    className="result-mon"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${finalResult.id}.png`}
                    alt={`${finalResult.name[lang]} official artwork`}
                  />
                </div>
                <div className="result-badge-row">
                  <span className="result-type-badge" style={{ background: finalResult.typeColor }}>
                    {finalResult.type[lang]}
                  </span>
                </div>
                <h2 className="result-mon-name">{finalResult.name[lang]}</h2>
                <div className="result-divider"></div>
                <p className="result-desc-text">{finalResult.desc[lang]}</p>
                <div className="traits-row">
                  {finalResult.traits[lang].map((trait, i) => (
                    <span key={i} className="trait-tag">#{trait}</span>
                  ))}
                </div>
              </section>

              <section className="score-summary" aria-label="Matching Statistics">
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
                        <span className="score-chip-label">{r ? r.name[lang] : type}</span>
                      </div>
                    );
                  })}
              </section>

              <div className="result-actions">
                <button className="share-btn" onClick={shareResult}>
                  <span className="material-symbols-outlined" aria-hidden="true">share</span>
                  {t.share}
                </button>
                <button className="retry-btn" onClick={retryQuiz}>
                  ↺ {t.retry}
                </button>
              </div>
            </div>
          </article>
        )}

        {screen === 'HISTORY' && (
          <section className="screen active">
            <h1 className="main-title" style={{marginTop: '20px'}}>{t.history}</h1>
            <p className="start-desc">{t.historyDesc}</p>
            {historyList.length === 0 ? (
              <div style={{textAlign: 'center', marginTop: '40px', color: 'var(--slate-400)'}}>
                <span className="material-symbols-outlined" style={{fontSize: '48px', marginBottom: '16px'}}>history</span>
                <p>{t.historyEmpty}</p>
              </div>
            ) : (
              <div className="history-list">
                {historyList.map((item, i) => (
                  <article key={i} className="history-item">
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.result.id}.png`} 
                      alt={item.result.name[lang] || item.result.name['en']} 
                      className="history-mon"
                    />
                    <div className="history-info">
                      <p className="history-date">{item.date}</p>
                      <p className="history-name">{item.result.name[lang] || item.result.name['en']}</p>
                      <span className="history-type" style={{background: item.result.typeColor}}>{item.result.type[lang] || item.result.type['en']}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Bottom Nav */}
        <nav className="bottom-nav" aria-label="Main Navigation">
          <button className={`nav-item ${screen === 'START' ? 'active' : ''}`} onClick={() => setScreen('START')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: screen === 'START' ? "'FILL' 1" : "'FILL' 0" }} aria-hidden="true">home</span>
            <span className="nav-label">{t.home}</span>
          </button>
          <button className={`nav-item ${screen === 'HISTORY' ? 'active' : ''}`} onClick={() => setScreen('HISTORY')}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: screen === 'HISTORY' ? "'FILL' 1" : "'FILL' 0" }} aria-hidden="true">history</span>
            <span className="nav-label">History</span>
          </button>
          <button className="nav-item" onClick={() => setIsRightProfileOpen(true)}>
            <span className="material-symbols-outlined" aria-hidden="true">person</span>
            <span className="nav-label">{t.profile}</span>
          </button>
        </nav>

        <footer className="footer">
          <div className="footer-links">
            <button className="text-btn" onClick={() => setModalType('privacy')}>{t.footerPrivacy}</button> | <button className="text-btn" onClick={() => setModalType('terms')}>{t.footerTerms}</button>
          </div>
          <p className="copyright">© 2026 Pokemon Quiz. All rights reserved.</p>
        </footer>
      </main>

      {/* Modals & Drawers */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <article className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalType(null)} aria-label="Close Modal">✕</button>
            <h2 className="modal-title">{modalType === 'privacy' ? t.footerPrivacy : t.footerTerms}</h2>
            <div className="modal-body">
              {modalType === 'privacy' ? (
                lang === 'ko' ? (
                  <>
                    <p>본 사이트는 사용자의 개인정보를 중요하게 생각하며, 최소한의 데이터만을 일시적으로 처리합니다.</p>
                    <p>1. 어떠한 개인 식별 정보도 서버에 수집, 저장하지 않습니다.</p>
                    <p>2. 테스트 결과(히스토리)는 귀하의 기기(브라우저) 내부에만 저장됩니다.</p>
                    <p>3. 트래픽 분석(Google Analytics) 및 광고 게재(Google AdSense)를 위해 쿠키를 사용할 수 있습니다.</p>
                  </>
                ) : lang === 'ja' ? (
                  <>
                    <p>当サイトは、ユーザーの個人情報を重視し、最小限のデータのみを一時的に処理します。</p>
                    <p>1. いかなる個人識別情報もサーバーに収集・保存しません。</p>
                    <p>2. テスト結果（履歴）は、お客様のデバイス（ブラウザ）内部にのみ保存されます。</p>
                    <p>3. トラフィック分析（Google Analytics）および広告掲載（Google AdSense）のためにクッキーを使用する場合があります。</p>
                  </>
                ) : (
                  <>
                    <p>We value your privacy and process only minimal data temporarily.</p>
                    <p>1. No personally identifiable information is collected or stored on our servers.</p>
                    <p>2. Test results (history) are stored only inside your device (browser).</p>
                    <p>3. Cookies may be used for traffic analysis (Google Analytics) and advertising (Google AdSense).</p>
                  </>
                )
              ) : (
                lang === 'ko' ? (
                  <>
                    <p><strong>제 1 조 (목적)</strong><br />본 서비스는 무료로 제공되는 심리/성향 테스트 웹 애플리케이션입니다.</p>
                    <p><strong>제 2 조 (저작권 및 면책 조항)</strong><br />본 사이트에서 사용된 포켓몬 관련 이미지, 이름, 데이터 등의 지식재산권은 원저작권자에게 있습니다. 본 테스트의 결과는 과학적 근거가 없으며 오직 흥미 위주의 콘텐츠입니다.</p>
                  </>
                ) : lang === 'ja' ? (
                  <>
                    <p><strong>第1条（目的）</strong><br />本サービスは無料で提供される心理・傾向テストウェブアプリケーションです。</p>
                    <p><strong>第2条（著作権および免責事項）</strong><br />当サイトで使用されているポケモン関連の画像、名前、データなどの知的財産権は、元の著作権者に帰属します。このテストの結果には科学的根拠はなく、娯楽目的のコンテンツです。</p>
                  </>
                ) : (
                  <>
                    <p><strong>Article 1 (Purpose)</strong><br />This service is a free psychological/disposition test web application.</p>
                    <p><strong>Article 2 (Copyright & Disclaimer)</strong><br />Intellectual property rights for Pokemon-related images, names, and data used on this site belong to the original copyright holders. Results have no scientific basis and are for entertainment only.</p>
                  </>
                )
              )}
            </div>
          </article>
        </div>
      )}

      {isLeftMenuOpen && <div className="drawer-overlay" onClick={() => setIsLeftMenuOpen(false)}></div>}
      <aside className={`drawer drawer-left ${isLeftMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>{t.drawerMenu}</h2>
          <button className="icon-btn" onClick={() => setIsLeftMenuOpen(false)} aria-label="Close Menu">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="drawer-menu">
          <button className="drawer-menu-item" onClick={() => { setScreen('START'); setIsLeftMenuOpen(false); }}>
            <span className="material-symbols-outlined">home</span> {t.drawerHome}
          </button>
          <button className="drawer-menu-item" onClick={() => { setScreen('HISTORY'); setIsLeftMenuOpen(false); }}>
            <span className="material-symbols-outlined">history</span> {t.drawerHistory}
          </button>
          <button className="drawer-menu-item" onClick={() => { setIsLeftMenuOpen(false); setModalType('privacy'); }}>
            <span className="material-symbols-outlined">policy</span> {t.drawerPolicy}
          </button>
        </nav>
      </aside>

      {isRightProfileOpen && <div className="drawer-overlay" onClick={() => setIsRightProfileOpen(false)}></div>}
      <aside className={`drawer drawer-right ${isRightProfileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>{t.loginTitle}</h2>
          <button className="icon-btn" onClick={() => setIsRightProfileOpen(false)} aria-label="Close Profile">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <p style={{fontSize: '14px', color: 'var(--slate-600)', marginBottom: '8px'}}>{t.loginSub}</p>
          <input type="email" placeholder={t.emailPlaceholder} className="login-input" aria-label="Email" />
          <input type="password" placeholder={t.passwordPlaceholder} className="login-input" aria-label="Password" />
          <button type="submit" className="login-btn" onClick={() => { alert(t.comingSoon); setIsRightProfileOpen(false); }}>{t.loginBtn}</button>
          <div style={{textAlign: 'center', marginTop: '16px', fontSize: '14px'}}>
            <a href="#" style={{color: 'var(--primary)', textDecoration: 'underline'}}>{t.noAccount}</a>
          </div>
        </form>
      </aside>
    </div>
  );
}

export default App;
