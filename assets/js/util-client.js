export default {
    timeFormat(timeStr) {
        const dayExp = /^\d{4}\-\d{1,2}\-\d{1,2}/
        // const timeExp = /\s\d{1,2}\:\d{1,2}/
        const day = dayExp.exec(timeStr) || 0
        // const time = timeExp.exec(timeStr) || 0
        return ' ' + day[0]
    },
    clearActive(eleId) {
        const ele = document.getElementById(eleId)
        const firstEle = ele.parentNode.parentNode.getElementsByTagName('li')[0]
        let tagA = firstEle.getElementsByTagName('a')[0]
        let className = tagA.className
        className = className.replace('nuxt-link-active', '')
        tagA.className = className
    }
}