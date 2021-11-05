import { bufferedRecipe, drawArticle } from "./drawArticle.js"

export const fastAlgorytm = (recipeArray, sortingPathArray, sortingValues) => { //algorythme de recherche avec des boucles for

    for (let s = 0; s < sortingPathArray.length; s++) {//pour tous les chemins , ingredients, ustenciles ,...
        for (let h = 0; h < sortingValues.length; h++) {//pour toutes les valeurs de l'input
            if (sortingValues[h].length > 2) {// si il y a une valeur a tester
                for (let i = 0; i < recipeArray.length; i++) {//pour toutes les recettes
                    if (sortingPathArray[s] === "ingredients") {
                        for (let a = 0; a < recipeArray[i].ingredients.length; a++) {//pour tous les ingredients
                            if (recipeArray[i].ingredients[a].ingredient.toLowerCase().includes(sortingValues[h].toLowerCase())) {//si l'ingredient est dans la recette
                                let bufferToken = false // ticket pour savoir si la recette a deja été touveé
                                for (let r = 0; r < bufferedRecipe[0].length; r++) {//pour toutes les recette affichés
                                    if (bufferedRecipe[0][r] === recipeArray[i]) bufferToken = true //la recette est deja présente
                                }
                                if (!bufferToken) {// si la recette n'est pas présente alors elle st testé est affichés
                                    bufferedRecipe[0].push(recipeArray[i])//alors elle est ajouté a l'array bufferedRecipe 
                                    let sortingPath = [sortingPathArray[s]]//on recupére le chemin
                                    fastCheck(sortingPath, sortingValues,recipeArray[i])//on confirme que les autres valeurs de tri sont présetes dans l'objet
                                    drawArticle()// l'element est affiché
                                }
                            }
                        }
                    } else if (sortingPathArray[s] === "ustensils") {
                        for (let a = 0; a < recipeArray[i].ustensils.length; a++) {
                            if (recipeArray[i].ustensils[a].toLowerCase().includes(sortingValues[h].toLowerCase())) {
                                let bufferToken = false
                                for (let r = 0; r < bufferedRecipe[0].length; r++) {
                                    if (bufferedRecipe[0][r] === recipeArray[i]) bufferToken = true
                                }
                                if (!bufferToken) {
                                    bufferedRecipe[0].push(recipeArray[i])
                                    let sortingPath = [sortingPathArray[s]]
                                    fastCheck(sortingPath, sortingValues,recipeArray[i])
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
                                fastCheck(sortingPath, sortingValues,recipeArray[i])
                                drawArticle()
                            }
                        }
                    }
                }
            }
        }
    }
}
export const fastCheck = (sortingPathArray, sortingValues, recipeTarget) => {//algorythme de confirmation (autres champs de l'input) avec des boucles for
    for (let i = 0; i < bufferedRecipe[0].length; i++) {//pour toutes les recettes du buffer
        if (recipeTarget === undefined || recipeTarget === bufferedRecipe[0][i]) {// permet le test de une ou de toutes les recettes
            let pathToken = 0 //ticket pour la verification
            for (let h = 0; h < sortingValues.length; h++) {//pour toutes les valeurs de l'input
                if (sortingValues[h].length > 0) {// si il y a une valeur a tester
                    for (let s = 0; s < sortingPathArray.length; s++) {//pour tous les chemins
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
                }
            }
            if (pathToken < sortingValues.length) {// si le ticket est plus petit que le nombre de valeur
                bufferedRecipe[0].splice(i, 1)//on retire l'element
                i -= 1////////////////////// se recaler dans la liste !!!!!!
                drawArticle()//re-affichage des élemnets
            }
        }
    }
}
/*Algorythme de recherche te verifications identiques avec des boucles forEach*/
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
                                    slowCheck(sortingPath, sortingValues)
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
                                    slowCheck(sortingPath, sortingValues)
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
                                slowCheck(sortingPath, sortingValues)
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