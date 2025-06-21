const roles = {
    0: "Member",
    1: "Administrador"
}


export function getRole(level){
    return roles[level]
}

export function getRoleOptionHTML(){
    return  `
                <option value="member">Membro</option>
                <option value="adm">Administrador</option>
            `;
}