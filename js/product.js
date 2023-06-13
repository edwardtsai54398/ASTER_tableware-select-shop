$(document).ready(function () {
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
        if (amountValue === 10) {
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


//add cart localStorage
let cartData = JSON.parse(localStorage.getItem('cartData')) || []
let str = ''
cartData.forEach(function (item) {
    str += `<li class="cart_preitem">
            <div class="img">
                <img src="${item.img}" alt="">
            </div>
            <div class="text">
                <h6>${item.product}</h6>
                <span>Color:${item.color}</span>
            </div>
        </li>`
})
$('.cart_prelist').html(str)
//click “加入購物車”
$('.add_cart button').click(function () {
    //如果顏色沒選，return
    let clrId = $('.color-btn_group input[type="radio"]:checked').attr('id')
    if(!clrId){
        return
    }
    let imgUrl = $('.showslide .img img').eq(1).attr('src')
    let productName = $('.product_content h2').text()
    let Clr = $(`.color-btn_group label[for="${clrId}"]`).text()
    let Amount = $('.amount').val()
    let Price = parseInt($('.product_content .price span').text())
    let newCartItem = {
        img: imgUrl,
        product: productName,
        color: Clr,
        amount: Amount,
        price: Price
    }
    cartData.push(newCartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    console.log(cartData);
    let str = ''
    str += `<div class="img">
                    <img src="${newCartItem.img}" alt="">
                </div>
                <div class="text">
                    <h6>${newCartItem.product}</h6>
                    <span>Color:${newCartItem.color}</span>
            </div>`
    $('.cart_preitem').html(str)
    $('.view_cart span').text(`(${cartData.length})`)
    //跳出購物車modal
    $('.cart_modal').addClass('visible');
    console.log('cli');
    cartIconAmount()
})

//cart_modal點X或其他位置會跳出
$('.cart_modal_head i').click(function(){
    $('.cart_modal').removeClass('visible')
});
$('body').not($('.add_cart button')).click(function(){
    console.log('1');
    if($('.cart_modal').hasClass('visible')){
        console.log('2');
        $('.cart_modal').removeClass('visible')
    }

})


$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 4
        }

    }
})