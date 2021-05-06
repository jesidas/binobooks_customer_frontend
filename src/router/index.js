import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Goods from "../components/goods/Goods.vue";
import Welcome from "../components/Welcome.vue";
import Customize from "../components/goods/Customize.vue";
import Cate1 from "../components/goods/0-3.vue";
import Cate2 from "../components/goods/3-6.vue";
import Cate3 from "../components/goods/7.vue";
import Preview from "../components/goods/Preview.vue"
import Cart from "../components/Cart.vue"
import Confirm from "../components/goods/Confirmation.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: "/books", component: Goods },
      { path: "/customize", component: Customize},
      { path: "/1-1", component: Cate1},
      { path: "/2-2", component: Cate2},
      { path: "/3-3", component: Cate3},
      { path: "/preview", component: Preview},
      { path: "/cart", component: Cart},
      { path: "/confirmation", component: Confirm},



    ]
  },

  
];

const router = new VueRouter({
  routes
});

export default router;
