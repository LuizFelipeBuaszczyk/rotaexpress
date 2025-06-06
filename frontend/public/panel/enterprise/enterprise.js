import '../panel.js';
import { refreshAuthToken } from '../../Scripts/utils/http.js';

document.getElementById('search-firm-button').addEventListener('click', getDataFirms);

window.onload = () => {
    getDataFirms(null);
}

function getDataFirms(filter){
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

function updateFirmTable(data){
    const table = document.getElementById('enterprise-table');
    let sequence = 0;

    table.innerHTML =   ` 
                        <tr>
                        <th>Sequencial</th>
                        <th>Nome</th>
                        </tr>
                        `;
    // Guardar os valores das empresas ?
    data.forEach(firm => {
        sequence++;

        const line = document.createElement('tr');

        const tdSequence = document.createElement('td');
        tdSequence.textContent = sequence;

        const tdName = document.createElement('name');
        tdName.textContent = firm.name;

        line.appendChild(tdSequence);
        line.appendChild(tdName);

        table.appendChild(line);
    });
}