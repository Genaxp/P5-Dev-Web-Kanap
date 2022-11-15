// Envoi requête HTTPde type GET au service web ===>renvoie promesse
let url = `http://localhost:3000/api/products`
fetch(url)
    .then((response) => response.json()) //fonction appelée pour récupérer le résultat
    .then((res) => putItemsOnPage(res)) // récupération de la vraie valeur, résultatJSON est une promesse
    .catch((err) => {
        console.log('Erreur: ' + err)
    })
    
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

function appendElementsToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
 }


 function putAnchor(id){
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
} 

function appendArticleaAnchor(anchor, article){ 
    const items = document.querySelector("#items")
        {   items.appendChild(anchor)
            anchor.appendChild(article)
            console.log("elt ajouté à items",items)
        }     
 }

 function putImg(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function faireH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName") // permet d'accéder directemetn à la liste des classes
    return h3
}

function putP(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}