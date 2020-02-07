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
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'password-update', desc: '修改密码', href: './password-update.html'},
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
        for (let i = 0; i < length; i++) {
            if (navList[i].name === this.option.name) {
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