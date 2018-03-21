<template>
    <div role="tabpanel" class="tab-pane" id="overdue">
        <h2>Overdue</h2>
        <div class='row searchHeading'>
            <div class='col-lg-offset-1 col-lg-2 col-md-offset-1 col-md-2 col-sm-offset-1 col-sm-3 col-xs-offset-1 col-xs-3'></div>
            <div class='col-lg-offset-0 col-lg-5 col-md-offset-0 col-md-7 col-sm-offset-0 col-sm-9 col-xs-offset-1 col-xs-24'></div>
            <div class='col-lg-offset-0 col-lg-5 col-md-offset-0 col-md-19 col-sm-offset-0 col-sm-16 col-xs-offset-1 col-xs-28'>
                Notes
                <input v-model='notesFilter' class="form-control" placeholder="filter notes">
            </div>            
            <div class='col-lg-offset-0 col-lg-4 col-md-offset-1 col-md-5 col-sm-offset-1 col-sm-6 col-xs-offset-1 col-xs-10 valueHead'>
                Value
                <a href="#" @click="sortBy('value',false)" v-bind:class="{activeSort: sortKey == 'value' && reverse == false}">&#9650;</a>
                <a href="#" @click="sortBy('value',true)" v-bind:class="{activeSort: sortKey == 'value' && reverse == true}">&#9660;</a>
                <br>
                <select v-model='valueFilter'>
                  <option value="">Value</option>
                  <option value=1>1</option>
                  <option value=2>2</option>
                  <option value=3>3</option>
                  <option value=4>4</option>
                  <option value=5>5</option>
                </select>
                </div>
            <div class='col-lg-offset-0 col-lg-3 col-md-offset-0 col-md-4 col-sm-offset-1 col-sm-5 col-xs-offset-0 col-xs-7 dateHead'>
                Date
                <a href="#" @click="sortBy('date',false)" v-bind:class="{activeSort: sortKey == 'date' && reverse == false}">&#9650;</a>
                <a href="#" @click="sortBy('date',true)" v-bind:class="{activeSort: sortKey == 'date' && reverse == true}">&#9660;</a>                
            </div>            
            <div class='col-lg-offset-0 col-lg-5 col-md-offset-0 col-md-14 col-sm-offset-0 col-sm-10 col-xs-offset-1 col-xs-28'>
                Tags
                <input v-model="tagsFilter" class="form-control" placeholder="filter tags">
            </div>
            <div class='col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-5 col-sm-offset-0 col-sm-6 col-xs-offset-1 col-xs-28'>
                Actions
            </div>
        </div>
        <br>
        <hr>
        <div class='container-fluid'>
          <div class='row' v-for='conn in filteredConnections' v-bind:key='conn._id'>
            <connection :connProp='conn' :overdue='true'  :apiURL='apiURL'></connection>               
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Overdue",
  props: ["connectionsProp", "apiURL"],
  data: function() {
    return {
      sortKey: "value",
      reverse: false,
      notesFilter: "",
      tagsFilter: "",
      dateFilter: "",
      valueFilter: "",
      columns: ["notes", "date", "value", "tags"],
      connections: this.connectionsProp
    };
  },
  computed: {
    filteredConnections: function() {
      var self = this;
      return this.connections.filter(conn => {
        return (
          new Date(conn.date) < new Date() &&
          (!self.notesFilter ||
            conn.notes
              .toLowerCase()
              .includes(self.notesFilter.toLowerCase())) &&
          (!self.tagsFilter ||
            conn.tags.find(t =>
              t.toLowerCase().includes(self.tagsFilter.toLowerCase())
            )) &&
          (!self.dateFilter ||
            new Date(conn.date).toDateString() ==
              new Date(self.dateFilter).toDateString()) &&
          (!self.valueFilter || conn.value >= self.valueFilter)
        );
      });
    }
  },
  methods: {
    sortBy: function(sortKey, dir) {
      this.reverse = dir;
      this.sortKey = sortKey;
      if (sortKey == "date") {
        this.connections.sort((a, b) => {
         if (!a.date && !b.date) {
            return 0;
          } else if (!a.date) {
            return 1;
          } else if(!b.date){
            return -1;
          } else {
            return this.reverse ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
          }
        });
      } else {
        this.connections.sort((a, b) => {
          return this.reverse
            ? a[this.sortKey] - b[this.sortKey]
            : b[this.sortKey] - a[this.sortKey];
        });
      }
    }
  }
};
</script>

<style>
.row {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid black;
}

.activeSort,
.activeSort:active,
.activeSort:visited {
  color: blueviolet;
}
</style>
