// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Connection from "./components/Connection";
import Search from "./components/Search";
import Overdue from "./components/Overdue";
import StarRating from "vue-star-rating";
import Datepicker from "vue-date";
import InputTag from "vue-input-tag";

Vue.component("connection", Connection);
Vue.component("search", Search);
Vue.component("overdue", Overdue);
Vue.component("StarRating", StarRating);
Vue.component("datepicker", Datepicker);
Vue.component("InputTag", InputTag);

Vue.config.productionTip = false;

const apiURL = "/connections/";
var connections = [];

$(".tablink").on("click", function(e) {
  e.preventDefault();
  let tabId = $(this).attr("data-id");
  $(".tab-pane.show, .tab-pane.active").removeClass("show active");
  $("#" + tabId).addClass("show active");
});

function getConnections() {
  $.get(apiURL)
    .done(function(data) {
      console.log(data);
      connections = data;
      /* eslint-disable no-new */
      new Vue({
        el: "#search",
        components: {
          Search
        },
        data: {
          connections: connections,
          apiURL: apiURL
        },
        template: `<Search :connectionsProp='connections' :apiURL='apiURL'/>`
      });

      new Vue({
        el: "#overdue",
        components: {
          Overdue
        },
        data: {
          connections: connections,
          apiURL: apiURL
        },
        template: `<Overdue :connectionsProp='connections' :apiURL='apiURL'/>`
      });

      // set active tab based on hash
      if (!!window.location.hash) {
        $("#" + window.location.hash.substr(1)).addClass("active");
        $(`.tab-link[data-id="${window.location.hash.substr(1)}"]`).css("color", "#fed136");
      } else {
        $("#search").addClass("active");
        $(`.tab-link[data-id="search"]`).css("color", "#fed136");
      }

      // when tab changes update hash
      $(".tablink").on("click", function() {
        window.location.hash = "#" + $(this).attr("data-id");
      });

      // when nav-link is clicked change color of it and other nav-links
      $(".nav-link").on("click", function() {
        $(".nav-link").css("color", "#000000");
        $(this).css("color", "#fed136");
      });
    })
    .fail(function() {
      getConnections();
    });
}

getConnections();
