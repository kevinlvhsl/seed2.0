require('./config/intv.js')

import { configRouter } from './config/router'
const app = Vue.extend(require('./components/app.vue'))
const router = new Router({
    hashbang: false
})

Vue.use(Router)
App.defaultView = 'index'
configRouter(router)

router.start(app, '#app')

App.router = router