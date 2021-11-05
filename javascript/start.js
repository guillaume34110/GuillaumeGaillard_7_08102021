import { bufferedRecipe, drawArticle } from "./drawArticle.js";
import { recipes } from "../data/recipes.js";
import {dropDownEventListeners} from "./dropdownControl.js"
import { SearchEventListener } from "./search.js";

const start = () => {
    bufferedRecipe[0] = recipes
    drawArticle()//affiche les recettes
    dropDownEventListeners()//initialise les eventListeners des dropDown menus 
    SearchEventListener()///initialise les eventListeners de la barre de recherche
}


/*lancement du programme a la fin du chargement de la page*/
const body = document.querySelector('body');
body.onload = start;