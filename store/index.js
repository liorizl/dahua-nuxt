export const state = () => ({
    nowPosi: [],
    count: 0,
    colList: [],
    artsWithColArr: [],
    webSetting: {}
})

export const mutations = {
    getColList(state, colArr) {
        state.colList = colArr
    },
    getArtsWithCol(state, arts) {
        state.artsWithColArr = arts
    },
    changeNowPosi(state, obj) {
        state.nowPosi[obj.num] = obj.posi
    },
    getWebSetting(state, obj) {
        state.webSetting = obj
    }
}