const cart = []

retrieveItems()
cart.forEach((item) => displayItem())

//ajout évènement au click et envoi du formulaire

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// récupération des données des articles en objet
function retrieveItems () {
    const numberOfItems = localStorage.getItem("cart")
    console.log(numberOfItems)

    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
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
    displayTotalPrice()
    displayTotalQuantity()
}

function displayTotalQuantity(){
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}

// création du prix total 
function displayTotalPrice() {
    
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    totalPrice.textContent = total
}

// création de la div cart item content
function putItemContent(item) {
    const itemContent = document.createElement("div")
    itemContent.classList.add("cart__item__content")

    const description = putDescription(item)
    const settings = putSettings(item)

    itemContent.appendChild(description)
    itemContent.appendChild(settings)
    return itemContent
} 

function putSettings(item) {
    const settings =  document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)

    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", ()  => deleteArticle(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

// création de la fonction supprimer un article

function deleteArticle(item){
    const articleToDelete = cart.findIndex(
        (article) => article.id && article.color
        )
    delete cart[articleToDelete]
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataCache(item)
    deleteArticlePage(item)
    deleteArticle(item)
}

//supression article de la page visible
function deleteArticlePage(item){
    const deleteArticle = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    deleteDataCache(item)
}

function addQuantityToSettings(settings, item) {
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
   input.addEventListener("input", () => updatePriceQuantity( item.id, input.value, item))
   quantity.appendChild(input)
   settings.appendChild(quantity)
} 

function updatePriceQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id) 
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalPrice()
    displayTotalQuantity()
    saveDataCache(item)
}

function deleteDataCache(item){
    const key = `${item.id}-${item.color}`

    localStorage.removeItem(key)

}

function saveDataCache(item) {
    const dataSave = JSON.stringify(item)
    const key = `${item.id} - ${item.color}`
    localStorage.setItem(key, dataSave)
}

// création de la partie html div, h2, p 
function putDescription(item) {
     
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
// création html de l'img
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
  

//création Page du form

// création d'une alerte d'envoi du formulaire

function submitForm(e) {
    alert("formulaire envoyé")
    e.preventDefault()
    if (cart.length === 0) { 
        alert ("Veuillez sélectionner des articles")//pas d'envoi de formulaire si pas d'articles
        return 
    }

    if (validForm()) return
    if (mailnotValid()) return


    const body = putBody()

    //requete post 
    fetch("http://localhost:3000/api/products/order" , {
        method:"POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => { // envoie sur page de confirmation avec données
            const orderId = data.orderId
            window.location.href = "./confirmation.html?orderId=" + orderId
            return console.log(data)
        })
        .catch((err) => console.log(err))
}

function putBody(){
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
 
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products : getId()
    }
    return body
}

function getId(){
    const numberOfProducts = localStorage.length
    const ids =[]
    for (let i = 0; i < numberOfProducts; i++){
        const keyz = localStorage.key(i)
        const id = keyz.split("-")[0]
        ids.push(id)
    }
    return ids
}

function validForm(){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) =>{
        if (input.value === ""){
            alert("Remplissez tous les champs")
            return
        }
    } )
}


function mailnotValid(){
    const mail =  document.querySelector("#email").value
    const regex = /[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(mail) === false){
    alert("Veuillez saisir une adresse email valid")
    return true
    }
    return false
}