/**
 * @file router 配置文件
 *
 * @author CK
 */

var VueRouter = require('vue-router');
var Vue = require('vue');

Vue.use(VueRouter);
Vue.config.debug = true;

var router = new VueRouter({
    saveScrollPosition: true
});

router.map({
    '/user': {
        component: function (resolve) {
            require(['./user'], resolve);
        }
    },
    '/role': {
        component: function (resolve) {
            require(['./role'], resolve);
        }
    },
});

router.start({}, '#app');

window.router = router;

