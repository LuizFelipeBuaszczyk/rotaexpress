const roles = {
    0: "Member",
    1: "Administrador"
}


export function getRole(level){
    return roles[level];
}

export function getRoleOptionHTML(){
    return  `
                <option value="0">Membro</option>
                <option value="1">Administrador</option>
            `;
}