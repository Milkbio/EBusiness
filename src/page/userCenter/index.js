import 'assets/js/common'
import './css/index.less'

import 'assets/js/nav';
import 'assets/js/header';
import 'assets/js/sidebar';

import util from 'util/util';
import api from 'api/api';

const userCenter = {
  init() {
    this.onLoad()
  },
  onLoad() {
    this.loadUserInfo();
  },
  loadUserInfo() {
    api.getUserInfo().then(res => {
      $('#username').text(res.username);
      $('#phone').text(res.phone);
      $('#email').text(res.email);
      $('#question').text(res.question);
      $('#answer').text(res.answer);
    })
  }
};
userCenter.init();


