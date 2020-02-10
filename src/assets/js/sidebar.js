import util from 'util/util'
const template = `
    {{each navList value i}}
        <li class="{{value.isActive ? 'sidebar-item active' : 'sidebar-item'}}">
            <a href="{{value.href}}" class="link">{{value.desc}}</a>
        </li>
    {{/each}}
`;

const sidebar = {
    option: {
        navList: [
            {name: 'userCenter', desc: '个人中心', href: './userCenter.html'},
            {name: 'orderList', desc: '我的订单', href: './orderList.html'},
            {name: 'passwordUpdate', desc: '修改密码', href: './passwordUpdate.html'},
            {name: 'about', desc: '关于EBusiness', href: './about.html'}
        ]
    },
    init(option) {
        $.extend(this.option, option);
        this.render();
    },
    render() {
        // 计算active数据
        const {navList} = this.option;
        const length = navList.length;
        const match = window.location.href.match(/\/(\w+)\.html/); // match[0]为匹配到的全部字符,match[1]为匹配到的子串
        for (let i = 0; i < length; i++) {
            if (navList[i].name.indexOf(match[1]) > -1) {
                navList[i].isActive = true;
            };
        };
        // 渲染list数据
        const html = util.renderHTML(template, this.option);
        $('.sidebar').html(html);
    }
};
sidebar.init();
module.exports = sidebar;