<template>
    <div role="tabpanel" class="tab-pane" id="search">
        <h2>Search</h2>
        <div class='row'>
            <div class='head80'></div>
            <div class='col-lg-4 col-md-5 col-sm-8 col-xs-18 infoHead'></div>
            <div class='col-lg-6 col-md-5 col-sm-13 col-xs-24 notesHead'>
                Notes
                <input v-model='notesFilter' class="form-control" placeholder="filter notes">
            </div>            
            <div class='col-lg-3 col-md-4 col-sm-5 col-xs-24 valueHead'>
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
            <div class='col-lg-3 col-md-4 col-sm-5 col-xs-24 dateHead'>
                Date
                <!--<datepicker v-model='dateFilter' format='MM-dd-yyyy' :clear-button='true' input-class='form-control dateInput'></datepicker>-->
                <a href="#" @click="sortBy('date',false)" v-bind:class="{activeSort: sortKey == 'date' && reverse == false}">&#9650;</a>
                <a href="#" @click="sortBy('date',true)" v-bind:class="{activeSort: sortKey == 'date' && reverse == true}">&#9660;</a>                
            </div>
            <div class='col-lg-6 col-md-4 col-sm-14 col-xs-24 tagsHead'>
                Tags
                <input v-model="tagsFilter" class="form-control" placeholder="filter tags">
            </div>
        </div>
        <br>
        <hr>
        <div class='row' v-for='conn in filteredConnections' v-bind:key='conn._id'>
          <connection :connProp='conn' :overdue='false' :apiURL='apiURL'></connection>          
        </div>
    </div>
</template>

<script>
const apiURL = "http://localhost:8080/connections/";
export default {
  name: "Search",
  props: ["connectionsProp","apiURL"],
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
          (!self.valueFilter || conn.value == self.valueFilter)
        );
      });
    }
  },
  methods: {
    sortBy: function(sortKey, dir) {
      this.reverse = dir;
      this.sortKey = sortKey;
      if (sortKey == 'date') {
		  this.connections.sort((a, b) => {
          return this.reverse
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        });
      } else {
        this.connections.sort((a, b) => {
          return this.reverse
            ? b[this.sortKey] - a[this.sortKey]
            : a[this.sortKey] - b[this.sortKey];
        });
      }
    }
  }
};
</script>

<style>
.row{
  margin-bottom:15px;
}

.row > div {
  margin-bottom:10px;
}

.head80{
  width:80px !important;
}

.activeSort,
.activeSort:active,
.activeSort:visited {
  color: blueviolet;
}

select{
  border-radius: 4px;
  cursor: pointer;
}
</style>
