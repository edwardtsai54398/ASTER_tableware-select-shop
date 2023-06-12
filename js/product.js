$(document).ready(function() {
    $('.owl-prev').html('<i class="fa-solid fa-chevron-left"></i>');
    $('.owl-next').html('<i class="fa-solid fa-chevron-right"></i>');
  });
  
// showslideMove
$('button').click(function (e) {
    let slideItemWidth1 = parseFloat($('.img.item').css('width'))
    let slideItemWidth2 = $('.img.item').width()
})

//.mainshowChangeImg
$('.showslide .img').click(function () {
    $(this).addClass('active');
    $('.showslide .img').not(this).removeClass('active');
    let imgSrc = $(this).find('img').attr('src')
    $('.mainshow img').attr('src', `${imgSrc}`);
});

//quantityBtnChange
$('.amount-btn_group button').click(function () {
    let amountValue = parseInt($('.amount').val())
    if ($(this).data('count') === 'minus' &&
        amountValue > 1) {
            if(amountValue === 10){
                $('.btn-plus').removeClass('unclickable');
            }
        $('.amount').val(amountValue - 1);
        amountValue--
        if (amountValue === 1) {
            $(this).addClass('unclickable');
        }
    } else if ($(this).data('count') === 'plus' &&
        amountValue < 10) {
        if (amountValue === 1) {
            $('.btn-minus').removeClass('unclickable');
        }
        $('.amount').val(amountValue + 1);
        amountValue++
        if (amountValue === 10) {
            $(this).addClass('unclickable');
        }
    }
});

$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:4
        }
        
    }
})