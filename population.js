function population(p, m, num) {
  var muestreo = 50;
  this.population;
  this.matingPool;
  this.generations = 0;
  this.finished = false;
  this.target = p;
  this.mutationRate = m;

  this.best;
  this.arrBest;
  this.arrBest = [];

  this.population = [];
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  this.matingPool = [];

  this.calcFitness = function () {
    this.best = null;
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
      if (this.best && this.population[i].fitness > this.best.fitness){
        this.best = this.population[i];
      } else if (!this.best){
        this.best = this.population[i];
      }
    }
    if (this.arrBest.length > muestreo) {
      this.arrBest.shift();
    }
    this.arrBest.push(this.best);
  }
  this.calcFitness();

  this.naturalSelection = function () {
    this.matingPool = [];

    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
        this.best = this.population[i].genes;
      }
    }

    for (var i = 0; i < this.population.length; i++) {
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0 ,1);
      var n = floor(fitness * 100);
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  this.generate = function() {
    for (var i = 0; i < this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate, this.target);
      this.population[i] = child;
    }
    this.generations++;
  }

  this.evaluate = function() {
    for (var i = 0; i < this.population.length; i++) {
      var cont = 0;
      for (var j = 0; j < this.target.length; j++) {
        if (
          this.population[i].genes[j].r === this.target[j].r &&
          this.population[i].genes[j].g === this.target[j].g &&
          this.population[i].genes[j].b === this.target[j].b
        ) {
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
    // for (var i = 0; i < this.population.length; i++) {
    //   for (var j = 0; j < this.population[i].genes.length; j++) {
    //     var dist = 2;
    //     var c = color(
    //       this.population[i].genes[j].r,
    //       this.population[i].genes[j].g,
    //       this.population[i].genes[j].b
    //     );
    //     fill(c);  // Use color variable 'c' as fill color
    //     noStroke();  // Don't draw a stroke around shapes
    //     rect(dist*i, dist*j, dist, dist);
    //   }
    //
    // }
    var aux = 0;
    if (this.arrBest.length >= muestreo) {
      aux = this.arrBest.length - muestreo;
    }

    for (var i = aux; i < this.arrBest.length; i++) {
      for (var j = 0; j < this.arrBest[i].genes.length; j++) {
        var dist = 5;
        var c = color(
          this.arrBest[i].genes[j].r,
          this.arrBest[i].genes[j].g,
          this.arrBest[i].genes[j].b
        );
        fill(c);  // Use color variable 'c' as fill color
        noStroke();  // Don't draw a stroke around shapes
        rect(dist*(i-aux), dist*j, dist, dist);
      }

    }
  }
}
