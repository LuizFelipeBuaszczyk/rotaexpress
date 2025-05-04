
export async function refreshAuthToken(){
    let refreshed = false;

    await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        const status_code = response.status;

        // Verificar se o authToken foi gerado normalmente
        if (Math.floor(status_code / 100) === 4){
            refreshed = false;
            return response.json().then(err => Promise.reject(err));
        }
        else {
            refreshed = true;
        }
    })
    .catch(error => { // Não sei se funciona essa parte
        alert("Acesso expirado!")
        window.location.href="../../signin.html";
    })

    return refreshed;
}