import $ from 'jquery'
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
            data: param.data || '',
            success: res => {
                if (res.status === 0) { // 请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (res.status === 10) { // 无权限，需要登录
                    this.toLogin()
                } else if (res.status === 1) { // 错误
                    typeof param.error === 'function' && param.error(res.msg);
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
    // 统一登录处理
    toLogin: () => {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`;
    }
}