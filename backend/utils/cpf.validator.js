function isValidCPF(cpf) {
  if (typeof cpf !== "string") return false;

  // Remove caracteres não numericos
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica o comprimento

  const calculateDigit = (base) => {
    let sum = 0;
    for (let i = 0; i < base; i++) {
      sum += parseInt(cpf[i]) * (base + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calculateDigit(9);
  const digit2 = calculateDigit(10);

  if (digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10])) return true;
  return false;
}

module.exports = isValidCPF;