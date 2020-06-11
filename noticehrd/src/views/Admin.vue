<template>
  <v-app id="keep">
    <v-app-bar app clipped-left dense flat color="light-green lighten-5">
      <span class="title font-weight-bold" style="color: #008B8B;"
        >HRD Notice @admin</span
      >
      <v-spacer />
      <v-btn dark color="#008B8B" @click="noticeDialog = !noticeDialog">
        <v-icon>mdi-tab-plus</v-icon> notice
      </v-btn>
      <v-btn icon fab @click="logout()"
        ><v-icon>mdi-logout-variant</v-icon></v-btn
      >
    </v-app-bar>
    <v-container class="main" fluid pa-0>
      <template v-for="(notice, i) in noticeData">
        <v-container :key="i + 'a'">
          <v-card height="300">
            <v-row>
              <v-col class="pt-0" cols="12">
                <v-card-text>
                  <v-row>
                    <v-col cols="10">
                      <p style="color: #0277BD;" class="display-1">
                        {{ notice.noticeTitle }}
                      </p>
                      <p style="color: #757575;">
                        {{
                          [notice.dateReleased, "MM-DD-YYYY HH:mm:ss"]
                            | moment("dddd, MMMM Do YYYY")
                        }}
                      </p>
                    </v-col>
                    <!-- <v-col cols="2">
                                        <v-btn small fab color="teal accent-2" dark @click="onEdit(notice)"><v-icon>mdi-pencil</v-icon></v-btn>
                                        <v-btn small fab color="red accent-2" dark @click="onDelete(notice)"><v-icon>mdi-delete</v-icon></v-btn>
                                        
                                    </v-col> -->
                  </v-row>
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
    </v-container>

    <v-dialog fullscreen v-model="noticeDialog">
      <v-card class="pa-4">
        <v-text-field v-model="noticeTitle" label="Title"></v-text-field>
        <vue-editor v-model="content" />
        <v-textarea
          v-if="userInfo.user === '0320'"
          name="input-7-1"
          label="Temporary Text Area"
          v-model="numbers"
          hint="Put Numbers"
          outlined
          class="pt-4"
        ></v-textarea>
        <v-card-actions>
          <v-btn color="red accent-2" @click="cancelNotice()">cancel</v-btn>
          <v-spacer />
          <v-btn color="blue accent-2" @click="releasedNotice()">save</v-btn>
        </v-card-actions>
        <!-- {{numArray}} -->
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  props: {
    source: String,
  },
  data: () => ({
    // api: 'http://localhost:3000/',
    // api: 'https://hxv4pe05f4.execute-api.us-east-2.amazonaws.com/prod/',
    smsUrl:
      "https://igu4xu2bea.execute-api.us-east-2.amazonaws.com/prod/sendSMS/",
    content: "",
    noticeTitle: "",
    noticeDialog: false,
    noticeData: [],
    numbers: "639088935056",
  }),
  computed: {
    numArray() {
      return this.numbers.split("\n");
    },
  },
  mounted() {
    axios.get(`${this.api}api/records`).then((res) => {
      this.noticeData = res.data;
    });
  },
  methods: {
    sendSms() {
      // ?message=test&number=639261738164&subject=test2
      let arrayLinks = this.numArray.map(
        (n) =>
          `${this.smsUrl}?message=New Information @ website url here  regarding ${this.noticeTitle}&number=${n}&subject=test`
      );
      // console.log(arrayLinks)
      axios.all(arrayLinks.map((l) => axios.get(l))).then(
        axios.spread(function() {
          // all requests are now complete
          // console.log(res);
        })
      );
    },
    onEdit(val) {
      alert("edit function not yet finished", val);
    },
    onDelete(val) {
      let r = confirm(
        `Are you sure you want to delete notice "${val.noticeTitle}"`
      );
      const index = this.noticeData.indexOf(val);
      if (r == true) {
        let url = `${this.api}api/record`;
        axios
          .delete(url, {
            data: {
              noticeTitle: val.noticeTitle,
              dateReleased: val.dateReleased,
            },
          })
          .then(() => {
            // console.log(res.data)
            this.noticeData.splice(index, 1);
          });
      }
    },
    releasedNotice() {
      let r = confirm("Are you sure you want to released this memo?");
      if (r == true) {
        if (this.userInfo.user === "0320") {
          this.sendSms();
        }
        let data = {
          noticeTitle: this.noticeTitle,
          dateReleased: moment().format("MM-DD-YYYY HH:mm:ss"),
          content: this.content,
        };
        let url = `${this.api}api/record`;
        // console.log(url)
        axios.post(url, data).then(() => {
          this.noticeData.unshift(data);
          // console.log(res.data)
          this.noticeDialog = false;
          this.noticeTitle = "";
          this.content = "";
        });
      }
    },
    logout() {
      this.CHANGE_USER_INFO({});
      this.$router.push("/login");
    },
    cancelNotice() {
      let r = confirm("Are you sure you want cancel?");
      if (r == true) {
        this.noticeDialog = false;
        this.noticeTitle = "";
        this.content = "";
      }
    },
    shorthenFunc(val) {
      return _.truncate(val, {
        length: 80,
        separator: "",
      });
    },
  },
  filters: {
    shorthen: function(val) {
      return _.truncate(val, {
        length: 80,
        separator: "",
      });
    },
  },
};
</script>
<style>
.scroll {
  overflow-y: auto;
}
</style>
