// Récupérer tous les items du CART depuis le localStorage avec une boucle
let CART = localStorage.getItem("cart")
if (CART){
    CART= JSON.parse(CART)
} else {
    CART={}
}
//***********Récupération des données sur localStorage***********
let total = 0
const productPrices = {}

for (let i in CART){ //in = la clé
    let cartItem = CART[i]
    let id =cartItem.id
    let url = `http://localhost:3000/api/products/${id}`
    fetch(url)
    .then((response) => response.json())
    .then((res) =>{
        productPrices[res._id] = res.price
        displayItem(res,cartItem,id)
    })
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
    updatePriceQuantity(item,cartItem,id)   
    deleteArticle(item,cartItem,id)
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
    let total = 0
    for(let i in CART ){
        total += CART[i].quantity * productPrices[CART[i].id]
    }
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

function DeleteToSettings(settings,cartItem,id,item) {
    const btn_del = document.createElement("div")
    btn_del.classList.add("cart__item__content__settings__delete")
    btn_del.addEventListener("click", () => deleteArticle(cartItem.id,cartItem,item))
    const p = document.createElement("p")
    p.classList.add("deleteItem")  
    p.textContent = "Supprimer"
    btn_del.appendChild(p)
    settings.appendChild(btn_del)
} 

function deleteArticle(cartItem,item,id){
     deleteDataCache(item,cartItem,id)
     deleteArticlePage(cartItem,item)

     displayTotalQuantity()
     displayTotalPrice() 
}

// Supression article dans le localStorage
function deleteDataCache(item,id){
    const key = `${id}-${item.color}`
    delete CART[key]
    localStorage.setItem("cart",JSON.stringify(CART))
}

// Supression article de la page visible
function deleteArticlePage(cartItem,item){
    const deleteArticle = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    deleteArticle.remove()
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
function updatePriceQuantity(id,newValue,cartItem) {
    const itemUpdate =Object.values(CART).find((cartItem) =>cartItem.id === id)
    itemUpdate.quantity= Number(newValue)
    displayTotalPrice()
    displayTotalQuantity()
    saveDataCacheItem(cartItem)
}

/*** Modification de quantité dans le localStorage ***/
function saveDataCacheItem(cartItem) {
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
function putArticle(cartItem,item){
    const article = document.createElement("article") 
    article.classList.add("cart__item") 
    article.dataset.id = cartItem._id //rajout d'un attribut html
    article.dataset.color = item.color
    return article
}

//******************************création Page du form*****************************************

// création d'une alerte d'envoi du formulaire

const btn_order = document.querySelector("#order") 

btn_order.addEventListener("click",(e) => {
    e.preventDefault() 

    const orderDetail = {
         
        contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
        },
        products : [idCart]
    }

    const idCart =[]
    for(let item in CART){
        if (!idCart.includes(item.id)){
        idCart.push(item.id)
        }   
    }
    // mise de l'objet dans le local storage
    localStorage.setItem("orderValues",JSON.stringify(orderDetail))

    // envoi des valeurs dans le serveur
    const sendDetails={
        CART,
        orderDetail
        }
    console.log(sendDetails)

    if (isinvalidForm()) return
    if (firstNameNotValid()) return
    if (lastNameNotValid()) return
    if (addressNotValid()) return
    if (cityValid()) return
    if (mailNotValid()) return

   
    alert("formulaire envoyé")  // message form envoyé 

    const options = {
        method: "POST",
        body: JSON.stringify(sendDetails),
        headers: {
            "Content-Type": "application/json",    
        }
    }

    // //requete post 
    let url= ("http://localhost:3000/api/products/order")
    fetch ( url , options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
            // envoie sur page de confirmation avec données
            document.location.href = "confirmation.html?id=" + data.orderId
    })
    .catch((err) =>console.log('Erreur:' + err));
})


//mettre le contenu du LS dans les champs du formulaire

// const dataLS = localStorage.getItem("orderDetail") 
// const dataLSObject = JSON.parse(dataLS)

// document.querySelector("#firstName").setAttribute('value' , dataLSObject.firstName)
// document.querySelector("#lastName").value = dataLSObject.lastName
// document.querySelector("#address").value = dataLSObject.address
// document.querySelector("#city").value = dataLSObject.city
// document.querySelector("#email").value = dataLSObject.email


// console.log(dataLS)
// console.log(dataLSObject)



   


//validation du formulaire

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

// Expression réguluère utilisées fréquemment dasn le form

const regexText = (value) => {
    return /^[A-Za-z+-]{3,25}$/.test(value)
}
const regexAddress = (value) => {
    return /^[0-9a-zA-Z+-.\s]{3,40}$/.test(value)
}

const regexEmail = ( value) => {
    // return /^[A-Za-z0-9+_.-]+@(.)$/.test(value)
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}

function firstNameNotValid(){
    const firstName =  document.querySelector("#firstName").value
    if (regexText(firstName) == false){ 
        document.getElementById("firstNameErrorMsg").textContent = "Veuillez remplir ce champ"
        alert("Veuillez saisir un prénom valide")
        return true
    }else {
        document.getElementById("firstNameErrorMsg").textContent = ""
       return false
    }
}

function lastNameNotValid(){
    const lastName =  document.querySelector("#lastName").value
    if (regexText(lastName) == false){
        document.getElementById("lastNameErrorMsg").textContent = "Veuillez remplir ce champ"
        alert("Veuillez saisir un nom valide")
        return true
    }else {
        document.getElementById("lastNameErrorMsg").textContent = ""
        return false
    }
}

function addressNotValid(){
    const address =  document.querySelector("#address").value
    if (regexAddress(address) == false){
        document.getElementById("addressErrorMsg").textContent = "Veuillez remplir ce champ"
        alert("Veuillez saisir une adresse valide")
        return true
    }else {
        document.getElementById("addressErrorMsg").textContent = ""
        return false
    }
}

function cityValid(){
    const city =  document.querySelector("#city").value
    if (regexText(city) == false){
        document.getElementById("cityErrorMsg").textContent = "Veuillez remplir ce champ"
        alert("Veuillez saisir un nom de ville valide")
        return true
    }else {
        document.getElementById("cityErrorMsg").textContent = ""
       return false
    }
}


function mailNotValid(){
    const mail =  document.querySelector("#email").value
    if (regexEmail(mail) == false){
        document.getElementById("emailErrorMsg").textContent = "Veuillez remplir ce champ"
        alert("Veuillez saisir un email valide")
        return true
    }else {
        document.getElementById("emailErrorMsg").textContent = ""
        return false
    }
}

