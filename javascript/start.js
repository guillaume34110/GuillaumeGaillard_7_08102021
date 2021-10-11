import { bufferedRecipe, drawArticle } from "./drawArticle.js";
import { recipes } from "../data/recipes.js";
import {dropDownEventListeners} from "./dropdownControl.js"
import { SearchEventListener } from "./search.js";

const start = () => {
    bufferedRecipe[0] = recipes
    drawArticle()
    dropDownEventListeners()
    SearchEventListener()
}



const body = document.querySelector('body');
body.onload = start;