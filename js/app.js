import { level1Questions } from "./data/level1.js"

const app = document.getElementById("app")

const TOTAL_QUESTIONS = 10
const POINTS_PER_CORRECT = 10

const correctMessages = [
  "Mantap! Kamu dapat bintang!",
  "Hebat! Jawabanmu benar!",
  "Yes! Pintar sekali!",
  "Bagus! Lanjut!"
]

const wrongMessages = [
  "Tidak apa-apa, ayo coba lagi di soal berikutnya!",
  "Hampir! Kamu pasti bisa!",
  "Yuk, kita belajar pelan-pelan ya!",
  "Semangat! Soal selanjutnya menunggu!"
]

function rand(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

function buildSessionQuestions() {
  const selected = shuffle(level1Questions).slice(0, TOTAL_QUESTIONS)
  return selected
}

const state = {
  screen: "start",
  level: 1,
  sessionQuestions: buildSessionQuestions(),
  questionIndex: 0,
  score: 0,
  feedback: null,
  hintOpen: false
}

function resetGame() {
  state.screen = "start"
  state.level = 1
  state.sessionQuestions = buildSessionQuestions()
  state.questionIndex = 0
  state.score = 0
  state.feedback = null
  state.hintOpen = false
  render()
}

function startGame() {
  state.screen = "quiz"
  state.questionIndex = 0
  state.score = 0
  state.feedback = null
  state.hintOpen = false
  state.sessionQuestions = buildSessionQuestions()
  render()
}

function currentQuestion() {
  return state.sessionQuestions[state.questionIndex]
}

function formatQuestionText(q) {
  const romajiUp = q.word.romaji.toUpperCase()
  return `Apa arti dari “${romajiUp} (${q.word.kana})”?`
}

function optionClassByIndex(i) {
  if (i === 0) return "btn btn--a"
  if (i === 1) return "btn btn--b"
  return "btn btn--c"
}

function renderStart() {
  const total = TOTAL_QUESTIONS * POINTS_PER_CORRECT
  app.innerHTML = `
    <div class="panel">
      <div class="hero">
        <div class="hero__emoji" aria-hidden="true">🧠🎌</div>
        <div class="hero__h">Siap belajar sambil main?</div>
        <div class="hero__p">Ada <b>${TOTAL_QUESTIONS}</b> soal di <b>Level 1</b>.
Jawab yang benar untuk kumpulkan bintang (maks. ${total} poin).</div>
      </div>

      <div class="card">
        <div class="row">
          <div class="pill"><span aria-hidden="true">🏷️</span> Level <span class="pill__muted">${state.level}</span></div>
          <div class="pill"><span aria-hidden="true">⭐</span> Skor <span class="pill__muted">0</span></div>
        </div>
      </div>

      <div class="cta">
        <button class="btn" data-action="start"><span class="btn__label">Mulai</span></button>
      </div>
    </div>
  `
}

function renderQuiz() {
  const q = currentQuestion()
  const index = state.questionIndex
  const total = state.sessionQuestions.length

  const optionsHtml = q.options
    .map((opt, i) => {
      const isLocked = Boolean(state.feedback)
      const isSelected = state.feedback?.selectedId === opt.id
      const isCorrect = state.feedback?.correctId === opt.id

      let extra = ""
      if (state.feedback && isSelected && state.feedback.isCorrect) extra = " btn--right"
      if (state.feedback && isSelected && !state.feedback.isCorrect) extra = " btn--wrong"
      if (state.feedback && !isSelected && isCorrect) extra = " btn--right"

      return `
        <button class="${optionClassByIndex(i)}${extra}" data-action="answer" data-option-id="${opt.id}" ${isLocked ? "disabled" : ""}>
          <div class="btn__top">
            <div class="btn__label">${opt.idn}</div>
            <div class="btn__tag" aria-hidden="true">${opt.id}</div>
          </div>
        </button>
      `
    })
    .join("")

  const overlayHtml = state.feedback
    ? `
      <div class="overlay" role="dialog" aria-modal="true">
        <div class="overlay__card">
          <div class="fb">
            <div class="fb__emoji" aria-hidden="true">${state.feedback.isCorrect ? "🎉" : "🌈"}</div>
            <div class="fb__h">${state.feedback.isCorrect ? "Benar!" : "Belum tepat"}</div>
            <div class="fb__p">${state.feedback.isCorrect ? rand(correctMessages) : `${rand(wrongMessages)}<br/>Jawaban yang benar: <b>${state.feedback.correctText}</b>`}</div>
          </div>
          <div class="cta">
            <button class="btn" data-action="next"><span class="btn__label">Lanjut</span></button>
            <button class="small" data-action="restart">Main Ulang</button>
          </div>
        </div>
      </div>
    `
    : ""

  const hintBody = state.hintOpen
    ? `
      <div class="hint__emoji" aria-hidden="true">${q.emoji ?? "✨"}</div>
      <div class="hint__caption">Ini gambar petunjuknya!</div>
    `
    : `
      <div class="hint__locked" aria-hidden="true">🎁</div>
      <div class="hint__caption">Klik “Lihat” kalau kamu butuh bantuan.</div>
    `

  app.innerHTML = `
    <div class="panel">
      <div class="row">
        <div class="pill"><span aria-hidden="true">📌</span> Soal <span class="pill__muted">${index + 1}/${total}</span></div>
        <div class="pill"><span aria-hidden="true">⭐</span> Skor <span class="pill__muted">${state.score}</span></div>
        <button class="small" data-action="restart">Main Ulang</button>
      </div>

      <div class="card">
        <div class="row" style="justify-content:center">
          <div class="pill"><span aria-hidden="true">🎈</span> Level <span class="pill__muted">${state.level}</span></div>
        </div>
      </div>

      <div class="card">
        <div class="word">
          <div class="word__kana">${q.word.kana}</div>
          <div class="word__romaji">${q.word.romaji}</div>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <div class="pill"><span aria-hidden="true">🖼️</span> Petunjuk <span class="pill__muted">gambar</span></div>
          <button class="small" data-action="toggle-hint">${state.hintOpen ? "Sembunyikan" : "Lihat"}</button>
        </div>
        <div class="hint__box">${hintBody}</div>
      </div>

      <div class="card">
        <div class="q">${formatQuestionText(q)}</div>
      </div>

      <div class="answers">${optionsHtml}</div>
    </div>
    ${overlayHtml}
  `
}

function resultMessage(score, maxScore) {
  const ratio = maxScore === 0 ? 0 : score / maxScore
  if (ratio >= 0.9) return "Luar biasa! Kamu seperti ninja kosakata!"
  if (ratio >= 0.7) return "Hebat! Tinggal sedikit lagi jadi jago!"
  if (ratio >= 0.5) return "Bagus! Terus latihan ya!"
  return "Tidak apa-apa. Yang penting tetap semangat belajar!"
}

function renderResult() {
  const maxScore = TOTAL_QUESTIONS * POINTS_PER_CORRECT
  const msg = resultMessage(state.score, maxScore)

  app.innerHTML = `
    <div class="panel">
      <div class="hero">
        <div class="hero__emoji" aria-hidden="true">🏁✨</div>
        <div class="hero__h">Selesai!</div>
        <div class="hero__p">Skor kamu: <b>${state.score}</b> dari <b>${maxScore}</b>
<br/>${msg}</div>
      </div>

      <div class="cta">
        <button class="btn" data-action="start"><span class="btn__label">Main Lagi</span></button>
        <button class="small" data-action="reset">Kembali ke Awal</button>
      </div>
    </div>
  `
}

function render() {
  if (state.screen === "start") {
    renderStart()
    return
  }

  if (state.screen === "quiz") {
    renderQuiz()
    return
  }

  renderResult()
}

function onAnswer(optionId) {
  const q = currentQuestion()
  const correctOpt = q.options.find((o) => o.id === q.correctOptionId)
  const selectedOpt = q.options.find((o) => o.id === optionId)
  const isCorrect = optionId === q.correctOptionId

  if (isCorrect) state.score += POINTS_PER_CORRECT

  state.feedback = {
    isCorrect,
    selectedId: selectedOpt?.id ?? optionId,
    correctId: q.correctOptionId,
    correctText: `${correctOpt?.idn ?? ""}`
  }

  render()
}

function next() {
  state.feedback = null
  state.hintOpen = false

  if (state.questionIndex >= state.sessionQuestions.length - 1) {
    state.screen = "result"
    render()
    return
  }

  state.questionIndex += 1
  render()
}

function toggleHint() {
  state.hintOpen = !state.hintOpen
  render()
}

app.addEventListener("click", (e) => {
  const el = e.target instanceof Element ? e.target.closest("[data-action]") : null
  if (!el) return

  const action = el.getAttribute("data-action")
  if (!action) return

  if (action === "start") {
    startGame()
    return
  }

  if (action === "reset") {
    resetGame()
    return
  }

  if (action === "restart") {
    startGame()
    return
  }

  if (action === "toggle-hint") {
    if (state.feedback) return
    toggleHint()
    return
  }

  if (action === "answer") {
    if (state.feedback) return
    const optionId = el.getAttribute("data-option-id")
    if (!optionId) return
    onAnswer(optionId)
    return
  }

  if (action === "next") {
    next()
  }
})

render()
