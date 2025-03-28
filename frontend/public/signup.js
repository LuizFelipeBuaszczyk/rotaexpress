document.getElementById("submitSignUpForm").addEventListener("submit", function(event) {
    submitSignUp(event);
});


function validateFormData(formData){

}

// Enviando requisição
function submitSignUp(event) {
    event.preventDefault();

    let form = new FormData(event.target);
    let fullName = form.get("fullname");
    let email = form.get("email");
    let password = form.get("password");
    let confirmPassword = form.get("confirm-password");

    const formData = {
        'name': fullName,
        'email': email,
        'password': password,
        'confirm-password': confirmPassword    
    }

    // Validando formulário preenchido
    if (validateFormData(formData)){
    
        const signUpData = {
            'name': fullName,
            'email': email,
            'password': password
        }

        fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        })
            .then(response => {
                // Resgatar resposta da API
                const status_code = response.status;

                switch (status_code / 100) {
                    case 4: // Caso tiver algum erro ele pula direto para o .catch
                        return Promise.reject(response.json())
                    default:
                        return response.json(); 
                }
                
            })
            .then(data => {
                // Processar dados recebidos
                console.log(data);
            })
            .catch(error => {
                // Trata os erros
                responseAPIError(error)
            });
        } 
}

// Trando possivel erro de resposta
function responseAPIError(data){
    console.log('ERRO: ');
    console.log(data);
}
