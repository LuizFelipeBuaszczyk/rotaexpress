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
    console.log(name)
}

function updateFirmTable(data){
    const table = document.getElementById('enterprise-table');
    let sequence = 0;

    table.innerHTML =   ` 
                        <thead>
                            <tr>
                                <th>Sequencial</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        `;
    // Guardar os valores das empresas ?
    data.forEach(firm => {
        sequence++;
        firms.push(firm);

        const line = document.createElement('tr');

        const tdSequence = document.createElement('td');
        tdSequence.textContent = sequence;

        const tdName = document.createElement('name');
        tdName.textContent = firm.name;

        line.appendChild(tdSequence);
        line.appendChild(tdName);
        
        line.addEventListener("dblclick", showFirmModal);

        table.appendChild(line);
    });
}

// Mostrar o modal de firmas -- Para personalizar os dados da empresa, adicionar funcionários e etc...
function showFirmModal() {
    const modal = document.getElementById("firm-modal");
    const firmName =  document.getElementById("firm-name");

    // Pegar o sequencial da tabela
    firmName.textContent = firms[0].name;

    modal.showModal();
}

function updateFirm(){

}

function deleteFirm () {

}