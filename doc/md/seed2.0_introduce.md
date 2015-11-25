融云seed2.0框架介绍
======

## [TOC](id:top)
+ [introduction](#introduction) 前言
+ [framework](#framework) 技术架构
+ [directory](#directory) 目录结构
+ [particular](#particular) 详细








## [introduction](id:introduction) 前言 ##

本文档旨在各位前端小伙伴能更快的熟悉框架结构及配置，更快利用这锋利的刀刃。


## [framework](id:framework) 技术架构 ##


+ **打包工具：** [webpack](http://webpack.github.io/)、 [gulp](http://gulpjs.com/) 
+ **基础代码封装：**[seed2.0.js](http://wiki.myintv.com.cn/doku.php?id=%E6%8A%80%E6%9C%AF:%E5%89%8D%E7%AB%AF:%E5%89%8D%E6%AE%B5%E8%A7%84%E8%8C%83:%E5%9F%BA%E7%A1%80%E7%AF%87)、sass




## [directory](id:directory) 目录结构 ##



以下为项目目录的固定文件(如有需要可以自行增加文件夹如：theme、test等等)
此处目录结构简介，具体作用及配置方法见 [详细](#particular)

    node_modules
    static                     *--编译后目录*
        images                 *--图片*
        build.js               *--编译后总js文件*
        build.js.map           *--压缩后*
    src
        common                 *--公共js(mixin、过滤器)*
        components             *--页面组件*
        config                 *--路由、全局配置文件*
        images                 *--图片*
            slice              *--雪碧图*
        plugin                 *--引入的插件*
        sass                   *--sass文件目录*
            animations         *--动画库*
            base               *--公共样式及sass配置*
            components         *--页面组件的sass*
            theme              *--主题*
            utils              *--sass工具方法mixin等*
            views              *--页面sass文件*
            main.css           *--编译后的主css文件*
            main.sass          *--入口sass文件*
        store                  *--本地存储操作*
            basestore.js       *--存储父类*
            localstroge.js     *--本地持久存储*
            sessionStorage.js  *--session存储*
        views                  *--所有页面的单独js文件*
        main.js                *--主入口js文件*
    .gitignore                 *--git忽略列表文件*
    gulpfile.js                *--gulp配置文件*
    inas.html                  *--统计配置*
    index.dev.html             *--debug首页*
    index.html                 *--首页*
    package.json               *--依赖包及命令配置文件*
    README.md                  *--readme*
    sass.handlebars            *--雪碧图格式配置文件*
    template.html
    webpack.config.js          *--webpack打包配置文件*
    wechat.zip


## [particular](id:particular) 详细 ##


**详细解读src目录下文件夹及特定文件作用  (以节目单program为例)**

+ [src目录](#src)
+ [package依赖](#package)
+ [webpack打包](#webpack)
+ [gulp打包](#gulp)

----

### [src](id:src) 

### src/components/App.vue ###
-----

该文件为vue文件的容器，所有页面公用的组件或页面元素可以写到这里.


模板区域
示例：
```
    <style lang="sass" src="../sass/main.sass"></style>
    <template lang="jade">
        #app(:class="{ditui: program.isDituiUser}")
            router-view.view(
                v-bind:program = 'program'
                v-bind:recommend = 'recommend'
                v-bind:cd = 'countdown')
            .copyright
                p 本页面由江苏卫视提供·融云科技技术支持
    </template>
```

>`style lang=sass`  在这里引入整个项目的主sass文件(windows的引入main.css)
 `template`：为页面模板容器，将作为index首页app的内容显示到页面
 `#app`:是页面父元素，页面id，class
 `router-view`：中心路由渲染组件 [详情见vue-router](http://router.vuejs.org/zh-cn/view.html)

示例：
```
    <script>
    import { runZone, getNowProgram } from '../common/timeline'
    export default {
        data () {
            return {
                now: App.prog.nowTime,
                recommend: App.prog.prog.rcmd,
                // code...
                lotteryTimeLine: App.prog.lotteryTimeLine,
                countdown: {
                    // code...
                },
            }
        },
        methods: {
            _timeline () {
                let run = () => {
                    this.now ++
                    // code...
                }
            },
        },
        computed: { 
        },
        components: {
        },
        ready () {
            this._timeline()
            App.hideLoading()
        }
    }
```
>`import`: es6引入变量或模块的方法 与css中import有类似效果
>`export default` **[建议写法]**:  每个模块默认导出vue实例对象
[vue1.0教程](http://cn.vuejs.org/guide/)
>   `data ()`： vue的data对象 以函数的形式返回
>   `methods`：vue的methods对象，所有方法绑定在vue实例下
>   `computed`： vue实例实例计算属性
>   `components`：页面组件引入（定义在components目录下的组件）
>   `ready()`： 生命周期方法(上下文为vm实例，页面元素已插入文档后执行相当于jquery的ready)


### src/config/intv.js ###
-----

该文件为项目的业务配置文件


```
Intv.config = {
    debug: false, // debug: !App.isProd,
    tvId: 10050, // 电视台ID
    tvUrl: 'http://app.intv.com.cn/yaojs', // 电视台url
    programName: 'jsjmd',    // 节目名称
    subscribeAppid: 'wxca9de9df38b0951e',    // 一键关注Id
    subscribeType: 1,    // 一键关注bar的颜色类型，1灰色，2白色。默认是灰色。
    authorizeAppid: 'wx616a53b99103dec2',    // 授权Id
    // 分享
    share: {
        logo: "http://s1.myintv.com.cn/yaojs/program2/src/images/share-logo.png",
        title: "美好的一天，有江苏卫视全天相伴",
        description: "来看看今天都有什么好节目吧",
        link: location.href.split('#')[0]
    },
    // cdnPath
    cdnPath: 'http://s1.myintv.com.cn/yaojs/program2',
}
```

>`Intv`：全局对象，一般不要直接在上面加属性
 `config`：配置对象，一般将项目有关id、授权id等等配置到此处


### src/config/router.js ###
-----

该文件为项目的中心路由配置文件


示例：
```
    export function configRouter(router) {
        router.map({
            '/index': {
                component: require('../views/index.vue')
            },
            '/recommend': {
                component: require('../views/recommend.vue')
            },
            '/program': {
                component: require('../views/program.vue')
            },
            '*': {
                component: require('../views/' + App.defaultView + '.vue')
            },
        })
        router.beforeEach((transition) => {
            window.scrollTo(0, 0)
            inas.boot()
            transition.next()
        })
        router.afterEach((transition) => {
            // console.log('after'+transition.to.path)
        })
    }
```

>`configRouter`： 以函数形式返回路由模块(参数router，为路由对象实例) [实例创建方法](how_to_get_data_before_your_component.md)
>   `router.map`：配置路由规则
>   `/index`：表示匹配根路径下index页面(也就是src/view/下的index.vue,其他类似)
>   vue-router的api[详情见vue-router](http://router.vuejs.org/zh-cn/index.html)
>   `router.beforeEach`：全局的前置钩子函数，会在路由切换开始时调用
>   `router.afterEach`：全局的前置钩子函数，会在路由切换后调用

### src/sass目录 ###
----

目录下的animations、base、utils、与1.0版本意义相同，在此跳过


>components目录：为src/components下各组件同名(加下划线前缀)sass文件
                #cp-加组件名称
 ```
    #cp-countdown
        position: absolute
        top: 0
        left: 0
        z-index: 10
 ```
 views目录： 为src/views下vue文件同名(加下划线前缀)sass文件
 ```
    #cp-index
    padding-top: 28px
    .bg
        height: 100%
 ```
 views下文件已`#cp-`加页面名字
mian.sass文件： 所有页面及组件sass文件引入入口


```
@charset 'utf-8'
@import "base/config"

@import "utils/function"
@import "utils/mixin"
@import "utils/placeholder"

@import "base/base"

@import "components/sprite"
@import "components/title"
@import "components/countdown"

@import "views/index"
@import "views/lotteryAd"
@import "views/lotteryClock"

@import "theme/ditui"

// animations
@import "animations/slideDownRetourn"

```


### src/store ###
------------

该目录下为操作本地存储方法封装模块api


##### basestore.js
```
const _getExpireAt = Symbol('getExpireAt')
const _checkExpire = Symbol('checkExpire')
export default class Basestore {

    // BaseStore 构造函数
    // param:host->localStorage|seesionStorage
    // param:key->string         存储条目键值
    // param:lifttime->string    生命周期(D:天, H:小时，M:分钟）例如2天：2D
    constructor(host, key, lifetime) {
        this.host = host
        this.key = key
        this.lifetime = lifetime
        //code ....
    }
    get() {
        //code ....
    }
    set(data) {
        //code ....
    }
    remove() {
        this.host.removeItem(this.key)
    }
    setAttr(key, val) {
        //code ....
    }
    getAttr(key) {
        //code ....
    }
    [_checkExpire](item) {
        //code ....
    }
    [_getExpireAt]() {
        //code ....
    }
}
```
[es6语法详见:教程](http://es6.ruanyifeng.com/)
>`Symbol`：es6的新数据类型(定义一个永不重复的变量)
 `class Basestore`：定义一个类，es6
 `constructor`：es6类的构造函数
 `get,set,remove,getAttr`：封装操作本地存储
 `_checkExpire,_getExpireAt`：检查过期和获取过期时间

##### localstorage.js & sessionstorage.js

```
import Basestore from './basestore.js'

export default class Localstorage extends Basestore{
    constructor(key, expire= '1D') {
        super(localStorage, key, expire)
    }
}

export default class Localstorage extends Basestore{
    constructor(key, expire= '1D') {
        super(sessionStorage, key, expire)
    }
}
```

>`Localstorage extends Basestore`：继承basestorage并且设置默认过期时间为1天
>`Localstorage extends Basestore`：继承basestorage并且设置默认过期时间为1天


### src/main.js ###
-----

项目主入口文件

示例:
```
require('./config/intv.js')
require('./common/wechat.js')
import { configRouter } from './config/router'
import globalMixin from './common/globalMixin'
import filter from './common/filter'
import store from './store/index'

const app = Vue.extend(require('./components/app.vue'))
const router = new Router({
    hashbang: false
})

Vue.use(Router)
Vue.filter('secToDate', filter.secToDate)
Vue.filter('secToFullDate', filter.secToFullDate)
Vue.mixin(globalMixin)

App.router = router
App.defaultView = 'index'
configRouter(router)

store.getProgram(() => {
    router.start(app, '#app')
})

// inas
window.inas_var = Intv.config.programName
```

>`require,import`： 引入模块和一些变量
 `new Router`：实例化一个路由对象
 `Vue.use,filter,mixin`：注册全局插件，过滤器，mixin
 `App.defaultView = 'index'`：设置路由默认view，未匹配到这进入default
 `router.start`：启动一个启用了路由的应用。创建一个App的实例并且挂载到元素 #app


### [package依赖](id:package) ###
----

```
{
  "name": "program",
  "version": "1.0.0",
  "description": "program",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --inline --hot --host 0.0.0.0 --quiet & gulp",
    "build": "NODE_ENV=production webpack --progress --hide-modules",
    "build-dev": "NODE_ENV=dev webpack --progress --hide-modules",
    "unit": "./node_modules/karma/bin/karma start",
    "test": "npm run unit"
  },
  "author": "zhangzan",
  "license": "MIT",
  "homepage": "https://app.intv.com.cn/yao/vue-demo",
  "repository": {},
  "devDependencies": {
    "autoprefixer-loader": "^3.1.0",
    "babel-core": "^5.8.25",
    "babel-loader": "^5.3.2",
    "babel-runtime": "^5.8.25",
    "css-loader": "^0.21.0",
    "file-loader": "^0.8.4",
    "html-webpack-plugin": "^1.6.2",
    "image-webpack-loader": "^1.6.2",
    "jade": "^1.11.0",
    "jade-loader": "^0.7.1",
    "jasmine-core": "^2.3.4",
    "karma": "^0.13.15",
    "karma-chrome-launcher": "^0.2.1",
    "karma-jasmine": "^0.3.6",
    "karma-phantomjs-launcher": "^0.2.1",
    "karma-webpack": "^1.7.0",
    "node-sass": "^3.3.3",
    "phantomjs": "^1.9.18",
    "precss": "^1.2.3",
    "px2rem-loader": "^0.1.5",
    "sass-loader": "^3.0.0",
    "style-loader": "^0.13.0",
    "template-html-loader": "0.0.3",
    "vue-hot-reload-api": "1.2.0",
    "vue-html-loader": "^1.0.0",
    "vue-loader": "5.0.0",
    "webpack": "^1.12.2",
    "webpack-dev-server": "^1.12.0"
  }
}
```
>`name, version`：项目名称, 版本号
 `scripts`：打包脚本dev、build、build-dev
 `NODE_ENV=production`：production表示生产环境，dev表示开发环境
     npm run build : 编译整个项目
     npm run dev: 运行项目
 `devDependencies`：整个项目依赖的模块npm包



### [webpack打包](id:webpack) ###
----
```
var vue = require('vue-loader')
var webpack = require('webpack')
var cdn = 'static/'
var HtmlWebpackPlugin = require('html-webpack-plugin')
//如果是生产环境，则指定cdn为线上cdn
if (process.env.NODE_ENV === 'production') {
    cdn = 'https://s1.myintv.com.cn/yaojs/program2/static/'
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: cdn,
        filename: 'build.js',
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                // apply ES2015 transform to all JavaScript in *.vue files.
                // https://github.com/vuejs/vue-loader#advanced-loader-configuration
                loader: vue.withLoaders({
                    js: 'babel?optional[]=runtime&loose=all',
                    sass: 'style-loader!css-loader!px2rem?remUnit=16&remPrecision=8!autoprefixer-loader?{browsers:["android 4", "iOS 6"]}!sass-loader?indentedSyntax'
                })
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // not needed for normal installations
                exclude: /node_modules|vue\/src|vue-loader\//,
                loader: 'babel?optional[]=runtime&loose=all'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loaders: [
                    'file?name=images/[name].[ext]?[sha512:hash:base64:5]',
                    // 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
                hash: true,
                inject: false,
                template: 'template.html',
                filename: '../index.html'
        })
    ]
} else {
    module.exports.devtool = '#source-map'
}
```
>`entry: './src/main.js'`：指定入口js



### [gulp打包](id:gulp) ###
----

gulp部分同1.0版本，省略部分代码
```
var paths = {
    img: ['src/images/*.png', 'src/images/**/*'],
    sass: ['src/css/_sass/**/*','src/css/_sass/*'],
    sprite: ['src/images/slice/*', 'sass.handlebars'],
}

var output = {
    img: 'static/images',
    css: 'src/css',
}
gulp.task('watch', function() {
    // gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.sprite, ['sprite']);
});

// 默认任务
gulp.task('default', ['watch', 'sprite']);
```

>`paths`：指定sass、img、sprite的扫描目标和输出目的路径
 `output`：指定编译后输出文件路径


----

[回顶部目录](#top)
