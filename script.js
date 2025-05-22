const perguntas = [
  {
    imagem: "img/metano.png",
    correta: "Metano",
    opcoes: ["Metano", "Etano", "Benzeno", "Etanol"],
    explicacao: "Metano: CH₄, o hidrocarboneto mais simples."
  },
  {
    imagem: "img/acido acético.png",
    correta: "Ácido acético",
    opcoes: ["Etanol", "Metano", "Ácido acético", "Acetona"],
    explicacao: "Ácido acético: principal componente do vinagre."
  },
  {
    imagem: "img/benzeno.PNG",
    correta: "Benzeno",
    opcoes: ["Benzeno", "Acetona", "Cicloexano", "Fenol"],
    explicacao: "Benzeno: composto aromático com anel hexagonal."
  },
  {
    imagem: "img/etanol.png",
    correta: "Etanol",
    opcoes: ["Etanol", "Metano", "Butano", "Propeno"],
    explicacao: "Etanol: álcool encontrado em bebidas alcoólicas."
  },
  {
    imagem: "img/acetona.png",
    correta: "Acetona",
    opcoes: ["Ácido acético", "Acetona", "Metanol", "Glicerina"],
    explicacao: "Acetona: solvente comum usado em removedores de esmalte."
  },
  {
    imagem: "img/propeno.png",
    correta: "Propeno",
    opcoes: ["Benzeno", "Propeno", "Xileno", "Fenol"],
    explicacao: "Propeno: Usado na produção de plásticos como o polipropileno"
  }
];

let indice = 0;
let score = 0;
let tempo = 15;
let timerInterval;

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const moleculeImg = document.getElementById("molecule-img");
const optionsDiv = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startGame);

function startGame() {
  indice = 0;
  score = 0;
  tempo = 15;
  moleculeImg.style.display = "block"; // Mostra a imagem de novo
  scoreEl.textContent = score;
  feedbackEl.textContent = "";
  startBtn.style.display = "none";
  carregarPergunta();
  iniciarTimer();
}


function carregarPergunta() {
  if (indice >= perguntas.length) {
    fimDeJogo();
    return;
  }

  tempo = 15;
  timerEl.textContent = tempo;
  feedbackEl.textContent = "";
  document.getElementById("explanation").textContent = ""; // limpa explicação
  moleculeImg.src = perguntas[indice].imagem;

  optionsDiv.innerHTML = "";
  perguntas[indice].opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => verificarResposta(opcao);
    optionsDiv.appendChild(btn);
  });
}

function verificarResposta(resposta) {
  clearInterval(timerInterval);

  const perguntaAtual = perguntas[indice];
  const correta = perguntaAtual.correta;

  if (resposta === correta) {
    score += 10;
    feedbackEl.textContent = "✅ Correto!";
    feedbackEl.style.color = "#4CAF50";
  } else {
    feedbackEl.textContent = `❌ Errado! Resposta correta: ${correta}`;
    feedbackEl.style.color = "#F44336";
  }

  // ➕ Mostrar a explicação da molécula
  const explanationEl = document.getElementById("explanation");
  explanationEl.textContent = perguntaAtual.explicacao;
  explanationEl.style.display = "block";

  scoreEl.textContent = score;

  indice++;
  setTimeout(() => {
    if (indice < perguntas.length) {
      carregarPergunta();
      iniciarTimer();
    } else {
      fimDeJogo();
    }
  }, 2500); // aumenta um pouco o tempo para dar tempo de ler
}


function iniciarTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    tempo--;
    timerEl.textContent = tempo;
    if (tempo <= 0) {
      clearInterval(timerInterval);
      feedbackEl.textContent = `⏰ Tempo esgotado!`;
      feedbackEl.style.color = "#FF9800";
      indice++;
      setTimeout(() => {
        if (indice < perguntas.length) {
          carregarPergunta();
          iniciarTimer();
        } else {
          fimDeJogo();
        }
      }, 2000);
    }
  }, 1000);
}

function fimDeJogo() {
  clearInterval(timerInterval);
  moleculeImg.style.display = "none"; // Esconde a imagem
  optionsDiv.innerHTML = "";
  document.getElementById("explanation").textContent = ""; // Limpa explicação no fim do jogo

  if (score >= 50) {
    feedbackEl.innerHTML = `🏆 <strong>Parabéns!</strong> Você mandou muito bem!<br>Sua pontuação final: <strong>${score}</strong>`;
    feedbackEl.style.color = "#4CAF50";
  } else {
    feedbackEl.innerHTML = `😢 <strong>Que pena!</strong> Você fez <strong>${score}</strong> pontos.<br>Tente novamente!`;
    feedbackEl.style.color = "#F44336";
  }

  startBtn.textContent = "Jogar Novamente";
  startBtn.style.display = "inline-block";
}

