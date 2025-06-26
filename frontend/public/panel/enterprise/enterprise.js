import '../panel.js';
import { refreshAuthToken } from '../../Scripts/utils/http.js';
import { getRole, getRoleOptionHTML } from "../../Scripts/utils/memberRole.js"

document.getElementById('search-firm-button').addEventListener('click', getDataFirmsByName);
document.getElementById('exit-firm-modal').addEventListener('click', () => {
    document.getElementById('firm-modal').close()
});
document.getElementById('exit-member-modal').addEventListener('click', () => {
    document.getElementById('member-modal').close()
});

document.getElementById('exit-add-member-modal').addEventListener('click', () => {
    document.getElementById('add-member-modal').close()
});

document.getElementById('exit-create-firm-modal').addEventListener('click', () => {
    document.getElementById('create-firm-modal').close()
});


document.getElementById('remove-member-button').addEventListener('click', removeMember); 
document.getElementById('save-create-firm-button').addEventListener('click', createFirm);
document.getElementById('delete-firm-button').addEventListener('click', deleteFirm);
document.getElementById('save-uploaded-firm-button').addEventListener('click', saveFirm);

document.getElementById('send-firm-invite-to-user').addEventListener('click', sendFirmInvite);
document.getElementById('add-member-button').addEventListener('click', showAddMemberModal);
document.getElementById('create-firm-button').addEventListener('click', showCreateFirmModal);


let firms = [];
let selectedFirm;
let members = [];
let selectedMember;

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

    if (!name) {
        getDataFirms();
    }
    else{
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
    selectedFirm = firms[sequence]; 

    const nameField = document.getElementById('name');
    const addressField = document.getElementById('address');

    // Pegar o sequencial da tabela
    firmName.textContent = firms[sequence].name;
    nameField.value = firms[sequence].name;
    addressField.value = firms[sequence].address;

    getDataMemberByFirm();

    modal.showModal();
}

function updateFirm(){

}

function deleteFirm () {

    const response = confirm(`Deseja realmente excluir a organização ${selectedFirm.name}?`);


    if(response){
        fetch(`/api/firms/${selectedFirm.id_firm}`, {
            method: 'DELETE',
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
            getDataFirms()
        })
        .catch(error => {
            if (error.status === 401) {
                const refreshed = refreshAuthToken();
                if (refreshed){
                    deleteFirm();
                }
            }
        })
    }
}

function saveFirm(){
    const response = confirm(`Deseja realmente salvar os dados alterados?`);


    if(response){
        const firm_name = document.getElementById('name').value;
        const firm_address = document.getElementById('address').value;

        const data = {
            name: firm_name,
            address: firm_address 
        }

        fetch(`/api/firms/${selectedFirm.id_firm}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
            console.log(data);
            getDataFirms()
        })
        .catch(error => {
            if (error.status === 401) {
                const refreshed = refreshAuthToken();
                if (refreshed){
                    saveFirm();
                }
            }
        })
    }
}

function getDataMemberByFirm(){
    
    fetch(`/api/firms/member/${selectedFirm.id_firm}`, {
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
    .then(data => { updateMemberTable(data) })
    .catch(error => {
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getDataMemberByFirm();
            }
        }
    })
}

function updateMemberTable(data){
    members = [];

    const table = document.getElementById('member-table');
    table.innerHTML = '';
    let sequence = 0;

    const headerLine = document.createElement('tr');

    const tdHeaderSequence = document.createElement('th');
    tdHeaderSequence.className = 'memberSequenceColumn';
    tdHeaderSequence.textContent = 'Sequencia';

    const tdHeaderName = document.createElement('th');
    tdHeaderName.className = 'memberNameColumn';
    tdHeaderName.textContent = 'Nome';

    const tdHeaderEmail = document.createElement('th');
    tdHeaderEmail.className = 'memberEmailColumn';
    tdHeaderEmail.textContent = 'Email';

    const tdHeaderRole = document.createElement('th');
    tdHeaderRole.className = 'memberRoleColumn';
    tdHeaderRole.textContent = 'Permissão';

    headerLine.appendChild(tdHeaderSequence);
    headerLine.appendChild(tdHeaderName);
    headerLine.appendChild(tdHeaderEmail);
    headerLine.appendChild(tdHeaderRole);
    table.appendChild(headerLine);

    // Guardar os valores das empresas ?
    data.forEach(member => {
        sequence++;
        members.push(member);

        const line = document.createElement('tr');

        const tdSequence = document.createElement('td');
        tdSequence.className = 'memberSequenceColumn';
        tdSequence.textContent = sequence;

        const tdName = document.createElement('td');
        tdName.className = 'memberNameColumn';
        tdName.textContent = member.user.name;


        const tdEmail = document.createElement('td');
        tdEmail.className = 'memberEmailColumn';
        tdEmail.textContent = member.user.email;

        const tdRoles = document.createElement('td');
        tdRoles.className = 'memberRoleColumn';
        tdRoles.textContent = getRole(member.role);

        line.appendChild(tdSequence);
        line.appendChild(tdName);
        line.appendChild(tdEmail);
        line.appendChild(tdRoles);
        
        line.addEventListener("dblclick", () => {
            let cells = line.querySelectorAll("td");
            showMemberModal (cells)
        });

        table.appendChild(line);
    });
}

function showMemberModal(cells){

    const modal = document.getElementById("member-modal");
    const memberName =  document.getElementById("member-name");
    const selectMemberOptions = document.getElementById("select-roles-member");

    selectMemberOptions.innerHTML = getRoleOptionHTML();

    let sequence = (cells[0].innerText) - 1; 
    selectedMember = members[sequence]; 

    memberName.textContent = selectedMember.user.name;


    modal.showModal();
}

function removeMember(){
    fetch(`/api/firms/${selectedFirm.id_firm}/member/${selectedMember.id_member}`, {
        method: 'DELETE',
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
    .then(data => { updateMemberTable(data) })
    .catch(error => {
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                getDataMemberByFirm();
            }
        }
    })
}

function showAddMemberModal(){
    const modal = document.getElementById('add-member-modal');

    modal.showModal();
}

function sendFirmInvite(){
    const email = document.getElementById('add-member-email-input').value;

    const data = {
        email: email,
        role: 0
    }

    fetch(`/api/firms/member/${selectedFirm.id_firm}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
    .then(data => { console.log(data)})
    .catch(error => {
        console.log(error)
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                sendFirmInvite();
            }
        }
    })
}

function showCreateFirmModal(){
    const modal = document.getElementById('create-firm-modal');

    modal.showModal();
}

function createFirm(){
    const name = document.getElementById('create-firm-name-input').value;
    const address = document.getElementById('create-firm-address-input').value;

    const data = {
        name: name,
        address: address
    }

    fetch(`/api/firms`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
        const member = data;
        data.sequence = firms.length;
        firms.push(data);
        updateFirmTable(firms);
    })
    .catch(error => {
        console.log(error)
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if (refreshed){
                sendFirmInvite();
            }
        }
    })
}