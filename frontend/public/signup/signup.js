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

                switch (Math.floor(status_code / 100)) {
                    case 4: // Caso tiver algum erro ele pula direto para o .catch
                        return response.json().then(err => Promise.reject(err))
                    default:
                        return response.json(); 
                }
                
            })
            .then(data => { // Inutil??
                alert('Conta cadastrada!')
                window.location.href="/signin";
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
        document.getElementById('errorMessageFullmane').textContent = `Preencha com seu nome.`
        return false;
    }
    if (fullName.length < 3) {
        document.getElementById('errorMessageFullmane').textContent = `Seu nome deve ter mais que 3 letras.`
        return false;
    }
    if (fullName.length > 50){
        document.getElementById('errorMessageFullmane').textContent = `Seu nome é muito grande, abrevie o seu nome.`
        return false;
    }
    return true;
}

function isEmailValid (email){

    if(!email){
        document.getElementById('errorMessageEmail').textContent = `Preencha com seu email.`
        return false;
    }

    return true;
}

function isPasswordValid(password, confirmPassword){

    if (!password || !confirmPassword){
        document.getElementById('errorMessagePassword').textContent = `Preencha os dois campos de senha.`
        return false;
    }

    if (password.length < 6){
        document.getElementById('errorMessagePassword').textContent = `Sua senha deve conter no minímio 6 caracteres.`
        return false;
    }

    if (password !== confirmPassword){
        document.getElementById('errorMessageConfirmPassword').textContent = `Os campos de senha não são iguais.`
        return false;
    }
    return true;
}

function resetErrorMessage(){
    document.getElementById('errorMessageFullmane').textContent = '';
    document.getElementById('errorMessageEmail').textContent = '';
    document.getElementById('errorMessagePassword').textContent = '';
    document.getElementById('errorMessageConfirmPassword').textContent = '';
}