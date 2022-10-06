fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((res) => ajoutProduits(res))

    
function ajoutProduits(produit){
    console.log(produit)

    //let i = 0;
    //do {
     //   i += 1;
    // console.log(i);
    //} while (i < 7);

    //for (let i = 0; i < produit.lenght;i++) {
    //   console.log("kanap numéro:", i ,produit[i])
    //}

    produit.forEach((kanap) => {
        console.log("kanap: ", kanap)
    
        //const _id = kanap //produit[0]._id
        //const imageUrl = kanap //produit[0].imageUrl
        //const altTxt = kanap //produit[0].altTxt
        //const name = kanap //produit[0].name
        //const description = kanap //produit[0].description

        const { _id, imageUrl, altTxt, name, description} = kanap
        
        const anchor = faireAnchor(_id)
        const article = document.createElement("article")
        const image = faireImg(imageUrl, altTxt)
        const h3 = faireH3(name)
        const p = faireParagraphe(description)

        appendElementsToArticle(article, image, h3, p)
        appendArticleaAnchor(anchor, article)

    })
} 
 function appendElementsToArticle(article, image, h3, p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
 }


 function faireAnchor(id){
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

 function faireImg(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function faireH3(name){
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function faireParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}