<template>
  <div class='connection'>
    <div v-bind:class="[ overdue ? 'col-lg-1 col-md-1 col-sm-3 col-xs-6' : 'col-lg-2 col-md-2 col-sm-3 col-xs-6','info']">
      <img :src='conn.info.profileImg' class='profileImg'>
    </div>
    <div v-bind:class="[ overdue ? 'col-lg-3 col-md-3 col-sm-8 col-xs-18' : 'col-lg-4 col-md-5 col-sm-8 col-xs-18','infoText']">
      <strong>{{conn.info.name}}</strong>
      <br>
      <p>{{conn.info.bio}}</p>
    </div>
    <div v-bind:class="[ overdue ? 'col-lg-5 col-md-3 col-sm-13 col-xs-24' : 'col-lg-6 col-md-5 col-sm-13 col-xs-24','notes']">
      <textarea v-model.lazy='conn.notes' @change="patch('notes')" placeholder="Notes"></textarea>
    </div>
	<div v-bind:class="[ overdue ? 'col-lg-3 col-md-4 col-sm-5 col-xs-24' : 'col-lg-3 col-md-4 col-sm-5 col-xs-24','value']">
      <star-rating v-model='conn.value' :star-size='25' :show-rating='false' @rating-selected="patch('value')"></star-rating>
    </div>
    <div v-bind:class="[ overdue ? 'col-lg-3 col-md-4 col-sm-5 col-xs-24' : 'col-lg-3 col-md-4 col-sm-5 col-xs-24','dueDate']">
      <datepicker v-model='conn.date' input-class='form-control dateInput' @input="patch('date')"></datepicker>
    </div>
    <div v-bind:class="[ overdue ? 'col-lg-5 col-md-4 col-sm-16 col-xs-24' : 'col-lg-6 col-md-4 col-sm-14 col-xs-24','tags']">
      <input-tag :tags.sync='conn.tags' @update:tags="patch('tags')"></input-tag>
    </div>
	<div class='actions col-lg-3 col-md-5 col-sm-24 col-xs-24' v-if="overdue">
      <button class="btn btn-danger closeBtn" @click="close">Close</button><button class="btn btn-warning snoozeBtn" @click="snooze">Snooze</button>
    </div>
  </div>
</template>

<script>
// converts date to YYYYMMDD format
function convertDate(dt){
    let d = new Date(dt);
    return d.toISOString().slice(0,10);
}

export default {
  name: "Connection",
  props: ["connProp", "overdue","apiURL"],
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
	close : function(){
		this.conn.date = '';
		this.patch('date');
	},
	snooze : function(){
		this.conn.date = convertDate(new Date(Date.now() + 3*24*60*60*1000));
		this.patch('date');
	}
  }
};
</script>

<style>
.connection > div {
  margin-bottom: 10px;
}

.dueDate,.dateHead{
	max-width:130px;
}

.date-picker {
  width: 115px;
}

.value,.valueHead{
	max-width:140px !important;
}

.info {
  word-wrap: break-word;
  width:80px !important;
}

.profileImg {
  width: 80px;
  border-radius: 80px;
}

.infoText {
  padding-left: 28px;
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

.vue-input-tag-wrapper {
  border-radius: 4px !important;
}

.actions{
	text-align: left;
}

.actions > button{
	display: inline-block;
}

.closeBtn{
	margin-right:7px;
}
</style>
