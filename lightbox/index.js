//点击事件 -->展示图片

var oLi = document.getElementsByTagName('li');
var shadow = document.getElementsByClassName('shadow')[0];
var show = document.getElementsByClassName('show')[0];
var img = document.getElementsByClassName('showImg')[0];
var n = 0;
var btn = document.getElementsByClassName('btn');
bindEvent();

function bindEvent(){
    bindPic();
    bindBtn();
}

function showImg(index){
    shadow.style.display = 'block';
    show.style.display = 'block';
    //获得到src-->插入src
    var src = oLi[index].children[0].getAttribute('src');
    //插入src
    img.setAttribute('src', src);
}

function bindPic(){
        for(var i = 0; i < oLi.length; i++){
        oLi[i].index = i;
        oLi[i].onclick = function(){
            n = this.index;
            //获得到具体点击的图片 index
            showImg(n);            
        }        
    }
}

function bindBtn(){
    var prev = btn[0],
        next = btn[1],
        close = btn[2];
    
    close.onclick = function(){
        shadow.style.display = 'none';
        show.style.display = 'none';
    }
    
    prev.onclick = function(){
        if(n<=0){
            n = oLi.length - 1;
        }
        else n--;
        showImg(n);        
    }
    
    next.onclick = function(){
        if(n >=oLi.length - 1) n = 0;
        else n++;
        showImg(n);
        
    }
}