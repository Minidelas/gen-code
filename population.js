function population(p, m, num) {
  this.population;
  this.matingPool;
  this.generations = 0;
  this.finished = false;
  this.target = p;
  this.mutationRate = m;
  this.avgFitness = 0;
  this.prob = 0;

  this.best;

  this.population = [];
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  this.matingPool = [];

  this.calcFitness = function () {
    this.best = null;
    var sum = 0;
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
      sum += this.population[i].fitness;
      if (this.best && this.population[i].fitness > this.best.fitness){
        this.best = this.population[i];
      } else if (!this.best){
        this.best = this.population[i];
      }
    }

    for (var j = 0; j < this.population.length; j++) {
      this.population[j].prob = this.population[j].fitness / sum;
    }

    this.avgFitness = sum / this.population.length;
  }
  this.calcFitness();

  // this.naturalSelection = function () {
  //   this.matingPool = [];
  //
  //   var maxFitness = 0;
  //   for (var i = 0; i < this.population.length; i++) {
  //     if (this.population[i].fitness > maxFitness) {
  //       maxFitness = this.population[i].fitness;
  //     }
  //   }
  //
  //   for (var i = 0; i < this.population.length; i++) {
  //     var fitness = map(this.population[i].fitness, 0, maxFitness, 0 ,1);
  //     var n = floor(fitness * 100);
  //     for (var j = 0; j < n; j++) {
  //       this.matingPool.push(this.population[i]);
  //     }
  //   }
  // }

  this.generate = function() {
    var auxPopulation = [];
    for (var i = 0; i < this.population.length; i++) {
      // var a = floor(random(this.matingPool.length));
      // var b = floor(random(this.matingPool.length));
      // var partnerA = this.matingPool[a];
      // var partnerB = this.matingPool[b];
      var partnerA = this.pickOne();
      var partnerB = this.pickOne();
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate, this.target);
      // this.population[i] = child;
      auxPopulation.push(child);
    }
    this.population = auxPopulation;
    this.generations++;
  }

  this.pickOne = function () {
    var index = 0;
    var prob = random(1);
    while (prob > 0) {
      prob = prob - this.population[index].prob;
      index++;
    }

    index--;
    return this.population[index];
  }

  this.evaluate = function() {
    for (var i = 0; i < this.population.length; i++) {
      var cont = 0;
      for (var j = 0; j < this.target.length; j++) {
        if (this.population[i].genes[j] === this.target[j]) {
          cont++;
        }
      }
      if (cont === this.target.length) {
        this.finished = true;
      }
    }
  }

  this.isFinished = function() {
    return this.finished;
  }

  this.dibujar = function () {
    for (var i = 0; i < this.population.length; i++) {
      var aux = this.population[i].genes.join("");
      textSize(30);
      text(aux, 400, 30*(i+1));
      fill(0,102,153);
    }
  }
}
