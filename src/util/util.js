import qs from 'qs';
import ArtTemplate from 'art-template/lib/template-web';

const config = {
  serverHost: ''
};

module.exports = {
    // 网络请求
    request: param => {
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true    // 要在这里设置上传cookie
            },
            data: param.data || '',
            success: res => {
                if (res.code === 0) { // 请求成功
                    typeof param.success === 'function' && param.success(res.data, res.message);
                } else if (res.code === 10) { // 无权限，需要登录
                    this.toLogin()
                } else if (res.code === -1) { // 错误
                    typeof param.error === 'function' && param.error(res.message);
                }
            },
            error: err => {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    // 获取服务器地址
    getServerUrl: path => config.serverHost + path,
    // 获取url参数
    getUrlParam: name => {
        const data = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        return data[name];
    },
    /**
     * @param htmlTemplate html模板字符串
     * @param data 需要被渲染的数据
     * @returns html字符串
     */
    renderHTML: (htmlTemplate, data) => {
        const render = ArtTemplate.compile(htmlTemplate);
        return render(data);
    },
    // 字段的验证，支持是否为空，手机，邮箱
    validate: (value, type) => {
        const val = $.trim(value);
        // 非空验证
        if (type === 'require') return !!val
        //手机号验证
        if (type === 'phone') return /^1\d{10}$/.test(val);
        // 邮箱验证
        if (type === 'email') return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
    },
    // 统一登录处理
    toLogin: () => {
        this.linkTo(`./login.html?redirect=${encodeURIComponent(window.location.href)}`);
    },
    // 返回首页
    goHome: () => {
        this.linkTo(`./index.html`);
    },
    linkTo: (url) => {
        window.location.href = url
    },
    // localStorage存储
    setLocalStorage(key, value) {
        const data = typeof value === 'object' ? JSON.stringify(value) : value;
        window.localStorage.setItem(key, data)
    },
    getLocalStorage(key) {
        return JSON.parse(window.localStorage.getItem(key));
    }
}