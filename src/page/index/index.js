import 'assets/js/common'
import './css/index.less'

import 'assets/js/nav';
import 'assets/js/header';
import 'assets/js/sidebar';

import Slider from 'util/slider';

const slider = new Slider({
  el: '#bannerSlider',
  speed: 4000,
  callback: () => {
    $('.fs .icon-loading').hide();
  }
})
