<template>
    <div role="tabpanel" class="tab-pane" id="search">
		<div class='row' id='searchHeaderImg'>
			<span>S</span><span class='greenUnderlined'>EARC</span><span>H</span>
		</div>
        <div class='row searchHeading'>
            <div class='headingWrapper'>
              <div class='col-lg-offset-3 col-lg-5 col-md-offset-1 col-md-6 col-sm-offset-1 col-sm-14 col-xs-offset-1 col-xs-14'>
                  <input v-model='nameTitleFilter' class="form-control" placeholder="Name/Title (type to filter)">
              </div>
              <div class='col-lg-offset-0 col-lg-7 col-md-offset-0 col-md-6 col-sm-offset-0 col-sm-14 col-xs-offset-0 col-xs-14'>
                  <input v-model='notesFilter' class="form-control" placeholder="Notes (type to filter)">
              </div>  
			  <div class='col-lg-offset-0 col-lg-7 col-md-offset-0 col-md-7 col-sm-offset-1 col-sm-14 col-xs-offset-1 col-xs-14'>
                  <input v-model="tagsFilter" class="form-control" placeholder="Tags (type to filter)">
              </div>    
			  <div class='col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-5 col-sm-offset-1 col-sm-6 col-xs-offset-1 col-xs-6'>
				  <button @click="sortBy('value',!reverse)" class='form-control'>Value <i v-bind:class="[sortKey == 'value' && !reverse ? 'fa-angle-down':'fa-angle-up','fas sortBtn']"></i></button>                                  
              </div>
              <div class='col-lg-offset-0 col-lg-3 col-md-offset-0 col-md-4 col-sm-offset-1 col-sm-6 col-xs-offset-1 col-xs-6 dateHead'>
                  <button @click="sortBy('date',!reverse)" class='form-control'>Date <i v-bind:class="[sortKey == 'date' && !reverse ? 'fa-angle-down':'fa-angle-up','fas sortBtn']"></i></button>                                  
              </div>         
            </div>
        </div>
        <br>
        <hr>
        <div class='container-fluid'>
          <div class='row' v-for='conn in filteredConnections' v-bind:key='conn._id'>
            <connection :connProp='conn' :overdue='false' :apiURL='apiURL'></connection>          
          </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Search",
	props: ["connectionsProp", "apiURL"],
	data: function() {
		return {
			sortKey: "value",
			reverse: false,
			nameTitleFilter: "",
			notesFilter: "",
			tagsFilter: "",
			dateFilter: "",
			valueFilter: "",
			connections: this.connectionsProp
		};
	},
	computed: {
		filteredConnections: function() {
			var self = this;
			return this.connections.filter(conn => {
				return (
					(!self.nameTitleFilter || conn.info.name.toLowerCase().includes(self.nameTitleFilter.toLowerCase()) || conn.info.bio.toLowerCase().includes(self.nameTitleFilter.toLowerCase())) &&
					(!self.notesFilter || conn.notes.toLowerCase().includes(self.notesFilter.toLowerCase())) &&
					(!self.tagsFilter || conn.tags.find(t => t.toLowerCase().includes(self.tagsFilter.toLowerCase()))) &&
					(!self.dateFilter || new Date(conn.date).toDateString() == new Date(self.dateFilter).toDateString()) &&
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
					} else if (!b.date) {
						return -1;
					} else {
						return this.reverse ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
					}
				});
			} else {
				this.connections.sort((a, b) => {
					return this.reverse ? b[this.sortKey] - a[this.sortKey] : a[this.sortKey] - b[this.sortKey];
				});
			}
		}
	}
};
</script>

<style scoped>
.row {
	margin-bottom: 15px;
}

.searchHeading > .headingWrapper {
	margin-bottom: 10px;
}

.headingWrapper {
	margin-bottom: 10px;
	font-family: "Gotham";
}

.dateHead {
	text-align: left !important;
}

.sortBtn {
	color: #ffc107;
}

#searchHeaderImg {
	background-color: #000000;
	background-image: url("/static/images/searchHeader.png");
	opacity: 0.3;
	color: #ffffff;
	font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
	font-size: 45px;
	text-align: center;
	height: 15%;
	vertical-align: middle;
}

.greenUnderlined {
	text-decoration: underline;
	text-decoration-color: #24c602;
}
</style>
