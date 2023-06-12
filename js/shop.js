$(document).ready(function () {
    let linkVectorWidth = parseInt($('.shop_nav_list').css('width')) * 0.19;
    $('.--shopall .shop_nav .shop_nav_item .link_vector').css('width', `${linkVectorWidth}px`);

    //此為呈現RWD拉視窗時不會跑版之用途，與上段程式碼無異
    $(window).on('resize', function(){
        let linkVectorWidth = parseInt($('.shop_nav_list').css('width')) * 0.19;
    $('.--shopall .shop_nav .shop_nav_item .link_vector').css('width', `${linkVectorWidth}px`);
    })
});
