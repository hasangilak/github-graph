import Vue from 'vue'
import Router from './Router.vue'
import TypeAhead from './TypeAhead.vue'
import Graph from './Graph.vue'
import VueRouter from 'vue-router'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

Vue.config.productionTip = false

Vue.component('v-chart', ECharts)
ECharts.registerTheme('ovilia-green', {
    "color": [
        "#4ea397",
        "#22c3aa",
        "#7bd9a5"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": "#666666"
        },
        "subtextStyle": {
            "color": "#999999"
        }
    },
    "bar": {
        "itemStyle": {
            "normal": {
                "barBorderWidth": "0",
                "barBorderColor": "#444444"
            },
            "emphasis": {
                "barBorderWidth": "0",
                "barBorderColor": "#444444"
            }
        }
    },
})

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',

    routes: [
        { path: '/', component: TypeAhead },
        { path: '/:user/:repo', component: Graph }
    ]
})

new Vue({
    router,
    render: h => h(Router),
}).$mount('#app')