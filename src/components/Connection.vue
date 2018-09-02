<template>
  <div class='row connection'>
    <div v-bind:class="[ overdue ? 'offset-xl-0 col-xl-3 offset-sm-1 col-sm-10 col-12' : 'offset-xl-0 col-xl-3 offset-sm-1 col-sm-10 col-12','info']">
		<div>
			<a :href='conn.connURL' target='_blank' class='profileImgLink'>
				<img :src='conn.info.profileImg' class='profileImg'>
			</a>
		</div>
		<div class='infoText'>
			<p class='name'>
				<a :href='conn.connURL' target='_blank'>{{conn.info.name}}</a>
			</p>
			<br>
			<p class='title'>{{conn.info.bio}}</p>
		</div>
    </div>
    <div v-bind:class="[ overdue ? 'offset-xl-0 col-xl-2 offset-sm-1 col-sm-10 col-12' : 'offset-xl-0 col-xl-2 offset-sm-1 col-sm-10 col-12','notes']">
      <textarea v-model.lazy='conn.notes' @change="patch('notes')" placeholder="Notes"></textarea>
    </div>
	<div v-bind:class="[ overdue ? 'offset-xl-0 col-xl-2 offset-sm-1 col-sm-10 col-12' : 'offset-xl-0 col-xl-3 offset-sm-1 col-sm-10 col-12','tags']">
      <input-tag :tags.sync='conn.tags' @update:tags="patch('tags')"></input-tag>
    </div>
	<div v-bind:class="[ overdue ? 'offset-xl-0 col-xl-2 offset-sm-1 col-sm-3 col-12' : 'offset-xl-0 col-xl-1 offset-sm-1 col-sm-3 col-12','value']">
      <star-rating v-model='conn.value' :star-size='22' :show-rating='false' @rating-selected="patch('value')"></star-rating>
    </div>
    <div v-bind:class="[ overdue ? 'offset-xl-0 col-xl-2 offset-sm-0 col-sm-3 col-12' : 'offset-xl-0 col-xl-2 offset-sm-0 col-sm-3 col-12','dueDate']">
      <div class='dateWithIcon'>
		  <datepicker v-model='conn.date' input-class='form-control dateInput'></datepicker>
		<div class='calendarIconDiv'>
			<img class='calendarIcon' src='/static/images/calendarIcon.png'>
		</div>
      </div>
    </div>    
	<div  v-if="overdue" class='actions offset-xl-0 col-xl-1 offset-sm-0 col-sm-4 col-12'>
      <button class="btn doneBtn d-inline-block d-xl-block mb-xl-2" @click="done">DONE</button>
	  <button class="btn snoozeBtn d-inline-block d-xl-block" @click="snooze">SNOOZE</button>
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
.connection > div {
	margin-bottom: 10px;
}

.profileImgLink {
	float: left;
	margin-right: 10px;
}

.date-picker {
	width: 128px;
	display: inline-block;
	vertical-align: middle !important;
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

.name > a {
	float: left;
	margin-right: 10px;
	color: #704b1e !important;
	font-size: 16px !important;
	font-weight: 900;
}

.title {
	color: #babfc2 !important;
	overflow: hidden !important;
	font-size: 13px !important;
}

.notes textarea {
	resize: none;
	width: 100%;
	height: 120px;
	font-size: 13px !important;
	background-color: #fbfbfb;
	border: 1px solid rgb(204, 204, 204);
	padding-top: 18px;
	padding-left: 10px;
}

.notes textarea:focus {
	outline-color: #fed136 !important;
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
	cursor: pointer !important;
}

.input-wrapper:active,
.input-wrapper:focus {
	border-color: #fed136 !important;
	box-shadow: inset 0 1px 1px #fed136, 0 0 8px #fed136 !important;
	border-radius: 0px !important;
}

.input-wrapper > .input {
	line-height: 18px !important;
}

.dateWithIcon {
	width: 163px !important;
	margin: 0 auto !important;
}

.dateInput {
	vertical-align: middle !important;
}

.calendarIcon {
	vertical-align: middle;
}

.calendarIconDiv {
	display: inline-block !important;
	height: 32px;
	vertical-align: middle;
	padding: 1px 4px 6px 10px;
	border: 1px solid #cccccc;
	background-color: #f6f6f6;
	border-top-right-radius: 2px;
	border-bottom-right-radius: 2px;
	margin-left: -5px;
	border-left: 0px;
}

.date-panel {
	position: fixed !important;
	height: 320px !important;
	left: 0px !important;
	right: 0px !important;
	top: 0px !important;
	bottom: 0px !important;
	margin: auto !important;
	box-shadow: grey 2px 2px 2px 2px;
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
	color: #ffffff !important;
	font-size: 12px !important;
	padding: 6px 4px 6px 4px !important;
	width: 64px !important;
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
