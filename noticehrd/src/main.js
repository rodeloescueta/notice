import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2Editor from "vue2-editor";
import myMixin from "./plugins/myMixin";

Vue.use(myMixin);
Vue.use(Vue2Editor);
Vue.use(require("vue-moment"));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
