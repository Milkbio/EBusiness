class Slider {
    constructor (options) {
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
    init () {
        const num = this.slideItems.length;
        this.slideItems.width(this.slideWidth);
        this.slider.width(num * this.slideWidth);
        this.generateIndicator();
        this.move();
        this.hack();
    }
    hack() {
        $(window).on('focus', () => {
            this.move();
        })
        $(window).on('blur', () => {
            clearInterval(this.timer);
        })
    }
    generateIndicator() {
        this.indicatorBox = $('<div class="indicator-box">');
        const indicatorWrap = $('<div class="indicator-wrap">');
        for (let i = 0; i < this.slideItems.length; i++) {
            const indicator = $('<div class="indicator">');
            if (i === 0) indicator.addClass('active');
            indicatorWrap.append(indicator);
        }
        this.indicatorBox.append(indicatorWrap);
        this.el.append(this.indicatorBox)
    }

    move() {
        this.timer = setInterval(() => {
            this.index++;
            if (this.index >= this.slideItems.length ) {
                this.index = 0;
            }
            this.indicatorBox.find('.indicator').removeClass('active');
            this.indicatorBox.find('.indicator').eq(this.index).addClass('active');
            this.slider.animate(
                {marginLeft: `-${this.index * this.slideWidth}px`},
                800
            );
        }, this.speed);
    }
}

export default Slider;