import { createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import { isAuthenticated } from "@/utils/Auth";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next({ name: 'Orders'})
      } else {
        next()
      }
    } 
  },
  
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
  },

  {
    path: "/order/:id",
    component: () => import("../views/Single.vue"),
    name: "Single",
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
  else next()
})

export default router;
