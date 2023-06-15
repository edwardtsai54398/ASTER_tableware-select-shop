let winWidth = $(window).width()
let newtitleImgH = parseFloat($('.new_article .img').css('height'));
let topHeaderH = $('.top-header').height();
if (winWidth < 1200) {
    if (winWidth >= 1024) {
        topHeaderH = 0;
    }
    $('.new_article').css('top', `${(newtitleImgH * -1) + topHeaderH}px`);

    let articleTitleH = parseFloat($('.new_article .article_title').css('height'));
    if (winWidth >= 768) {
        articleTitleH = $('.new_article').css('grid-template-rows')
        articleTitleH = parseFloat($('.new_article .article_content').css('height'))

    }

    $('.tab-stickey').css('top', `${topHeaderH + articleTitleH + 2}px`);
}



//article_content 字數限制

let requireLen = 0
let contentLen = $('.article_content').text().length
if (winWidth >= 768 && winWidth < 1200) {
    requireLen = 85
} else if (winWidth >= 1200 && winWidth < 1500) {
    requireLen = 110
} else if (winWidth >= 1500) {
    requireLen = 160
}
let textEllipsis = $('.article_content').text().substring(0, requireLen - 1) + '...'

$('.article_content').text(textEllipsis)


//此為呈現RWD拉視窗時不會跑版之用途，與上段程式碼無異
$(window).on('resize', function () {
    let winWidth = $(window).width()
    let newtitleImgH = parseFloat($('.new_article .img').css('height'));
    let topHeaderH = $('.top-header').height();
    if (winWidth < 1200) {
        if (winWidth >= 1024) {
            topHeaderH = 0;
        }
        $('.new_article').css('top', `${(newtitleImgH * -1) + topHeaderH}px`);

        let articleTitleH = parseFloat($('.new_article .article_title').css('height'));
        if (winWidth >= 768) {
            articleTitleH = $('.new_article').css('grid-template-rows')
            articleTitleH = parseFloat($('.new_article .article_content').css('height'))

        }

        $('.tab-stickey').css('top', `${topHeaderH + articleTitleH + 2}px`);
    }

    let requireLen = 0
    let contentLen = $('.article_content').text().length
    if (winWidth >= 768 && winWidth < 1200) {
        requireLen = 85
    } else if (winWidth >= 1200 && winWidth < 1500) {
        requireLen = 110
    } else if (winWidth >= 1500) {
        requireLen = 160
    }
    let textEllipsis = $('.article_content').text().substring(0, requireLen - 1) + '...'

    $('.article_content').text(textEllipsis)
})