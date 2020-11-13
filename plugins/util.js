export default ({app, store}, inject) => {
    const myUtil = {
        artsWithCol (colList, itemId) {
            let itemList, artList = []
            for (let i = 0; i < colList.length; i++) {
                if (colList[i].id === itemId) {
                    itemList = colList[i].haveChild
                    break
                }
            }
            let ids = [itemId],
                alias= []
            const notUltimateItem = (itemList, ids, alias) => {
                itemList.forEach( item => {
                    let tids = [].concat(ids)
                    let talias = [].concat(alias)
                    tids.push(item.id)
                    talias.push(item.alias)
                    if (item.haveChild === 0) {
                        ultimateItem(item.arts, tids, talias)
                    } else {
                        notUltimateItem(item.haveChild, tids, talias)
                    }
                })
            }
            const ultimateItem = (arts, ids, alias) => {
                arts.forEach(art => {
                    art.ids = ids
                    art.alias = alias
                    artList.push(art)
                })
            }
            notUltimateItem(itemList, ids, alias)
            return artList
        },
        getArtsInCol(colId, page, count, isIndex = null) {
            const artList = store.state.artsWithColArr
            let arts = [],
                num = 1
            const end = page * count, 
                start = (page - 1) * count + 1
            return new Promise(resolve => {
                for (let i = 0; i < artList.length; i++) {
                    let condition = isIndex ? 
                                    artList[i].ids.indexOf(colId) > -1 && artList[i].isIndex === 'true' :
                                    artList[i].ids.indexOf(colId) > -1
                    if (condition) {
                        if (num >= start && num <= end) {
                            arts.push(artList[i])
                        }
                        num++
                    }
                }
                resolve({
                    arts,
                    num: num - 1
                })
            })
        },
        getColId(alias) {
            const colList = store.state.colList
            return new Promise(resolve => {
                const goLoop = (colArr) => {
                    for(let i = 0; i < colArr.length; i++) {
                        if(colArr[i].alias === alias) {
                            resolve(colArr[i].id) 
                            break
                        }
                        if (colArr[i].haveChild) {
                            goLoop(colArr[i].haveChild)
                        }
                    }
                }
                goLoop(colList)
            })
        },
        getGloList($axios, url, id) {
            return new Promise((resolve, reject) => {
                $axios.get(url).then(res => {
                    const colList = res.data
                    store.commit('getColList', colList)
                    const arts = this.artsWithCol(colList, id)
                    store.commit('getArtsWithCol', arts)
                    resolve(colList)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        getColTitle(alias, colList) {
            return new Promise((resolve, reject) => {
                const goSearch = (alias, cols) => {
                    for (let i = 0; i < cols.length; i++) {
                        const col = cols[i]
                        if (col.alias === alias) {
                            resolve({
                                title: col.title,
                                cid: col.cid
                            })
                            return true
                        } else {
                            if (col.haveChild) {
                                goSearch(alias, col.haveChild)
                            }
                        }
                    }
                }
                goSearch(alias, colList)
                resolve({
                    title: 'col has not founded1',
                    cid: 'col has not founded1'
                })
            })
        },
        getColTitleSync(alias, colList) {
            const goSearch = (alias, cols) => {
                for (let i = 0; i < cols.length; i++) {
                    const col = cols[i]
                    if (col.alias === alias) {
                        return {
                            title: col.title,
                            cid: col.cid
                        }
                    } else {
                        if (col.haveChild) {
                            goSearch(alias, col.haveChild)
                        }
                    }
                }
            }
            goSearch(alias, colList)
        },
        getItemArtAdj(colid, artid) {
            return new Promise(resolve => {
                let arts = store.state.artsWithColArr,
                    preArt = null, nextArt = null, j;
                for (let i = 0; i < arts.length; i++) {
                    if (arts[i].id === artid) {
                        j = i
                        break
                    }
                }
                for (let i = j + 1; i < arts.length; i ++) {
                    if (arts[i].ids.indexOf(colid) > -1) {
                        nextArt = arts[i]
                        break
                    }
                }
                while(j - 1 >= 0) {
                    if(arts[j - 1].ids.indexOf(colid) > -1) {
                        preArt = arts[j - 1]
                    }
                    j--
                    break
                }
                resolve({ preArt, nextArt })
            })
        }
    }
    
    inject('myUtil', myUtil)
}