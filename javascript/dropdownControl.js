import { bufferedRecipe } from "./drawArticle.js"
import { appareilSearch, ingredientsSearch, search, tagSearch, ustensilesSearch } from "./search.js"
import { splitClean } from "./splitClean.js"

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
const tagRecover = (mainArray) => {//recuperation de tous les tags
    
    const tagsArray = []
    mainArray.forEach(recipe => {
        if (key === "ingredients") {
            recipe[key].forEach(ingredient => {
                if (!tagsArray.includes(ingredient.ingredient)) tagsArray.push(ingredient.ingredient)
            })
        } else if (key === "appliance") {
            if (!tagsArray.includes(recipe[key])) tagsArray.push(recipe[key])
        } else if (key === "ustensils") {
            recipe[key].forEach(ustensil => {
                if (!tagsArray.includes(ustensil)) tagsArray.push(ustensil)
            })
        }
    })
    return tagsArray
}

const tagSearchSorting = (tagsArray) => { /// recherche dans tous les tags en fonction de l'input
   tagSearch[0].forEach(tag =>{
        for (let i = 0 ; i <  tagsArray.length ; i++){
            if (!tagsArray[i].toLowerCase().includes(tag.toLowerCase())) {
                tagsArray.splice(i,1)
                i-=1
            }
        }
    })
    return tagsArray
}

const createDropDownNewElements = (tagsArray ,limit) => {
    for (let i = 0; i < limit; i++) {
        if (tagsArray[i]) {
            const newLi = document.createElement("li")
            newLi.classList.add(`li-${key}`)
            newLi.classList.add(`li-tag`)
            const newHtml = `${tagsArray[i]}`
            newLi.innerHTML = newHtml
            list.appendChild(newLi)
            newLi.addEventListener("click", createTags)
            if (i === limit - 1) {
                list.classList.remove("dropdown-20")
                btn.classList.remove("dropdown-20")
                list.classList.remove("dropdown-10")
                btn.classList.remove("dropdown-10")
            }
        } else if (btn.classList.contains("btn-active")) {

            if (i < 20 && i > 10) {
                dropdownForm.classList.add("dropdown-form-20")
                list.classList.add("dropdown-20")
                btn.classList.add("dropdown-20")
                list.classList.remove("dropdown-10")
                btn.classList.remove("dropdown-10")
            } else if (i < 10) {
                dropdownForm.classList.add("dropdown-form-10")
                list.classList.add("dropdown-10")
                btn.classList.add("dropdown-10")
                list.classList.remove("dropdown-20")
                btn.classList.remove("dropdown-20")
            } else if (i > 20) {
                list.classList.remove("dropdown-20")
                btn.classList.remove("dropdown-20")
                list.classList.remove("dropdown-10")
                btn.classList.remove("dropdown-10")
            }
            i = limit
        }

    }
}
export const fillList = () => { // inscrit les tags dans les differentes listes

    if (list) {
        const limit = 30
        list.replaceChildren()
        let tagsArray = tagRecover(bufferedRecipe[0])
        tagsArray = tagSearchSorting(tagsArray)
        createDropDownNewElements(tagsArray,limit)
    }
}

const cleanInput = (className) => {
const input = document.querySelector(`.${className}`)
input.value = ""
tagSearch[0]=[]
}

const createTags = (e) => {
    
    const tagsList = document.querySelector(".tags")
    const tagLi = e.target
    const newTag = document.createElement("li")
    const newHtml = `${tagLi.innerText} <i id = "${tagLi.innerText}" class="far fa-times-circle"></i>`
    if (tagLi.classList.contains("li-ingredients")) {
        newTag.classList.add(`tag-ingredient`)
        cleanInput('input-ingredients')
    }
    else if (tagLi.classList.contains("li-appliance")){
        newTag.classList.add(`tag-appliance`)
        cleanInput('input-appareil')
    } 
    else if (tagLi.classList.contains("li-ustensils")){
        newTag.classList.add(`tag-ustensils`)
        cleanInput('input-ustensiles')
    } 
    newTag.innerHTML = newHtml
    tagsList.appendChild(newTag)
    newTag.addEventListener("click", removeTag)
    const newSearchTag = tagLi.innerText.split(" ")
    splitClean(newSearchTag)
    newSearchTag.forEach(nT => {
        if (tagLi.classList.contains("li-ingredients")) addNewTag(ingredientsSearch[0] ,nT)  
        else if (tagLi.classList.contains("li-appliance")) addNewTag(appareilSearch[0] ,nT)
        else if (tagLi.classList.contains("li-ustensils")) addNewTag(ustensilesSearch[0] ,nT)
    })

    search()
}

const addNewTag = (tagsArray , newTag) => {
     let tagToken = 0
    tagsArray.forEach((currentTag) => {
        if (currentTag === newTag)
            tagToken++
    })
    if (tagToken === 0) tagsArray.push(newTag)
}

const removeTag = (e) => {
    console.log(e)
    const tagLi = e.target
    const tag = e.target.parentNode
    let arrayToSearch
    if (tag.classList.contains("tag-ingredient")) arrayToSearch = ingredientsSearch[0] 
    else if (tag.classList.contains("tag-appliance")) arrayToSearch = appareilSearch[0]
    else if (tag.classList.contains("tag-ustensils")) arrayToSearch = ustensilesSearch[0]
    const oldSearchTag = tagLi.id.split(" ")
    splitClean(oldSearchTag)
    removeOldTags(oldSearchTag,arrayToSearch)
    tag.remove();
    search()
}

const removeOldTags = (removingTagsArray,arrayToSearch) => {
    removingTagsArray.forEach(oldTag => {
        for (let i = 0; i < arrayToSearch.length; i++) {
            if (oldTag.toLowerCase().includes(arrayToSearch[i].toLowerCase()) || arrayToSearch[i].toLowerCase().includes(oldTag.toLowerCase())) {
                arrayToSearch.splice(i, 1)
                i -= 1
            }
        }
    })
    console.log(arrayToSearch , removingTagsArray);
}
