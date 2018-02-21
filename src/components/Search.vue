<template>
    <div role="tabpanel" class="tab-pane" id="search">
        <h2>Search</h2>
        <div class='row'>
            <div class='col-md-3'></div>
            <div class='col-md-4'>
                Notes
                <input v-model='notesFilter' class="form-control" placeholder="filter notes">

            </div>
            <div class='col-md-1'>
                Date
                <datepicker v-model='dateFilter' format='MM-dd-yyyy' :clear-button='true' input-class='form-control dateInput'></datepicker>
                <a href="#" @click="sortBy('date',false)" v-bind:class="{activeSort: sortKey == 'date' && reverse == false}">&#9650;</a>
                <a href="#" @click="sortBy('date',true)" v-bind:class="{activeSort: sortKey == 'date' && reverse == true}">&#9660;</a>                
            </div>
            <div class='col-md-1'>
                Value
                <br>
                <select v-model='valueFilter'>
                  <option value="">Value</option>
                  <option value=1>1</option>
                  <option value=2>2</option>
                  <option value=3>3</option>
                  <option value=4>4</option>
                  <option value=5>5</option>
                </select>
                <a href="#" @click="sortBy('value',false)" v-bind:class="{activeSort: sortKey == 'value' && reverse == false}">&#9650;</a>
                <a href="#" @click="sortBy('value',true)" v-bind:class="{activeSort: sortKey == 'value' && reverse == true}">&#9660;</a>
            </div>
            <div class='col-md-2'>
                Tags
                <input v-model="tagsFilter" class="form-control" placeholder="filter tags">
            </div>
        </div>
        <br>
        <hr>
        <div class='row connection' v-for='conn in filteredConnections' v-bind:key='conn.id'>
          <div class='info col-md-1'>
            <img :src='conn.info.profileImg' class='profileImg'>
          </div>
          <div class='infoText col-md-2'>
            <strong>{{conn.info.name}}</strong>
            <br>
            <span>{{conn.info.bio}}</span>            
          </div>
            <div class='notes col-md-4'>
                <textarea v-model='conn.notes' lazy></textarea>
            </div>
            <div class='dueDate col-md-1'>
                <datepicker v-model='conn.date' format='MM-dd-yyyy' input-class='form-control dateInput'></datepicker>
            </div>
            <div class='value col-md-1'>
                <star-rating v-model='conn.value' :star-size='25' :show-rating='false'></star-rating>
            </div>
            <div class='tags col-md-2'>
                <input-tag :tags.sync='conn.tags'></input-tag>
            </div>
            <!--<notes :notesProp='conn.notes' v-on:increment='inc'></notes>
          <value :valueProp='conn.value'></value>
          <duedate :dateProp='conn.date'></duedate>
          <tags :tagsProp='conn.tags'></tags>-->
        </div>
    </div>
</template>

<script>
export default {
  name: "App",
  props: ["connectionsProp"],
  data: function() {
    return {
      sortKey: "date",
      reverse: false,
      notesFilter: "",
      tagsFilter: "",
      dateFilter:"",
      valueFilter:"",
      columns: ["notes", "date", "value", "tags"],
      connections: this.connectionsProp
    };
  },
  computed: {
    filteredConnections: function() {
      var self = this;
      return this.connections
        .filter(conn => {
          return (
            (!self.notesFilter ||
              conn.notes
                .toLowerCase()
                .includes(self.notesFilter.toLowerCase())) &&
            (!self.tagsFilter ||
              conn.tags.find(t =>
                t.toLowerCase().includes(self.tagsFilter.toLowerCase())
              )) &&
            (!self.dateFilter ||
              new Date(conn.date).toDateString() == new Date(self.dateFilter).toDateString()
              ) &&
            (!self.valueFilter ||
              conn.value == self.valueFilter
              )
          );
        })
        .sort((a, b) => {
          return this.reverse ? b[this.sortKey] - a[this.sortKey] : a[this.sortKey] - b[this.sortKey];
        });
    }
  },
  methods: {
    sortBy: function (sortKey,dir) {
      this.reverse = dir;
      this.sortKey = sortKey;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

textarea {
  resize: none;
  width: 100%;
  height:80px;
  border: 0;
  background-color: transparent;
}

textarea:focus {
  outline: none;
}

.dateInput{
  max-width: 100%;
}

.info{
  height: 100px;
  word-wrap: break-word;
}

.profileImg{
  display: inline-block;
  width: 80px;
  vertical-align: middle;
  border-radius:80px;
  float:left;
}

.infoText{
  display: inline-block;
  float:left;
}

.activeSort, .activeSort:active, .activeSort:visited{
  color:blueviolet;
}
</style>
