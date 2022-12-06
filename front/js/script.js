// Envoi requête HTTPde type GET au service web ===>renvoie promesse
/**
 * 
 */
let url = `http://localhost:3000/api/products`
fetch(url)
    .then((response) => response.json()) //fonction appelée pour récupérer le résultat
    .then((res) => putItemsOnPage(res)) // récupération de la vraie valeur, résultatJSON est une promesse
    .catch((err) => {
        console.log('Erreur: ' + err)
    })

/**
 * 
 * @param {*} item 
 */    
function putItemsOnPage(item){
    item.forEach((kanap) => {    
        const { _id, imageUrl, altTxt, name, description} = kanap
        
        const anchor = putAnchor(_id)
        const article = document.createElement("article")
        const image = putImg(imageUrl, altTxt)
        const h3 = putH3(name)
        const p = putP(description)

        appendElementsToArticle(article, image, h3, p)
        appendArticleaAnchor(anchor, article)

    })
} 

/**
 * 
 * @param {*} article 
 * @param {*} image 
 * @param {*} h3 
 * @param {*} p 
 */
function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
 }


 /**
  * 
  * @param {*} id 
  * @returns 
  */
 function putAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
} 

/**
 * 
 * @param {*} anchor 
 * @param {*} article 
 */
function appendArticleaAnchor(anchor, article) { 
    const items = document.querySelector("#items")
        {   items.appendChild(anchor)
            anchor.appendChild(article)
        }     
 }


 /**
  * 
  * @param {*} imageUrl 
  * @param {*} altTxt 
  * @returns 
  */
 function putImg(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


/**
 * 
 * @param {*} name 
 * @returns 
 */
function putH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName") // permet d'accéder directemetn à la liste des classes
    return h3
}

/**
 * 
 * @param {*} description 
 * @returns 
 */
function putP(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}