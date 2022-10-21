const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
  
let itemPrice = 0
let imgUrl, altText,articleName

fetch (`http://localhost:3000/api/products/${id}` )
    .then((response) => response.json())
    .then((res) => detail(res))

function detail(kanap){
    const {altTxt, colors, description, imageUrl, name, price } = kanap
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

function putImage(imageUrl,altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)

}

function putTitle(name){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function putPrice(price){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

function putDescription(description){
    const descrip = document.querySelector("#description")
    if (descrip != null) descrip.textContent = description
}

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

const button = document.querySelector("#addToCart")
if (button != null) {
    button.addEventListener("click",(e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value

        if (color == null || color ==="" || quantity == null || quantity==0){
            alert ( "Veuillez choisir une couleur et une quantité")
            return
        }
        const key = `${id}-${color}`
        const data = {
            id: id,
            color: color,
            quantity: quantity,
            price: itemPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName
        }
        localStorage.setItem(key, JSON.stringify(data))
        window.location.href = "cart.html"
    })
}

// function quantityMinMax(quantity){
//     const quantity = document.querySelector("#quantity")
//     quantity.min = "1"
//     quantity.max = "100"
//     quantity.appendChild()
// }