export const serchStringAndRemove = (arrayToClean,stringArraytoCompare) => {
    stringArraytoCompare.forEach(string => {
        for (let i = 0; i < arrayToClean.length; i++) {
            if (string.includes(arrayToClean[i]) || arrayToClean[i].includes(string)) {
                arrayToClean.splice(i, 1)
                i -= 1
            }
        }
    })
}
ingredientsSearch[0].forEach((currentTag, index) => {
    if (oldTag === currentTag) buffer = index
})
if (buffer >= 0) arrayToSearch.splice(buffer, 1)