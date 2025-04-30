window.onload = () => {
    // Verificar se o usuário tem cookies salvos e ainda estão acessiveis para logar
    fetch('api/login/check', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if(data.login) {
            window.location.href="../panel.html";
        }
    })
}

document.getElementById("submitSignIn").addEventListener("submit", function(event){
    submitSignIn(event);
});

function submitSignIn(event){
    event.preventDefault();
    document.getElementById("errorResponse").innerHTML = ``;

    let form = new FormData(event.target);

    const signInData = {
        'email': form.get("email"),
        'password': form.get("password")
    }


    fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInData)
    })
    .then(response => {
        const status_code = response.status;

        switch (Math.floor(status_code / 100)) {
            case 4: // Caso tiver algum erro ele pula direto para o .catch
                return response.json().then(err => Promise.reject(err))
            default:
                window.location.href="../panel.html"

        }
    })
    .catch(error => {
        //Tratar erros
        responseAPIError(error);
    })
}


// Tratando erros de resposta da API
function responseAPIError(error){
    const messageError = document.getElementById("errorResponse");

    messageError.innerHTML = `<p>${error.error}</p>`;
}