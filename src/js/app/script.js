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
            { title: '分享1标题：飞利浦，扫盲研究所', description: '分享1描述：飞利浦，扫盲研究所' },
            { title: '分享2标题：飞利浦，扫盲研究所', description: '分享2描述：飞利浦，扫盲研究所' },
            { title: '分享3标题：飞利浦，扫盲研究所', description: '分享3描述：飞利浦，扫盲研究所' },
            { title: '分享4标题：飞利浦，扫盲研究所', description: '分享4描述：飞利浦，扫盲研究所' }
        ];
        world.blade.share(copy[voiceId - 1].title, copy[voiceId - 1].description);

        // 如果是手机端，加载横屏提示
        if (!sword.isPC) { world.lakers.$block.mount(); }

        world.lakers.$loader.mount(() => {
            console.log('回调');
            // world.lakers.$video.mount($('body'));
            world.rivers.$index.mount();
        });
    };
});
