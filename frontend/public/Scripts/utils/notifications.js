export async function showNotification(message, notify_element, color){
    notify_element.textContent = message;
    

    notify_element.style.opacity = '1';
    notify_element.style.transform = 'translateY(0)';
    notify_element.style.backgroundColor = color;

    setTimeout(() => {
        notify_element.style.opacity = '0';
        notify_element.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            // notify_element.style.display = 'none';
        }, 500);
    }, 3000);
}
