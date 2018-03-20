// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Connection from './components/Connection'
import Search from './components/Search'
import Overdue from './components/Overdue'
import StarRating from 'vue-star-rating'
import Datepicker from 'vue-date'
import InputTag from 'vue-input-tag'

Vue.component('connection', Connection)
Vue.component('search', Search)
Vue.component('overdue', Overdue)
Vue.component('StarRating', StarRating)
Vue.component('datepicker', Datepicker)
Vue.component('InputTag', InputTag)

Vue.config.productionTip = false

const apiURL = 'https://nurtur3.herokuapp.com/connections/'
var connections = []

function getConnections () {
  $.get(apiURL).done(function (data) {
    console.log(data)
    connections = data
    /* eslint-disable no-new */
    new Vue({
      el: '#search',
      components: {
        Search
      },
      data: {
        connections: connections,
        apiURL: apiURL
      },
      template: `<Search :connectionsProp='connections' :apiURL='apiURL'/>`
    })

    new Vue({
      el: '#overdue',
      components: {
        Overdue
      },
      data: {
        connections: connections,
        apiURL: apiURL
      },
      template: `<Overdue :connectionsProp='connections' :apiURL='apiURL'/>`
    })
  }).fail(function () {
    getConnections()
  })
}

getConnections()
