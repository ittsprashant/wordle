export const isDisabled = (enabledRows, order) => {
    return enabledRows.includes(order)?false:true
}

export const checkWordValidity = (word) => {
    return new Promise ((resolve, reject) => {

        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
        .then(res => {
            return res.json()
        })
        .then(resp => {
            console.log("res===>11", resp)
            resolve(resp)
        })
        .catch(err => {
            reject(err)
        })

    })
}