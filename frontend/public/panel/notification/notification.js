import '../panel.js';

document.getElementById('exit-notification-modal').addEventListener('click', () => {
    document.getElementById('notification-modal').close();
})

let notifications = []
let selectedNotification;

window.onload = () => {
    getNotification();
}

function getNotification(){
    fetch(`/api/notification`, {
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
        updateNotificationTable(data);
    })
    .catch(error => {
        console.log(error);
        if (error.status === 401) {
            const refreshed = refreshAuthToken();
            if(refreshed){
                getNotification();
            }
        }
    })
}

function updateNotificationTable(data){
    notifications = [];

    const table = document.getElementById('notification-table');
    const headerLine = document.createElement('tr');
    table.innerHTML = '';
    let sequence = 0;


    if(data = []){
        const tdHeaderNoData = document.createElement('th');
        tdHeaderNoData.textContent = `Você não possui nenhuma notificação!`;
        headerLine.appendChild(tdHeaderNoData);
        table.appendChild(headerLine);
    }
    else{
        
        const tdHeaderSequence = document.createElement('th');
        tdHeaderSequence.className = 'notificationSequenceColumn';
        tdHeaderSequence.style.width = "50px";
        tdHeaderSequence.textContent = '#';

        const tdHeaderTitle = document.createElement('th');
        tdHeaderTitle.className = 'notificationTitleColumn';
        tdHeaderTitle.textContent = 'Sobre';

        headerLine.appendChild(tdHeaderSequence);
        headerLine.appendChild(tdHeaderTitle);
        table.appendChild(headerLine);

        // Guardar os valores das empresas ?
        data.forEach(notification => {
            sequence++;
            notifications.push(notification);

            const line = document.createElement('tr');
            line.className = 'dataNotificationLine';

            const tdSequence = document.createElement('td');
            tdSequence.className = 'notificationSequenceColumn';
            tdSequence.textContent = sequence;
            tdSequence.style.width = "50px";

            const tdTitle = document.createElement('td');
            tdTitle.className = 'notificationTitleColumn';
            tdTitle.textContent = notification.title;
            tdTitle.style.width = "350px";

            line.appendChild(tdSequence);
            line.appendChild(tdTitle);
            
            line.addEventListener("dblclick", () => {
                let cells = line.querySelectorAll("td");
                showNotificationModal (cells)
            });

            table.appendChild(line);
        });
    }
}

function showNotificationModal(cells){

    const modal = document.getElementById('notification-modal');
    const title = document.getElementById('notification-modal-title');
    
    let sequence = (cells[0].innerText) - 1;
    selectedNotification = notifications[sequence];

    title.textContent = selectedNotification.title;

    createMainNotificationModal(selectedNotification.table);

    modal.showModal();
}

function createMainNotificationModal(table){
    const main = document.getElementById('notification-modal-main');

    switch(table){
        case "member":
            main.innerHTML =    `<p>Deseja aceitar o convite para se juntar a organização?</p>
                                <div class="buttonDiv">
                                <button id = "notification-modal-accept-firm-invite-button">Aceitar</button>
                                <button id = "notification-modal-decline-firm-invite-button">Recusar</button>
                                </div>`
            document.getElementById('notification-modal-accept-firm-invite-button').addEventListener('click', () => {
                sendAnswerToFirmInvite(true);
            });
            document.getElementById('notification-modal-decline-firm-invite-button').addEventListener('click', () => {
                sendAnswerToFirmInvite(false);
            })
    }
}

function sendAnswerToFirmInvite(answer){
        const data = {
            answer: answer,
        }
        fetch(`/api/confirmation/member?id=${selectedNotification.fk_id_table}`, {
            method: 'PATCH',
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
            getNotification(); 
        })
        .catch(error => {
            if (error.status === 401) {
                const refreshed = refreshAuthToken();
                if(refreshed){
                    sendAnswerToFirmInvite(answer);
                }
            }
        })
    
}