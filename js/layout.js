let fadeSetOutTime = 0
let Path = window.location.pathname

$(document).ready(function () {
if(Path == '/ASTER_tableware-select-shop/' 
|| Path == '/ASTER_tableware-select-shop/index.html'){
    fadeSetOutTime = 2200
    setTimeout(function(){
        $('.href_transition img').css('display', 'block');
    $('.href_transition object').css('display', 'none');
    },fadeSetOutTime+2000)
}
    setTimeout(function(){
        $('.href_transition').fadeOut(1000, 'easeInQuart');
        
    },fadeSetOutTime)
    

    $('a').click(function (e) {
        e.preventDefault();
        if ($(this).attr('data-link') == 'prevent' || $(this).attr('data-link') == 'contact') {
            return
        } else {
            let url = $(this).attr('href');
            $('.href_transition').fadeIn(1000, 'easeOutQuart');
            setTimeout(function () {
                window.location.href = url
            }, 1000)
        }

    });
});

//判斷 cartData長度並渲染 購物車icon數量
cartIconAmount()
function cartIconAmount(){
    console.log('執行');
    let cartData = JSON.parse(localStorage.getItem('cartData')) || []
    let Len = cartData.length
    if(Len == 0){
        $('.cart_icon span').hide()
    }else{
        $('.cart_icon span').text(Len).show()
    }
}

const app = Vue.createApp({
    data() {
        return {
            isScrollUp: false,
            prevScrollY: 0,
            openToggle: false,
            isToggleShopOpen: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.isHideHeaderShow)

    },
    methods: {
        isHideHeaderShow() {
            let scrollY = window.scrollY
            if (scrollY > 100) {
                if (scrollY > this.prevScrollY) {
                    this.isScrollUp = false
                } else if (scrollY < this.prevScrollY) {
                    this.isScrollUp = true
                }
            } else {
                this.isScrollUp = false
            }
            this.prevScrollY = scrollY
        },
    }
});


app.mount('#app');