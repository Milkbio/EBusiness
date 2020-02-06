import 'assets/js/common';

import './css/index.less';

import util from 'util/util';
import api from 'api/api';

const register = {
    isRegistered: { // 标明用户名是否已被注册
        status: false,
        msg: ''
    },
    init() {
        this.bindEvent();
    },
    bindEvent() {
        $('#register').click(() => {
            this.submit();
        });
        // 失去焦点进行验证
        $('#username').blur(e =>{
            const username = $.trim($(e.target).val());
            if (username) {
                api.checkUsernameAvailable(username).then(res => {
                    // 如果没被注册
                    this.isRegistered = {
                        status: false,
                        msg: ''
                    };
                    this.hideError();
                }).catch(err => {
                    this.isRegistered = {
                        status: true,
                        msg: err
                    };
                    this.renderError(err);
                });
            };
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
        if (formData.password.length < 6) {
            result.msg = '密码最少为6位';
            return result;
        };
        if (formData.password !== formData.cfmPassword) {
            result.msg = '两次输入的密码不一致';
            return result;
        };
        if (!util.validate(formData.phone, 'phone')) {
            result.msg = '请输入正确手机号';
            return result;
        };
        if (!util.validate(formData.mail, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        };
        if (!util.validate(formData.question, 'require')) {
            result.msg = '问题不能为空';
            return result;
        };
        if (!util.validate(formData.answer, 'require')) {
            result.msg = '答案不能为空';
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
        const cfmPassword = $.trim($('#cfmPassword').val());
        const phone = $.trim($('#phone').val());
        const mail = $.trim($('#mail').val());
        const question = $.trim($('#question').val());
        const answer = $.trim($('#answer').val());
        const formData = {username, password, cfmPassword, phone, mail, question, answer};

        const validateRes = this.formValidate(formData);
        if (validateRes.status && !this.isRegistered.status) {
            // 成功
            api.register(formData).then(res => {
                window.location.replace(`./result.html?type=register`);
            }).catch(err => {
                this.renderError(err);
            });
        } else if (this.isRegistered.status) {
            // 被注册过
            this.renderError(this.isRegistered.msg);
        } else {
            // 验证失败
            this.renderError(validateRes.msg);
        }
    }
};

register.init();