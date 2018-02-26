import DNA from './dna.js'

class Population extends DNA {
  constructor (target, pc, pm, size) {
    super()
    this.generations = 0
    this.target = target
    this.crossRate = parseFloat(pc)
    this.mutationRate = parseFloat(pm)
    this.population = []
    this.finished = false
    this.perfectScore = 1
    this.best = []
    this.size = parseInt(size)

    for (let i = 0; i < this.size; i++) {
      this.population[i] = new DNA(this.target.length)
    }

    this.calcFitness()
  }

  calcFitness () {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target)
    }
  }

  selection () {
    let total = this.population.reduce((sum, num) => {
      return sum + num.fitness
    }, 0)

    this.population.sort((a, b) => {
      return a.fitness - b.fitness
    })

    // Probability
    let prob = []
    for (let i = 0; i < this.population.length; i++) {
      prob[i] = this.population[i].fitness / total
    }

    // cumulative probability
    let cumu = []
    let temp = 0
    for (let i = 0; i < prob.length; i++) {
      cumu[i] = prob[i] + temp
      temp = cumu[i]
    }

    let newPopulation = []
    for (let i = 0; i < this.population.length; i++) {
      let rm = Math.random()
      for (let j = 0; j < this.population.length; j++) {
        if (rm <= cumu[j]) {
          newPopulation[i] = this.population[j]
          break
        }
      }
    }
    this.population = []
    this.population = newPopulation
  }

  generate () {
    let newPopulation = []
    for (let i = 0; i < this.size; i++) {
      let a = Math.floor(Math.random() * this.size)
      let b = Math.floor(Math.random() * this.size)
      let partnerA = this.population[a]
      let partnerB = this.population[b]
      let rateCross = Math.random()
      if (rateCross < this.crossRate) {
        let child = partnerA.crossover2(partnerB)
        let temp1 = child[0]
        let temp2 = child[1]
        temp1.mutate(this.mutationRate)
        temp2.mutate(this.mutationRate)
        newPopulation.push(temp1, temp2)
      } else {
        partnerA.fitness = 0
        partnerB.fitness = 0
        let temp1 = partnerA
        let temp2 = partnerB
        temp1.mutate(this.mutationRate)
        temp2.mutate(this.mutationRate)
        newPopulation.push(temp1, temp2)
      }
    }
    this.population = []
    this.population = newPopulation
    this.calcFitness()
    this.population.sort((a, b) => {
      return a.fitness < b.fitness
    })
    this.population.slice(0, this.size)
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
