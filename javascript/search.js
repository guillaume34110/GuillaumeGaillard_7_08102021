import { recipes } from "../data/recipes.js"
import { slowCheck, slowAlgorytm } from "./algo.js"
import { bufferedRecipe, drawArticle } from "./drawArticle.js"
import { fillList } from "./dropdownControl.js"
import { splitClean } from "./splitClean.js"

/*evnt listener pour la rcherche a chaque nouveau cararctére*/
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
/*recherches*/
export const search = () => {
    bufferedRecipe[0] = [] // remise a zero des recettes 
    getMainInput()// recupere les mots clefs de l'input principal
    let sortingToken = false // aucun tri n'a été effectuer
    let sortingValues = mainSearch[0]
    if (sortingValues[0]?.length > 2) {
        sortingToken = true//une recherche a été effectué
        let sortingPath = [ "description","name", "ingredients"]// les chemins a recherchées
        slowAlgorytm(recipes, sortingPath, sortingValues)
    }
    sortingValues = ingredientsSearch[0]// nouvelle valeurs de tri
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
    drawArticle()//on re-affiche les recettes
    fillList()// inscrit les tags dans les differentes listes
}
/*recupere les mots clefs du champ texte principal et les mets dans mainSearch*/
const getMainInput = () => {
    const textInput = document.querySelector(".main-search")
    mainSearch[0] = textInput.value.split(" ")
    splitClean(mainSearch[0])
    console.log(mainSearch[0]);
}
/*recherche secondaire pour les tags*/
const createTagSearch = (e) => {
    console.log(e,);
    tagSearch[0] = e.target.value.split(" ")
    splitClean(tagSearch[0])
    fillList()// inscrit les tags dans les differentes listes
}