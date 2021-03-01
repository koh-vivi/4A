// $(window).on('load resize', function () { }でgetJSONをするとリサイズのたびelementが作られるため、
// loadの時だけgetJSONをするようにした

$(function () {
    $('.nav-link').on('click', function () {
        //setTimeoutしないと画像が重なる。アニメーションに違和感が多少ある
        window.setTimeout(function () {
            var $container = $('.tabs-panel');
            $container.masonry();
        }, 300);
    })
})

$(window).on('load resize', function () {
    $('.grid').each(function () {
        var $container = $(this);
        $container.masonry({
            columnWidth: $container.width() / 3,
            gutter: 0,
            itemSelector: '.grid-item',
        })
    });
});


$(window).on('load', function () {
    //workページからabout,contactへスムーズスクロールを可能にするための処理
    $('a[href="./index.html#section-about"]').attr('href', function () {
        var hrefParts = this.href.split(/#/);
        hrefParts[1] = 'about'
        return hrefParts.join('#');
    });

    $('a[href="./index.html#section-contact"]').attr('href', function () {
        var hrefParts = this.href.split(/#/);
        hrefParts[1] = 'contact'
        return hrefParts.join('#');
    });

    //jqueryUItabs
    $('.work-section').each(function () {
        var $this = $(this);
        $this.tabs({
            hide: { duration: 250 },
            show: { duration: 125 },
        })
    })


    // load時は#unsplashだけ処理
    $('#unsplash').each(function () {
        var $container = $(this);

        $.getJSON('./data/unsplash.json', function (data) {
            createTabsPanel(data, $container);
        })
    })

    $('#generativeArt').each(function () {
        var $container = $(this);
        //タブを押すたびに増殖するのを防止
        // $container.masonry('remove', $container.find('.grid-item'));
        $.getJSON('./data/generativeArt.json', function (data) {
            createTabsPanel(data, $container);
        })
    })

    $('#film').each(function () {
        var $container = $(this);
        //タブを押すたびに増殖するのを防止
        // $container.masonry('remove', $container.find('.grid-item'));
        $.getJSON('./data/film.json', function (data) {
            createTabsPanel(data, $container);
        })
    })
});

var createTabsPanel = function (data, $container) {
    var elements = [];
    $.each(data, function (i, item) {
        var itemHTML =
            '<div class="grid-item is-loading">' +
            '<a href="' + item.images.large + '">' +
            '<img src="' + item.images.thumb +
            '" alt="' + item.title + '">' +
            '</a>' +
            '</div >';
        elements.push($(itemHTML).get(0));
    })
    $container.append(elements);
    $container.imagesLoaded(function () {
        $(elements).removeClass('is-loading');
        $container.masonry('appended', elements);
    })
}