;(function(){
    let floatHtml = '<div class="float" id="float" style="right:-320px;">';
    floatHtml += '<div class="float-left">';
    floatHtml += ' <div class="float-left-con img-large"></div>';
    floatHtml += '</div>';
    floatHtml += '<div class="float-right">';
    floatHtml += '<ul class="float-right-con">';
    floatHtml += '<li>在线预约/咨询(皮肤)</li>';
    floatHtml += '<li>在线预约/咨询(整形)</li>';
    floatHtml += '<li>在线预约/咨询(针美)</li>';
    floatHtml += '<li>在线预约/咨询(综合)</li>';
    floatHtml += '</ul>';
    floatHtml += '</div></div>';
    let float = document.createElement('div');
    float.className = 'zx'
    float.innerHTML = floatHtml;
    document.body.appendChild(float)

    let btn = document.getElementsByClassName('float-left')[0];
    let floatDiv = document.getElementById('float');
    addEvent('click', btn, () => {
        const right = parseInt(floatDiv.style.right) === 0 ? -320 : 0;
        myAnimate(floatDiv, { right: right }, 500, () => {
            let floatConElem = document.getElementsByClassName('float-left-con')[0];
            if (right === 0) {
                floatConElem.className = 'float-left-con img-narrow';
            } else {
                floatConElem.className = 'float-left-con img-large';
            }
        })
    })
    function myAnimate(elem, animateObj, time, callback) {
        let animateArr = [];
        const interval = 20;
        Object.keys(animateObj).forEach((pro, i) => {
            let beginStyle = elem.style[pro] || window.getComputedStyle(elem, null)[pro];
            beginStyle = parseInt(beginStyle)
            animateArr[i] = {
                property: pro,              //样式的属性
                begin: beginStyle,                     //最初的距离
                dis: Math.abs(animateObj[pro] - beginStyle),     //需要移动的距离
                preDis: parseInt((animateObj[pro] - beginStyle) * interval / time),  //每次移动的距离，抛弃小数点取整
                end: animateObj[pro],              //最后的距离
                haveMoveDis: 0               //已经移动的距离
            }
        })
        let i = 0;
        let timer = setInterval(() => {
            animateArr.forEach(animate => {
                if (animate.haveMoveDis < animate.dis) {
                    if (animate.haveMoveDis + Math.abs(animate.preDis) >= animate.dis) {
                        elem.style[animate.property] = animateObj[animate.property] + 'px';
                        i += 1;
                        animate.haveMoveDis = animate.dis;
                        animate.begin = animate.end;
                    } else {
                        elem.style[animate.property] = animate.begin + animate.preDis + 'px';
                        animate.haveMoveDis += Math.abs(animate.preDis);
                        animate.begin += animate.preDis;
                    }
                }
                if (i === animateArr.length) {
                    clearInterval(timer);
                    if (callback) callback()
                }
            })
        }, interval)
    }
    let chatElem = document.getElementsByClassName('float-right-con')[0];
    addEvent('click', chatElem, (e) => {
        let target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() === 'li') {
            window.open("http://his.live800.com/live800/chatClient/chatbox.jsp?companyID=1220960&configID=51540&jid=4513242666");
        }
    })
    if(window.innerWidth > 750) {
        setTimeout(function () {
            document.getElementsByClassName('float')[0].click()
        }, 4000);
    }
})()