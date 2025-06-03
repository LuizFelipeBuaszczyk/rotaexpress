window.onload = () => {
    confirmPassword();
}


function confirmPassword(){
    const param = new URLSearchParams(window.location.search);
    let updated = false;

    const id = param.get('id');

    fetch(`/api/confirmation/password?id=${id}`, {
        method: 'PATCH'
    })
    .then(response => {
        const status_code = response.status;

        if (Math.floor(status_code / 100) === 2){
            return response.json();
            
        }
        else {
            return response.json().then(err => Promise.reject(err))
        }
    })
    .then (data => {
        alert(data.message);
        window.location.href = '/';
    })
    .catch(error => {
        responseAPIError(error);
    })
}

function responseAPIError(data){
    alert(data.error);
    window.location.href = '/';
}
