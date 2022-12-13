/**
 * récupérerl'id depuis un lien 
 */
function getOrderId(){
    let urlOn = document.location.href
    urlOn = new URL(urlOn)
    let id = urlOn.searchParams.get("id")

    //affichage de l'id daans le navigateur
    document.getElementById("orderId").textContent = id 
}

/**
 * supprimer les données du cache une fois le form envoyé
 */
function clearCache(){
    const clear = window.localStorage
    clear.clear()
}

getOrderId()
clearCache()