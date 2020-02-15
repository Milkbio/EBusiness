import util from 'util/util';

export default {
    // 用户登录
    login(data) {
        return new Promise((resolve, reject) => {
            util.request({
                method: 'POST',
                url: util.getServerUrl('/api/user/login'),
                data,
                success: resolve,
                error: reject
            })
        });
    },
    // 检查用户名是否被注册
    checkUsernameAvailable(username) {
        return new Promise((resolve, reject) => {
            util.request({
                method: 'POST',
                url: util.getServerUrl('/api/user/check_valid'),
                data: {
                    type: 'username',
                    str: username
                },
                success: resolve,
                error: reject
            })
        });
    },
    // 用户注册
    register(data) {
        return new Promise((resolve, reject) => {
            util.request({
                method: 'POST',
                url: util.getServerUrl('/api/user/register'),
                data,
                success: resolve,
                error: reject
            })
        });
    },
    // 获取用户信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            util.request({
                method: 'POST',
                url: util.getServerUrl('/api/user/get_information'),
                success: resolve,
                error: reject
            })
        });
    }
}