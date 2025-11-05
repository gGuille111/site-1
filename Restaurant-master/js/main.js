$(document).ready(function () {
    // ✅ Active la détection du scroll
    $(document).on("scroll", onScroll);

    // ✅ Initialise MixItUp au chargement (pour tes raquettes)
    $('#portfolio').mixitup({
        targetSelector: '.item',
        transitionSpeed: 350
    });

    // ✅ Initialise le calendrier
    $("#datepicker").datepicker();

    // ✅ Gestion du clic sur les liens de navigation
    $('a[href^="#"], a[href$=".html"]').on('click', function (e) {
        var target = $(this).attr('href');

        // Ignore les liens externes comme cv.html
        if (target.endsWith('.html')) {
            return; // laisse le navigateur gérer
        }

        // Scroll pour les ancres internes
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('navactive');
        });
        $(this).addClass('navactive');

        var $target = $(target);
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        }
    });
});

function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $('.nav li a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (refElement.length) {
            if (refElement.position().top <= scrollPosition &&
                refElement.position().top + refElement.height() > scrollPosition) {
                $('ul.nav li a').removeClass("navactive");
                currentLink.addClass("navactive");
            } else {
                currentLink.removeClass("navactive");
            }
        }
    });
}
