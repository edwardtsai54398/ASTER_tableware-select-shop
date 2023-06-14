//cart localStorage
function cartRenderList() {
    let str = ''
    $.each(cartData, function (index, item) {
        str += `<li class="cart_item" data-num="${index}">
                <div class="cart_img"><img src="${item.img}" alt=""></div>
                <div class="cart_info">
                    <p class="name">${item.product}</p>
                    <p class="color">${item.color}</p>
                    <p class="price">$<span>${item.price}</span></p>
                </div>
                <div class="cart_quantity">
                    <div class="amount-btn_group">
                        <button class="btn-minus unclickable" data-count="minus">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <input class="amount" type="text" value="${item.amount}" readonly>
                        <button class="btn-plus" data-count="plus">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="item-delete"><img src="image/icon_trashcan.svg" alt=""></button>
                </div>
                <div class="cart_price">$<span>${item.amount * item.price}</span></div>
            </li>`
    });
    $('.cart_content').html(str)

}

function cartCheckoutTotalCalc() {
    let discount = parseInt($('.discount span').text());
    let allPriceTotal = 0
    $.each(cartData, function (index, item) {
        allPriceTotal += item.price * item.amount
    });
    let checkoutTotal = allPriceTotal - discount
    $('.price-total span').text(checkoutTotal);
}

// function cartItemDelete() {
//     let parentLI = $(this).closest('li')
//     let index = $(`.cart_content, .cart_item`).index()
//     cartData.splice(index, 1)
//     localStorage.setItem('cartData', JSON.stringify(cartData))
//     cartIconAmount()
//     cartRenderList()
//     cartCheckoutTotalCalc()
// }

function cartSingleItemPriceCalc() {
    let amount = parseInt($('.amount').val());
    let singlePrice = $('.cart_info')
    $('.cart_price').text(amount * singlePrice)
}

function cartIsEmpty() {
    let Len = cartData.length
    if (Len == 0) {
        $('.has_Item').css('display', 'none')
        $('.cart_empty').css('display', 'flex')
    } else {
        $('.cart_empty').css('display', 'none')
        $('.has_Item').css('display', 'block')
    }
}
let cartData = JSON.parse(localStorage.getItem('cartData')) || []
$(document).ready(function () {

    cartIsEmpty()
    cartRenderList()
    cartCheckoutTotalCalc()

    $('.item-delete').click(function () {
        let parentLI = $(this).closest('li')
        let num = parentLI.data('num')
        cartData.splice(num, 1)
        parentLI.remove()

        $.each(cartData, function (index, item) {
            $('.cart_content .cart_item').eq(index).attr('data-num', index)
        });


        localStorage.setItem('cartData', JSON.stringify(cartData))
        cartIconAmount()
        cartCheckoutTotalCalc()
        cartIsEmpty()
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
        cartSingleItemPriceCalc()
    });
});
