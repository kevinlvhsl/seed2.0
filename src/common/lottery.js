import Request from './request.js'
import Session from '../store/sessionstorage.js'

console.log('抽奖模块wiki:' + 'http://wiki.myintv.com.cn/doku.php?id=%E6%8A%80%E6%9C%AF:%E5%B9%B3%E5%8F%B0:%E6%8E%A5%E5%8F%A3:%E5%AE%9E%E7%89%A9%E6%8A%BD%E5%A5%96%E6%A8%A1%E5%9D%97:api%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3');
const defaultConfig = {
    drawID: 0,
    appKey: '',
    toLogin: true,
    rootPath: '/yao/feature-api-lottery/lottery/'
}

export default class Lottery extends Request{
    constructor(options) {
        super(defaultConfig.rootPath)

        // 合并config
        this.config = defaultConfig
        Object.assign(this.config, options)

        this.getParams = '?drawid=' + this.config.drawID + '&appid=' + Intv.config.authorizeAppid
    }

    // 获取时间轴
    getTimeline(options, success, error) {
        this.getData('get-times-by-time', options, success, error);
    }

    // 抽奖排名
    getRank(options, success, error) {
        this.getData('lottery-rank', options, success, error);
    }

    // 奖品列表
    getPrizeList(options, success, error) {
        this.getData('lottery-details', options, success, error);
    }

    // 获取我的中奖列表
    getMyPrizes(options, success, error) {
        this.getData('get-lottery-member', options, success, error);
    }

    // 地址等信息提交
    memberinfo(options, success, error) {
        // let prize = Session.prize.get();
        let prize = new Session('prize')

        options.type = 'POST';
        options.url = '/yao/feature-api-lottery/lottery/memberinfo?id=' + prize.id + '&appid=' + Intv.config.authorizeAppid;
        App.ajax(options, success, error);

    }

    // 抽奖
    draw(options, success, error) {
        this.getData('index', options, success, error);
    }

    // 获取用户中奖信息 (跑马灯)
    getAwardList(options, success, error) {
        console.log('此接口：仅支持，实物，卡券 ，红包~');
        this.getData('get-lottery-marquee', options, success, error);
    }

    // 倒计时
    startTick(timeline, onTick) {

        // 如果已经有timer再运行的话，清除
        if (this.timelineTimer) {
            clearInterval(this.timelineTimer);
        }

        let tickCallback, timeSpan, timer, sysTime;

        sysTime = Math.floor(Date.now() / 1000);

        // 剩余抽奖时间倒计时回调
        let inProgressCallback = function() {
            let timeNow = Math.floor(Date.now() / 1000),
            timeTemp = timeNow - sysTime;

            if (timeTemp >= 2) {
                // 时间需要修正
                timeSpan = timeSpan - timeTemp - 1;
            } else {
                timeSpan--;
            }

            sysTime = timeNow;

            // if( (--timeSpan) <= 0 ){
            if (timeSpan <= 0) {

                onTick({
                    state: 'over', tick: ''
                });
                clearInterval(timer);
                return;
            }

            onTick({
                state: 'ongoing', tick: timeSpan
            });
        };

        // 检查抽奖是否开始
        if (timeline.nowTime < timeline.startTime) {

            // 抽奖未开始
            timeSpan = timeline.startTime - timeline.nowTime;
            tickCallback = function() {
                let timeNow = Math.floor(Date.now() / 1000),
                timeTemp = timeNow - sysTime;

                if (timeTemp >= 2) {
                    // 时间需要修正
                    timeSpan = timeSpan - timeTemp - 1;
                } else {
                    timeSpan--;
                }

                sysTime = timeNow;

                // if( (--timeSpan) <= 0 ){
                if (timeSpan <= 0) {
                    // 开始剩余时间倒计时
                    timeSpan = timeline.endTime - timeline.startTime;
                    tickCallback = inProgressCallback;

                    onTick({
                        state: 'to-ongoing', tick: timeSpan
                    });
                    return;
                }

                onTick({
                    state: 'waiting', tick: timeSpan
                });
            };
        }

        // 判断抽奖是否正在进行
        else if (timeline.nowTime < timeline.endTime) {

            // 抽奖已开始，正在进行中
            timeSpan = timeline.endTime - timeline.nowTime;

            // timeSpan = 10;
            tickCallback = inProgressCallback;

            onTick({
                state: 'to-ongoing', tick: timeSpan
            });
        } else {

            // 抽奖已经结束
            onTick({
                state: 'over', tick: ''
            });
        }

        if (!tickCallback) {
            return
        }

        tickCallback();
        timer = setInterval(function() {
            tickCallback();
        }, 1000);

        this.timelineTimer = timer;
    }

}
