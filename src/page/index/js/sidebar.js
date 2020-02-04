import util from 'util/util'

const sidebar = {
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        const keyword = util.getUrlParam('keyword');
        if (keyword) {
            $('#topSearch').val(keyword);
        }
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
};

sidebar.init();