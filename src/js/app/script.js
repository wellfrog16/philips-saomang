// 剧本

define([
    'jquery',
    'block',
    'loader',
    'index',
    'utils/blade',
    'utils/sword'],
($) => {
    return () => {
        const world = window.myWorld;
        const sword = world.sword;
        // 加载jquery插件
        sword.jqueryPlugins();
        // 自动修正rem
        sword.fixRem(750, 75);

        // 设置分享
        const voiceId = world.sword.getUrlParam('voiceId') || 1;
        const copy = [
            { title: '飞利浦，扫盲研究所 - 解密口腔菌群', description: '　' },
            { title: '飞利浦，扫盲研究所 - 你忽视的磨牙盲区', description: '　' },
            { title: '飞利浦，扫盲研究所 - 牙石源于牙菌斑', description: '　' },
            { title: '飞利浦，扫盲研究所 - 你忽视的切牙盲区', description: '　' },
            { title: '飞利浦，扫盲研究所 - 牙菌斑知多少', description: '　' }
        ];
        world.blade.share(copy[voiceId - 1].title, copy[voiceId - 1].description);

        // 如果是手机端，加载横屏提示
        if (!sword.isPC) { world.lakers.$block.mount(); }

        world.lakers.$loader.mount(() => {
            // console.log('回调');
            // world.lakers.$video.mount($('body'));
            world.rivers.$index.mount();
        });
    };
});
