import '../panel.js';
import { refreshAuthToken } from '../../Scripts/utils/http.js';
import { formatter_phone_number, formatter_cpf } from '../../Scripts/utils/formatter.js';
import { showNotification } from '../../Scripts/utils/notifications.js';
import { isSamePassword } from '../../Scripts/utils/validator.js';

document.getElementById('edit-button').addEventListener('click', allowEditFields);
document.getElementById('save-button').addEventListener('click', sendUpdatedFields);
document.getElementById('delete-button').addEventListener('click', deleteUser);
document.getElementById('alter-password').addEventListener('click', showChangePasswordModal);
document.getElementById('cancel-change-password-button').addEventListener('click', cancelChangePassword);
document.getElementById('send-change-password-button').addEventListener('click', sendChangePassword);

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
function getData() {
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
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getData();
            }
        }
    })
}

// Atualiza os campos padrões do usuário
function sendUpdatedFields(){

    const user = {
        'name': document.getElementById('name').value,
        'email': document.getElementById('email').value,
        
    };

    let cpf = document.getElementById('cpf').value;
    let phone_number = document.getElementById('number').value;

    if (cpf){
        user.cpf = cpf;
    }

    if (phone_number){
        user.phone_number = phone_number;
    }

    fetch('/api/users', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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
        const colorMessage = '#4CAF50' 
        document.getElementById('name').value = data.name;
        document.getElementById("username").textContent = data.name;
        document.getElementById('email').value = data.email;
        
        if (data.cpf !== ''){
            document.getElementById('cpf').value = data.cpf;
        }

        if (data.phone_number !== ''){
            document.getElementById('number').value = data.phone_number;
        }

        showNotification('Dados atualizados!', document.getElementById('notification'),colorMessage)
    })
    .catch(error => {
        const colorMessage = 'red';
        switch(error.status){
            case 401:
                const refreshed = refreshAuthToken();
                if (refreshed){
                    getData();
                }
                showNotification('Ocorreu um erro de autenticação, tente novamente!', document.getElementById('notification'), colorMessage)
                break;
            case 400: // Tratar respostas da API
                showNotification(error.body.error, document.getElementById('notification'), colorMessage);
                break;
            default:
                alert(error);
        }
    })
}

function deleteUser(){

    const response = confirm("Deseja realmente excluir sua conta?");

    if (response){
        fetch('/api/users', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
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
                    window.location.href = '/signup';
            }
        })
        .catch(error => {
            if (error.status === 401) {
                const refreshed = refreshAuthToken();
                if (refreshed){
                    getData();
                }
            }
        })
    }
}

function showChangePasswordModal(){
    const modal = document.getElementById('change-password-modal');

    modal.showModal();
}

function cancelChangePassword () {
    const modal = document.getElementById('change-password-modal');

    modal.close();
}

function sendChangePassword(){
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-passoword').value;
    const errorMessage = document.getElementById('error-message-change-password');
    errorMessage.textContent = '';

    const validate = isSamePassword(password, confirmPassword);

    if(validate){
        const bodyRequest = {
            'password': password
        }

        fetch('/api/users/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyRequest)
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
            proccessChangePasswordResponse(data);
        })
        .catch(error => {
            console.log(error);
        })
    } else {
        errorMessage.textContent = 'Os campos de senhas devem estar iguais.'
    }
}

function proccessChangePasswordResponse (res) {
        console.log(res);
    const status_code = res.status;


} 