<template>
  <div class='row connection'>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-1 offset-md-0 col-md-1 offset-sm-1 col-sm-3 offset-1 col-3' : 'offset-lg-1 col-lg-1 offset-md-0 col-md-1 offset-sm-1 col-sm-3 offset-1 col-3','info']">
      <img :src='conn.info.profileImg' class='profileImg'>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-7 offset-0 col-8' : 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-7 offset-0 col-8','infoText']">
      <a :href='conn.connURL' target='_blank'>{{conn.info.name}}</a>
      <br>
      <p>{{conn.info.bio}}</p>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-10 offset-1 col-11' : 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-10 offset-1 col-11','notes']">
      <textarea v-model.lazy='conn.notes' @change="patch('notes')" placeholder="Notes"></textarea>
    </div>
	<div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-10 offset-1 col-11' : 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-10 offset-1 col-11','tags']">
      <input-tag :tags.sync='conn.tags' @update:tags="patch('tags')"></input-tag>
    </div>
	<div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-3 offset-1 col-11' : 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-1 col-sm-3 offset-1 col-11','value']">
      <star-rating v-model='conn.value' :star-size='22' :show-rating='false' @rating-selected="patch('value')"></star-rating>
    </div>
    <div v-bind:class="[ overdue ? 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-3 offset-1 col-11' : 'offset-lg-0 col-lg-2 offset-md-0 col-md-2 offset-sm-0 col-sm-3 offset-1 col-11','dueDate']">
      <datepicker v-model='conn.date' input-class='form-control dateInput'></datepicker>
    </div>    
	<div  v-if="overdue" class='actions offset-lg-0 col-lg-1 offset-md-0 col-md-1 offset-sm-0 col-sm-4 offset-1 col-11'>
      <button class="btn doneBtn" @click="done">DONE</button><button class="btn snoozeBtn" @click="snooze">SNOOZE</button>
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

<style>
.connection {
	width: 100%;
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
	.dueDate {
		text-align: left;
	}

	.actions {
		text-align: right;
	}
}

@media (max-width: 750px) {
	.vue-star-rating > .vue-star-rating,
	.dueDate,
	.actions {
		text-align: center;
	}
}

.profileImg {
	width: 80px;
	border-radius: 80px;
}

.infoText {
	padding-left: 32px;
	min-height: 80px;
	overflow-y: auto;
}

.infoText > a {
	color: #704b1e !important;
}

.infoText > p {
	color: #babfc2 !important;
}

.notes textarea {
	resize: none;
	width: 100%;
	height: 120px;
	background-color: #fbfbfb;
	border: 1px solid rgb(204, 204, 204);
	padding-top: 18px;
	padding-left: 10px;
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

.input-wrapper > .input {
	line-height: 18px !important;
}

.vue-input-tag-wrapper {
	background-color: #fbfbfb !important;
}

.vue-input-tag-wrapper > input {
	border: 0px !important;
	background-color: #fbfbfb !important;
	border-color: #ededed !important;
}

.input-tag {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	border-radius: 18px !important;
	border: 0px !important;
	padding: 2px 8px 2px 8px !important;
	line-height: 13px !important;
	background-color: #24c602 !important;
	color: #ffffff !important;
}

.input-tag span {
	line-height: 13px !important;
}

.input-tag a.remove {
	color: #ffffff !important;
	margin-left: 3px !important;
}

.actions > button {
	display: inline-block !important;
	color: #ffffff !important;
	font-size: 12px !important;
	padding: 6px 4px 6px 4px !important;
}

.doneBtn {
	margin-right: 4px;
	background-color: #24c602;
}

.doneBtn:hover {
	background-color: #1e8f08;
}

.snoozeBtn {
	background-color: #ffc107;
}

.snoozeBtn:hover {
	background-color: #e4ab00;
}
</style>
