document.getElementById("submitSignUpForm").addEventListener("submit", function(event) {
    submitSignUp(event);
});


// Valida o formulário do front
function validateFormData(formData){

    // Valida o campo de nome
    if(!isFullNameValid(formData.fullName)){
        return false;
    }

    // Valida o campo de email
    if(!isEmailValid(formData.email)){
        return false;
    }

    // Valda dos campos de senha
    if(!isPasswordValid(formData.password, formData.confirm_password)){
        return false;
    }

    return true;
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
        'confirm_password': confirmPassword    
    }

    // Validando formulário preenchido
    if (validateFormData(formData)){
    
        const signUpData = {
            'name': fullName,
            'email': email,
            'password': password
        }

        fetch('http://localhost:3000/users/', {
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
    console.log(data);
}

// --------------------Mostrar mensagem informando o erro do usuário--------------------
function isFullNameValid (fullName){
    if(!fullName){
        return false;
    }
    if (fullName.length < 3) {
        return false;
    }
    if (fullName.length > 50){
        return false;
    }
    return true;
}

function isEmailValid (email){
    if(!email){
        return false;
    }

    return true;
}

function isPasswordValid(password, confirmPassword){
    if (!password || !confirmPassword){
        return false;
    }

    if (password.length < 6){
        return false;
    }

    if (password !== confirmPassword){
        return false;
    }
    return true;
}