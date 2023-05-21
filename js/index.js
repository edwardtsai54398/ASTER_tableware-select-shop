//DOM
const goTopBtn = document.querySelector('.gotop')
const articleArr = document.querySelectorAll('.article')

//事件
window.addEventListener('scroll',gotopShow);
goTopBtn.addEventListener('click',goTop)
articleArr.forEach(function(article){
    article.addEventListener('mouseover',articleVisible)
})


//function
function gotopShow(){
    if(window.scrollY>=980){
        goTopBtn.classList.add('btn-show')
    }else if(window.scrollY<980){
        goTopBtn.classList.remove('btn-show')
    }
}
function goTop(){
    window.scrollTo({
        top:650,
        behavior:"smooth"
    });
}
function articleVisible(e){
    let articleSet = e.target.dataset.num
    let Parent = e.target.parentNode
    let garndParent = Parent.parentNode
    if(e.target.nodeName == 'A'){
        console.log(articleSet)
       console.log(e.target.parentNode.className)
       console.log(e.target.parentNode.classList.contains('is-visible'))
       if(Parent.classList.contains('is-visible')){
        return
       }else{
            //其祖父層的子層中有'is-visible'的，刪掉className
            //增加其className
            garndParent.childNodes.forEach(function(node){
                if(node.nodeType === 1 && node.classList.contains('is-visible')){
                    node.classList.remove('is-visible')
                }
                
            })
            Parent.classList.add('is-visible')
       }
    }

}