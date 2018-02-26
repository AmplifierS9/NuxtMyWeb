<template>
  <main class="section">
    <div class="container">
      <breadcrumb/>
      <h1 class="title has-text-centered is-size-4-mobile">
        <div class="topic">Genetic Algorithm</div>
      </h1>
      <div class="columns">
        <div class="column is-6">
          <line-chart :chart-data="datacollection1" :options="options1" :height="300"/>
          Target : {{ target }}
          <br>
          Best Phrase : {{ bestPhrase1[0] }} ({{ bestPhrase1[1] }})
          <br>
          Total Generations : {{ generation1 }}
          <br>
          Average Fitness : {{ avgFitness1 }}%
          <br>
          Population size: {{ popmax }}
          <br>
          Mutation Rate : {{ mutationRate }}
        </div>
        <div class="column is-6">
          <line-chart :chart-data="datacollection2" :options="options2" :height="300"/>
          Target : {{ target }}
          <br>
          Best Phrase : {{ bestPhrase2[0] }} ({{ bestPhrase2[1] }})
          <br>
          Total Generations : {{ generation2 }}
          <br>
          Average Fitness : {{ avgFitness2 }}%
          <br>
          Population size: {{ popmax }}
          <br>
          Crossover Rate : {{ crossRate }}
          <br>
          Mutation Rate : {{ mutationRate }}
        </div>
      </div>
      <div class="columns">
        <div class="column is-2">
          <form class="" v-on:submit.prevent="Gen">
            <div class="field">
              <label class="label">Target</label>
              <div class="control">
                <input type="text" class="input" v-model="target">
              </div>
            </div>
            <div class="field">
              <label class="label">Population Size</label>
              <div class="control">
                <input type="number" class="input" v-model="popmax" step="1" min="0">
              </div>
            </div>
            <div class="field">
              <label class="label">Crossover Rate</label>
              <div class="control">
                <input type="number" class="input" v-model="crossRate" step="0.01" min="0" max="1">
              </div>
            </div>
            <div class="field">
              <label class="label">Mutation Rate</label>
              <div class="control">
                <input type="number" class="input" v-model="mutationRate" step="0.01" min="0" max="1">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary">Generate</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Population from '~/plugins/population.js'
import Population2 from '~/plugins/population2'
const breadcrumb = () => import('~/components/Breadcrumb.vue')
const LineChart = () => import('~/plugins/LineChart')

export default {
  name: 'GeneticAlgorithm',
  head () {
    return {
      title: 'Genetic Algorithm'
    }
  },
  components: {
    LineChart,
    breadcrumb
  },
  data () {
    return {
      target: 'unicorn',
      popmax: 200,
      crossRate: 0.9,
      mutationRate: 0.1,
      interval: null,
      interval2: null,
      // Test Case 1
      generation1: 0,
      bestPhrase1: [],
      avgFitness1: 0,
      population1: [],
      datacollection1: null,
      options1: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Test Case 1',
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          mode: 'index'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }]
        }
      },
      labels1: [],
      avg1: [],
      best1: [],
      worst1: [],
      // Test Case 2
      generation2: 0,
      bestPhrase2: [],
      avgFitness2: 0,
      population2: [],
      datacollection2: null,
      options2: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Test Case 2',
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        },
        tooltips: {
          mode: 'index'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }]
        }
      },
      labels2: [],
      avg2: [],
      best2: [],
      worst2: []
    }
  },
  methods: {
    fillData () {
      this.datacollection1 = {
        labels: this.labels1,
        datasets: [
          {
            label: 'Best Fitness',
            borderColor: '#ff7f0e',
            fill: false,
            data: this.best1
          },
          {
            label: 'Worst Fitness',
            borderColor: '#2ca02c',
            fill: false,
            data: this.worst1
          },
          {
            label: 'Avg. Fitness',
            borderColor: '#249EBF',
            fill: false,
            data: this.avg1
          }
        ]
      }
    },
    fillData2 () {
      this.datacollection2 = {
        labels: this.labels2,
        datasets: [
          {
            label: 'Best Fitness',
            borderColor: '#ff7f0e',
            fill: false,
            data: this.best2
          },
          {
            label: 'Worst Fitness',
            borderColor: '#2ca02c',
            fill: false,
            data: this.worst2
          },
          {
            label: 'Avg. Fitness',
            borderColor: '#249EBF',
            fill: false,
            data: this.avg2
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    Gen () {
      this.testCase1()
      this.testCase2()
    },
    testCase1 () {
      this.labels1 = []
      this.arrFitness1 = []
      this.labels1 = []
      this.avg1 = []
      this.best1 = []
      this.worst1 = []
      let population1 = new Population(this.target, this.mutationRate, this.popmax)
      this.interval = setInterval(() => {
        if (!population1.terminate()) {
          population1.generate()
          population1.calcFitness()
          population1.evaluate()
          this.generation1 = population1.getGenerations()
          this.bestPhrase1 = population1.getBest()
          this.avgFitness1 = population1.getAverageFitness()
          // this.population1 = population1.getPopulation()
          this.labels1.push(this.generation1)
          this.avg1.push(this.avgFitness1)
          this.best1.push(this.bestPhrase1[1])
          this.worst1.push(population1.getWorst())
          this.fillData()
        } else {
          this.clearTime()
        }
      }, 0)
    },
    testCase2 () {
      this.labels2 = []
      this.arrFitness2 = []
      this.labels2 = []
      this.avg2 = []
      this.best2 = []
      this.worst2 = []
      let population2 = new Population2(this.target, this.crossRate, this.mutationRate, this.popmax)
      this.interval2 = setInterval(() => {
        if (!population2.terminate()) {
          population2.selection()
          population2.generate()
          population2.evaluate()
          this.generation2 = population2.getGenerations()
          this.bestPhrase2 = population2.getBest()
          this.avgFitness2 = population2.getAverageFitness()
          // this.population2 = population2.getPopulation()
          this.labels2.push(this.generation2)
          this.avg2.push(this.avgFitness2)
          this.best2.push(this.bestPhrase2[1])
          this.worst2.push(population2.getWorst())
          this.fillData2()
        } else {
          this.clearTime2()
        }
      }, 0)
    },
    clearTime () {
      clearInterval(this.interval)
    },
    clearTime2 () {
      clearInterval(this.interval2)
    }
  }
}
</script>

