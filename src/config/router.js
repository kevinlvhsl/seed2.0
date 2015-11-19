export function configRouter(router) {
    router.map({
        '/index': {
            component: require('../views/index.vue')
        },

        '*': {
            component: require('../views/' + App.defaultView + '.vue')
        },

    })

    router.beforeEach((transition) => {
        window.scrollTo(0, 0)
        transition.next()
    })

    router.afterEach((transition) => {
        // console.log('after'+transition.to.path)
    })
}
