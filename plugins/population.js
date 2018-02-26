import DNA from './dna.js'

class Population extends DNA {
  constructor (p, m, num) {
    super()
    this.generations = 0
    this.target = p
    this.mutationRate = parseFloat(m)
    this.population = []
    this.finished = false
    this.perfectScore = 1
    this.best = []
    this.num = parseInt(num)

    for (var i = 0; i < this.num; i++) {
      this.population[i] = new DNA(this.target.length)
    }

    this.calcFitness()
  }

  calcFitness () {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target)
    }
  }

  // naturalSelection () {
  //   this.matingPool = []

  //   let maxFitness = 0
  //   for (let i = 0; i < this.population.length; i++) {
  //     if (this.population[i].fitness > maxFitness) {
  //       maxFitness = this.population[i].fitness
  //     }
  //   }

  //   for (let i = 0; i < this.population.length; i++) {
  //     let fitness = map(this.population[i].fitness,0,maxFitness,0,1)
  //     let n = floor(fitness * 100)
  //     for (let j = 0; j < n; j++) {
  //       this.matingPool.push(this.population[i])
  //     }
  //   }
  // }

  generate () {
    let maxFitness = 0
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness
      }
    }

    // Refill the population with children from the mating pool
    let newPopulation = []
    for (let i = 0; i < this.population.length; i++) {
      let partnerA = this.acceptReject(maxFitness)
      let partnerB = this.acceptReject(maxFitness)
      let child = partnerA.crossover(partnerB)
      child.mutate(this.mutationRate)
      newPopulation[i] = child
    }
    this.population = newPopulation
    this.generations++
  }

  evaluate () {
    let worldrecord = 0.0
    let index = 0
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i
        worldrecord = this.population[i].fitness
      }
    }

    this.best[0] = this.population[index].getPhrase()
    this.best[1] = (worldrecord * 100).toFixed(0)
    if (worldrecord >= this.perfectScore) {
      this.finished = true
    }
  }

  acceptReject (maxFitness) {
    let besafe = 0
    while (true) {
      let index = Math.floor(Math.random() * this.population.length)
      let partner = this.population[index]
      let r = Math.random() * maxFitness
      if (r < partner.fitness) {
        return partner
      }
      besafe++
      if (besafe > 10000) {
        return null
      }
    }
  }

  getBest () {
    return this.best
  }

  terminate () {
    return this.finished
  }

  getGenerations () {
    return this.generations
  }

  getAverageFitness () {
    let total = 0
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness
    }
    return (total / (this.population.length) * 100).toFixed(0)
  }

  getWorst () {
    let min = 9999
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness < min) {
        min = this.population[i].fitness
      }
    }
    return (min * 100).toFixed(0)
  }

  getPopulation () {
    let res = []
    for (let i = 0; i < this.population.length; i++) {
      res.push({
        genes: this.population[i].getPhrase(),
        fitness: this.population[i].fitness
      })
    }
    return res
  }
}

export default Population
