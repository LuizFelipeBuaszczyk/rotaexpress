export async function logout(){

    try {
        await fetch('/api/login/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            const status_code = response.status;
            console.log(response)

            if (status_code == 200){
                window.location.href="/signin";
            }
            else {
            throw new Error(`Erro ao realizar logout. Status ${status_code}`); 
            }
        })
    } catch (error){
        alert(`Erro não esperado!`);
        console.log(error);
    }
}