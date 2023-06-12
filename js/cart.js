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