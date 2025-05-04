import { refreshAuthToken } from './utils/http.js';
import { formatter_phone_number, formatter_cpf } from './utils/formatter.js';

document.getElementById('edit-button').addEventListener('click', allowEditFields);

document.getElementById('cpf').addEventListener('input', inputCPFField);
document.getElementById('number').addEventListener('input', inputNumberField);

let editFields = false;

/*
    Ao carregar ele tenta buscar as informações do usuário, para preencher os campos do profile
*/
window.onload = () => {
    getData();
}


function allowEditFields(){

    if (editFields){
        const nameField = document.getElementById('name');
        nameField.setAttribute('readonly', true);
        nameField.style.backgroundColor = "rgba(182, 182, 182, 0.288)";

        const emailField = document.getElementById('email');
        emailField.setAttribute('readonly', true);
        emailField.style.backgroundColor = "rgba(182, 182, 182, 0.288)";

        const cpfField = document.getElementById('cpf');
        cpfField.setAttribute('readonly', true);
        cpfField.style.backgroundColor = "rgba(182, 182, 182, 0.288)";

        const numberField = document.getElementById('number');
        numberField.setAttribute('readonly', true);
        numberField.style.backgroundColor = "rgba(182, 182, 182, 0.288)";
        editFields = false;
        
    }else{
        const nameField = document.getElementById('name');
        nameField.removeAttribute('readonly');
        nameField.style.backgroundColor = "white";

        const emailField = document.getElementById('email');
        emailField.removeAttribute('readonly');
        emailField.style.backgroundColor = "white";

        const cpfField = document.getElementById('cpf');
        cpfField.removeAttribute('readonly');
        cpfField.style.backgroundColor = "white";

        const numberField = document.getElementById('number');
        numberField.removeAttribute('readonly');
        numberField.style.backgroundColor = "white";
        editFields = true;
    }
}


// Máscara e validação das teclas digitadas pelo usuário no campo de CPF
function inputCPFField() {
    let cpf = document.getElementById('cpf').value;

    cpf = formatter_cpf(cpf);
    document.getElementById('cpf').value = cpf;
}

// Máscara e validação das teclas digitadas pelo usuário no campo de telefone
function inputNumberField() {
    let number = document.getElementById('number').value;

    number = formatter_phone_number(number);
    document.getElementById('number').value = number;
}

// Pega os dados do usuário logado
function getData(){
    fetch('/api/users/', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {

        const status_code = response.status;

        switch (Math.floor(status_code / 100)) {
            case 4: // Caso tiver algum erro ele pula direto para o .catch
                return response.json().then(err => {
                    return Promise.reject({
                        status: response.status,
                        body: err
                    });
                });
            default:
                return response.json(); 
        }
    })
    .then(data => {
        document.getElementById('name').value = data.name;
        document.getElementById("username").textContent = data.name;
        document.getElementById('email').value = data.email;
        
        if (data.cpf !== ''){
            document.getElementById('cpf').value = data.cpf;
        }

        if (data.phone_number !== ''){
            document.getElementById('number').value = data.phone_number;
        }
    })
    .catch(error => {
        console.log(error)
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getData();
            }
        }
    })
}