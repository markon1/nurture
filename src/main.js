// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Search from './components/Search'
import Overdue from './components/Overdue'
import StarRating from 'vue-star-rating'
import Datepicker from 'vuejs-datepicker'
import InputTag from 'vue-input-tag'

Vue.component('search', Search)
Vue.component('overdue', Overdue)
Vue.component('StarRating', StarRating)
Vue.component('Datepicker', Datepicker)
Vue.component('InputTag', InputTag)

Vue.config.productionTip = false

var connections = [{
  id: 1,
  info: {
    profileImg: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAIAAgDGAAAAAQAAAAAAAAviAAAAJGY2MmE3NDkzLWE5MGItNDViMS1iOTUxLTc5YTI0NDgyZDg3Yw.jpg',
    name: 'Bill Gates',
    bio: 'Co-chair, Bill & Melinda Gates Foundation'
  },
  notes: 'William Henry Gates III (born October 28, 1955) is an American business magnate, investor, author, philanthropist, humanitarian, and principal founder of the Microsoft Corporation.',
  value: 4,
  date: new Date('02-25-2018'),
  tags: ['Microsoft', 'humanitarian', 'philanthropist']
}, {
  id: 2,
  info: {
    profileImg: 'https://media.licdn.com/dms/image/C4E03AQGhU6VJLcn9xA/profile-displayphoto-shrink_200_200/0?e=1524434400&v=alpha&t=kY1IrB5s60ZuaJiRhFfICfBMGmUls9TmuaBYjYIiOo4',
    name: 'Satya Nadella',
    bio: 'CEO at Microsoft'
  },
  notes: 'Satya Narayana Nadella (born 19 August 1967) is an Indian American business executive. He is the current Chief Executive Officer (CEO) of Microsoft, succeeding Steve Ballmer in 2014',
  value: 3,
  date: new Date('02-03-2018'),
  tags: ['Microsoft', 'CEO']
}, {
  id: 3,
  info: {
    profileImg: 'https://media.licdn.com/dms/image/C4E03AQE3Ok8_769DQg/profile-displayphoto-shrink_200_200/0?e=1524434400&v=alpha&t=eJTUY9mFj9xMtcjvyHkv53yeA8YbzJmZ30X5bTkfpEk',
    name: 'Reed Hastings',
    bio: 'CEO Netflix'
  },
  notes: 'Wilmot Reed Hastings Jr. (born October 8, 1960) is an American entrepreneur and philanthropist. He is the co-founder, Chairman and CEO of Netflix and serves on the boards of Facebook and a number of non-profit organizations. ',
  value: 5,
  date: new Date('02-04-2018'),
  tags: ['Netflix', 'streaming', 'movies', 'CEO']
}, {
  id: 4,
  info: {
    profileImg: 'https://media.licdn.com/dms/image/C4D03AQFt4Y37idkjiw/profile-displayphoto-shrink_200_200/0?e=1524445200&v=alpha&t=qBQqLsVBMla1C-GA_ExgTAumekwaI3CQwbyojuHqDds',
    name: 'Jacques Clerx',
    bio: 'Project Planner Allseas'
  },
  notes: 'Commercial projects and Capex',
  value: 2,
  date: new Date('02-24-2018'),
  tags: ['Netherlands', 'oil', 'energy']
}, {
  id: 5,
  info: {
    profileImg: 'https://media.licdn.com/dms/image/C4E03AQEkd1NhaytheQ/profile-displayphoto-shrink_200_200/0?e=1524445200&v=alpha&t=EEzwRgKFaMXZGP3fvhj04f4SbbZWJyvHfA54PfscuGE',
    name: 'Erik Sawyer',
    bio: 'Senior Consultant at Driver Trett'
  },
  notes: 'Vattenfall, Sawyer Project Services, Mammoet',
  value: 1,
  date: new Date('02-18-2018'),
  tags: ['senior', 'consultant', 'Netherlands']
}, {
  id: 6,
  info: {
    profileImg: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAruAAAAJGE3YWM4NmIxLWM1OWUtNGNhNy04OWUxLWZhYmVhZTEzNTNjNA.jpg',
    name: 'Joyce van Brosten',
    bio: 'Scheduler at ExxonMobil'
  },
  notes: 'Rotterdam Area, Netherlands',
  value: 5,
  date: new Date('02-26-2018'),
  tags: ['Netherlands', 'oil', 'energy', 'scheduler']
}]

connections.sort((a, b) => {
  return b.value - a.value
})

/* eslint-disable no-new */
new Vue({
  el: '#search',
  components: {
    Search
  },
  data: {
    connections: connections
  },
  template: `<Search :connectionsProp='connections' />`
})

new Vue({
  el: '#overdue',
  components: {
    Overdue
  },
  data: {
    connections: connections
  },
  template: `<Overdue :connectionsProp='connections' />`
})
