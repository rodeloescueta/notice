<template>
  <v-container pa-0 fluid>
    {{allRecords}}
    <v-divider></v-divider>
    <v-btn block @click="deleteRecord()">delete first element in the array</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
export default {
  name: 'Home',
  data() {
    return{
      allRecords: [],
      url: 'http://localhost:3000/api/record'
    }
  },
  mounted(){
    this.getRecords()
    // this.postRecord() // sample add record
    // this.putRecord()  // sample update record
  },
  methods:{
    postRecord(){
      let data = {
        userId: 'delo', // hash key
        timeStamp: moment().tz("Asia/Manila").format(), // range key
        transactionStatus: 'pending'
      }
      axios.post(this.url, data).then(res => {
        console.log(res.data)
      })
    },
    getRecords(){
      let url = 'http://localhost:3000/api/records'
      axios.get(url).then(res => {
        console.log(res.data)
        this.allRecords = res.data
      })
    },
    putRecord(){
      let data = {
        userId: 'delo', // hash key
        timeStamp: '2020-02-25T10:56:01+08:00', // range key
        transactionStatus: 'ok' //updated status
      }
      axios.put(this.url, data).then(res => {
        console.log(res.data)
        //code to update ui data
      })
    },
    deleteRecord(){
      let data = {}
      data.userId = this.allRecords[0].userId
      data.timeStamp = this.allRecords[0].timeStamp
      console.log(data)
      axios.delete(this.url, {data:data}).then(res => {
        console.log(res.data)
        //code to update ui data
      })
    }
  }
}
</script>
