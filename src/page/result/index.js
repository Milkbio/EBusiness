import 'assets/js/common';

import './css/index.less';

import util from 'util/util'

const type = util.getUrlParam('type');
const config = {
    register: '注册',
}
$('#type').text(config[type]);