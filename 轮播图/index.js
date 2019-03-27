/***************变量定义**************************/

var timer = null;
var sliderPage = document.getElementsByClassName('sliderPage');
//图片index计数器
var currentIndex = 0;
var leftBtn = document.getElementsByClassName('btn')[0];
var rightBtn = document.getElementsByClassName('btn')[1];
var wrapper = document.getElementsByClassName('wrapper')[0];
var sliderIndex = document.getElementsByClassName('sliderIndex')[0];
var spans = document.getElementsByTagName('span');
var aLi = document.getElementsByTagName('li');
var width = document.getElementsByTagName('img')[0].width;
var height = document.getElementsByTagName('img')[0].height;
//direction
//默认轮播方向 'l->r' /undefined
//点击left按钮 'r->l'
/******************状态数组********************************/
var target = [
    //图一左边
    {
        left: 0
    },
    //图二左边
    {
        left: -width
    },
    //图三左边
    {
        left: -2 * width
    },
    //图四左边
    {
        left: -3 * width
    },
    //图五左边
    {
        left: -4 * width
    }

]
/*********************运动方程(1张图片)****************/
function autoMove(direction) {
    //默认轮播或点击右侧按钮
    if (!direction || direction == 'left->right') {
        //如果当前是最后一张图片，则跳转至第一张图片然后继续轮播
        if (currentIndex == 4) {
            sliderPage[0].style.left = 0;
            currentIndex = 0;
        }
        currentIndex++;
        //这里我把判断条件提前了，和下面的格式相似 看着舒服
        moveElapse(sliderPage, target[currentIndex], function () {
            //            if (sliderPage[0].style.left == '-1600px') {
            //                sliderPage[0].style.left = 0;
            //                currentIndex = 0;
            //            }
        }, 0, 30);
    }
    //点击左侧按钮    
    else {
        //如果当前是第一张图片，则跳转至最后一张图片然后继续轮播
        if (currentIndex == 0) {
            sliderPage[0].style.left = -4 * width;
            currentIndex = 4;
        }
        currentIndex--;
        moveElapse(sliderPage, target[currentIndex], '', 0, 30);

    }
    changeActive(spans);
}
/*********************开启/恢复自动轮播***********************/
function setTimer() {
    timer = setInterval(function () {
        autoMove();
    }, 1500);
}
/*****************关闭自动轮播*****************/
function clearTimer() {
    clearInterval(timer);
    timer = null;
}
/********************左button点击事件*****************/
leftBtn.addEventListener('click', function () {
    clearTimer();
    autoMove('right->left');
    changeActive(aLi);
}, false);
/************************右button点击事件*************/
rightBtn.addEventListener('click', function () {
    console.log('rightBtn');
    clearTimer();
    autoMove('left->right');
    changeActive(aLi);
}, false);
/******************鼠标移动至界面上停止轮播************/
wrapper.addEventListener('mouseover', function () {
    clearTimer();
    //    console.log(timer);
}, false);
/*****************鼠标离开界面恢复轮播******************/
wrapper.onmouseout = function () {
    //    console.log(1);
    setTimer();
}
/**************初始化下方按钮**********************/
function setSlider() {
    sliderIndex.addEventListener('click', function (e) {
        var event = e || window.Event;
        var target = event.target || event.srcElement;
        var targetIndex = target.getAttribute('index');
        switch (targetIndex) {
            case '0':
                moveToTargetPic(0);
                break;
            case '1':
                moveToTargetPic(1);
                break;
            case '2':
                moveToTargetPic(2);
                break;
            case '3':
                moveToTargetPic(3);
                break;
            default:
                '';

        }
    }, false);
    //用事件委托好点 懒得改了
    //    for (var i = 0; i < spans.length; i++) {
    //        spans[i].index = i;
    //        spans[i].addEventListener('click', function () {
    //            var targetIndex = this.index;
    //            while (currentIndex % 4 != this.index) {
    ////                console.log(this.index);
    //                clearTimer();
    //                autoMove('left->right');
    //            }
    //        }, false);
    //    }
}
/*********************将界面右播知道到达目标图片为止**************/
function moveToTargetPic(targetIndex) {
    while (currentIndex % 4 != targetIndex) {
        //                console.log(this.index);
        clearTimer();
        autoMove('left->right');
    }
}

/**********改变突出按钮******************************/
function changeActive(ele) {
    for (var i = 0; i < ele.length; i++) {
        ele[i].classList.remove('active');
    }

    ele[currentIndex % 4].classList.add('active');
}
/***************初始化结构(边框自适应图片宽高 统一图片元素宽高)*****************/
function initializewrapper() {
    wrapper.style.width = width + 'px';
    wrapper.style.height = height + 'px';
    sliderPage[0].style.width = 5 * width + 'px';
    sliderPage[0].style.height = height + 'px';
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.width = width + 'px';
        aLi[i].style.height = height + 'px';
    }
}


/******************界面加载完毕后运行轮播图**************************/
initializewrapper();
setTimer();
setSlider();
