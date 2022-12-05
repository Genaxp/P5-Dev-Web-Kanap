
getOrderId()

function getOrderId(){
    let url = document.location.href
    url = new URL(url)
    let id = url.searchParams.get("orderId")
    
    // const queryString = window.location.search
    // const urlParams = new URLSearchParams(queryString)
    // return urlParams.get("orderId")

    document.getElementById("orderId").textContent = id //envoi les id depuis le local Storage
}

//supprimer les données du cache une fois le form envoyé
function clearCache(){
    const clear = window.localStorage
    clear.clear()
}
