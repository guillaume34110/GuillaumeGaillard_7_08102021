import { recipes } from "../data/recipes.js"
import { fastAlgorytm } from "./algo.js"
import { drawArticle } from "./drawArticle.js"

export const SearchEventListener = () => {
const textInputs = document.querySelectorAll(".form-control")
textInputs.forEach((textInput) => {
     textInput.addEventListener('keyup' , search)
    })
 
}


const search = (e) => {
    const input =  e.target
    const sortingValue = input.value
    if (sortingValue.length > 2) {
        let sortingPath = "name"
        fastAlgorytm(recipes , sortingPath , sortingValue)
        drawArticle()
    }
   
}