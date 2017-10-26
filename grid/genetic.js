var target;
var popmax;
var mutationRate;
var population;

var grid_length = 100;

var time = 0;

var FUCKING_BEST;

const noise = new Noise();

// function setup() {
//   noise.seed(random());
// }
//
// function draw() {
//   frameRate(10);
//   console.log("A = ", a );
//   console.log("B = ", b );
//   a++;
//   b++;
//   a = a > 100 ? 0 : a;
//   b = b > 100 ? 0 : b;
//   console.log( floor( abs( noise.simplex3(a/100, b/100, time) ) * 255) );
//   time++;
//   console.log( floor( abs( noise.simplex3(a/100, b/100, time) ) * 255) );
//   time++;
//   console.log( floor( abs( noise.simplex3(a/100, b/100, time) ) * 255) );
//   time++;
// }

function setup() {
  noise.seed(random());
  target = [];
  for (var i = 0; i < grid_length; i++) {
    target[i] = [];
  }

  for (var i = 0; i < target.length; i++) {
    for (var j = 0; j < grid_length; j++) {
      var color = {
        r: null,
        g: null,
        b: null
      }
      color.r = floor(abs(noise.perlin3(i / 100, j / 100, time)) * 255);
      time++;
      color.g = floor(abs(noise.perlin3(i / 100, j / 100, time)) * 255);
      time++;
      color.b = floor(abs(noise.perlin3(i / 100, j / 100, time)) * 255);
      time++;
      // target[i].push({
      //   r: floor(abs(noise.simplex2(i / 100, j / 100)) * 255),
      //   g: floor(abs(noise.simplex2(i / 100, j / 100)) * 255),
      //   b: floor(abs(noise.simplex2(i / 100, j / 100)) * 255)
      // });
      target[i].push(color);
    }
  }

  popmax = 50;
  mutationRate = 0.01;

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
  if (population.generations%10 === 0) {
    FUCKING_BEST = population.best;
    console.log(population.generations);
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
      var dist = 3;
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
      var dist = 3;
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
