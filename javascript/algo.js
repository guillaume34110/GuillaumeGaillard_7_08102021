import { bufferedRecipe } from "./drawArticle.js"

export const fastAlgorytm = (recipeArray , sortingPath , sortingValue) => {
    bufferedRecipe[0] =[]
    for (let i = 0 ; i < recipeArray.length ; i++) {
        console.log(recipeArray[i][sortingPath])
        if(recipeArray[i][sortingPath].includes(sortingValue)){
            bufferedRecipe.push(recipeArray[i])
        }
    }
}
const slowAlgorytm = () => {

}