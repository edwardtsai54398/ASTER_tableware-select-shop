let winHeight = $(window).height()
let winWidth = $(window).width()
let offsetTop1 = $('.intro_pic-1').offset().top;
let offsetTop2 = $('.intro_pic-2').offset().top;
let offsetTop3 = $('.store_pic').offset().top;


let pic1Height = $('.intro_pic-1 .img').height();
let topSpace = (winHeight - pic1Height) / 2

//點 circle 畫面滑動
$('.circle').click(function () {
    let offsetTop = 0
    if ($(this).attr('data-scroll') == '1') {
        offsetTop = offsetTop1

    } else if ($(this).attr('data-scroll') == '2') {
        offsetTop = offsetTop2

    } else if ($(this).attr('data-scroll') == '3') {
        offsetTop = offsetTop3

    }

    let body = $('html, body');
    body.animate({
        scrollTop: offsetTop - topSpace,
    }, 1000)

});


let containerOffset = $('.container').offset()
let flwrScrlOffsetTop = $('.flower_scroll').offset().top
let flwrScrlOriginPosiTop = flwrScrlOffsetTop - containerOffset.top
let containerH = $('.container').height()
let flowerScrollHeight = $('.flower_scroll').height()


$(window).scroll(function () {
    let scrollY = $(window).scrollTop()
    //scroll spy
    if (scrollY+winHeight/2 <= offsetTop1 + pic1Height) {
        $('[data-scroll="1"]').addClass('invisible');
        $('.flower_scroll .circle').not('[data-scroll="1"]').removeClass('invisible');
    } else if (scrollY+winHeight/2 >= offsetTop2 && scrollY+winHeight/2 <= offsetTop2 + pic1Height) {
        $('[data-scroll="2"]').addClass('invisible');
        $('.flower_scroll .circle').not('[data-scroll="2"]').removeClass('invisible');
    } else if (scrollY+winHeight/2 >= offsetTop3) {
        $('[data-scroll="3"]').addClass('invisible');
        $('.flower_scroll .circle').not('[data-scroll="3"]').removeClass('invisible');
    }
    let circlePosi = $('.invisible').css('top');
    $('.flower').css('top', circlePosi)

    let scrollToContainerTop = scrollY - containerOffset.top
    if (scrollToContainerTop >= 0) {
        if (scrollY > offsetTop1 - topSpace) {
            $('.flower_scroll').css('transform', `translateY(${scrollToContainerTop - flwrScrlOriginPosiTop + topSpace + (pic1Height - flowerScrollHeight) / 2}px)`)
            if (scrollY >= offsetTop3 - topSpace) {
                $('.flower_scroll').css('transform', `translateY(${-flwrScrlOffsetTop + offsetTop3 + (pic1Height - flowerScrollHeight) / 2}px)`)
            }
        }
    }

})

let targets = $('.flower_scroll .circle');

targets.each(function (index, target) {
 
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'class') {
        $('.flower').addClass('animate-fast');
        setTimeout(function () {
          $('.flower').removeClass('animate-fast');
        }, 2000);
      }
    });
  });

  let config = { attributes: true };

  observer.observe(target, config);
});


function getRandom(min, max, notBetween1, notBetween2) {
    let randomNum = 0
    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    } while (randomNum >= notBetween1 && randomNum <= notBetween2)
    return randomNum
}

let followOffset = $('.follow_instagram').offset();
let hasExecuted = false

$(window).scroll(function () {

    if ($(window).scrollTop() >= followOffset.top - winHeight + 200) {
        let scrollToFollowTop = $(window).scrollTop() - followOffset.top + 300

        $('.follow_instagram .img').each(function () {
            let imgMoveSpeed = $(this).attr('data-speed')
            let imgOriginTop = parseInt($(this).css('top'));
            $(this).css('transform', `translateY(-${scrollToFollowTop * imgMoveSpeed * 0.5}%)`)
        })

        if (!hasExecuted) {
            $('.follow_instagram .img').removeClass('invisible').each(function () {
                let min = 10
                let max = 20
                if (winWidth < 768) {
                    min = 10
                    max = 20
                } else if (winWidth >= 768 && winWidth < 1500) {
                    min = 8
                    max = 15
                }else if(winWidth >= 1500){
                    min = 8
                    max = 10
                }
                $(this).css({
                    width: `${getRandom(min, max)}%`,
                });

                hasExecuted = true
            });
        }

    }
});


