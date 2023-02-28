/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "./bootstrap";
import { createApp } from "vue";

import store from "./store/store";

import App from "./components/App.vue";

import { ZiggyVue } from "/vendor/tightenco/ziggy/dist/vue.es.js";
import { Ziggy } from "./ziggy";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});

app.component("App", App);

app.use(store);

app.use(ZiggyVue, Ziggy);

app.use(ElementPlus);

app.use(router);

route("home", undefined, undefined, Ziggy);

// app.config.globalProperties.$axios = axiosInstance;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount("#app");
