import { recipes } from "../data/recipes.js"
import { fastAlgorytm, fastCheck } from "./algo.js"
import { bufferedRecipe, drawArticle } from "./drawArticle.js"
import { fillList } from "./dropdownControl.js"
import { splitClean } from "./splitClean.js"

export const SearchEventListener = () => {
    const textInputs = document.querySelectorAll(".form-control")
    textInputs.forEach((textInput) => {
        textInput.addEventListener('keyup', search)
    })

}

export let mainSearch = [[]]
export let ingredientsSearch = [[]]
export let appareilSearch = [[]]
export let ustensilesSearch = [[]]

export const search = () => {
    bufferedRecipe[0] = []
    textInputsSortings()
    let sortingToken = false
    let sortingValues = mainSearch[0]
    if (sortingValues[0]?.length > 2) {
        sortingToken = true
        let sortingPath = ["name", "description", "ingredients"]
        fastAlgorytm(recipes, sortingPath, sortingValues)
        fastCheck(sortingPath, sortingValues)
    }
    sortingValues = ingredientsSearch[0]
    if (sortingValues[0]?.length > 2 && sortingToken === true) {
        let sortingPath = ["ingredients"]
        fastCheck(sortingPath, sortingValues)
    }
    sortingValues = ustensilesSearch[0]

    if (sortingValues[0]?.length > 2 && sortingToken === true) {
        let sortingPath = ["ustensils"]
        fastCheck(sortingPath, sortingValues)
    }
    sortingValues = appareilSearch[0]
    if (sortingValues[0]?.length > 2 && sortingToken === true) {
        let sortingPath = ["appliance"]
        fastCheck(sortingPath, sortingValues)
    }
    if (sortingToken === false) {
        bufferedRecipe[0] = recipes
    }
    drawArticle()
    fillList()
}
const textInputsSortings = () => {
    const textInputs = document.querySelectorAll(".form-control")
    textInputs.forEach((textInput) => {
        if (textInput.classList.contains("main-search")) {
            let buffer = textInput.value.split(" ")
            splitClean(buffer)
            mainSearch[0] = buffer
        }
        else if (textInput.classList.contains("input-ingredients")) {
            let buffer = textInput.value.split(" ")
            splitClean(buffer)
            buffer.forEach(e => {
                for (let i = 0; i < ingredientsSearch[0].length; i++) {
                    if ( e.includes(ingredientsSearch[0][i]) ||ingredientsSearch[0][i].includes(e) ){
                        ingredientsSearch[0].splice(i,1)
                        i -= 1
                    }

                }
                 ingredientsSearch[0].push(e)
            })
           
        }
        else if (textInput.classList.contains("input-appareil")) {
            let buffer = textInput.value.split(" ")
            splitClean(buffer)
            buffer.forEach(e => {
                appareilSearch[0].push(e)
            })
        }

        else if (textInput.classList.contains("input-ustensiles")) {
            let buffer = textInput.value.split(" ")
            splitClean(buffer)
            buffer.forEach(e => {
                ustensilesSearch[0].push(e)
            })

        }
    })
}