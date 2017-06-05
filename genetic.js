var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup() {
  target = [];
  for (var i = 0; i < 10; i++) {
    target.push({
      r: floor(random(0, 255)),
      g: floor(random(0, 255)),
      b: floor(random(0, 255))
    });
  }
  popmax = 500;
  mutationRate = 0.01;

  population = new population(target, mutationRate, popmax);
  createCanvas(1800, 1800);


}

function draw() {
  pintarTarget();
  pintar(population.best);
  population.calcFitness();
  population.naturalSelection();
  population.generate();
  population.evaluate();
  if (population.generations%500 === 0) {
    console.log(population.generations);
  }

  if (population.isFinished()){
    population.dibujar();
    console.log(population.generations);
    console.log('finish');
    noLoop();
  }
}

function pintarTarget() {
  for (var i = 0; i < target.length; i++) {
    var dist = 5;
    var c = color(
      target[i].r,
      target[i].g,
      target[i].b
    );
    fill(c);  // Use color variable 'c' as fill color
    noStroke();  // Don't draw a stroke around shapes
    rect(400, 400+(10+dist)*i, dist+20, dist+10);
  }
}

function pintar(best) {
  for (var i = 0; i < best.length; i++) {
    var dist = 5;
    var c = color(
      best[i].r,
      best[i].g,
      best[i].b
    );
    fill(c);  // Use color variable 'c' as fill color
    noStroke();  // Don't draw a stroke around shapes
    rect(375, 400+(10+dist)*i, dist+20, dist+10);
  }
}
