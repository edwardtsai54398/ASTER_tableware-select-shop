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


function amountIsMinMax(amount, target, targetParent){
    if (amount === 10) {
        $(target).addClass('unclickable');
    }else if (amount === 1) {
        $(target).addClass('unclickable');
    }
    if (amount >= 2) {
        targetParent.find('.btn-minus').removeClass('unclickable');
    }else if (amount <= 9) {
        targetParent.find('.btn-plus').removeClass('unclickable');
    }
}

function cartSingleItemPriceCalc(amount, target) {
    let singlePrice = Number(target.find('.cart_info .price span').text())
    target.find('.cart_price span').text(amount * singlePrice)
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
    $('.amount-btn_group button').click(function (e) {
        let cartItemTarget = $(e.currentTarget).closest('.cart_item')
        let amountInput = cartItemTarget.find('.amount')
        let amountValue = Number(amountInput.val())
        let targetBtn = e.currentTarget
        if ($(e.currentTarget).data('count') === 'minus' &&
            amountValue > 1) {
            amountInput.val(amountValue - 1);
            amountValue--
            
        } else if ($(e.currentTarget).data('count') === 'plus' &&
            amountValue < 10) {
            amountInput.val(amountValue + 1);
            amountValue++
            
        }
        //amountIsMinMax 分出來，amountValue變數帶進去
        amountIsMinMax(amountValue, targetBtn, cartItemTarget)
        
        //cartItemTarget, amountValue變數帶進cartSingleItemPriceCalc()
        cartSingleItemPriceCalc(amountValue, cartItemTarget)
        //更改 cartData[i].amount數量，更新 localStorage
        //cartCheckoutTotalCalc()
    })
});

