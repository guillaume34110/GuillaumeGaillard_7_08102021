

export let bufferedRecipe = []


export const drawArticle = () => {
console.log(bufferedRecipe[0])
const main = document.querySelector('main')
main.replaceChildren()
bufferedRecipe[0].forEach( (recipe) => {
    const newArcticle = document.createElement('article')
    recipe.ingredients.map(e => {
        if (e.unit === "grammes" )e.unit = "g"
        else if(e.unit === "cuillères à soupe") e.unit="cuillères"
    })
    const newHtml = `
    <img class ="recipe-img" src ="" alt = "">
    <div class = "recipe d-flex flex-column ">
        <div class = "recipe-head mb-3 d-flex justify-content-between align-items-center">
        <h3>${recipe.name}</h3>
            <div class = d-flex align-items-center>
                <i class="far fa-clock mr-1 d-flex align-items-center"></i>
                <h2>${recipe.time} min</h2>
            </div>
        </div >
        <div class = "d-flex justify-content-between align-items-start">
        <ul>${recipe.ingredients.map(e => {
            return `<li class = " ingredients ${e}" title="${e}" ><h4>${e.ingredient}</h4><span> ${e.quantity ? ' :' : ''} ${e.quantity ? e.quantity :' '  } ${e.unit ? e.unit : ' '} </span> </li>`
        }).join("")}
        </ul>
        <p>${recipe.description}</p>
    </div>
</div>
    `
    newArcticle.innerHTML = newHtml
    main.appendChild(newArcticle)
})

    
}
