var target;
var popmax;
var mutationRate;
var population;

var grid_length = 25;
const DIST_ = 1;
var bestfitness = 0;


var freq = 3;
var simmetry = 0.5;

var FUCKING_BEST;

function setup() {
  target = [];
  for (var i = 0; i < grid_length; i++) {
    target[i] = [];
  }

  var color_r = inicializarColor(grid_length, random(3));
  var color_g = inicializarColor(grid_length, random(3));
  var color_b = inicializarColor(grid_length, random(3));

  for (var i = 0; i < target.length; i++) {
    for (var j = 0; j < grid_length; j++) {

      var color = {
        r: color_r[i][j],
        g: color_g[i][j],
        b: color_b[i][j]
      };

      target[i].push(color);
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
  if (population.generations%100 === 0) {
    FUCKING_BEST = population.best;
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

function inicializarColor(length, freq, seed) {
 seed ? noiseSeed(seed) : null;
 var color_return = [];

 for (var i = 0; i < length; i++) {
   color_return[i] = [];
 }

 for (var j = 0; j < color_return.length; j++) {
   for (var k = 0; k < length; k++) {
     var val_color = floor(noise(freq * (j/length), freq * (k/length)) * 256);
     color_return[j].push(val_color);
   }
 }
 return color_return;
}
