class Slider {
  constructor(options) {
    this.el = $(options.el); // 根节点
    this.speed = options.speed || 1200;
    this.slider = this.el.find('.slider'); // 轮播的节点
    this.indicatorBox = null; // 底部indicator
    this.slideItems = this.slider.find('.slide-item');
    this.slideWidth = this.el.width(); // 一个slide的宽度
    this.index = 0; // 记录当前滑动到第几个
    this.timer = null; // 定时器
    this.init();
    options.callback && options.callback();
  }

  init() {
    const num = this.slideItems.length;
    this.slideItems.width(this.slideWidth);
    this.slider.width(num * this.slideWidth);
    this.generateIndicator();
    this.generateArrows();
    this.move();
    this.el.hover(() => clearInterval(this.timer), () => this.move());
    this.resolveException();
  }

  // 处理切换窗口时定时器的异常
  resolveException() {
    $(document).on('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.move();
      } else {
        clearInterval(this.timer);
      }
    })
  }

  // 根据slide的数量生成相应数量的底部小圆点，并绑定事件
  generateIndicator() {
    this.indicatorBox = $('<div class="indicator-box">');
    const indicatorWrap = $('<div class="indicator-wrap">');

    for (let i = 0; i < this.slideItems.length; i++) {
      const indicator = $('<div class="indicator">');
      if (i === 0) indicator.addClass('active');
      indicator.on('click', this.indicatorClickFn.bind(this));
      indicatorWrap.append(indicator);
    }

    this.indicatorBox.append(indicatorWrap);
    this.el.append(this.indicatorBox)
  }

  indicatorClickFn(e) {
    const index = $(e.target).index();
    this.index = index;
    this.moveFn(index);
  }

  leftArrowClickFn(e) {
    this.index--;
    if (this.index <= 0) {
      this.index = this.slideItems.length - 1;
    }
    this.moveFn(this.index);
  }

  rightArrowClickFn(e) {
    this.index++;
    if (this.index >= this.slideItems.length) {
      this.index = 0;
    }
    this.moveFn(this.index);
  }

  // 生成左右箭头，并绑定事件
  generateArrows() {
    const leftArrowBox = $('<div class="left-arrow-box">');
    const leftArrow = $('<div class="iconfont icon-xiangzuo1">');
    leftArrowBox.append(leftArrow);
    leftArrowBox.on('click', this.leftArrowClickFn.bind(this));

    const rightArrowBox = $('<div class="right-arrow-box">');
    const rightArrow = $('<div class="iconfont icon-xiangyou1">');
    rightArrowBox.append(rightArrow);
    rightArrowBox.on('click', this.rightArrowClickFn.bind(this));

    this.el.append(leftArrowBox);
    this.el.append(rightArrowBox);
  }

  moveFn(index) {
    this.indicatorBox.find('.indicator').removeClass('active');
    this.indicatorBox.find('.indicator').eq(index).addClass('active');
    this.slider.animate(
      {marginLeft: `-${index * this.slideWidth}px`},
      800
    );
  }

  move() {
    this.timer = setInterval(() => {
      this.index++;
      if (this.index >= this.slideItems.length) {
        this.index = 0;
      }
      this.moveFn(this.index);
    }, this.speed);
  }
}

export default Slider;