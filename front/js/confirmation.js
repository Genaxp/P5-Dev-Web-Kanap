const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
  
fetch (`http://localhost:3000/api/confirmation/${id}` )
    .then((response) => response.json())
    .then((res) => detail(res))