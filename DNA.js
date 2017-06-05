function newColor(own, target) {
  var gen = {
    r: floor(random(0, 255)),
    g: floor(random(0, 255)),
    b: floor(random(0, 255))
  };
  if (own && target) {
    gen.r = closeMutation(own.r, target.r),
    gen.g = closeMutation(own.g, target.g),
    gen.b = closeMutation(own.b, target.b)
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
    this.genes[i] = newColor();
  }

  this.calcFitness = function (target) {
    var score = 0;
    for (var i = 0; i < this.genes.length; i++) {
      score += 100 - floor((abs(this.genes[i].r - target[i].r)/255)*100);
      score += 100 - floor((abs(this.genes[i].g - target[i].g)/255)*100);
      score += 100 - floor((abs(this.genes[i].b - target[i].b)/255)*100);
    }
    this.fitness = score / (3 * this.genes.length);
  }

  this.crossover = function(partner) {
    var child = new DNA(this.genes.length);
    var midpoint = floor(random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  this.mutate = function(mutationRate, target) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        // this.genes[i] = newColor(this.genes[i]);
        this.genes[i] = newColor(this.genes[i], target[i]);
      }
    }
  }
}
