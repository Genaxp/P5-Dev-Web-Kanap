// Envoi requête HTTPde type GET au service web ===>renvoie promesse

let url = `http://localhost:3000/api/products`
fetch(url)
    .then((response) => response.json()) //fonction appelée pour récupérer le résultat
    .then((res) => putItemsOnPage(res)) // récupération de la vraie valeur, résultatJSON est une promesse
    .catch((err) => {
        console.log('Erreur: ' + err)
    })

/**
 * création des élèment du squelette composant un produit
 * @param {string} item 
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
 * création des élèments dans le HTML
 * @param {HTML Element} article 
 * @param {string} image 
 * @param {string} h3 
 * @param {string} p 
 */
function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
 }

 /**
  * création du lien vers autre page
  * @param {string} id 
  * @returns {html Element}
  */
 function putAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
} 

/**
 * création des elements html href et article
 * @param {html element} anchor 
 * @param {html element} article 
 */
function appendArticleaAnchor(anchor, article) { 
    const items = document.querySelector("#items")
        {   items.appendChild(anchor)
            anchor.appendChild(article)
        }     
 }


 /**
  * création de l'elèment image avec alt et src dans le html
  * @param {string} imageUrl 
  * @param {string} altTxt 
  * @returns {html element}
  */
 function putImg(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


/**
 * création de l'élèment h3 avec alt et src dans le html
 * @param {string} name 
 * @returns {html element}
 */
function putH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName") // permet d'accéder directemetn à la liste des classes
    return h3
}

/**
 * création de l'élèment p dans le html
 * @param {string} description 
 * @returns {html Element}
 */
function putP(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}