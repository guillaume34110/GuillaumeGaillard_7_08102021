import { recipes } from "../data/recipes.js"
import { fastAlgorytm, fastCheck } from "./algo.js"
import { bufferedRecipe, drawArticle } from "./drawArticle.js"
import { fillList } from "./dropdownControl.js"

export const SearchEventListener = () => {
    const textInputs = document.querySelectorAll(".form-control")
    textInputs.forEach((textInput) => {
        textInput.addEventListener('keyup', search)
    })

}

let mainSearch
let ingredientsSearch
let appareilSearch
let ustensilesSearch

const search = () => {
    bufferedRecipe[0] =[]
    textInputsSortings()
    let sortingToken = false
    let sortingValues = mainSearch
    if (sortingValues[0].length > 2) {
        sortingToken = true
        let sortingPath = ["name" , "description" ,"ingredients"]
        fastAlgorytm(recipes, sortingPath, sortingValues)
        fastCheck(sortingPath, sortingValues)
    } 
    sortingValues = ingredientsSearch
    if (sortingValues[0].length > 2) {
        if (sortingToken === false ) fastAlgorytm(recipes, sortingPath, sortingValues)
        sortingToken = true
        let sortingPath = ["ingredients"]
        fastCheck(sortingPath, sortingValues)
    } 
    sortingValues = ustensilesSearch
    if (sortingValues[0].length > 2) {
        if (sortingToken === false ) fastAlgorytm(recipes, sortingPath, sortingValues)
        sortingToken = true
        let sortingPath = ["ustensils"]
        fastCheck(sortingPath, sortingValues)
    } 
    sortingValues = appareilSearch
    if (sortingValues[0].length > 2) {
        if (sortingToken === false ) fastAlgorytm(recipes, sortingPath, sortingValues)
        sortingToken = true
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
        if (textInput.classList.contains("main-search")) mainSearch = textInput.value.split(" ")
        else if (textInput.classList.contains("input-ingredients")) ingredientsSearch = textInput.value.split(" ")
        else if (textInput.classList.contains("input-appareil")) appareilSearch = textInput.value.split(" ")
        else if (textInput.classList.contains("input-ustensiles")) ustensilesSearch = textInput.value.split(" ")
    })
}