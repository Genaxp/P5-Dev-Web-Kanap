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
    .then((res) => displayItem(res,cartItem))
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

function DeleteToSettings(settings,cartItem,id,item) {
    const btn_del = document.createElement("div")
    btn_del.classList.add("cart__item__content__settings__delete")

    btn_del.addEventListener("click", () => deleteArticle(cartItem.id,cartItem,item))

  
    const p = document.createElement("p")
    p.classList.add("deleteItem")  
    
    p.textContent = "Supprimer"

    // let deleteItem = document.querySelectorAll(".deleteItem");
    // deleteItem.forEach((div,i) => div.addEventListener('click', () => deleteArticle (i,cartItem)))
    // console.log(deleteItem)

    btn_del.appendChild(p)
    settings.appendChild(btn_del)
} 

function deleteArticle(cartItem,item,id){
    const itemToDelete = Object.values(CART).findIndex(product => product.id === cartItem.id && product.color === cartItem.color)
    console.log("item to delete: " , itemToDelete)
    // delete CART.id// delete Object.values(CART)[itemToDelete] //
    delete CART[itemToDelete]
    // CART.splice(itemToDelete,1)
    console.log(CART)

     displayTotalQuantity()
     displayTotalPrice()
     deleteDataCache(item,cartItem,id)
     deleteArticlePage(cartItem,item)
     

    /******rssai avec splice= échec erreur de lecture**** */
//    cartItem.splice(index, 1)
//     localStorage.setItem('deleteItem',JSON.stringify(cart))
//     if (cartitem.length === 0) {
//         localStorage.removeItem('cart')
//     } 
    // updatePriceQuantity()   

    //*************    Essai avec  filter = échec : is not a function********************** */ 
    // for (let i =0; i<btn_supprimer.length;i++){
    // //     btn_supprimer[i].addEventListener("click", (event)  =>{
    // //     event.preventDefault()
    //     let id_supp = CART[i].cartItem.id
    //     console.log("id_supp",id_supp)
    //     CART = CART.filter( el => el.cartItem.id !== id_supp)
    // }  

    // **************** Essai avec FOR ...IN but presque atteind **************/
    // for(let i in CART){
    //     console.log(i)
    //     delete CART[id]
    //     console.log(CART)
    // }
    // alert("Cet article a été supprimé du panier") 
    // window.location.href = "cart.html"
        // })
    //  }
    // displayTotalPrice()
    // displayTotalQuantity()
    // deleteDataCache(item)     
}

// Supression article dans le localStorage
function deleteDataCache(item,id){
    console.log(item)
    const key = `${id}-${item.color}`
    console.log(key)
    localStorage.removeItem(key)
}

// Supression article de la page visible
function deleteArticlePage(cartItem,item){
    const deleteArticle = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    console.log(deleteArticle)
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
    // location.reload()
    window.location.href = "cart.html"
}
/*** Modification de quantité dans le localStorage ***/
function saveDataCacheItem(cartItem) {
    console.log(cartItem)
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
    if (mailNotValid()) return
    if (lastNameNotValid()) return
    if (firstNameNotValid()) return 
    if (addressNotValid()) return
    if (cityNotValid()) return

    const body = putBody()
    console.log(body)
}


//requete post 
let url = `http://localhost:3000/api/products/order`
fetch(url, {   // définition des paramètres requête
    method:"POST",
    body: JSON.stringify(putBody),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
    .then((response) => 
        response.json().then((data) => { // envoie sur page de confirmation avec données
        const orderId = data.orderId
        document.location.href = "confirmation.html?id=" + orderId
        return console.log(data)
        })
    )
    .catch((err) => console.error("problème à résoudre : ",err.message))
})


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
    const form = document.querySelector(".cart__order__form") //création HTML du form
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
const regexText = /^[a-zA-Zàâäéèêëïîôöùûüç\-]+$/
const regexAddress = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/

function firstNameNotValid(){
    const firstName =  document.querySelector("#firstNameErrormsg").value
    if (regexText.test(firstName) == false){
        alert("Veuillez saisir un prénom valide")
        return false
    }else {
        firstNameErrorMsg.innerHTML = null
        return true
    }
}

function lastNameNotValid(){
    const lastName =  document.querySelector("#lastNameErrormsg").value
    if (regexText.test(lastName) == false){
        alert("Veuillez saisir un nom valide")
        return false
    }else {
        lastNameErrorMsg.innerHTML = null
        return true
    }
}

function addressNotValid(){
    const address =  document.querySelector("#addressErrormsg").value
    if (regexAddress.test(address) == false){
        alert("Veuillez saisir une adresse valide")
        return false
    }else {
        addressErrorMsg.innerHTML = null
        return true
    }
}

function cityNotValid(){
    const city =  document.querySelector("#cityErrormsg").value
    if (regexText.test(city) == false){
        alert("Veuillez saisir une ville valide")
        return false
    }else {
        cityErrorMsg.innerHTML = null
        return true
    }
}

function mailNotValid(){
    const mail =  document.querySelector("#email").value
    const regexEmail =   /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    if (regexEmail.test(mail) == false){
        alert("Veuillez saisir une adresse email valide")
        return false
    }else {
        emailErrorMsg.innerHTML = null
        return true
    }
}

