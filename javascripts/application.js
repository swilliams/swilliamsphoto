$(function() {

    function preload() {
        $('a.thumbnail').each(function(i, n) {
            var url = $(n).attr('href'),
                fullsizeUrl = url.replace('portfolio','fullsize'),
                img = new Image(),
                fullSize = new Image();
            img.src = url;
            fullSize.src = fullsizeUrl;
            
            fullSize.onload = function() {
                var i = this;
                fullsizeImages[i.src] = i.height;
            }
        });
    }

    function getPortfolioImage($link) {
        var src = $link.attr('href');
        return '<img src="' + src + '" alt="" />';
    }

    function fancyChange($ctr, newImg) {
        $ctr.poof(function() {
            $ctr.html(newImg).shrink(function() { $ctr.bounce()} );
        });
    }

    function poopyChange($ctr, newImg) {
        $ctr.fadeOut('fast', function() {
            $ctr.html(newImg).fadeIn('fast');
        });
    }


    var currentImage = $('#main_image').attr('src');

    $('a.thumbnail').live('click', function() {
        var $link = $(this),
            newImg = getPortfolioImage($(this)),
            $ctr = $('#photo_container');
        if ($link.attr('href') === currentImage) {
            $ctr.bounce();
        } else {
            var changeFunc = (Modernizr.cssanimations && Modernizr.csstransforms) ? fancyChange : poopyChange;
            changeFunc.apply(null, [$ctr, newImg]);
        }
        currentImage = $link.attr('href');
        return false;
    });

    $('#about_link').click(function() {
        var $link = $(this),
            $abt = $('#about'),
            off = $link.offset();
        if ($abt.is(':visible')) {
            $abt.animate({'opacity': 0}, 250, function() { $abt.hide()});
        } else {
            $abt.css({top: (off.top - 280) + 'px', left: (off.left + 22) + 'px'}).show().animate({ opacity: 1, top: '+=20' }, 250);
        }
        return false;
    });

    $('#photo_container > img').live('click', function() {
        $(this).shade();
    });

    $('.shade, .shade > img').live('click', function() {
        var $shade = $('.shade');
        $shade.fadeOut('fast', function() { $shade.remove(); });
    });

    preload();

});

var fullsizeImages = {};

(function( $ ){
    $.fn.shade = function() {
        var that = this,
            tmpl = '<div class="shade" title="Click to go back to normal"></div>',
            src = $('#photo_container > img').attr('src'),
            num = src.substr(src.lastIndexOf('/') + 1),
            fullUrl = '/images/fullsize/' + num;

            fullSize = '<img src="' + fullUrl + '" alt="" class="fullsize" />',
            $shade = $(tmpl),
        $shade.fadeIn(200, function() {
            $shade.html(fullSize);
            var i = $shade.find('img').get(0);
            i.onload = function() {
                if (fullsizeImages[i.src] === undefined) {
                    fullsizeImages[i.src] = i.height;
                }
                var winHeight = $('.shade').height(),
                    imgHeight = fullsizeImages[i.src];
                if (winHeight > imgHeight) {
                    var off = (winHeight - imgHeight) / 2;
                    $shade.find('img').css({'position': 'absolute', 'top': off + 'px' });
                }
            }
        }).prependTo('body');
    };

    $.fn.poof = function(callback) {
        var that = this;
        that.addClass('poof')
        setTimeout(function() {
            that.removeClass('poof');
            if (typeof callback === 'function') {
                callback();
            }
        }, 500);
    };

    $.fn.shrink = function(callback) {
        var that = this;
        that.addClass('shrink');
        setTimeout(function() {
            that.removeClass('shrink');
            if (typeof callback === 'function') {
                callback();
            }
        }, 10);
    };

    $.fn.bounce = function() {
        var that = this;
        that.addClass('bounce');
        setTimeout(function() {
            that.removeClass('bounce');
        }, 300);
    };

})( jQuery );

