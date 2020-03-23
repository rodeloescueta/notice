<template>
  <v-app id="inspire">
    <v-app-bar
        app
        clipped-left
        dense
        flat
        color="light-green lighten-5"
        >
        <span class="title font-weight-bold" style="color: #008B8B;">HRD Notice</span>
        <v-spacer />
        <v-btn dark color="#008B8B" v-if="!showAll" @click="showAll = !showAll">
            <v-icon>mdi-view-list</v-icon>
            <span class="subtitle-2 font-weight-black">Show All</span>
            
        </v-btn>
        <v-btn dark v-else color="#008B8B" @click="showLatest()">
            <v-icon>mdi-card-search-outline</v-icon>
            <span class="subtitle-2 font-weight-black">View Latest</span>
            
        </v-btn>
    </v-app-bar>
    
    <v-container class="main" fluid>
        <v-layout>
            <v-row justify="center" >
                <template v-if="showAll">
                    <template v-for="(notice, i) in noticeData">
                        <v-container :key="i +'a'">
                            <v-card class="pa-2" height="250" @click="view(notice)">
                                <v-row>
                                    <v-col class="pt-0" cols="12">
                                        <v-card-text>
                                            <p style="color: #0277BD;" class="display-1">
                                                {{notice.noticeTitle}}
                                            </p>
                                            <p style="color: #757575;">{{notice.dateReleased}}</p>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <div v-html="shorthenFunc(notice.content)"></div>
                                        </v-card-text>
                                        
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-container>
                    </template>
                </template>
                <template v-else>
                <v-container>
                    <v-card class="pa-2">
                        <v-layout>
                            <v-row>
                                <v-col class="pt-0" cols="12">
                                    <span class="display-3">{{viewNotice.noticeTitle}}</span>
                                </v-col>
                                <v-col class="pt-0 pl-4" cols="12">
                                    <span class="subtitle-1">{{viewNotice.dateReleased}}</span>
                                    <v-divider></v-divider>
                                </v-col>
                                
                            </v-row>
                        </v-layout>
                        <div v-html="viewNotice.content"></div>
                    </v-card>
                </v-container>
                </template>
            </v-row>
        </v-layout>
    </v-container>
    
    
  </v-app>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
  export default {
    data: () => ({
        // api: 'http://localhost:3000/',
        // api: 'https://hxv4pe05f4.execute-api.us-east-2.amazonaws.com/prod/',
        showAll: false,
        noticeData: [],
        viewNotice: {}
    }),
    mounted(){
        axios.get(`${this.api}api/records`).then(res => {
            this.noticeData = res.data
            this.viewNotice = res.data[0]
        })
    },
    methods: {
        view(val){
            this.viewNotice = val
            this.showAll = false
        },
        onView(val){
            this.viewNotice = val
        },
        shorthenFunc(val){
            return _.truncate(val, {
                'length': 80,
                'separator': ''
            })
        },
        showLatest(){
            this.showAll = false
            this.viewNotice = this.noticeData[0]
            
        }
    }
  }
</script>