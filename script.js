//Criação de variaveis
const html = document.querySelector("html");

//Botton
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const startAndPauseBt = document.querySelector("#start-pause span");
const imgStartandPauseBt = document.querySelector(
  ".app__card-primary-butto-icon"
);
const timerTela = document.querySelector("#timer");
const img = document.querySelector(".app__image");
const text = document.querySelector(".app__title");

//Music
const musicaFocoInput = document.querySelector("#alternar-musica");
const musicaFundo = new Audio("/sons/luna-rise-part-one.mp3");
musicaFundo.loop = true;
const musicaPlay = new Audio("/sons/play.wav");
const musicPause = new Audio("/sons/pause.mp3");
const musicZero = new Audio("/sons/beep.mp3");

let tempoPercorido = 1500;
let intervaloID = null;

////////////////////

//Ativar a musica de fundo quando o botão é ativado
musicaFocoInput.addEventListener("change", () => {
  //Se a musica estiver pausada
  if (musicaFundo.paused) {
    musicaFundo.play();
  } else {
    musicaFundo.pause();
  }
});

//Ao clicar no "Foco" realiza uma serie de eventos
focoBt.addEventListener("click", () => {
  tempoPercorido = 1500; //Altera o tempo do cronometro
  alterarContexto("foco"); //Chama a função para realizar a alteração do texxto
  focoBt.classList.add("active"); //Coloca a classe para destacar a opção
});

curtoBt.addEventListener("click", () => {
  tempoPercorido = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoPercorido = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

/*Função criada para alterar os elemtentos, como
  Alterar o tempo de acordo com o botão
  Remover a classe active dos botões
  Alterar a classe "Data contexto".
  Alterar a imagem de acordo com o botão.

  Switch para alterar os textos de cada tela
*/
function alterarContexto(contexto) {
  mostratTempo();
  botoes.forEach(function (contexto) {
    //Percorrer pelos arrays dos botões e removendo a classe "active"
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  img.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      text.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;

      break;
    case "descanso-curto":
      text.innerHTML = `Que tal dar uma respirada? <br />
      <strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      text.innerHTML = `Hora de voltar à superfície. <br />
      <strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}
//////////////////////////////////////

//Criação do cronometo
const contagemRegressiva = () => {
  if (tempoPercorido <= 0) {
    musicZero.play();
    alert("Tempo zerado");
    zerar();
    return;
  }
  tempoPercorido -= 1;
  mostratTempo();
};

//Ao clicar no botão, puxa a função
startAndPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  //Pusar ao clicar no botão novamente, zera o intervalo de deixa pausado o tempo
  if (intervaloID) {
    zerar();
    musicPause.play();
    return;
  }

  //Iniciar a contagem com intervalo de 1s na contagem de -1
  intervaloID = setInterval(contagemRegressiva, 1000);
  musicaPlay.play();
  startAndPauseBt.textContent = "Pause";
  imgStartandPauseBt.setAttribute("src", "./imagens/pause.png");
}

//Zerar o intervalo e deixar pausado o tempo.
function zerar() {
  clearInterval(intervaloID);
  startAndPauseBt.textContent = "Começar";
  imgStartandPauseBt.setAttribute("src", "./imagens/play_arrow.png");
  intervaloID = null;
}

////////////////////

function mostratTempo() {
  const tempo = new Date(tempoPercorido * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timerTela.innerHTML = `${tempoFormatado}`;
}

//Função chamado para mostrar o tempo todo o tempo
mostratTempo();
