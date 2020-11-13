class Slider {
    constructor(className, hasBar, hasNext) {
        this.slider = document.getElementsByClassName(className)[0]
        this.sliderCon = this.slider.getElementsByClassName('slider-con')[0]
        this.num = 0
        this.itemWidth = null // 轮播图的宽度
        this.hasBar = hasBar
        this.hasNext = hasNext
        this.status = 0 // 是否正在切换
        this.space = 6000 // 切换图的间隔，单位毫秒
        this.speed = 10 // 图片移动的速度,单位毫秒,数字越小移动越快
        this.moveDist = 40 // 每次移动的像素,单位px
        this.timer = null
        this.timer2 = null
        this.index = 0 // 当前图片 0为第一张
        this.haveMoveDis = 0
        this.paused = false // 是否暂停中
    }

    windowResize() {
        const sliderItem = this.sliderCon.getElementsByClassName('slider-item')
        const oldHeight = parseInt(
            window.getComputedStyle(sliderItem[0], null).height
        )
        const newWidth = getComputedStyle(
            document.getElementsByClassName('slider')[0],
            null
        ).width
        this.itemWidth = parseInt(newWidth)
        this.sliderCon.style.width = parseInt(newWidth) * this.num + 'px'
        this.sliderCon.style.left = -(this.itemWidth * this.index) + 'px'
        for (let i = 0; i < this.num; i++) {
            sliderItem[i].style.width = newWidth
            sliderItem[i].style.height = oldHeight
            sliderItem[i].getElementsByTagName('img')[0].style.height = oldHeight
        }
        if (this.status === 0) this.startTurn()
    }

    init() {
        const sliderItem = this.sliderCon.getElementsByClassName('slider-item')
        this.num = sliderItem.length
        for (let i = 1; i < this.num; i++) {
            sliderItem[i].getElementsByTagName('img')[0].src = sliderItem[i]
                .getElementsByTagName('img')[0]
                .getAttribute('data-source')
        }
        this.sliderCon.appendChild(sliderItem[0].cloneNode(true))
        this.num += 1
        this.itemWidth =
            parseInt(window.getComputedStyle(sliderItem[0], null).width) ||
            (document.documentElement.clientWidth > 1920 ?
                1920 :
                document.documentElement.clientWidth) // 当getComputedStyle取不到宽度时
        this.sliderCon.style.width = this.itemWidth * this.num + 'px'
        this.sliderCon.style.display = 'flex'
        addEvent('mouseenter', this.slider, () => {
            this.pause()
        })
        addEvent('mouseleave', this.slider, () => {
            this.startTurn()
        })
        let x = 0
        let dragDis = 0
        this.sliderCon.addEventListener('drag', (e) => {
            const screenx = e.screenX
            let distance
            let left
            this.pause()
            if (this.status === 1) return
            if (screenx !== 0) {
                if (x !== 0) {
                    distance = screenx - x
                    dragDis += distance
                }
                x = screenx
                left = parseInt(this.sliderCon.style.left) || 0
                this.sliderCon.style.left = left + distance + 'px'
            }
        })
        this.slider.addEventListener('dragend', () => {
            let direction = dragDis > 0 ? 'right' : 'left'
            let needMoveDistance = this.itemWidth - Math.abs(dragDis)
            let dragFail = false
            if (this.status === 1) return
            this.pause()
            if (this.index === 0 && direction === 'right') {
                direction = 'left'
                needMoveDistance = Math.abs(dragDis)
                dragFail = true
            }
            x = 0
            dragDis = 0
            this.begin(direction, 1, needMoveDistance, dragFail)
        })
        if (this.hasBar) {
            const bar = document.createElement('div')
            let dots
            bar.className = 'slider-bar'
            this.slider.append(bar)
            for (let i = 0; i < this.num - 1; i++) {
                dots = document.createElement('a')
                bar.appendChild(dots)
                dots.addEventListener('click', () => {
                    if (i !== this.index) {
                        const newDir = i - this.index > 0 ? 'left' : 'right'
                        const moveCount =
                            Math.abs(i - this.index) > 1 ?
                            Math.abs(i - this.index) :
                            1
                        this.begin(newDir, moveCount)
                    }
                })
            }
            bar.getElementsByTagName('a')[this.index].className = 'now'
        }
        if (this.hasNext) {
            let nextButton, preButton
            nextButton = document.createElement('div')
            preButton = document.createElement('div')
            nextButton.className = 'next'
            preButton.className = 'pre'
            this.slider.append(nextButton)
            this.drawArrow('right', nextButton)
            this.slider.append(preButton)
            this.drawArrow('left', preButton)
            addEvent('click', nextButton, () => {
                this.begin('left', 1)
            })
            addEvent('click', preButton, () => {
                this.begin('right', 1)
            })
        }
        this.startTurn()
    }

    drawArrow(dir, elem) {
        // 添加左右移动箭头
        const arrowDiv = document.createElement('div')
        if (dir === 'right') {
            arrowDiv.className = 'nextArrow'
            elem.append(arrowDiv)
        } else if (dir === 'left') {
            arrowDiv.className = 'preArrow'
            elem.append(arrowDiv)
        }
    }

    startTurn() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.begin('left', 1)
        }, this.space)
        this.paused = false
    }

    pause() {
        clearTimeout(this.timer)
        this.paused = true
    }

    begin(dir, moveCount, needMoveDistance = null, dragFail = false) {
        if (this.status === 1) {
            // console.log('等它动完了再点！')
        } else {
            this.status = 1
            let left = parseInt(this.sliderCon.style.left || 0)
            let remainder
            let needMoveDis
            let moveDis
            needMoveDis =
                needMoveDistance ||
                (moveCount > 1 ? this.itemWidth * moveCount : this.itemWidth)
            moveDis = moveCount > 1 ? this.moveDist * moveCount : this.moveDist
            remainder = needMoveDis % this.moveDist
            if (this.index === 0 && dir === 'right') {
                this.sliderCon.style.left = -(this.num - 1) * this.itemWidth + 'px'
                left = -(this.num - 1) * this.itemWidth
                this.index = this.num - 1
            }
            this.timer2 = setTimeout(() => {
                this.picMove(
                    dir,
                    needMoveDis,
                    moveDis,
                    remainder,
                    left,
                    moveCount,
                    this.endMove,
                    dragFail
                )
            }, this.speed)
        }
    }

    picMove(
        dir,
        needMoveDis,
        moveDis,
        remainder,
        left,
        moveCount,
        callback,
        dragFail
    ) {
        const addOrSubtract = dir === 'left' ? -1 : 1
        this.haveMoveDis += moveDis
        this.sliderCon.style.left =
            left + addOrSubtract * this.haveMoveDis + 'px'
        if (this.haveMoveDis >= needMoveDis) {
            this.sliderCon.style.left =
                left + addOrSubtract * needMoveDis + 'px'
            this.haveMoveDis = 0
            callback.call(this, dir, moveCount, dragFail)
        } else {
            if (this.haveMoveDis + remainder >= needMoveDis) {
                moveDis = remainder
            }
            this.timer2 = setTimeout(() => {
                this.picMove(
                    dir,
                    needMoveDis,
                    moveDis,
                    remainder,
                    left,
                    moveCount,
                    this.endMove,
                    dragFail
                )
            }, this.speed)
        }
    }

    endMove(dir, moveCount, dragFail) {
        if (dir === 'left') {
            this.index = dragFail === true ? this.index : this.index + moveCount
            if (this.index >= this.num - 1) {
                this.index = 0
                this.sliderCon.style.left = '0px'
            }
        } else if (dir === 'right') {
            if (this.index === 0) {
                this.sliderCon.style.left = -(this.num - 1) * this.itemWidth + 'px'
                this.index = this.num - 1
            }
            this.index -= moveCount
        }
        const bar = document
            .getElementsByClassName('slider-bar')[0]
            .getElementsByTagName('a')
        for (let i = 0; i < this.num - 1; i++) {
            bar[i].className = ''
        }
        bar[this.index].className = 'now'
        this.status = 0
        if (!this.paused) {
            if (this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.begin('left', 1)
            }, this.space)
        }
    }
}

