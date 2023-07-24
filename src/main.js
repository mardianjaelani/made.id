import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DatetimePicker from "vuetify-datetime-picker";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueI18n from 'vue-i18n';

// Locales
import en from './translation/en.json';
import ja from './translation/ja.json';

window.axios = require('axios');

Vue.config.productionTip = false;
require("@/assets/styles/styles.css");
Vue.use(DatetimePicker);
Vue.use(VueI18n);

const messages = {
  en,
  ja
};

const i18n = new VueI18n({
  locale: 'ja', 
  fallbackLocale: 'ja', 
  messages, 
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
