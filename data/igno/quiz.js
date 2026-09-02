// Gapminder Kviz – logika

let questions = [];
let current = 0;
let score = 0;
let answered = false;
let userAnswers = [];

const STATS_KEY = 'gapminder_kviz_stats';

function loadQuestions() {
  if (typeof window.QUESTIONS === 'undefined' || !Array.isArray(window.QUESTIONS)) {
    alert('Greška: questions.js nije učitan. Provjerite da su sve datoteke u istoj mapi.');
    return false;
  }
  questions = window.QUESTIONS;
  return true;
}

function getStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    totalAttempts: 0,
    totalCorrect: 0,
    perQuestion: questions.map(() => ({ correct: 0, total: 0 }))
  };
}

function saveStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function startQuiz() {
  if (questions.length === 0) {
    const ok = loadQuestions();
    if (!ok) return;
  }

  current = 0;
  score = 0;
  answered = false;
  userAnswers = [];
  document.getElementById('start-screen').classList.remove('active');
  document.getElementById('result-screen').classList.remove('active');
  document.getElementById('quiz-screen').classList.add('active');
  document.getElementById('stats-section').classList.remove('visible');
  document.getElementById('toggle-stats-btn').textContent = 'Prikaži statistiku';
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById('q-number').textContent = `Pitanje ${current + 1}`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('progress-text').textContent = `Pitanje ${current + 1} od ${questions.length}`;
  document.getElementById('score-live').textContent = `Bodovi: ${score}`;
  document.getElementById('progress-fill').style.width = `${(current / questions.length) * 100}%`;

  // Image handling
  const imgContainer = document.getElementById('q-image-container');
  imgContainer.innerHTML = '';
  if (q.image) {
    const img = document.createElement('img');
    img.src = q.image;
    img.alt = "Karte rasporeda stanovništva";
    img.className = 'question-image';
    imgContainer.appendChild(img);
  }

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span>${opt}</span>
    `;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });

  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').disabled = true;
  document.getElementById('next-btn').textContent = current === questions.length - 1 ? 'Pogledaj rezultat' : 'Sljedeće pitanje';
  answered = false;
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const options = document.querySelectorAll('.option');
  const feedback = document.getElementById('feedback');

  userAnswers[current] = index;

  options.forEach((opt, i) => {
    opt.classList.add('disabled');
    if (i === q.correct) {
      opt.classList.add('correct');
    } else if (i === index) {
      opt.classList.add('incorrect');
    }
  });

  if (index === q.correct) {
    score++;
    feedback.textContent = '✓ Točno!';
    feedback.className = 'feedback show correct';
  } else {
    feedback.textContent = `✗ Netočno. Točan odgovor je ${String.fromCharCode(65 + q.correct)}.`;
    feedback.className = 'feedback show incorrect';
  }

  document.getElementById('score-live').textContent = `Bodovi: ${score}`;
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-screen').classList.remove('active');
  document.getElementById('result-screen').classList.add('active');
  document.getElementById('final-score').textContent = score;

  const pct = Math.round((score / questions.length) * 100);
  let msg = '';
  let detail = '';

  if (score >= 11) {
    msg = 'Izvrsno! 🎉';
    detail = 'Imate vrlo dobar uvid u globalne trendove. Većina ljudi postiže znatno slabiji rezultat.';
  } else if (score >= 8) {
    msg = 'Dobro! 👍';
    detail = 'Solidan rezultat. Još uvijek bolji od prosjeka u većini zemalja.';
  } else if (score >= 5) {
    msg = 'Prosječno.';
    detail = 'Mnogi ljudi imaju slične zablude o svijetu. Vrijedi pročitati više o Gapminderu i Factfulnessu.';
  } else {
    msg = 'Ima prostora za napredak.';
    detail = 'Ovi rezultati su uobičajeni – većina ljudi ima slične zablude. To je upravo ono što Gapminder želi ispraviti!';
  }

  document.getElementById('result-message').textContent = msg;
  document.getElementById('result-detail').textContent = `Ostvarili ste ${score} od ${questions.length} bodova (${pct}%). ${detail}`;
  document.getElementById('progress-fill').style.width = '100%';

  // Build review list
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  questions.forEach((q, i) => {
    const selected = userAnswers[i];
    const isCorrect = selected === q.correct;
    const li = document.createElement('li');
    li.className = 'review-item ' + (isCorrect ? 'correct' : 'incorrect');

    let answerInfo = '';
    if (isCorrect) {
      answerInfo = `Vaš odgovor: ${String.fromCharCode(65 + selected)} – ${q.options[selected]}`;
    } else {
      const yourAns = selected !== undefined && selected >= 0
        ? `${String.fromCharCode(65 + selected)} – ${q.options[selected]}`
        : 'niste odgovorili';
      answerInfo = `Vaš odgovor: ${yourAns}<br>Točan odgovor: ${String.fromCharCode(65 + q.correct)} – ${q.options[q.correct]}`;
    }

    let shortQ = q.q;
    if (shortQ.length > 90) shortQ = shortQ.substring(0, 87) + '…';

    li.innerHTML = `
      <span class="status">${isCorrect ? '✓' : '✗'}</span>
      <span class="q-short"><strong>${i + 1}.</strong> ${shortQ}</span>
      <span class="answer-info">${answerInfo}</span>
    `;
    reviewList.appendChild(li);
  });

  updateSharedStats();
  renderStats();
}

function updateSharedStats() {
  const stats = getStats();
  stats.totalAttempts += 1;
  stats.totalCorrect += score;
  userAnswers.forEach((selected, i) => {
    if (!stats.perQuestion[i]) {
      stats.perQuestion[i] = { correct: 0, total: 0 };
    }
    stats.perQuestion[i].total += 1;
    if (selected === questions[i].correct) {
      stats.perQuestion[i].correct += 1;
    }
  });
  saveStats(stats);
}

function renderStats() {
  const stats = getStats();
  const summary = document.getElementById('stats-summary');
  const list = document.getElementById('stats-list');

  if (stats.totalAttempts === 0) {
    summary.innerHTML = 'Još nema spremljenih rezultata.';
    list.innerHTML = '';
    return;
  }

  const avgScore = (stats.totalCorrect / stats.totalAttempts).toFixed(1);
  const avgPct = Math.round((stats.totalCorrect / (stats.totalAttempts * questions.length)) * 100);

  summary.innerHTML = `
    <strong>Ukupno ispitanika:</strong> ${stats.totalAttempts}<br>
    <strong>Prosječan rezultat:</strong> ${avgScore} / ${questions.length} (${avgPct}%)
  `;

  list.innerHTML = '';
  questions.forEach((q, i) => {
    const pq = stats.perQuestion[i] || { correct: 0, total: 0 };
    const pct = pq.total > 0 ? Math.round((pq.correct / pq.total) * 100) : 0;
    let shortQ = q.q;
    if (shortQ.length > 70) shortQ = shortQ.substring(0, 67) + '…';

    const li = document.createElement('li');
    li.className = 'stats-item';
    li.innerHTML = `
      <strong>${i + 1}.</strong> ${shortQ}<br>
      Točno: ${pq.correct} / ${pq.total} (${pct}%)
      <div class="stats-bar"><div class="stats-bar-fill" style="width:${pct}%"></div></div>
    `;
    list.appendChild(li);
  });
}

function toggleStats() {
  const section = document.getElementById('stats-section');
  const btn = document.getElementById('toggle-stats-btn');
  if (section.classList.contains('visible')) {
    section.classList.remove('visible');
    btn.textContent = 'Prikaži statistiku';
  } else {
    renderStats();
    section.classList.add('visible');
    btn.textContent = 'Sakrij statistiku';
  }
}

function clearStats() {
  if (confirm('Jeste li sigurni da želite obrisati svu zajedničku statistiku?')) {
    localStorage.removeItem(STATS_KEY);
    renderStats();
    alert('Statistika je obrisana.');
  }
}

function restartQuiz() {
  startQuiz();
}

// Preload questions when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();
});

