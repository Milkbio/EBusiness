import 'assets/js/common';

import './css/index.less';

import util from 'util/util';
import api from 'api/api';

const login = {
    init() {
        this.bindEvent()
    },
    bindEvent() {
        $('#login').click(() => {
            this.submit();
        });
        $('#password').keyup(e => {
            if (e.which === 13) this.submit();
        })
    },
    //表单验证
    formValidate(formData) {
        let result = {
            status: false,
            msg: ''
        };
        if (!util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        };
        if (!util.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        };

        result = {status: true, msg: '验证通过'};
        return result;
    },
    // 显示渲染错误信息
    renderError(errMsg) {
        $('.error-msg').show();
        $('#errMsg').text(errMsg);
    },
    // 隐藏错误信息
    hideError() {
        $('.error-msg').hide();
        $('#errMsg').text('');
    },
    // 提交表单
    submit() {
        const username = $.trim($('#username').val());
        const password = $.trim($('#password').val());
        const formData = {username, password};
        const validateRes = this.formValidate(formData);
        if (validateRes.status) {
            // 成功
            api.login(formData).then(res => {
                const redirect = util.getServerUrl('redirect') || './index.html';
                util.linkTo(redirect);
            }).catch(err => {
                this.renderError(err);
            });
        } else {
            // 验证失败
            this.renderError(validateRes.msg);
        }
    }
};

login.init();