const canvas = document.getElementById('heatmap')
const ctx = canvas.getContext('2d')
let matrix = []



function colorMap(valor) {
  let r, g, b;

  if (valor < 25) {
    r = 0;
    g = Math.round((valor - 20) * 255 / 5);
    b = 255;
  } else if (valor < 30) {
    r = 0;
    g = 255;
    b = Math.round((30 - valor) * 255 / 5);
  } else if (valor < 35) {
    r = Math.round((valor - 30) * 255 / 5);
    g = 255;
    b = 0;
  } else {
    r = 255;
    g = Math.round((40 - valor) * 255 / 5);
    b = 0;
  }

  return `rgb(${r}, ${g}, ${b}, 0.7)`;
}



function updateHeatmap (matrix){ 
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      ctx.fillStyle = colorMap(matrix[x][y])
      ctx.fillRect( 25 * y, 25 * x, 50, 50)
    }
  }
}


const thermal = async () => {
  await fetch(`http://192.168.1.18:8080/thermal`, {
  })
  .then(response => response.json())
  .then(data => {
    matrix = data.thermalImageArray
  })
  updateHeatmap(matrix)
}



function resize (matrizOriginal) {

// Factor de escala
const factorEscalaX = 10;
const factorEscalaY = 10;

// Matriz resultante de 320x240
const matrizResultante = [];

// Bucle para recorrer la matriz resultante
for (let y = 0; y < 240; y++) {
  matrizResultante[y] = [];
  for (let x = 0; x < 320; x++) {
    // Calcular posición correspondiente en la matriz original
    const posicionX = Math.round(x / factorEscalaX);
    const posicionY = Math.round(y / factorEscalaY);
    
    // Calcular posiciones vecinas en la matriz original
    const xVecinoIzquierdo = Math.floor(x / factorEscalaX);
    const xVecinoDerecho = Math.ceil(x / factorEscalaX);
    const yVecinoSuperior = Math.floor(y / factorEscalaY);
    const yVecinoInferior = Math.ceil(y / factorEscalaY);
    
    // Interpolar los valores de los píxeles vecinos
    const valorVecinoSuperiorIzquierdo = matrizOriginal[yVecinoSuperior][xVecinoIzquierdo];
    const valorVecinoSuperiorDerecho = matrizOriginal[yVecinoSuperior][xVecinoDerecho];
    const valorVecinoInferiorIzquierdo = matrizOriginal[yVecinoInferior][xVecinoIzquierdo];
    const valorVecinoInferiorDerecho = matrizOriginal[yVecinoInferior][xVecinoDerecho];
    
    // Interpolar los valores de los píxeles vecinos en X
    const valorInterpoladoSuperior = ((valorVecinoSuperiorDerecho - valorVecinoSuperiorIzquierdo) / factorEscalaX) * (posicionX - xVecinoIzquierdo) + valorVecinoSuperiorIzquierdo;
    const valorInterpoladoInferior = ((valorVecinoInferiorDerecho - valorVecinoInferiorIzquierdo) / factorEscalaX) * (posicionX - xVecinoIzquierdo) + valorVecinoInferiorIzquierdo;
    
    // Interpolar los valores de los píxeles vecinos en Y
    const valorInterpolado = ((valorInterpoladoInferior - valorInterpoladoSuperior) / factorEscalaY) * (posicionY - yVecinoSuperior) + valorInterpoladoSuperior;
    
    // Asignar el valor interpolado al píxel correspondiente en la matriz resultante
    matrizResultante[y][x] = valorInterpolado;
  }
}

return  matrizResultante

}

