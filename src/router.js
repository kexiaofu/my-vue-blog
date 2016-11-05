import Vue from 'Vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//Vue.http.options.emulateJSON = true;
/* eslint-disable no-new */
var router = new VueRouter();
var RouterApp = Vue.extend({});
router.map({ //定义路由映射
    '/home/:paging': { //访问地址
        name: 'home', //定义路由的名字。方便使用。
        component: function(re) {
            require(['./views/home'], re)
        } //引用的组件名称，对应上面使用`import`导入的组件
            //component:require("components/app.vue")//还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观
    },
    '/tech/:paging': {
        name: 'tech',
        component: function(re) {
            require(['./views/tech'], re)
        }
    },
    '/life/:paging': {
        name: 'life',
        component: function(re) {
            require(['./views/life'], re)
        }
    },
    '/signup': {
        name: 'signup',
        component: function(re) {
            require(['./views/signup'], re)
        }
    },   
    '/admin': {
        name: 'admin',
        component: function(re) {
            require(['./views/admin'], re)
        }
    },
    '/iedit/:todo/:pid':{
        name:'iedit',
        component:function(re){
            require(['./views/iedit'],re)
        }
    },
    'passage/:pid': {
        name: 'tpassage',
        component: function(re) {
            require(['./views/passage'], re)
        }
    }
});
router.redirect({
    '*': '/home/1'
})
router.start(RouterApp, "#router");
window.router = router;