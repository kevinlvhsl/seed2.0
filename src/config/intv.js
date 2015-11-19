Intv.config = {
    debug: !App.isProd,

    // 电视台ID
    tvId: 10050,

    // 电视台url
    tvUrl: 'http://app.intv.com.cn/yaojs',

    // 节目名称
    programName: '',

    // 一键关注Id
    subscribeAppid: '',

    // 一键关注bar的颜色类型，1灰色，2白色。默认是灰色。
    subscribeType: 1,

    // 授权Id
    authorizeAppid: 'wx5b61d6be7792dfcd',

    // baseUrl
    baseUrl: (!App.isProd) ? 'http://app.myintv.com.cn/yaojs/mp_rec/' : 'http://app.intv.com.cn/yaojs/mp_rec/' ,

    // 分享
    // shareLogo: 'http://s1.myintv.com.cn/yaojs/mp_rec/images/share.jpg',
    // shareTitle: '有明星有抽奖！尽在东方卫视《今天吃什么》！',
    // shareDesc: '每周二晚9点20分，锁定东方卫视《今天吃什么》，参与电视摇一摇，就有机会赢取好礼！',
    // shareLink: 'http://yaotv.qq.com/shake_tv/auto/24i0h2tig8pya9t/index.html#wechat_redirect',

    // 是否自动一键关注 默认开启
    isOpenSubscribe: false,

    // 是否自动用户授权 默认开启
    isOpenAuthorize: false,
}

// 横屏判断提示返回竖屏
window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
    if (window.orientation === 180 || window.orientation === 0) { // 竖屏状态！
        $('.transverse').hide();
    }

    if (window.orientation === 90 || window.orientation === -90) { // 横屏状态！
        $('.transverse').show();
    }

}, false)
