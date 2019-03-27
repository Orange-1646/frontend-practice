        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return window.getComputedStyle(obj, false)[attr];
            }
        }
//        wrapper.onclick = function() {
//            moveElapse(demo, targetState, callback, i);
//        }
        //          要移动的目标数组  目标状态  回调函数  数组的index  移动频率  
        function moveElapse(obj, target, callback, i, frequency) {
            if (i >= obj.length) return;
            var judge;
            clearInterval(obj[i].timer);
            var iSpeed, iCur;
            obj[i].timer = setInterval(function() {
                judge = true;
                for (attr in target) {
//                    console.log(attr);
                    if (attr == 'opacity') {
                        iCur = parseFloat(getStyle(obj[i], attr)) * 100;
                    } else {
                        iCur = parseInt(getStyle(obj[i], attr));
//                        console.log(iCur);
                    }
                    var dist = target[attr] - iCur;
//                    console.log(dist);
                    iSpeed = dist > 0 ? Math.ceil(dist / 7) : Math.floor(dist / 7);
                    if (attr == 'opacity') {
                        obj[i].style.opacity = (iCur + iSpeed) / 100;
                    } else {
                        obj[i].style[attr] = iCur + iSpeed + 'px';
//                        console.log(obj[i].style[attr]);
                    }
                    if(iCur != target[attr]) judge = false;
                }
                if (judge) {
                    clearInterval(obj[i].timer);
//                    callback ? callback(obj, target, callback, i, frequency); '';
                }
            }, frequency);            
            
        }

//        function callback() {
//            i++;
//            moveElapse(demo, targetState, callback, i);
//        }