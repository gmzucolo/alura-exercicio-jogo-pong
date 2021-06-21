//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let raqueteComprimentoOponente = 10;
let raqueteAlturaOponente = 90;
let velocidadeYOponente;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 26;
let raio = diametro/2;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;    

//variável de colisão
let colisao = false;  

//placar do jogo
let meusPontos = 0;
let oponentePontos = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//erro do oponente
let chanceDeErrar = 0;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraRaquete(xRaquete, yRaquete);  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete(); 
  movimentaRaqueteOponente();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  //verificaColisaoRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraPlacar();
  marcaPonto();
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);  
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimentoOponente/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);  
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1; 
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;   
  }
}

/*

function verificaColisaoRaquete() {
  if(xBolinha - raio < xRaquete + raqueteComprimento
    && yBolinha - raio < yRaquete + raqueteAltura
    && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

*/

function verificaColisaoRaqueteBiblioteca(x, y) {
  colisao = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, 
  raio);
  if(colisao) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function mostraPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26); 
  fill(color(255, 140, 0));;
  rect(430, 10, 40, 20);
  fill(255);
  text(oponentePontos, 450, 26);
}

function marcaPonto() {
  if(xBolinha > 585) {
    meusPontos += 1;  
    ponto.play();
  }
  if(xBolinha < 15){
    oponentePontos += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
