export async function logout(){

    try {
        await fetch('/api/login/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            const status_code = response.status;

            if (status_code == 200){
                window.location.href="../../index.html";
            }
            else {
            throw new Error(`Erro ao realizar logout. Status ${status_code}`); 
            }
        })
    } catch (error){
        alert("Erro não esperado!");
    }
}