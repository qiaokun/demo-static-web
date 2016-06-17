/**
 * @file 顶部提示框组件
 *
 * @author CK
 */

require('./index.less');

var util = require('../util');

module.exports = require('VueModel').getComponent({
    ready: function () {
        this.init();
    },
    template: require('./index.tpl.html'),
    data: function () {
        return {
        };
    },
    events: {
        showTopTip: function (opts) {
            var msg;
            if (typeof opts === 'string') {
                msg = opts;
            }
            else {
                msg = opts.msg;
            }
            $(this.$els.jContent).html(msg).hide().fadeIn();

            if (this.showId) {
                clearTimeout(this.showId);
            }

            var me = this;
            var timeout = opts.timeout || 5000;
            if (timeout > 0) {
                this.showId = setTimeout(function () {
                    $(me.$els.jContent).fadeOut('slow');
                }, timeout);
            }

            $(this.$el).show();

            if (window !== parent) {
                var top = Math.max($(parent.window).scrollTop() - 75, 0);
                $(this.$el).css({
                    top: top
                });
            }
        }
    },
    methods: {
        init: function () {
            if (window !== parent) {
                util.simulaIframeFixed($(this.$el), -75);
            }
        }
    }
});
