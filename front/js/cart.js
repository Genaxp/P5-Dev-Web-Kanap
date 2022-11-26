// Récupérer tous les items du CART depuis le localStorage avec une boucle
let CART = localStorage.getItem("cart")
if (CART){
    CART= JSON.parse(CART)
}else {
    CART={}
}
//***********Récupération des données sur localStorage***********
let total = 0

for (let i in CART){ //in = la clé
    let cartItem = CART[i]
    let id =cartItem.id
    let url = `http://localhost:3000/api/products/${id}`
    fetch(url)
    .then((response) => response.json())
    .then((res) => displayItem(res,cartItem,id))
    .catch((err) =>console.log('Erreur:' + err));
}

function displayItem(item,cartItem,id){
    const article = putArticle(item,cartItem)  //fais un article
    const imgdiv = putImageDiv(item)       // fais une div
    article.appendChild(imgdiv) 
    const itemContent = putItemContent(item,cartItem,id) //création de l'attribut HTML
    article.appendChild(itemContent)
    total += item.price*cartItem.quantity

    displayArticle(article,item, cartItem,id)     //montre le
    displayTotalPrice(item,cartItem,id)
    displayTotalQuantity(item,cartItem,id)
    updatePriceQuantity()   
    deleteArticle()
}

// // mettre l'article dans la page HTML
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

// création de la quantité total 
function displayTotalQuantity(item,cartItem){
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = Object.values(CART).reduce((total,cartItem) => total + cartItem.quantity,0)
    totalQuantity.textContent = total
}

// création du prix total 
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    totalPrice.textContent= total
}
  
// création de la div cart item content
function putItemContent(item,cartItem,newValue,id) {
    const itemContent = document.createElement("div") //création de la DIV
    itemContent.classList.add("cart__item__content") 

    const description = putDescription(item,cartItem)
    const settings = putSettings(item, cartItem,id,newValue)

    itemContent.appendChild(description)
    itemContent.appendChild(settings)
    return itemContent
}

function putSettings(item,cartItem,quantity,id,newValue,id) {
    const settings =  document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    QuantityToSettings(settings, item,cartItem,quantity,id,newValue)
    DeleteToSettings(settings,cartItem,item)
    return settings
}

function DeleteToSettings(settings,item,cartItem,id) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.addEventListener("click", ()  => deleteArticle(cartItem,item,id))
    div.appendChild(p)
    settings.appendChild(div)
} 

function deleteArticle(cartItem,item,id){
    delete CART.key
    console.table(key)

    displayTotalPrice()
    displayTotalQuantity()
    deleteDataCache(item)     
}

function deleteDataCache(item,id,cartItem,color){
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

//supression article de la page visible
function deleteArticlePage(item,color,id,cartItem){
    const deleteArticle = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    console.log(deleteArticle)
    deleteDataCache(item,id,cartItem)  
    return
}


function QuantityToSettings(settings, item,cartItem,id) {
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
    input.value = cartItem.quantity 
    input.addEventListener("input", ()=> updatePriceQuantity (cartItem.id,input.value,id))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}   

/*** Mise à jour de la quantité et du prix du pannier ***/
function updatePriceQuantity(id,newValue) {
    const itemUpdate =Object.values(CART).find((cartItem) =>cartItem.id === id)
    itemUpdate.quantity= Number(newValue)
    displayTotalPrice()
    displayTotalQuantity()
    saveDataCacheItem()
    location.reload()
}
/*** Modification de quantité dans le localStorage ***/
function saveDataCacheItem(item) {
    localStorage.setItem("cart", JSON.stringify(CART))
}

function putDescription(item,cartItem) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    
    const p = document.createElement("p")
    p.textContent = cartItem.color

    const pp = document.createElement("p")
    pp.textContent = item.price + "€"

    description.appendChild(h2)//appendé à la description
    description.appendChild(p)
    description.appendChild(pp)
    return description
}

// création de l'image 
function putImageDiv(item){
    const div = document.createElement("div")// création de la DIV HTML
    div.classList.add("cart__item__img")

    const image = document.createElement('img') 
    image.src = item.imageUrl 
    image.alt = item.altTxt 
    div.appendChild(image)
    return div
} 

// création de l'article HTML
function putArticle(item){
    const article = document.createElement("article") 
    article.classList.add("cart__item") 
    article.dataset.id = item.id //rajout d'un attribut html
    article.dataset.color = item.color
    return article
}

// //******************************création Page du form*****************************************

// création d'une alerte d'envoi du formulaire

function submitForm(e) {
    alert("formulaire envoyé")
    e.preventDefault()
    if (CART=== 0) { 
        alert ("Veuillez sélectionner des articles")//pas d'envoi de formulaire si pas d'articles
        return 
    }
    if (isinvalidForm()) return
    if (mailnotValid()) return

const body = putBody()

//requete post 
let url = `http://localhost:3000/api/products/order`
fetch(url, {
    method:"POST",
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((response) => 
        response.json().then((data) => { // envoie sur page de confirmation avec données
        const orderId = data.orderId
        window.location.href = "./confirmation.html?orderId=" + orderId
        return console.log(data)
        })
    )
    .catch((err) => console.error(err))
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

function isinvalidForm(){
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) =>{
        if (input.value === ""){
            alert("Remplissez tous les champs")
            return true
        }
        return false
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