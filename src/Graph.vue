<template>
<div class="container">
    <v-chart :options="bar" theme="ovilia-green" autoresize ref="bar"/>
</div>
</template>

<script>

export default {
    name: 'Graph',

    data () {
        return {
        bar: {
                legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['name', 'contribution'],
                    ]
                },
                xAxis: { 
                    type: 'category',
                },
                yAxis: {},
                series: [{ 
                    type: 'bar',
                     encode: {
                        x: 'name',
                        y: 'contribution'
                    }
                }]
        },
        }
    },

    created() {
        console.log(this.$route.params.user)
    },

    mounted() {
       this.fetchContributers()
    },

    methods: {
        fetchContributers() {
             this.$refs.bar.showLoading({
                text: 'Loading…',
                color: '#4ea397',
                maskColor: 'rgba(255, 255, 255, 0.4)'
            })

            const {user, repo} = this.$route.params

            fetch(`https://api.github.com/repos/${user}/${repo}/contributors`)
                .then(data => data.json())
                .then(data => {
                    this.bar.dataset.source = [...this.bar.dataset.source, ...data.splice(0,10).map(({login, contributions}) => {
                        return [login, contributions]
                    })]

                    this.requesting = false
                    this.$refs.bar.hideLoading()
                })
                .catch(error => {
                    console.log('error', error)

                    this.requesting = false
                    this.$refs.bar.hideLoading()
                })
        }
    }
}
</script>

<style>
.container {
  width: 100%;
  height: 700px;
}

.echarts {
  width: 100%!important;
  height: 100%;
}

.echarts canvas {
    width: 100%!important;
}

.echarts > canvas {
    width: 100%!important;
}
</style>
