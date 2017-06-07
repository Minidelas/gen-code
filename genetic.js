var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
  target = 'To be or not to be';
  popmax = 50;
  mutationRate = 0.01;

  population = new population(target, mutationRate, popmax);
  population.calcFitness();
  createCanvas(1800, 1800);
  background(255);
}

function draw() {
  frameRate(15);
  // population.naturalSelection();
  population.generate();
  population.evaluate();
  population.calcFitness();
  background(255);
  pintarTarget();
  pintar(population.best);
  population.dibujar();

  if (population.generations%500 === 0) {
    console.log(population.population);
    console.log(population.generations);
  }

  if (population.isFinished()){
    console.log(population.generations);
    console.log('finish');
    noLoop();
  }
}

function pintarTarget() {
  textSize(30);
  text(target, 10, 30);
  fill(0,102,153);
}

function pintar(best) {
  var aux = best.genes.join("");
  textSize(30);
  text(aux, 10, 60);
  text(sqrt(population.avgFitness), 10, 90);
  fill(0,102,153);
}
