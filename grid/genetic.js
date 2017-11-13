var target;
var popmax;
var mutationRate;
var population;

var grid_length = 25;
const DIST_ = 1;
var bestfitness = 0;

var time = 0;

var FUCKING_BEST;

const noise = new Noise();

function setup() {
  noise.seed(random());
  target = [];
  for (var i = 0; i < grid_length; i++) {
    target[i] = [];
  }

  for (var i = 0; i < target.length; i++) {
    for (var j = 0; j < grid_length; j++) {
      target[i].push({
        r: floor(abs(noise.simplex2(i / 100, j / 100)) * 255),
        g: floor(abs(noise.simplex2(i / 100, j / 100)) * 255),
        b: floor(abs(noise.simplex2(i / 100, j / 100)) * 255)
      });
    }
  }

  popmax = 100;
  mutationRate = 0.05;

  population = new population(target, mutationRate, popmax);

  createCanvas(1800, 1800);
}

function draw() {
  // frameRate(15);
  pintarTarget();

  if (FUCKING_BEST) {
    pintar(FUCKING_BEST);
  }

  population.calcFitness();
  population.naturalSelection();
  population.generate();
  population.evaluate();
  // population.dibujar();
  FUCKING_BEST = population.best;
  if (population.generations%100 === 0) {
    // console.log(population.getBestFitness());
    bestfitness = population.getBestFitness() > bestfitness ? population.getBestFitness() : bestfitness;
    // console.log("ACTUAL-> ",bestfitness);
    console.log("MEJOR-> ",bestfitness);
    // console.log(population.generations);
  }

  if (population.isFinished()){
    // population.dibujar();
    pintar(FUCKING_BEST);
    console.log(population.generations);
    console.log('finish');
    noLoop();
  }
}

function pintarTarget() {
  for (var i = 0; i < target.length; i++) {
    for (var j = 0; j < target[i].length; j++) {
      var dist = DIST_;
      var c = color(
        target[i][j].r,
        target[i][j].g,
        target[i][j].b
      );
      fill(c);  // Use color variable 'c' as fill color
      noStroke();  // Don't draw a stroke around shapes
      rect((dist)*i, (dist)*j, dist, dist);
    }
  }
}

function pintar(best) {
  for (var i = 0; i < best.length; i++) {
    for (var j = 0; j < best[i].length; j++) {
      var dist = DIST_;
      var c = color(
        best[i][j].r,
        best[i][j].g,
        best[i][j].b
      );
      fill(c);  // Use color variable 'c' as fill color
      noStroke();  // Don't draw a stroke around shapes
      rect((dist)*i + (grid_length * dist), (dist)*j, dist, dist);
    }
  }
}
