import { useState, useEffect, useCallback, useRef } from 'react'

// ─── 카드 데이터 ───
interface CardData {
  id: number
  type: 'cover' | 'news' | 'insight' | 'closing'
  label: string
  title: string
  body: string[]
  accent: string
  gradient: string
  emoji: string
}

const cards: CardData[] = [
  {
    id: 1,
    type: 'cover',
    label: '2026년 3월 17일 월요일',
    title: 'AI DAILY\nDIGEST',
    body: [
      '🎮 NVIDIA GTC 키노트 완료',
      '💰 OpenAI $100억 PE 합작',
      '🧠 GPT-5.4 인간 벤치마크 초과',
      '⚡ Mistral Leanstral 오픈소스',
    ],
    accent: '#F97316',
    gradient: 'from-orange-950 via-stone-950 to-stone-950',
    emoji: '🔥',
  },
  {
    id: 2,
    type: 'news',
    label: '🎮 GTC 2026',
    title: 'NVIDIA GTC 키노트\n핵심 정리',
    body: [
      'Vera Rubin — 올해 하반기 출하\nGrace Blackwell 대비 와트당 성능 10배',
      'Groq 3 LPU — Groq 인수($200억) 후 첫 칩\nGPU 결합 시 토큰/와트 35배 향상',
      'NemoClaw — OpenClaw 기반 기업용\n에이전트 플랫폼 공개',
      '$1조 주문 전망 (2027년까지)',
    ],
    accent: '#22C55E',
    gradient: 'from-green-950 via-stone-950 to-stone-950',
    emoji: '🎮',
  },
  {
    id: 3,
    type: 'news',
    label: '🤖 OPENCLAW',
    title: '"개인 AI의\n운영체제"',
    body: [
      '젠슨 황 GTC 키노트에서 직접 언급',
      '"PC에 윈도우가 있듯,\nAI에는 이게 필요하다"',
      'NemoClaw = OpenClaw + 보안 + 샌드박스\n→ 기업용 에이전트 플랫폼으로 확장',
      '💡 우리가 쓰는 도구가 메이저리그에!',
    ],
    accent: '#8B5CF6',
    gradient: 'from-violet-950 via-stone-950 to-stone-950',
    emoji: '🤖',
  },
  {
    id: 4,
    type: 'news',
    label: '💰 OPENAI',
    title: 'OpenAI, PE와\n$100억 합작벤처',
    body: [
      'TPG · Bain Capital · Brookfield 등\n사모펀드와 합작벤처 협상 중',
      '목적: 포트폴리오 기업에\nOpenAI 엔터프라이즈 대규모 배포',
      '"AI를 전기처럼 팔겠다"\n— 샘 올트먼 비전의 실행',
    ],
    accent: '#3B82F6',
    gradient: 'from-blue-950 via-stone-950 to-stone-950',
    emoji: '💰',
  },
  {
    id: 5,
    type: 'news',
    label: '🧠 GPT-5.4',
    title: '출시 2주차\n인간 벤치마크 초과',
    body: [
      'GPT-5.4 Thinking + Pro 두 가지 변형',
      '데스크톱 내비게이션·추론 테스트에서\n인간 벤치마크 초과',
      'Thinking 모델이 트렌드 —\n추론 수준을 사용자가 제어하는 시대',
      'Plus/Pro만 사용 가능 (무료 미제공)',
    ],
    accent: '#EC4899',
    gradient: 'from-pink-950 via-stone-950 to-stone-950',
    emoji: '🧠',
  },
  {
    id: 6,
    type: 'news',
    label: '🏢 META',
    title: 'AI 비용 급증 →\n대규모 감원 계속',
    body: [
      'AI 인프라 비용이 올라가면서\n대규모 감원 3일째 지속',
      '"AI가 효율화한다면서\nAI 비용 때문에 사람을 자른다"\n— 아이러니한 현실',
      '💡 자동화의 명과 암을\n보여주는 실시간 사례',
    ],
    accent: '#EF4444',
    gradient: 'from-red-950 via-stone-950 to-stone-950',
    emoji: '🏢',
  },
  {
    id: 7,
    type: 'news',
    label: '⚡ MISTRAL',
    title: 'Leanstral 오픈소스\n코드를 "증명하는" AI',
    body: [
      '60억 파라미터로 대형 모델 능가',
      '코드를 "짜는" 게 아니라\n"증명하는" 접근 — 새로운 패러다임',
      '💡 작은 모델이 큰 모델을 이기는\n효율성 중심 AI 트렌드',
    ],
    accent: '#F59E0B',
    gradient: 'from-amber-950 via-stone-950 to-stone-950',
    emoji: '⚡',
  },
  {
    id: 8,
    type: 'insight',
    label: '💡 INSIGHT',
    title: '이번 주\n핵심 인사이트',
    body: [
      '1️⃣ NVIDIA가 "에이전트 시대" 선언\n칩 → 플랫폼 → 에코시스템 확장',
      '2️⃣ OpenAI vs NVIDIA, 플랫폼 전쟁\nNemoClaw vs OpenAI Enterprise',
      '3️⃣ "Thinking" 모델이 기본이 되는 시대\n추론 비용과 속도의 밸런스가 핵심',
    ],
    accent: '#F97316',
    gradient: 'from-orange-950 via-stone-950 to-stone-950',
    emoji: '💡',
  },
  {
    id: 9,
    type: 'insight',
    label: '📊 이번 주 숫자',
    title: '숫자로 보는\nAI 산업',
    body: [
      '💲 $1조 — NVIDIA 칩 주문 전망 (2027)',
      '⚡ 35배 — Groq 3 LPU 토큰/와트 효율',
      '💰 $100억 — OpenAI PE 합작벤처 규모',
      '🔬 60억 — Mistral Leanstral 파라미터',
    ],
    accent: '#06B6D4',
    gradient: 'from-cyan-950 via-stone-950 to-stone-950',
    emoji: '📊',
  },
  {
    id: 10,
    type: 'closing',
    label: '👋 마무리',
    title: 'AI 에이전트 시대,\n우리는 이미 그 안에',
    body: [
      'NVIDIA가 에이전트 플랫폼을 선언하고',
      'OpenAI가 엔터프라이즈를 공략하는 지금,',
      '우리는 이미 OpenClaw으로\n그 미래를 살고 있다 🦦',
      '다음 주에 또 만나요!',
    ],
    accent: '#F97316',
    gradient: 'from-orange-950 via-stone-950 to-stone-950',
    emoji: '👋',
  },
]

