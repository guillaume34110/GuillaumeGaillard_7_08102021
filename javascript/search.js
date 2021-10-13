
import { recipes } from "../data/recipes.js"
import { fastCheck, fastAlgorytm, slowAlgorytm, slowCheck } from "./algo.js"
import { bufferedRecipe, drawArticle } from "./drawArticle.js"
import { fillList } from "./dropdownControl.js"
import { splitClean } from "./splitClean.js"

export const SearchEventListener = () => {
    const textInputs = document.querySelectorAll(".form-control")
    textInputs.forEach((textInput) => {
        if (textInput.classList.contains("main-search")) textInput.addEventListener('keyup', search)
        if (!textInput.classList.contains("main-search")) textInput.addEventListener('keyup', createTagSearch)
    })

}

export let mainSearch = [[]]
export let ingredientsSearch = [[]]
export let appareilSearch = [[]]
export let ustensilesSearch = [[]]
export let tagSearch = [[]]

export const search = () => {
    bufferedRecipe[0] = []
    getMainInput()
    let sortingToken = false
    let sortingValues = mainSearch[0]
    if (sortingValues[0]?.length > 2) {
        sortingToken = true
        let sortingPath = ["name", "description", "ingredients"]
        slowAlgorytm(recipes, sortingPath, sortingValues)
        //slowCheck(sortingPath, sortingValues)
    }
    sortingValues = ingredientsSearch[0]
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ingredients"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)

    }
    sortingValues = ustensilesSearch[0]

    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ustensils"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)

    }
    sortingValues = appareilSearch[0]
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["appliance"]
        if (sortingToken === false) {
            slowAlgorytm(recipes, sortingPath, sortingValues)
            sortingToken = true
        } else slowCheck(sortingPath, sortingValues)
    }
    if (sortingToken === false) {
        bufferedRecipe[0] = recipes
    }
    drawArticle()
    fillList()
}
const getMainInput = () => {
    const textInput = document.querySelector(".main-search")
    mainSearch[0] = textInput.value.split(" ")
    splitClean(mainSearch[0])
}
const createTagSearch = (e) => {
    console.log(e,);
    tagSearch[0] = e.target.value.split(" ")
    splitClean(tagSearch[0])
    fillList()
}
