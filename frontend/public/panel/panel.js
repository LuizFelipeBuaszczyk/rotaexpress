import { logout } from "../Scripts/utils/logout.js";
import { checkToken } from "../Scripts/utils/http.js";

document.querySelectorAll('[data-logout]').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('logout-modal').style.display = 'flex';
    });
})

document.getElementById('cancel-logout-button').addEventListener('click', () => {
    document.getElementById('logout-modal').style.display = 'none';
});

document.getElementById('confirm-logout-button').addEventListener('click', logout); 

window.onload = () => {
    const login = checkToken();
    if (!login){
        window.location.href = '/signin'
    }
}