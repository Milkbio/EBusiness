import $ from 'jquery'

module.exports = {
    // 网络请求
    request: param => {
        $.ajax({
            type: param.method || 'get',
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
    // 统一登录处理
    toLogin: () => {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`;
    }
}