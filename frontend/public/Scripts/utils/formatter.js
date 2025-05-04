
// Formatador de número de telefone
export function formatter_phone_number(number){
    // Caso o caracter digita Não for um número ele deixa vázio
        if (isNaN(number[number.length - 1])){
            number = number.slice(0, -1);
        }
        else {
            let formatedNumber = number.replace(/\D/g, ''); // Deixar apenas os números
            number = '';
    
            // Formata para 2 formatos 
            // (xx) xxxx-xxxx | (xx) xxxxx-xxxx
            if (formatedNumber.length === 11){
                for (let i = 0; i < formatedNumber.length; i++){
                    switch (number.length) {
                        case 0:
                            number += '(' + formatedNumber[i];
                            break;
                        case 2:
                            number += formatedNumber[i] + ') ' ;
                            break;
                        case 9:
                            number += formatedNumber[i] + '-';
                            break;
                        default:
                            number += formatedNumber[i];
                            break;
                    }
                }
            } 
            else {
                for (let i = 0; i < formatedNumber.length; i++){
                    switch (number.length) {
                        case 0:
                            number += '(' + formatedNumber[i];
                            break;
                        case 2:
                            number += formatedNumber[i] + ') ' ;
                            break;
                        case 8:
                            number += formatedNumber[i] + '-';
                            break;
                        default:
                            number += formatedNumber[i];
                            break;
                    }
                }
            }    
        }
        return number;
}

// Formatador de CPF
// Caso o caracter digita Não for um número ele deixa vázio
export function formatter_cpf(cpf){
    if (isNaN(cpf[cpf.length - 1])){
        cpf = cpf.slice(0, -1);
    }
    else {
        let formatedCPF = cpf.replace(/\D/g, ''); // Deixar apenas os números
        cpf = '';

        for (let i = 0; i < formatedCPF.length; i++){
            switch (cpf.length) {
                case 3:
                    cpf += '.' + formatedCPF[i];
                    break;
                case 7: 
                    cpf += '.' + formatedCPF[i];
                    break;
                case 11:
                    cpf += '-' + formatedCPF[i];
                    break;
                default:
                    cpf += formatedCPF[i];
                    break;
            }
        }    
    }
    return cpf;
}