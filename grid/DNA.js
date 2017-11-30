function newColor(own, target) {
  var gen = {
    r: floor(random(0, 255)),
    g: floor(random(0, 255)),
    b: floor(random(0, 255))
  };
  if (own && target) {
    gen.r = closeMutation(own.r, target.r);
    gen.g = closeMutation(own.g, target.g);
    gen.b = closeMutation(own.b, target.b);
  }
  return gen;
}

function closeMutation(own, target) {
  if (own > target) {
    return floor(random(0, own));
  } else if (own < target) {
    return floor(random(own, 255));
  } else {
    return own;
  }
}

function DNA(num) {
  this.genes = [];
  this.fitness = 0;
  for (var i = 0; i < num; i++) {
    this.genes[i] = [];
    for (var j = 0; j < num; j++) {
      this.genes[i][j] = newColor();
    }
  }

  this.calcFitness = function (target) {
    var score = 0;
    for (var i = 0; i < this.genes.length; i++) {
      for (var j = 0; j < this.genes[i].length; j++) {
        score += 100 - floor((abs(this.genes[i][j].r - target[i][j].r)/255)*100);
        score += 100 - floor((abs(this.genes[i][j].g - target[i][j].g)/255)*100);
        score += 100 - floor((abs(this.genes[i][j].b - target[i][j].b)/255)*100);
      }
    }
    this.fitness = score / (3 * this.genes.length);
    // this.fitness = pow(this.fitness, 2);
  }

  this.crossover = function(partner) {
    var child = new DNA(this.genes.length);
    for (var i = 0; i < this.genes.length; i++) {
      var midpoint_j = floor(random(this.genes[i].length));
      for (var j = 0; j < this.genes[i].length; j++) {
        if (j > midpoint_j) child.genes[i][j] = this.genes[i][j];
        else child.genes[i][j] = partner.genes[i][j];
      }
    }
    return child;
  }

  this.mutate = function(mutationRate, target) {
    for (var i = 0; i < this.genes.length; i++) {
      for (var j = 0; j < this.genes[i].length; j++) {
        if (random(1) < mutationRate) {
          this.genes[i][j] = newColor(this.genes[i][j], target[i][j]);
        }
      }
    }
  }
}
