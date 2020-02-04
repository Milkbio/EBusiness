import '../iconfont/iconfont.css';

import '../css/common.less';

import util from 'util/util'

const header = {
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        const keyword = util.getUrlParam('keyword');
        if (keyword) $('#topSearch').val(keyword);
    },
    bindEvent() {
        $('#topSearchBtn').click(() => {
            this.submit();
        })
        $('#topSearch').on('keyup', e => {
            if (e.which === 13) {
                this.submit();
            }
        })
    },
    // 搜索提交
    submit() {
        const keyword = $.trim($('#topSearch').val());
        if (keyword) window.location.href = `./list.html?keyword=${keyword}`;
        else util.goHome(); // 没有keyword就回首页
    }
}

header.init();