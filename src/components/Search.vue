<template>
    <div role="tabpanel" class="tab-pane" id="search">
		<div class='container-fluid topHeader'>
			<div class='row headerImg'>
				<div class='headerText'><span>S</span><span class='greenUnderlined'>EARC</span><span>H</span></div>
			</div>
			<div class='row filters'>
				<div class='offset-lg-1 col-lg-3 offset-md-0 col-md-3 offset-sm-1 col-sm-3 offset-1 col-10'>
					<input v-model='nameTitleFilter' class="form-control" placeholder="Name/Title (type to filter)">
				</div>
				<div class='offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-3 offset-1 col-10'>
					<input v-model='notesFilter' class="form-control" placeholder="Notes (type to filter)">
				</div>  
				<div class='offset-lg-0 col-lg-2 offset-md-0 col-md-3 offset-sm-0 col-sm-4 offset-1 col-10'>
					<input v-model="tagsFilter" class="form-control" placeholder="Tags (type to filter)">
				</div>    
				<div class='offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-3 offset-1 col-5'>
					<button @click="sortBy('value')" class='form-control'>Value <i v-bind:class="[valuesDesc ? 'fa-angle-down':'fa-angle-up','fa sortBtn']"></i></button>                                  
				</div>
				<div class='offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-3 offset-0 col-5'>
					<button @click="sortBy('date')" class='form-control'>Date <i v-bind:class="[datesDesc ? 'fa-angle-down':'fa-angle-up','fa sortBtn']"></i></button>                                  
				</div>    
			</div>
		</div>
        <div class='container-fluid'>
            <connection v-for='conn in filteredConnections' v-bind:key='conn._id' :connProp='conn' :overdue='false' :apiURL='apiURL'></connection>
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
			datesDesc: false,
			valuesDesc: true,
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
		sortBy: function(sortKey) {
			this.sortKey = sortKey;

			if (sortKey == "date") {
				this.datesDesc = !this.datesDesc;
				this.connections.sort((a, b) => {
					if (!a.date && !b.date) {
						return 0;
					} else if (!a.date) {
						return 1;
					} else if (!b.date) {
						return -1;
					} else {
						return this.datesDesc ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
					}
				});
			} else if (sortKey == "value") {
				this.valuesDesc = !this.valuesDesc;
				this.connections.sort((a, b) => {
					return this.valuesDesc ? b[this.sortKey] - a[this.sortKey] : a[this.sortKey] - b[this.sortKey];
				});
			}
		}
	}
};
</script>

<style scoped>
.row {
	margin-bottom: 15px;
	padding-bottom: 15px;
	border-bottom: 1px solid black;
}
</style>
