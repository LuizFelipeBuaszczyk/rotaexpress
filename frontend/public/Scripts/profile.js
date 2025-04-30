document.getElementById('edit-button').addEventListener('click', allowEditFields);

document.getElementById('cpf').addEventListener('input', inputCPFField);
document.getElementById('number').addEventListener('input', inputNumberField);

/*
    Ao carregar ele tenta buscar as informações do usuário, para preencher os campos do profile
*/
window.onload = () => {

    fetch('/api/users/', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {

        const status_code = response.status;

        switch (Math.floor(status_code / 100)) {
            case 4: // Caso tiver algum erro ele pula direto para o .catch
                return response.json().then(err => Promise.reject(err))
            default:
                return response.json(); 
        }
    })
    .then(data => {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        
        if (data.cpf  != ''){
            document.getElementById('cpf').value = data.cpf;
        }

        if (data.phone_number != ''){
            document.getElementById('number').value = data.phone_number;
        }
    })
    .catch(error => {
        responseAPIError(error)
    })
}


// Trata erros da API
function responseAPIError(error){
    if(error.status == 401){
        if(error.message == ''){

        }
    }
}


function allowEditFields(){
    const nameField = document.getElementById('name');
    nameField.removeAttribute('readonly');

    const emailField = document.getElementById('email');
    emailField.removeAttribute('readonly');

    const cpfField = document.getElementById('cpf');
    cpfField.removeAttribute('readonly');

    const numberField = document.getElementById('number');
    numberField.removeAttribute('readonly');
}


// Máscara e validação das teclas digitadas pelo usuário no campo de CPF
function inputCPFField() {
    let cpf = document.getElementById('cpf').value;

    // Caso o caracter digita Não for um número ele deixa vázio
    if (isNaN(cpf[cpf.length - 1])){
        cpf = cpf.slice(0, -1);
    }
    else {
        let formatedCPF = cpf.replace(/\D/g, ''); // Deixar apenas os números
        cpf = '';

        for (let i = 0; i < formatedCPF.length; i++){
            switch (cpf.length) {
                case 3:
                    cpf += '.' + formatedCPF[i];
                    break;
                case 7: 
                    cpf += '.' + formatedCPF[i];
                    break;
                case 11:
                    cpf += '-' + formatedCPF[i];
                    break;
                default:
                    cpf += formatedCPF[i];
                    break;
            }
        }    
    }
    document.getElementById('cpf').value = cpf;
}

function inputNumberField() {
    let number = document.getElementById('number').value;

    // Caso o caracter digita Não for um número ele deixa vázio
    if (isNaN(number[number.length - 1])){
        number = number.slice(0, -1);
    }
    else {
        let formatedNumber = number.replace(/\D/g, ''); // Deixar apenas os números
        number = '';

        // Formata para 2 formatos 
        // (xx) xxxx-xxxx | (xx) xxxxx-xxxx
        if (formatedNumber.length == 11){
            for (let i = 0; i < formatedNumber.length; i++){
                switch (number.length) {
                    case 0:
                        number += '(' + formatedNumber[i];
                        break;
                    case 2:
                        number += formatedNumber[i] + ') ' ;
                        break;
                    case 9:
                        number += formatedNumber[i] + '-';
                        break;
                    default:
                        number += formatedNumber[i];
                        break;
                }
            }
        } 
        else {
            for (let i = 0; i < formatedNumber.length; i++){
                switch (number.length) {
                    case 0:
                        number += '(' + formatedNumber[i];
                        break;
                    case 2:
                        number += formatedNumber[i] + ') ' ;
                        break;
                    case 8:
                        number += formatedNumber[i] + '-';
                        break;
                    default:
                        number += formatedNumber[i];
                        break;
                }
            }
        }    
    }
    document.getElementById('number').value = number;
}

// Função para pegar um novo token
function refreshToken(){

    // Pega um novo token válido
    fetch('/api/refresh/', {
        method:'POST',
        credentials: 'include' // Incluir os cookies na requisição
    })
    .then()
}