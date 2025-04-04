document.getElementById("submitSignUpForm").addEventListener("submit", function(event) {
    submitSignUp(event);
});


// Valida o formulário do front
function validateFormData(formData){

    resetErrorMessage(); // Tira mensagens de erro

    // Valida o campo de nome
    if(!isFullNameValid(formData.name)){
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

        fetch('/api/register/', {
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
                        return response.json().then(err => Promise.reject(err))
                    default:
                        return response.json(); 
                }
                
            })
            .then(data => {
                // Processar dados recebidos
                // e realizar login
                console.log(data);
            })
            .catch(error => {
                // Trata os erros
                responseAPIError(error)
            });
        } 
}

// Trando possivel erro de resposta -- Se chegar nessa parte, algo de errado não esta certo
function responseAPIError(data){
    let errorMessage = data.error;
    alert(errorMessage)

    const formError = data.messages || [];
    if (formError){
        formError.forEach(msg => {
        (alert(`Campo  ${msg.field} inválido, preencha corretamente!`))
        });      
    }           
}

// --------------------Mostrar mensagem informando o erro do usuário--------------------
function isFullNameValid (fullName){
    if(!fullName){
        document.getElementById('errorMessageFullmane').innerHTML = `<label for="fullname" id="errorMessageFullmane" class="errorMessage">Preencha com seu nome.</label>`
        return false;
    }
    if (fullName.length < 3) {
        document.getElementById('errorMessageFullmane').innerHTML = `<label for="fullname" id="errorMessageFullmane" class="errorMessage">Seu nome deve ter mais que 3 letras.</label>`
        return false;
    }
    if (fullName.length > 50){
        document.getElementById('errorMessageFullmane').innerHTML = `<label for="fullname" id="errorMessageFullmane" class="errorMessage">Seu nome é muito grande, abrevie o seu nome.</label>`
        return false;
    }
    return true;
}

function isEmailValid (email){
    if(!email){
        document.getElementById('errorMessageEmail').innerHTML = `<label for="fullname" id="errorMessageFullmane" class="errorMessage">Preencha com seu email.</label>`
        return false;
    }

    return true;
}

function isPasswordValid(password, confirmPassword){
    if (!password || !confirmPassword){
        document.getElementById('errorMessagePassword').innerHTML = `<label for="fullname" id="errorMessagePassword" class="errorMessage">Preencha os dois campos de senha.</label>`
        return false;
    }

    if (password.length < 6){
        document.getElementById('errorMessagePassword').innerHTML = `<label for="fullname" id="errorMessagePassword" class="errorMessage">Sua senha deve conter no minímio 6 caracteres.</label>`
        return false;
    }

    if (password !== confirmPassword){
        document.getElementById('errorMessageConfirmPassword').innerHTML = `<label for="fullname" id="errorMessageConfirmPassword" class="errorMessage">Os campos de senha não são iguais.</label>`
        return false;
    }
    return true;
}

function resetErrorMessage(){
    document.getElementById('errorMessageFullmane').innerHTML = '';
    document.getElementById('errorMessageEmail').innerHTML = '';
    document.getElementById('errorMessagePassword').innerHTML = '';
    document.getElementById('errorMessageConfirmPassword').innerHTML = '';
}