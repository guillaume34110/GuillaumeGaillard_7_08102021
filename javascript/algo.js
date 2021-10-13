import { bufferedRecipe, drawArticle } from "./drawArticle.js"

export const fastAlgorytm = (recipeArray, sortingPathArray, sortingValues) => {

    for (let s = 0; s < sortingPathArray.length; s++) {
        for (let h = 0; h < sortingValues.length; h++) {
            if (sortingValues[h].length > 0) {
                for (let i = 0; i < recipeArray.length; i++) {
                    if (sortingPathArray[s] === "ingredients") {
                        for (let a = 0; a < recipeArray[i].ingredients.length; a++) {
                            if (recipeArray[i].ingredients[a].ingredient.toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                let bufferToken = false
                                for (let r =0 ; r<bufferedRecipe[0].length; r++) {
                                    if (bufferedRecipe[0][r] === recipeArray[i]) bufferToken = true
                                }
                                if (!bufferToken) {
                                    bufferedRecipe[0].push(recipeArray[i])
                                    let sortingPath = [sortingPathArray[s]]
                                    fastCheck(sortingPath,sortingValues)
                                    drawArticle()
                                }
                            }
                        }
                    } else if (sortingPathArray[s] === "ustensils") {
                        for (let a = 0; a < recipeArray[i].ustensils.length; a++) {
                            if (recipeArray[i].ustensils[a].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                let bufferToken = false
                                for (let r =0 ; r<bufferedRecipe[0].length; r++) {
                                    if (bufferedRecipe[0][r] === recipeArray[i]) bufferToken = true
                                }
                                if (!bufferToken) {
                                    bufferedRecipe[0].push(recipeArray[i])
                                    let sortingPath = [sortingPathArray[s]]
                                    fastCheck(sortingPath,sortingValues)
                                    drawArticle()
                                }
                            }
                        }
                    } else {
                        if (recipeArray[i][sortingPathArray[s]].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                            let bufferToken = false
                            bufferedRecipe[0].forEach(recipe => {
                                if (recipe === recipeArray[i]) bufferToken = true
                            })
                            if (!bufferToken) {
                                bufferedRecipe[0].push(recipeArray[i])
                                let sortingPath = [sortingPathArray[s]]
                                fastCheck(sortingPath,sortingValues)
                                drawArticle()
                            }
                        }
                    }
                }
            }
        }
    }
}
export const fastCheck = (sortingPathArray, sortingValues) => {
    for (let h = 0; h < sortingValues.length; h++) {
        if (sortingValues[h].length > 0) {
            for (let i = 0; i < bufferedRecipe[0].length; i++) {
                let pathToken = 0 // for multiple path => mainSearch
                for (let s = 0; s < sortingPathArray.length; s++) {
                    if (sortingPathArray[s] === "ingredients") {
                        for (let a = 0; a < bufferedRecipe[0][i].ingredients.length; a++) {
                            if (bufferedRecipe[0][i].ingredients[a].ingredient.toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                pathToken++;
                            }
                        }
                    } else if (sortingPathArray[s] === "ustensils") {
                        for (let a = 0; a < bufferedRecipe[0][i].ustensils.length; a++) {
                            if (bufferedRecipe[0][i].ustensils[a].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                pathToken++;
                            }
                        }
                    } else {
                        if (bufferedRecipe[0][i][sortingPathArray[s]].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                            pathToken++;
                        }
                    }
                }
                if (pathToken === 0) {
                    bufferedRecipe[0].splice(i, 1)
                    i -= 1////////////////////// se recaler dans la liste !!!!!!
                    drawArticle()
                }
            }
        }
    }
}

export const slowAlgorytm = (recipeArray, sortingPathArray, sortingValues) => {
    sortingPathArray.forEach(s => {
        sortingValues.forEach(h => {
            if (h.length > 0) {
                recipeArray.forEach(i => {
                    if (s === "ingredients") {
                        i.ingredients.forEach(a => {
                            if (a.ingredient.toLowerCase().includes(h.toLowerCase())) {
                                let bufferToken = false
                                bufferedRecipe[0].forEach(recipe => {
                                    if (recipe === i) bufferToken = true
                                })
                                if (!bufferToken) {
                                    bufferedRecipe[0].push(i)
                                    let sortingPath = [s]
                                    slowCheck(sortingPath,sortingValues)
                                    drawArticle()
                                }
                            }
                        })
                    } else if (s === "ustensils") {
                        i.ustensils.forEach(a => {
                            if (a.toLowerCase().includes(h.toLowerCase())) {
                                let bufferToken = false
                                bufferedRecipe[0].forEach(recipe => {
                                    if (recipe === i) bufferToken = true
                                })
                                if (!bufferToken) {
                                    bufferedRecipe[0].push(i)
                                    let sortingPath = [s]
                                slowCheck(sortingPath,sortingValues)
                                drawArticle()
                                }
                            }
                        })
                    } else {
                        if (i[s].toLowerCase().includes(h.toLowerCase())) {
                            let bufferToken = false
                            bufferedRecipe[0].forEach(recipe => {
                                if (recipe === i) bufferToken = true
                            })
                            if (!bufferToken) {
                                bufferedRecipe[0].push(i)
                                let sortingPath = [s]
                                slowCheck(sortingPath,sortingValues)
                                drawArticle()
                            }
                        }
                    }
                })
            }
        })
    })
}
export const slowCheck = (sortingPathArray, sortingValues) => {
    sortingValues.forEach(h => {
        if (h.length > 0) {
            for (let i = 0; i < bufferedRecipe[0].length; i++) {
                let pathToken = 0 // for multiple path => mainSearch
                sortingPathArray.forEach(s => {
                    if (s === "ingredients") {
                        bufferedRecipe[0][i].ingredients.forEach(a => {
                            if (a.ingredient.toLowerCase().includes(h.toLowerCase())) {
                                pathToken++;
                            }
                        })
                    } else if (s === "ustensils") {
                        bufferedRecipe[0][i].ustensils.forEach(a => {
                            if (a.toLowerCase().includes(h.toLowerCase())) {
                                pathToken++;
                            }
                        })
                    } else {
                        if (bufferedRecipe[0][i][s].toLowerCase().includes(h.toLowerCase())) {
                            pathToken++;
                        }
                    }
                })
                if (pathToken === 0) {
                    bufferedRecipe[0].splice(i, 1)
                    i -= 1////////////////////// se recaler dans la liste !!!!!!
                    drawArticle()
                }
            }
        }
    })
}