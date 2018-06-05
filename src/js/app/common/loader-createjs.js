// createjs loader加载

define([
    'jquery',
    'createjs',
    'utils/frameplayer',
    'source',
    'text!../components/common/loader.html!strip',
    'helper/lakers',
    'utils/sword'],
($, createjs, frameplayer, source, htmlLoader) => {
    const world = myWorld;
    const laker = {};

    let callback = null;

    // 挂载
    laker.mount = function(cb) {
        callback = cb;

        this.preload();
    };

    // loader自己内容的预加载
    laker.preload = function() {
        const loader = createjsLoader();

        loader.on('complete', () => {
            world.root.append(htmlLoader);
            this.$root = world.root.find('.sys-loader');
            this.mainload();
        });
        loader.loadManifest(source.preload, true, 'assets/img/');
    };

    // 项目资源的预加载
    laker.mainload = function() {
        const loader = createjsLoader();

        const voiceId = world.sword.getUrlParam('voiceId') || 1;

        // 音频资源在本地
        loader.installPlugin(createjs.Sound);
        loader.loadFile({ id: 'voice', src: `assets/audio/${voiceId}.mp3` });

        loader.on('progress', onProgress);
        loader.on('complete', onComplete);
        loader.loadManifest(source.mainload, true, 'assets/img/');

        function onComplete() {
            laker.$root.fadeOut(() => laker.destroy());
            world.sword.tryFun(callback);
            // console.log('资源加载完成');
        }

        function onProgress() {
            laker.$root.find('span').text((loader.progress * 100 | 0) + ' %');
            laker.$root.find('.progress div').css('width', (loader.progress * 100 | 0) + '%');
        }
    };

    // 销毁
    laker.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    function createjsLoader() {
        // img标签方式加载图片
        const loader = new createjs.LoadQueue(false);

        // 关键！----设置并发数
        loader.setMaxConnections(5);
        // 关键！---一定要将其设置为 true, 否则不起作用。
        loader.maintainScriptOrder = true;
        return loader;
    }

    world.lakers.$loader = laker;
    return laker;
});
