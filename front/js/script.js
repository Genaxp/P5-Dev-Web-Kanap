//alert("j'y suis arrivé")
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((res) => ajoutProduits(res))
//console.log(document)

function ajoutProduits(produit){
    console.log(produit)
    const imageUrl = produit[0].imageUrl
// console.log("url de l'image",imageUrl)

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "Super Benoit"

    const items = document.querySelector("#items")
    items.appendChild(anchor)
//console.log("le lien a été ajouté")
}

