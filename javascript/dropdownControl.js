import { bufferedRecipe } from "./drawArticle.js"

export const dropDownEventListeners = () => {
    document.querySelectorAll(".btn").forEach((e) => e.addEventListener("click", openDropdown))
}
let dropdownForm
let btn
let icon
let list
let key

const openDropdown = (e) => {
    const target = e.target
    dropdownSelection(target)
    toggleDropDown()
    fillList()
}


const dropdownSelection = (target) => {
    if (target.classList.contains("ingredients")) {
        dropdownForm = document.querySelector(".input-ingredients")
        btn = document.querySelector(".btn-ingredients")
        icon = document.querySelector(".i-ingredients")
        list = document.querySelector(".dropdown-list-ingredients")
        key = "ingredients"
    }
    else if (target.classList.contains("appareil")) {
        dropdownForm = document.querySelector(".input-appareil")
        btn = document.querySelector(".btn-appareil")
        icon = document.querySelector(".i-appareil")
        list = document.querySelector(".dropdown-list-appareil")
        key = "appliance"
    }
    else if (target.classList.contains("ustensiles")) {
        dropdownForm = document.querySelector(".input-ustensiles")
        btn = document.querySelector(".btn-ustensiles")
        icon = document.querySelector(".i-ustensiles")
        list = document.querySelector(".dropdown-list-ustensiles")
        key = "ustensils"
    }

}
const toggleDropDown = () => {

    if (dropdownForm.classList.contains("dropdown-form-active")) {
         dropdownForm.classList.remove("dropdown-form-20")
        list.classList.remove("dropdown-20")
        btn.classList.remove("dropdown-20")
        dropdownForm.classList.remove("dropdown-form-10")
        list.classList.remove("dropdown-10")
        btn.classList.remove("dropdown-10")
        dropdownForm.classList.remove("dropdown-form-active")
        list.classList.remove("dropdown-list-active")
        btn.classList.remove("btn-active")
        icon.style.transform = "rotate(0deg)"
       
    } else {
        dropdownForm.classList.add("dropdown-form-active")
        list.classList.add("dropdown-list-active")
        btn.classList.add("btn-active")
        icon.style.color = "white"
        icon.style.transform = "rotate(180deg)"
    }
}
const fillList = () => {
    const limit = 30
    const tagsArray = []
    list.replaceChildren()
    console.log(bufferedRecipe[0])
    bufferedRecipe[0].forEach(recipe => {
       
    if (key === "ingredients") {
            recipe[key].forEach(ingredient => {
                console.log(ingredient)
                if (!tagsArray.includes(ingredient.ingredient)) tagsArray.push(ingredient.ingredient)
            }) 
    } else if(key === "appliance") {
            if (!tagsArray.includes(recipe[key])) tagsArray.push(recipe[key]) 
    } else if (key === "ustensils"){
            recipe[key].forEach(ustensil => {
                if (!tagsArray.includes(ustensil)) tagsArray.push(ustensil)
        })
    }
})

    for (let i = 0; i < limit; i++) {
        if (tagsArray[i]){
            const newLi = document.createElement("li")
            const newHtml = `${tagsArray[i]}`
            newLi.innerHTML = newHtml
            list.appendChild(newLi)
        }else if (btn.classList.contains("btn-active")){
            
            if (i<20 && i>10) {
                console.log(i)
                dropdownForm.classList.add("dropdown-form-20")
                list.classList.add("dropdown-20")
                btn.classList.add("dropdown-20")
               
            } else if (i<10){
                dropdownForm.classList.add("dropdown-form-10")
                list.classList.add("dropdown-10")
                btn.classList.add("dropdown-10")
            }
        i = limit
        }
    }

    }