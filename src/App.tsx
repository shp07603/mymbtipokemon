import React, { useState } from 'react';
import './App.css';
import { QUESTIONS, RESULTS, type Result } from './constants';

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

    // Small dramatic pause
    await new Promise((r) => setTimeout(r, 1500));

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
    <div className="page">
      {screen === 'START' && (
        <div className="screen active">
          <div className="start-wrap">
            <svg className="pokeball-anim" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#ff3d3d" stroke="#2d2416" stroke-width="3" />
              <rect x="2" y="47" width="96" height="6" fill="#2d2416" />
              <circle cx="50" cy="50" r="14" fill="white" stroke="#2d2416" stroke-width="3" />
              <circle cx="50" cy="50" r="7" fill="#f5f5f5" stroke="#2d2416" stroke-width="2" />
              <path d="M 2 50 A 48 48 0 0 1 98 50" fill="#f0f0f0" stroke="none" />
            </svg>

            <div className="start-tag">포켓몬 성격 테스트</div>
            <h1>
              나랑 닮은
              <br />
              포켓몬은 <span className="highlight">누구?</span>
            </h1>
            <p className="start-desc">
              7가지 질문으로 당신과 가장 닮은
              <br />
              포켓몬을 찾아드릴게요 ✨
            </p>

            <div className="preview-strip">
              <img
                className="preview-mon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                style={{ '--dur': '3s', '--delay': '0s' } as React.CSSProperties}
              />
              <img
                className="preview-mon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                style={{ '--dur': '3.5s', '--delay': '0.3s' } as React.CSSProperties}
              />
              <img
                className="preview-mon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
                style={{ '--dur': '2.8s', '--delay': '0.6s' } as React.CSSProperties}
              />
              <img
                className="preview-mon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
                style={{ '--dur': '3.2s', '--delay': '0.1s' } as React.CSSProperties}
              />
              <img
                className="preview-mon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
                style={{ '--dur': '3.8s', '--delay': '0.4s' } as React.CSSProperties}
              />
            </div>

            <button className="start-btn" onClick={startQuiz}>
              내 포켓몬 찾기 →
            </button>

            <div className="start-info">
              <h3>성격 테스트란?</h3>
              <p>본 테스트는 일상적인 선택과 성향을 바탕으로 포켓몬 세계의 다양한 캐릭터들과 매칭해 드립니다. 당신의 잠재된 성격은 불꽃처럼 뜨거운지, 혹은 물처럼 유연한지 확인해보세요!</p>
              <h3>테스트 특징</h3>
              <ul>
                <li>✨ 간단한 7가지 심리 질문</li>
                <li>🎨 귀여운 공식 포켓몬 아트워크</li>
                <li>🎉 결과에 따른 맞춤 성격 분석</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {screen === 'QUIZ' && (
        <div className="screen active">
          <div className="quiz-header">
            <div className="quiz-step">
              질문 {qIndex + 1} / {QUESTIONS.length}
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(qIndex / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="q-card">
            <span className="q-emoji">{QUESTIONS[qIndex].emoji}</span>
            <div className="q-text">{QUESTIONS[qIndex].text}</div>
            <div className="options">
              {QUESTIONS[qIndex].options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${answers[qIndex] === opt.type ? 'selected' : ''}`}
                  onClick={() => handleAnswer(opt.type)}
                >
                  <div className="option-icon">{opt.icon}</div>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === 'LOADING' && (
        <div className="screen active">
          <div className="loading-wrap">
            <svg className="loading-ball" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#ff3d3d" stroke="#2d2416" stroke-width="3" />
              <rect x="2" y="47" width="96" height="6" fill="#2d2416" />
              <circle cx="50" cy="50" r="14" fill="white" stroke="#2d2416" stroke-width="3" />
              <circle cx="50" cy="50" r="7" fill="#f5f5f5" stroke="#2d2416" stroke-width="2" />
              <path d="M 2 50 A 48 48 0 0 1 98 50" fill="#f0f0f0" />
            </svg>
            <div className="loading-text">포켓몬 탐색 중...</div>
            <div className="loading-sub">당신과 닮은 포켓몬을 찾고 있어요 🔍</div>
          </div>
        </div>
      )}

      {screen === 'RESULT' && finalResult && (
        <div className="screen active">
          <div className="result-wrap">
            <div className="result-eyebrow">당신의 포켓몬은</div>
            <div className="result-title">{finalResult.title}</div>

            <div className="result-card" style={{ '--type-color': finalResult.typeColor } as React.CSSProperties}>
              <div className="result-mon-wrap">
                <img
                  className="result-mon"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${finalResult.id}.png`}
                  alt={finalResult.nameKo}
                />
              </div>
              <div className="result-type-badge" style={{ background: finalResult.typeColor }}>
                {finalResult.type}
              </div>
              <div className="result-mon-name">{finalResult.nameKo}</div>
              <div className="result-mon-en">{finalResult.nameEn}</div>
              <div className="result-divider"></div>
              <div className="result-desc">{finalResult.desc}</div>
              <div className="traits">
                {finalResult.traits.map((trait, i) => (
                  <span key={i} className="trait">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="score-row">
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
                      <div className="score-chip-label">{r ? r.nameKo : type} 성향</div>
                    </div>
                  );
                })}
            </div>

            <button className="share-btn" onClick={shareResult}>
              📤 결과 공유하기
            </button>
            <button className="retry-btn" onClick={retryQuiz}>
              ↺ 다시 테스트하기
            </button>
          </div>
        </div>
      )}

      <footer className="footer" style={{ marginTop: '40px', padding: '20px', textAlign: 'center', borderTop: '1px solid var(--border)', fontSize: '14px', color: 'var(--mid)' }}>
        <p>© 2026 나랑 닮은 포켓몬 테스트. All rights reserved.</p>
        <p>포켓몬 데이터 및 이미지는 PokeAPI를 활용하였습니다.</p>
        <div className="footer-links" style={{ marginTop: '10px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setModalType('privacy')}>개인정보처리방침</span> | <span style={{ cursor: 'pointer' }} onClick={() => setModalType('terms')}>이용약관</span>
        </div>
      </footer>

      {/* Modal for Privacy & Terms */}
      {modalType && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalType(null)}>✕</button>
            <div className="modal-title">
              {modalType === 'privacy' ? '개인정보처리방침' : '이용약관'}
            </div>
            <div className="modal-body">
              {modalType === 'privacy' ? (
                <>
                  <p>본 사이트("나랑 닮은 포켓몬 테스트")는 사용자의 개인정보를 중요하게 생각하며, "개인정보 보호법"에 따라 사용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
                  <br />
                  <p><strong>1. 개인정보의 수집 및 이용 목적</strong><br />본 사이트는 별도의 회원가입 없이 이용 가능하며, 서비스 제공을 위한 최소한의 데이터(성격 테스트 답변 등)만을 일시적으로 처리합니다. 어떠한 개인 식별 정보(이름, 연락처, 이메일 등)도 수집, 저장 또는 제3자에게 제공하지 않습니다.</p>
                  <br />
                  <p><strong>2. 개인정보의 보유 및 이용 기간</strong><br />테스트 진행 중 발생하는 모든 데이터는 사용자의 브라우저(클라이언트) 단에서만 처리되며, 서버에 저장되지 않고 페이지를 닫거나 새로고침하면 즉시 파기됩니다.</p>
                  <br />
                  <p><strong>3. 쿠키(Cookie) 및 웹 분석 도구의 사용</strong><br />본 사이트는 서비스 개선 및 트래픽 분석(예: Google Analytics), 그리고 광고 게재(Google AdSense)를 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
                  <br />
                  <p><strong>4. 문의처</strong><br />개인정보와 관련된 문의 사항은 사이트 관리자에게 문의해주시기 바랍니다.</p>
                </>
              ) : (
                <>
                  <p><strong>제 1 조 (목적)</strong><br />본 약관은 "나랑 닮은 포켓몬 테스트" (이하 "서비스")의 이용 조건 및 절차, 이용자와 사이트의 권리, 의무, 책임 사항을 규정함을 목적으로 합니다.</p>
                  <br />
                  <p><strong>제 2 조 (서비스의 제공)</strong><br />1. 본 서비스는 무료로 제공되는 심리/성향 테스트 웹 애플리케이션입니다.<br />2. 서비스의 내용은 사이트의 정책에 따라 변경, 중단될 수 있습니다.</p>
                  <br />
                  <p><strong>제 3 조 (저작권 및 면책 조항)</strong><br />1. 본 사이트에서 사용된 포켓몬 관련 이미지, 이름, 데이터 등의 지식재산권은 원저작권자(Nintendo, Creatures, GAME FREAK 등)에게 있습니다. 본 사이트는 영리 목적이 아닌 팬 메이드 성격의 테스트를 제공하며, PokeAPI를 통해 데이터를 참조합니다.<br />2. 본 테스트의 결과는 과학적, 의학적 근거가 없는 단순한 흥미 위주의 콘텐츠이며, 사이트는 테스트 결과로 인해 발생하는 어떠한 문제에 대해서도 법적 책임을 지지 않습니다.</p>
                  <br />
                  <p><strong>제 4 조 (이용자의 의무)</strong><br />이용자는 본 서비스를 이용할 때 불법적인 목적이나 부정한 방법으로 서비스를 이용해서는 안 되며, 사이트의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</p>
                  <br />
                  <p><strong>제 5 조 (약관의 변경)</strong><br />본 약관은 법령의 변경이나 서비스 정책에 따라 변경될 수 있으며, 변경된 약관은 사이트 내에 공지함으로써 효력이 발생합니다.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
