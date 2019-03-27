
var per = 0;
var bar = document.getElementsByClassName('bar')[0];
var pageLoading = document.getElementsByClassName('pageLoading')[0];
var monsterText = document.getElementsByClassName('monsterText')[0];
var timer = setInterval(function () {
    bar.style.width = per + '%';
    per += 1;
    if (per > 100) {
        pageLoading.classList.add('complete');
        setTimeout(function () {
            monsterText.innerHTML = "We are<br>SQUARE<br>MONSTER!";
        }, 3000);
        clearInterval(timer);
    }
}, 30);

