const orderId = getOrderId()
displayOrderWithId(orderId)
clearCache()

// recherches des id dans le local storage
function getOrderId(){
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const orderId = urlParams.get("orderId")
return orderId
}

//envoi les id depuis le local Storage
function displayOrderWithId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

//supprimer les données du cache une fois le form envoyé
function clearCache(){
    const clear = window.localStorage
    clear.clear()
}