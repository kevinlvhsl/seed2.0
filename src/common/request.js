export default class Request {
    getParam
    constructor(rootPath) {
        this.rootPath = rootPath
    }

    filterArgs(options) {
        options.cache = options.cache === true;
        options.loading = options.loading === true;

        if (typeof options.toLogin === 'undefined') {
            options.toLogin = this.config.toLogin;
        }
    }

    // 公共方法
    getData(api, options= {}, success, error) {
        this.filterArgs(options);
        options.url = this.rootPath + api + this.getParams;

        success && (options.success = success);
        error && (options.error = error);

        if (options.success) {
            App.ajax(options);
        } else {
            console.log('you don\'t set success option for this ajax request');
        }

    }
}
