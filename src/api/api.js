import util from 'util/util';

export default {
    // 用户登录
    login(data) {
        return new Promise((resolve, reject) => {
            util.request({
                method: 'POST',
                url: util.getServerUrl('/api/user/get_user_info.do'),
                data,
                success: resolve,
                error: reject
            })
        });
    }
}