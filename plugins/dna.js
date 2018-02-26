class DNA {
  constructor (num) {
    this.genes = []
    this.fitness = 0

    for (let i = 0; i < num; i++) {
      this.genes[i] = newChar()
    }
  }

  calcFitness (target) {
    let score = 0
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) {
        score++
      }
      // score += (this.genes[i] - target.charCodeAt(i)) * (this.genes[i] - target.charCodeAt(i))
    }
    this.fitness = score / target.length
    // this.fitness = score
    this.fitness = Math.pow(this.fitness, 2) + 0.01
  }

  crossover (partner) {
    let child = new DNA(this.genes.length)
    let midpoint = Math.floor(Math.random() * this.genes.length)

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i]
      else child.genes[i] = partner.genes[i]
    }
    return child
  }

  crossover2 (partner) {
    let child1 = new DNA(this.genes.length)
    let child2 = new DNA(this.genes.length)
    let midpoint = Math.floor(Math.random() * this.genes.length)

    for (let i = 0; i < this.genes.length; i++) {
      if (i < midpoint) {
        child1.genes[i] = partner.genes[i]
        child2.genes[i] = this.genes[i]
      } else {
        child1.genes[i] = this.genes[i]
        child2.genes[i] = partner.genes[i]
      }
    }
    return [child1, child2]
  }

  mutate (mutationRate) {
    let rateMut = Math.random()
    if (rateMut < mutationRate) {
      let point = Math.floor(Math.random() * this.genes.length)
      this.genes[point] = newChar()
    }
    // for (let i = 0; i < this.genes.length; i++) {
    //   if (Math.random() < mutationRate) {
    //     this.genes[i] = newChar()
    //   }
    // }
  }

  getPhrase () {
    return this.genes.join('')
  }
}

export default DNA

function newChar () {
  let c = Math.floor((Math.random() * 122) + 63)
  if (c === 63) c = 32
  if (c === 64) c = 46

  return String.fromCharCode(c)
  // return c
}
