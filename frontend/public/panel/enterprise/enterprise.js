import '../panel.js';
import { refreshAuthToken } from '../../Scripts/utils/http.js';

document.getElementById('search-firm-button').addEventListener('click', getDataFirmsByName);
document.getElementById('exit-firm-modal').addEventListener('click', () => {
    document.getElementById('firm-modal').close()
});

let firms = []

window.onload = () => {
    getDataFirms();
}

function getDataFirms(){
    fetch('/api/firms', {
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
    .then(data => { updateFirmTable(data) })
    .catch(error => {
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getDataFirms();
            }
        }
    })
}

function getDataFirmsByName(){
    const name = document.getElementById('name-search').value;

    fetch(`/api/firms/name/${name}`, {
        method: 'GET',
        credentials: 'include',
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
    .then(data => { updateFirmTable(data) })
    .catch(error => {
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getDataFirms();
            }
        }
    })
}

function updateFirmTable(data){
    firms = [];


    const table = document.getElementById('enterprise-table');
    table.innerHTML = '';
    let sequence = 0;

    const headerLine = document.createElement('tr');

    const tdHeaderSequence = document.createElement('th');
    tdHeaderSequence.className = 'firmSequenceColumn';
    tdHeaderSequence.textContent = 'Sequencia';

    const tdHeaderName = document.createElement('th');
    tdHeaderName.className = 'firmNameColumn';
    tdHeaderName.textContent = 'Nome';

    headerLine.appendChild(tdHeaderSequence);
    headerLine.appendChild(tdHeaderName);
    table.appendChild(headerLine);

    // Guardar os valores das empresas ?
    data.forEach(firm => {
        sequence++;
        firms.push(firm);

        const line = document.createElement('tr');

        const tdSequence = document.createElement('td');
        tdSequence.className = 'firmSequenceColumn';
        tdSequence.textContent = sequence;

        const tdName = document.createElement('td');
        tdName.className = 'firmNameColumn';
        tdName.textContent = firm.name;

        line.appendChild(tdSequence);
        line.appendChild(tdName);
        
        line.addEventListener("dblclick", () => {
            let cells = line.querySelectorAll("td");
            showFirmModal (cells)
        });

        table.appendChild(line);
    });
}

// Mostrar o modal de firmas -- Para personalizar os dados da empresa, adicionar funcionários e etc...
function showFirmModal(cells) {

    const modal = document.getElementById("firm-modal");
    const firmName =  document.getElementById("firm-name");

    let sequence = (cells[0].innerText) - 1; 

    const nameField = document.getElementById('name');
    const addressField = document.getElementById('address');

    // Pegar o sequencial da tabela
    firmName.textContent = firms[sequence].name;
    nameField.value = firms[sequence].name;
    addressField.value = firms[sequence].address;

    modal.showModal();
}

function updateFirm(){

}

function deleteFirm () {

}