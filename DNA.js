function newChar() {
  var gen = floor(random(63,122));
  if (gen === 63) gen = 32;
  if (gen === 64) gen = 46;
  return String.fromCharCode(gen);
}


function DNA(num) {
  this.genes = [];
  this.fitness = 0;
  for (var i = 0; i < num; i++) {
    this.genes[i] = newChar();
  }

  this.calcFitness = function (target) {
    var score = 0;
    for (var i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;
      }
    }
    this.fitness = score / this.genes.length;
    this.fitness = pow(this.fitness, 2);
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
        this.genes[i] = newChar();
      }
    }
  }
}
