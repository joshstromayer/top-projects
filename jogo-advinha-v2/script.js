//Inicializar variavel
let targetasDestapadas=0;
let targeta1 = null;
let targeta2 = null;
let primeiroResultado = null;
let segundoResultado = null;
let movimento = 0;
let acertos = 0;
let mostrarMovimentos = 0;

let tempoid = null;
let timer = 30;
let tempo = false;

//audio
let winAudio =new Audio(`./sound/win.wav`);
let loseAudio =new Audio(`./sound/lose.wav`);
let timeoverAudio = new Audio(`./sound/timerover.wav`)

//aponta ao documento html
mostrarMovimentos = document.getElementById("movimentos");
mostrarAcerto = document.getElementById("acertos");
mostrarTempo = document.getElementById("t-restante");



//gerar numeros a sorte
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(() => {return Math.random() - 0.5})
console.log(numeros)


//funcao contartempo
function contartempo(){
    tempoid = setInterval(()=>{
        timer--;
        mostrarTempo.innerHTML = `Tempo: ${timer} Seg`
        if(timer == 0){
            timeoverAudio.play();
            clearInterval(tempoid);
            bloquearTargetas();
        }
    },1000)

}


function bloquearTargetas() {
    for (let i = 0; i < numeros.length; i++) {
        let cardblequear = document.getElementById(i);
        //cardblequear.innerHTML = numeros[i];
        cardblequear.innerHTML = `<img src="./img/${numeros[i]}.png" alt="Girl in a jacket"></img>`
        cardblequear.disabled = true;
        
    }
}





//funcao principal
function destapar(valor) {

  if (tempo == false  ){
    contartempo()
    tempo = true;
  }

 targetasDestapadas++;
 

    if(targetasDestapadas == 1){
    targeta1 = document.getElementById(valor)
    primeiroResultado = numeros[valor] 
    targeta1.innerHTML = `<img src="./img/${primeiroResultado}.png" alt="Girl in a jacket"></img>`
        //desabilitar botao
        targeta1.disabled = true;
        
    }else if (targetasDestapadas == 2){
        targeta2 = document.getElementById(valor)
        segundoResultado = numeros[valor] 
        targeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="Girl in a jacket"></img>` 
            //desabilitar botao
            targeta2.disabled = true;
            //incrementar movimento + 1
            movimento++;
        mostrarMovimentos.innerHTML = `Movimentos: ${movimento}`;


        if(primeiroResultado == segundoResultado) {
            targetasDestapadas = 0;
            //aumento do acerto  
            acertos++;
            mostrarAcerto.innerHTML = `Acertos: ${acertos}`; 
            //Audio
            winAudio.play();

            if(acertos == 8) {
                clearInterval(tempoid)
                mostrarAcerto.innerHTML = `Acertos: ${acertos} 🙏`;

            }

        }else{

            setTimeout(()=>{
                loseAudio.play();
                targeta1.innerHTML = " ";
                targeta2.innerHTML = " ";
                targeta1.disabled = false;
                targeta2.disabled = false;
                targetasDestapadas = 0
            },800)

        }
    }

}


