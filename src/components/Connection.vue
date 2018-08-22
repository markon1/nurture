<template>
  <div class='connection'>
    <div v-bind:class="[ overdue ? 'offset-lg-1 col-lg-2 offset-md-1 col-md-2 offset-sm-1 col-sm-3 offset-xs-1 col-xs-3' : 'offset-lg-1 col-lg-2 offset-md-1 col-md-2 offset-sm-1 col-sm-3 offset-xs-1 col-xs-3','info']">
      <img :src='conn.info.profileImg' class='profileImg'>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-5 offset-md-0 col-md-7 offset-sm-0 col-sm-9 offset-xs-1 col-xs-24' : 'offset-lg-0 col-lg-5 offset-md-0 col-md-5 offset-sm-0 col-sm-9 offset-xs-1 col-xs-24','infoText']">
      <a :href='conn.connURL' target='_blank'>{{conn.info.name}}</a>
      <br>
      <p>{{conn.info.bio}}</p>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-5 offset-md-0 col-md-19 offset-sm-0 col-sm-16 offset-xs-1 col-xs-28' : 'offset-lg-0 col-lg-7 offset-md-0 col-md-6 offset-sm-0 col-sm-16 offset-xs-1 col-xs-28','notes']">
      <textarea v-model.lazy='conn.notes' @change="patch('notes')" placeholder="Notes"></textarea>
    </div>
	<div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-5 offset-md-0 col-md-14 offset-sm-0 col-sm-10 offset-xs-1 col-xs-28' : 'offset-lg-0 col-lg-7 offset-md-0 col-md-6 offset-sm-0 col-sm-16 offset-xs-1 col-xs-28','tags']">
      <input-tag :tags.sync='conn.tags' @update:tags="patch('tags')"></input-tag>
    </div>
	<div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-4 offset-md-1 col-md-5 offset-sm-1 col-sm-6 offset-xs-1 col-xs-10' : 'offset-lg-0 col-lg-4 offset-md-0 col-md-5 offset-sm-1 col-sm-6 offset-xs-1 col-xs-10','value']">
      <star-rating v-model='conn.value' :star-size='25' :show-rating='false' @rating-selected="patch('value')"></star-rating>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-3 offset-md-0 col-md-4 offset-sm-1 col-sm-5 offset-xs-0 col-xs-7' : 'offset-lg-0 col-lg-3 offset-md-0 col-md-4 offset-sm-0 col-sm-6 offset-xs-0 col-xs-7','dueDate']">
      <datepicker v-model='conn.date' input-class='form-control dateInput'></datepicker>
    </div>    
	<div class='actions offset-lg-0 col-lg-4 offset-md-0 col-md-5 offset-sm-0 col-sm-6 offset-xs-1 col-xs-28' v-if="overdue">
      <button class="btn doneBtn" @click="done">Done</button><button class="btn btn-warning snoozeBtn" @click="snooze">Snooze</button>
    </div>
  </div>
</template>

<script>
// converts date to YYYYMMDD format
function convertDate(dt) {
	let d = new Date(dt);
	return d.toISOString().slice(0, 10);
}

export default {
	name: "Connection",
	props: ["connProp", "overdue", "apiURL"],
	data: function() {
		return {
			conn: this.connProp
		};
	},
	methods: {
		patch: function(field) {
			$.ajax({
				url: this.apiURL + this.conn._id,
				data: JSON.stringify({ [field]: this.conn[field] }),
				type: "PATCH",
				contentType: "application/json",
				dataType: "json"
			});
		},
		done: function() {
			this.conn.date = "";
			this.patch("date");
		},
		snooze: function() {
			let snoozeAmount = parseInt($("#snoozeAmount").val());
			let snoozeInterval = $("#snoozeInterval").val();
			if (snoozeInterval == "weeks") {
				snoozeAmount = snoozeAmount * 7;
			} else if (snoozeInterval == "months") {
				snoozeAmount = snoozeAmount * 30;
			}
			this.conn.date = convertDate(new Date(Date.now() + snoozeAmount * 24 * 60 * 60 * 1000));
			this.patch("date");
		}
	},
	watch: {
		"conn.date": function(nw, old) {
			this.patch("date");
		}
	}
};
</script>

<style scoped>
.connection,
.headingWrapper {
	width: 100%;
}

.valueFilterSelect {
	width: 83px;
	height: 38px;
}

.connection > div {
	margin-bottom: 10px;
}

.date-picker {
	width: 128px;
}

.vue-star-rating {
	text-align: center;
	display: block !important;
}

.actions {
	text-align: center;
}

@media (max-width: 767px) {
	.vue-star-rating > .vue-star-rating,
	.dueDate,
	.actions {
		text-align: left;
	}
}

.profileImg {
	width: 80px;
	border-radius: 80px;
}

.infoText {
	padding-left: 32px;
	min-height: 80px;
	max-height: 120px;
	overflow-y: auto;
}

textarea {
	resize: none;
	width: 100%;
	height: 120px;
	background-color: transparent;
	border: 1px solid rgb(204, 204, 204);
	border-radius: 4px !important;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}

::-webkit-scrollbar {
	width: 10px;
	background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #555;
}

.input-wrapper {
	border-radius: 4px !important;
}

.input-wrapper > .input {
	line-height: 18px !important;
}

.vue-input-tag-wrapper {
	border-radius: 4px !important;
}

.actions > button {
	display: inline-block;
}

.doneBtn {
	margin-right: 4px;
	color: #ffffff;
	background-color: #24c602;
}

.doneBtn:hover {
	background-color: #1e8f08;
}
</style>
