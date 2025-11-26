const alturaInput = document.getElementById("altura");

alturaInput.addEventListener("input", function () {
  let value = this.value.replace(",", ".").replace(/[^0-9.]/g, "");

  // Verifica se já existe um ponto decimal no valor
  const decimalIndex = value.indexOf(".");

  if (decimalIndex !== -1) {
    const beforeDecimal = value.slice(0, decimalIndex);
    const afterDecimal = value.slice(decimalIndex + 1, decimalIndex + 3);

    value = `${beforeDecimal}.${afterDecimal}`;
  }

  // Limita o valor a no máximo dois dígitos decimais
  if (decimalIndex === -1 && value.length > 1) {
    value = value.slice(0, 1) + "." + value.slice(1, 3);
  }

  this.value = value;
});

document.getElementById("calcular").addEventListener("click", function (event) {
  event.preventDefault();
  const altura = parseFloat(alturaInput.value);
  const peso = parseFloat(document.getElementById("peso").value);

  if (!isNaN(altura) && !isNaN(peso) && altura > 0 && peso > 0) {
    const imc = (peso / (altura * altura)).toFixed(2);
    let classificacao = "";

    if (imc < 18.5) {
      classificacao = "Magreza";
    } else if (imc >= 18.5 && imc <= 24.9) {
      classificacao = "Peso Normal";
    } else if (imc >= 25.0 && imc <= 29.9) {
      classificacao = "Sobrepeso";
    } else if (imc >= 30.0 && imc <= 34.9) {
      classificacao = "Obesidade Grau 1";
    } else if (imc >= 35.0 && imc <= 39.9) {
      classificacao = "Obesidade Grau 2";
    } else if (imc >= 40.0) {
      classificacao = "Obesidade Grave";
    }

    document.getElementById("resultado").innerText = `Seu IMC é: ${imc}`;
    document.getElementById(
      "classificacao"
    ).innerText = `Classificação: ${classificacao}`;
    document.getElementById("resultado-card").style.display = "block";
  } else {
    document.getElementById("resultado").innerText =
      "Por favor, insira valores válidos.";
    document.getElementById("classificacao").innerText = "";
    document.getElementById("resultado-card").style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pesoInput = document.getElementById("peso");
  const calcularButton = document.getElementById("calcular");
  const reiniciarButton = document.getElementById("reiniciar");

  function checkInputs() {
    const altura = alturaInput.value.trim();
    const peso = pesoInput.value.trim();

    calcularButton.disabled = !(altura && peso);
  }

  function reiniciar() {
    alturaInput.value = "";
    pesoInput.value = "";
    document.getElementById("resultado").innerText = "";
    document.getElementById("classificacao").innerText = "";
    document.getElementById("resultado-card").style.display = "none";
    checkInputs();
  }

  alturaInput.addEventListener("input", checkInputs);
  pesoInput.addEventListener("input", checkInputs);

  reiniciarButton.addEventListener("click", reiniciar);

  checkInputs();
});
function mostrarResultado() {
  const resultadoCard = document.getElementById("resultado-card");

  resultadoCard.style.display = "flex";
  resultadoCard.style.opacity = "1"; // Caso o display flex não habilite automaticamente a animação.
}

// Chame a função mostrarResultado() quando o botão 'Calcular IMC' for clicado
document.getElementById("calcular-btn").addEventListener("click", function () {
  mostrarResultado();
});
