
const cart = []

retrieveItems()
cart.forEach((item) => displayItem(item))


function retrieveItems(){
    const numberOfItems = localStorage.length

    for (let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}


function displayItem(item) {
    const article = putArticle(item)
    displayArticle(article)
    const div = putImage(item)
    article.appendChild(div)

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

function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}
    