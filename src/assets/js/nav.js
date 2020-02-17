import util from 'util/util';

const template = `
            {{if !id}}
            <span class="is-login">
                <a class="text-primary" href="./login.html" id="login">登录</a>
                <a class="text-primary" href="./register.html" id="register">注册</a>
            </span>
            {{else}}
            <span class="not-login">
                <span>欢迎，<a href="./userCenter.html" class="text-primary">{{username}}</a></span>
                <a class="text-muted" href="./index.html" id="logout">退出</a>
            </span>
            {{/if}}
`;

const nav = {
  init() {
    this.onLoad();
  },
  onLoad() {
    const userInfo = util.getLocalStorage('userInfo');
    if (userInfo) {
      const html = util.renderHTML(template, userInfo);
      $('#topNavLeft').html(html);
    }
  },
  bindEvent() {

  }
};

nav.init();