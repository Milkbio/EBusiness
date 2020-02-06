import util from 'util/util';

export default {
    // 用户登录
    login(data) {
        return new Promise((resolve, reject) => {
            util.request({
                type: 'POST',
                url: util.getServerUrl('/user/get_user_info.do'),
                data,
                success: resolve,
                error: reject
            })
        });
    }
}