function addEvent(eventType, elem, fn, isCapture = false) {
    if (window.addEventListener) {
        addEvent = function (eventType, elem, fn, isCapture) {
            elem.addEventListener(eventType, fn, isCapture)
        }
    } else if (window.attachEvent) {
        addEvent = function (eventType, elem, fn) {
            elem.attachEvent('on' + eventType, fn.bind(elem))
        }
    } else {
        addEvent = function () {
            elem['on' + eventType] = fn
        }
    }
    addEvent(eventType, elem, fn, isCapture)
}

function resizeF() {
    if (typeof slider1 !== "undefined") { //slider1是否定义在window上
        if (slider1.status === 1) {
            // slider1为Slider的实例，当滑块还在滑动的时候,先给status属性添加setter检测滑动停止(即status为0时)
            Object.defineProperty(slider1, 'status', {
                configurable: true,
                get() {
                    return 1
                },
                set(value) {
                    if (value === 0) {
                        delete slider1.status // 删除getter和setter
                        slider1.status = 0
                        // console.log('触发了！')
                        slider1.windowResize()
                    }
                },
            })
        } else {
            slider1.windowResize()
        }
    } else {
        console.log('变量slider1还未定义或未定义在全局')
    }
}

function debounce(fn, delayTime, triggerNow, execFn) {  // 防抖函数
    let t = null
    return function () {
        if (execFn) execFn()
        if (t) {
            clearTimeout(t)
        }
        if (triggerNow) {
            if (!t) {
                fn()
            }
            t = setTimeout(() => {
                t = null
            }, delayTime)
            
        } else {
            t = setTimeout(() => {
                fn()
                t = null
            }, delayTime)
        }
    }
}

window.onload = function () {
    this.slider1 = new Slider('slider', true, true)   //将实例定义在window上
    slider1.init()
    addEvent('resize', window, debounce(resizeF, 600, false, () => { //改变窗口大小的时候重新计算
        slider1.pause()
    }))
}