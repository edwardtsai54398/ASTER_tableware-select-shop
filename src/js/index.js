
const shopblockOffsetTop = $('.shop-block').offset().top
const shopblockH = $('.shop-block').height();
const winWidth = $(window).width()
const journalboxGap = parseInt($('.journal_box').css('gap'));

let scrollBuffer = 0

if (winWidth < 768) {
    $('.journal_box .article').css('width', winWidth - journalboxGap * 2);
    scrollBuffer = (shopblockH / 2)
} else if (winWidth >= 768 && winWidth < 1200) {
    $('.journal_box .article').css('width', (winWidth - journalboxGap * 3) / 2);
    scrollBuffer = shopblockH * 1.2
}
if (winWidth < 1200) {
    $('.shopnav_box').addClass('invisible');
}
const ariticleWidth = $('.journal_box .article').css('width')



$('.article').mouseover(function () {
    $(this).addClass('is-visible')
    $('.article').not(this).removeClass('is-visible');
});


//brand carousel
const brandImgAmount = $('.img-2 img').length
let index = 0
let timeInterval = 4000
let carouselTimer = setInterval(carouselImgMove, timeInterval)
let indexPlusTimer = setInterval(indexPlus, timeInterval)
for (let i = 1; i <= 3; i++) {
    let img = $(`.img-${i} .img`);
    let parent = $(`.img-${i}`);

    img.css({
        width: parent.css('width'),
        height: parent.css('height')
    });
}

for (let i = 1; i <= brandImgAmount; i++) {
    $('.dots').append('<span></span>')
}
$('.dots span:first').addClass('active');
function indexPlus() {
    if (index < brandImgAmount - 1) {
        index++
    } else {
        index = 0
    }
}

function carouselImgMove() {
    // index++
    for (let i = 1; i <= 3; i++) {
        let parentWidth = $(`.img-${i}`).width();
        $(`.img-${i} .brandimg_wrap`).animate({
            left: `${index * -100}%`
        }, 1000);
    }
    let brandIntroWidth = $('.brand_intro').width();
    let brandIntroGap = parseInt($('.brand_intro').css('gap'))
    $('.brand_intro article').css('left', `${index * brandIntroWidth * -1}px`);


    $(`.dots span:eq(${index})`).addClass('active')
    $(`.dots span`).not(`:eq(${index})`).removeClass('active');
}

$('.dots span').click(function () {
    clearTimeout(carouselTimer)
    clearTimeout(indexPlusTimer)

    index = $(this).index()
    carouselImgMove()

    carouselTimer = setInterval(carouselImgMove, timeInterval)
    indexPlusTimer = setInterval(indexPlus, timeInterval)
});

//gotop
$('.gotop').click(function () {
    window.scrollTo({
        top: 650,
        behavior: "smooth"
    });
});

$(window).scroll(function () {
    let winScrollY = window.scrollY;
    //gotop show
    if (winScrollY >= 980) {
        $('.gotop').addClass('btn-show');
    } else if (winScrollY < 980) {
        $('.gotop').removeClass('btn-show');
    }

    //shopnav_box show
    if (winScrollY >= shopblockOffsetTop - scrollBuffer) {
        $('.shopnav_box').removeClass('invisible');
    }
});


//平板手指滑動
$('.journal_box').on('touchstart', function (e) {
    let touchstartX = e.originalEvent.touches[0].pageX
    let scrollLeft = $(this).scrollLeft()
    let touchDeltaX = 0
    $(this).on('touchmove', function (e) {
        let touchCurrentX = e.originalEvent.touches[0].pageX;
        touchDeltaX = touchCurrentX - touchstartX
        //往左為負，往右為正
    })

    $(this).on('touchend', function () {
        if (touchDeltaX * -1 > (ariticleWidth / 2) && touchDeltaX < 0) {
            $(this).scrollLeft(scrollLeft - (ariticleWidth + journalboxGap))
        } else if (touchDeltaX > (ariticleWidth / 2) && touchDeltaX > 0) {
            $(this).scrollLeft(scrollLeft + (ariticleWidth + journalboxGap))
        }
        $(this).off('touchmove touchend');
    });
})

//此為呈現RWD拉視窗時不會跑版之用途，與上段程式碼無異
$(window).on('resize', function () {
    const shopblockOffsetTop = $('.shop-block').offset().top
    const shopblockH = $('.shop-block').height();
    const winWidth = $(window).width()
    const journalboxGap = parseInt($('.journal_box').css('gap'));

    let scrollBuffer = 0

    if (winWidth < 768) {
        $('.journal_box .article').css('width', winWidth - journalboxGap * 2);
        scrollBuffer = (shopblockH / 2)
    } else if (winWidth >= 768 && winWidth < 1200) {
        $('.journal_box .article').css('width', (winWidth - journalboxGap * 3) / 2);
        scrollBuffer = shopblockH * 1.2
    }
    if (winWidth < 1200) {
        $('.shopnav_box').addClass('invisible');
    }
    const ariticleWidth = $('.journal_box .article').css('width')

    $('.article').mouseover(function () {
        $(this).addClass('is-visible')
        $('.article').not(this).removeClass('is-visible');
    });

    //平板手指滑動
    $('.journal_box').on('touchstart', function (e) {
        let touchstartX = e.originalEvent.touches[0].pageX
        let scrollLeft = $(this).scrollLeft()
        let touchDeltaX = 0
        $(this).on('touchmove', function (e) {
            let touchCurrentX = e.originalEvent.touches[0].pageX;
            touchDeltaX = touchCurrentX - touchstartX
            //往左為負，往右為正
        })

        $(this).on('touchend', function () {
            if (touchDeltaX * -1 > (ariticleWidth / 2) && touchDeltaX < 0) {
                $(this).scrollLeft(scrollLeft - (ariticleWidth + journalboxGap))
            } else if (touchDeltaX > (ariticleWidth / 2) && touchDeltaX > 0) {
                $(this).scrollLeft(scrollLeft + (ariticleWidth + journalboxGap))
            }
            $(this).off('touchmove touchend');
        });
    })
})