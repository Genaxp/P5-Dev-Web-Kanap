// Récupération paramètre d'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
let itemPrice = 0
let imgUrl, altText,articleName
useButton()

url = `http://localhost:3000/api/products/${id}`
fetch (url)
    .then((response) => response.json())
    .then((res) => detail(res))

/**
 * création des élèments de l'object
 * @param {Object} kanap 
 */
function detail(kanap){
    const { price , imageUrl, altTxt,name, description , colors} = kanap
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    putImage (imageUrl, altTxt)
    putTitle(name)
    putPrice(price)
    putDescription(description)
    putColors(colors)
}

/**
 * détail de l'élèment image de l'objet Kanap
 * @param {string} imageUrl 
 * @param {string} altTxt 
 */
function putImage(imageUrl,altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)

}

/**
 * détail de l'élèment name de l'objet Kanap
 * @param {string} name 
 */
function putTitle(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

/**
 * détail de l'élèment price de l'objet Kanap
 * @param {string} price 
 */
function putPrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

/**
 * détail de l'élèment description de l'objet Kanap
 * @param {string} description 
 */
function putDescription(description){
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

/**
 * détail de l'élèment colors de l'objet Kanap
 * @param {string} colors 
 */
function putColors(colors){
    const select = document.querySelector("#colors")
    if (select != null){
        colors.forEach((color) =>{
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

function useButton() {
   
    const button = document.querySelector("#addToCart")

    if (button != null)  
        button.addEventListener("click",(e) => {
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector("#quantity").value
        if (isValidNumbersQuantity()) return
        if (isCartValid(color,quantity)) return
       
        const cartStorage = localStorage.getItem("cart")
        const cart = cartStorage ? JSON.parse(cartStorage) : {}
        const key = `${id}-${color}`

        if (cart[key]) {
            cart[key].quantity = Number(cart[key].quantity ) + Number(quantity)
        }
        else{
            const data = {
                id: id,
                color: color,
                quantity: Number(quantity)   
            }
            cart[key] = data
        }        
        localStorage.setItem("cart", JSON.stringify(cart))
        window.location.href = "cart.html"
    })
}


/**
 * consition pour vérification de la conformité du produit
 * @param {string} color 
 * @param {number} quantity 
 * @returns {boolean}
 */
function  isCartValid(color,quantity){
    if (color == null || color === "" || quantity == null || quantity == 0){
    alert ( "Veuillez choisir une couleur et une quantité")
    return true
    } 
    return false     
}
  
/**
 * conditions pour vérification d'une quantité précise
 * @returns {boolean}
 */
function isValidNumbersQuantity() {
    const numbers = document.querySelector("#quantity").value
    const regex =   /^[1-9]$|^[1-9][0-9]$|^(100)$/                      
    if(regex.test(numbers) === false){
        alert ("Choisissez une quantité entre 1 et 100")
        return true
    }
    return false
}

