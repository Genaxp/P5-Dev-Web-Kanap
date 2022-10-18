const cart = []

retrieveItems ()

cart.forEach((item) => displayItem(item))

function retrieveItems () {
    const numberOfItems = localStorage.length

    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = putArticle(item)
    const div = putImage(item)
    article.appendChild(div)

   const itemContent = putItemContent(item)
   article.appendChild(itemContent)
    displayArticle (article)
}

function putItemContent(item) {
    const itemContent = document.createElement("div")
    itemContent.classList.add("cart__item__content")

    const description = putDescription(item)
    const settings = putSettings(item)

    itemContent.appendChild(description)
    itemContent.appendChild(settings)

    return itemContent
} 

function putSettings(item){
    const settings =  document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    return settings
}
function addQuantityToSettings(settings, item){
   const quantity = document.createElement("div")
   quantity.classList.add("cart__item__content__settings__quantity")
   const p = document.createElement("p")
   p.textContent = "Qté : "
   quantity.appendChild(p)

   const input = document.createElement("input")
   input.type = "number"
   input.classList.add("itemQuantity")
   input.name = "itemQuantity"
   input.min = "1"
   input.max = "100"
   input.value = item.quantity

   settings.appendChild(input)
}

function putDescription(item){
     
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    
    const p = document.createElement("p")
    p.textContent = item.color

    const pp = document.createElement("p")
    pp.textContent = item.price + "€"

    description.appendChild( h2)
    description.appendChild( p)
    description.appendChild( pp)
    return description 
}



function putImage(item){
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function putArticle(item){
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}
    