// ─── 카드 컴포넌트 ───
function Card({ card, index, total }: { card: CardData; index: number; total: number }) {
  const isCover = card.type === 'cover'

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden select-none">
      {/* 배경 그라디언트 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

      {/* 장식 원 */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
        style={{ background: card.accent }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-5"
        style={{ background: card.accent }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-10">
        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase"
            style={{ color: card.accent }}
          >
            {card.label}
          </span>
          <span className="text-gray-500 text-xs sm:text-sm font-medium">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* 진행 바 */}
        <div className="w-full h-0.5 bg-white/10 rounded-full mb-6 sm:mb-8 shrink-0">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((index + 1) / total) * 100}%`,
              background: card.accent,
            }}
          />
        </div>

        {/* 메인 콘텐츠 - flex-1로 채움 */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {/* 제목 */}
          <h1
            className={`font-black leading-[1.1] mb-6 sm:mb-8 ${
              isCover
                ? 'text-5xl sm:text-6xl lg:text-7xl'
                : 'text-3xl sm:text-4xl lg:text-5xl'
            }`}
            style={{ color: 'white' }}
          >
            {card.title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          {/* 구분선 */}
          <div
            className="w-16 h-1 rounded-full mb-6 sm:mb-8 shrink-0"
            style={{ background: card.accent }}
          />

          {/* 본문 */}
          <div className="space-y-4 sm:space-y-5">
            {card.body.map((text, i) => (
              <p
                key={i}
                className={`font-medium leading-relaxed ${
                  isCover
                    ? 'text-lg sm:text-xl lg:text-2xl text-gray-300'
                    : 'text-base sm:text-lg lg:text-xl text-gray-200'
                }`}
              >
                {text.split('\n').map((line, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* 하단 브랜딩 */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 shrink-0">
          <span className="text-gray-500 text-xs sm:text-sm">
            by 클로 🦦 for 윤스케어
          </span>
          <span className="text-gray-600 text-xs">
            swipe →
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── 메인 앱 ───
export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const goNext = useCallback(() => {
    if (current < cards.length - 1 && !isAnimating) {
      setDirection('left')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent((c) => c + 1)
        setDirection(null)
        setIsAnimating(false)
      }, 300)
    }
  }, [current, isAnimating])

  const goPrev = useCallback(() => {
    if (current > 0 && !isAnimating) {
      setDirection('right')
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent((c) => c - 1)
        setDirection(null)
        setIsAnimating(false)
      }, 300)
    }
  }, [current, isAnimating])

  // 키보드
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  // 터치 스와이프
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return
    const dx = e.changedTouches[0].clientX - touchRef.current.x
    if (Math.abs(dx) > 50) {
      dx < 0 ? goNext() : goPrev()
    }
    touchRef.current = null
  }

  // 클릭 좌/우
  const onClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    x > rect.width / 2 ? goNext() : goPrev()
  }

  const animClass = direction === 'left'
    ? 'translate-x-[-8%] opacity-0'
    : direction === 'right'
    ? 'translate-x-[8%] opacity-0'
    : 'translate-x-0 opacity-100'

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-[#0a0a0a]">
      <div
        ref={containerRef}
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer transition-all duration-300 ease-out ${animClass}`}
        style={{
          width: 'min(92vw, 520px)',
          height: 'min(85dvh, 920px)',
          aspectRatio: '9 / 16',
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      >
        <Card card={cards[current]} index={current} total={cards.length} />
      </div>

      {/* 하단 도트 네비게이션 */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-orange-500'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
