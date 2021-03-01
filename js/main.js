var option = {
    section: '.js-section', // 対象を指定
    easing: "swing", // イージングをしてい(jQueryのanimation)
    scrollSpeed: 600, // スクロール時の速度
    scrollbars: true, // スクロールバーを表示するか
};

$(function () {
    $.scrollify(option);

    $('a.link-inner').smoothScroll({
        afterScroll: function () {
            location.hash = $(this).attr('href');
        },
        // easing: 'easeOutExpo',
        speed: 800
    })

    var reSmooth = /^#smoothScroll/;
    var id;
    if (reSmooth.test(location.hash)) {
        // Strip the "#smoothScroll" part off (and put "#" back on the beginning)
        id = '#' + location.hash.replace(reSmooth, '');
        $.smoothScroll({ scrollTarget: id });
    }
});