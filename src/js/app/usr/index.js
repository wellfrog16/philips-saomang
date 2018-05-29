// 剧本

define([
    'text!../components/usr/index.html!strip',
    'createjs',
    'jquery',
    'jquery.hammer',
    'helper/rivers',
    'utils/sword'],
(html, createjs, $) => {
    const world = myWorld;
    const river = {};

    // 挂载
    river.mount = function() {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find('.usr-index');

            this.bind();
        }
    };

    let isPlaying = false;

    river.bind = function() {
        this.$root.find('.icon').hammer().on('tap', () => {
            if (isPlaying) {
                createjs.Sound.stop('voice');
                isPlaying = false;
                this.$root.find('.icon').removeClass('icon-play').addClass('icon-stop');
            } else {
                createjs.Sound.play('voice');
                isPlaying = true;
                this.$root.find('.icon').removeClass('icon-stop').addClass('icon-play');
            }
        });
    };

    river.show = () => {
        river.$root.show();
    };

    river.hide = () => {
        river.$root.hide();
    };

    // 销毁
    river.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    world.rivers.$index = river;
    return river;
});
