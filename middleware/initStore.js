import webConfig from '~/web-config'
export default async function({store, $axios, app}) {
    if (store.state.colList.length === 0) {
        let axiosWebSetting = $axios.get('/getWebSetting')
        let axiosNavList = $axios.get('/getNavLists')
        let [navList, webSetting] = await Promise.all([axiosNavList, axiosWebSetting])
        const colList = navList.data
        store.commit('getColList', colList)
        const arts = app.$myUtil.artsWithCol(colList, webConfig.itemId)
        store.commit('getArtsWithCol', arts)
        store.commit('getWebSetting', webSetting.data)
    }
}