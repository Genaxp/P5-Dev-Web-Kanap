// const orderId = getOrderId()
// displayOrderWithId()
// clearCache()

// // recherches des id dans le local storage
// function getOrderId(){
// const queryString = window.location.search
// const urlParams = new URLSearchParams(queryString)
// return urlParams.get("orderId")

// }

// //envoi les id depuis le local Storage
// function displayOrderWithId(orderId) {
//     const orderIdElement = document.getElementById("orderId")
//     orderIdElement.textContent = orderId
// }

// //supprimer les données du cache une fois le form envoyé
// function clearCache(){
//     const clear = window.localStorage
//     clear.clear()
// }

function getOrderId(){
    let url = document.location.href
    url = new URL(url)
    let id = url.searchParams.get("id")

    document.getElementById("orderId").textContent = id
}

getOrderId()