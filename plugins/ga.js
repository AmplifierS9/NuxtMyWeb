class GA {
  constructor (target, size, pc, pm) {
    this.population = []
    this.matingPool = []
    this.target = target
    this.size = size
    this.pc = pc
    this.pm = pm
  }

  Test () {
    console.log('test')
  }

  initializePopulation () {
    for (let i = 0; i < this.size; i++) {
      this.population[i] = {
        gene: new DNA(this.target.length),
        fitness: 0
      }
    }
  }

  calcFitness () {
    let totalFitness = 0
    for (let i = 0; i < this.size; i++) {
      let score = 0
      for (let j = 0; j < this.target.length; j++) {
        if (this.population[i].gene[j] === this.target.charAt(j)) {
          score++
        }
      }
      this.population[i].fitness = score
      totalFitness += this.population[i].fitness // Find Max Fitness & Totle Fitness
    }

    this.population.sort(function (a, b) {
      return a.fitness - b.fitness;
    })

    let x = 0
    for (let i = 0; i < this.size; i++) {
      this.population[i].Fency = this.population[i].fitness + x
      x = this.population[i].Fency
    }

    // Find Relative Frequency
    for (let i = 0; i < this.size; i++) {
      if (this.population[i].Fency === 0) this.population[i].rF = 0
      else this.population[i].rF = this.population[i].Fency / totalFitness
    }
  }

  naturalSelection () {
    this.matingPool = []

    // Wheel Seclection
    for (let i = 0; i < this.size; i++) {
      let rm = Math.random()
      for (let j = 0; j < this.size; j++) {
        if (rm <= this.population[j].rF) {
          this.matingPool[i] = this.population[j]
          j = this.size
        }
      }
    }
    if (this.matingPool.length === 0) this.matingPool = this.population
  }

  Generate () {
    let child = []
    let i = 0
    while (child.length < this.size) {
      let a = Math.floor(Math.random() * 10)
      let b = Math.floor(Math.random() * 10)
      let partnerA = this.matingPool[a]
      let partnerB = this.matingPool[b]
      if (Math.random() < this.pc) {
        child[i] = crossOver(partnerA, partnerB)
        if (Math.random() < this.pm) {
          child[i] = Mutation(child[i])
        }
        i++
      } else {
        child[i] = partnerA.gene
        child[i+1] = partnerB.gene
        i = i + 2
      }
    }

    let offspring = []
    if (child.length > this.size) {
      offspring = child.slice(0, this.size)
    } else {
      offspring = child
    }
    
    this.population = []
    for (let i = 0; i < this.size; i++) {
      this.population[i] = {
        gene: offspring[i],
        fitness: 0
      }
    }
  }

  get Population () {
    return this.population
  }

  get MatingPool () {
    return this.matingPool
  }

  Finish () {
    return Check(this.target, this.population)
  }
}

export default GA

function DNA(num) {
  let gene = []
  for (let i = 0; i < num; i++) {
    gene[i] = newChar()
  }
  return gene
}

function newChar() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  text = possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

function crossOver (partnerA, partnerB) {
  let num = partnerA.gene.length
  let child = []
  let rm = num - 1
  let midpoint = Math.floor((Math.random() * rm) + 1)
  for (let i = 0; i < num; i++) {
    if (i < midpoint) child[i] = partnerA.gene[i]
    else child[i] = partnerB.gene[i]
  }
  return child
}

function Mutation (child) {
  let num = child.length;
  let point = Math.floor(Math.random() * num)
  child[point] = newChar()
  return child
}

function Check (target, population) {
  for (let i = 0; i < population.length; i++) {
    let str = population[i].gene.join('')
    if (target === str) {
      return true
    }
  }
  return false
}