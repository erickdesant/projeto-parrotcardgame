const firstRow = document.querySelector(".firstRow");

let jogadas = 0, cardsAbertos = 0
let jogadaAnterior, cardAnterior

let images = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
]
// SETAR NÚMERO DE CARTAS
let numeroCartas = prompt("Escolha o número de cartas! (4 - 14)")

while(numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 === 1){
    numeroCartas = prompt("Número inválido! Escolha novamente.")
}
//CRIAR ARRAY DAS CARTAS
let arrayImagens = []

for(let i = 0; i < numeroCartas / 2; i++) {
    arrayImagens.push(images[i])
}

for(let i = 0; i < numeroCartas / 2; i++) {
    arrayImagens.push(images[i])
}

// RANDOMIZAR ARRAY
let aux,random
for (let i = 0; i < arrayImagens.length; i++) {
    random = Math.floor(Math.random() * arrayImagens.length)
    aux = arrayImagens[i]
    arrayImagens[i] = arrayImagens[random]
    arrayImagens[random] = aux
}


for (let i = 0;  i < numeroCartas; i++){

    const card = document.createElement("div")
    const frontImg = document.createElement("img")
    const backImg = document.createElement("img")

    frontImg.setAttribute("src", "/assets/back.png");
    backImg.setAttribute("src", `/assets/${arrayImagens[i]}`);
    backImg.style.display = "none";

    card.appendChild(frontImg)
    card.appendChild(backImg)

    card.classList.add("card-item")

    card.addEventListener("click",() =>{

        card.classList.add("virar")

        setTimeout(() => {
            frontImg.style.display = "none"
            backImg.style.display = "block"
        },300)


        jogadas++;
        if(jogadas % 2 === 0){
            if(arrayImagens[i] !== jogadaAnterior){ // ERROU O PAR
                setTimeout(() =>{
                    card.classList.remove("virar")
                    cardAnterior.card.classList.remove("virar")
                    setTimeout(() => {
                        frontImg.style.display = "block"
                        backImg.style.display = "none"
                        cardAnterior.frontImg.style.display = "block"
                        cardAnterior.backImg.style.display = "none"
                    }, 300)
                }, 1000)

            } // ACERTOU O PAR
            else{
                cardsAbertos += 2
                if( cardsAbertos == numeroCartas){ // VENCEU O JOGO
                    setTimeout(() => {
                        alert(`Você venceu em ${jogadas} jogadas!`)
                    },500)
                }
            }
        }
        else{
            jogadaAnterior = arrayImagens[i];
            cardAnterior = {frontImg,backImg,card}
        }
    })
        firstRow.appendChild(card)
}
