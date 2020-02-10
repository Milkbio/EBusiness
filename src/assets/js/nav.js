import util from 'util/util';

const template = `
            {{if !id}}
            <span class="is-login">
                <a class="text-primary" href="./login.html" id="login">登录</a>
                <a class="text-primary" href="./register.html" id="register">注册</a>
            </span>
            {{/if}}
            {{else}}
            <span class="not-login" hidden>
                <span>欢迎，<a href="./userCenter.html" class="text-primary">{{username}}</a></span>
                <a class="text-muted" href="./index.html" id="logout">退出</a>
            </span>
            {{/else}}
`;

const nav = {
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        // 渲染左上角
        /*const html = util.renderHTML(template, this.option);
        $('#topNavLeft').html(html);*/
    },
    bindEvent() {

    }
};

nav.init();