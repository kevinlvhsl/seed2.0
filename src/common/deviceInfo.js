
let isWechat6_0 = () => {

    let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)

    let result = true

    if (!wechatInfo) {
        console.log('本活动仅支持微信') ;
        result = false;
    } else if (wechatInfo[1] < '6.0') {
        console.log('本活动仅支持微信6.0以上版本') ;
        result = false;
    }

    return result
}

export const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

export const isWechat6 = isWechat6_0()

// shorter version by regular expression without hint message
// export const isWechat6 = !!(navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) && navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)[1] > '6.0')
