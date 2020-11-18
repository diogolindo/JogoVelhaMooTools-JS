var generate = $$('#gerar');
let i = 1;
let jogador = 'X';
let oponente = 'O'
let espacos=[];
let gameHappening=true;

window.addEvent('domready', function () {
    generate.addEvent('click', gerar);
});

let checarVencedor = function () {
    if(
        espacos[0].get('text') == jogador && espacos[1].get('text') == jogador && espacos[2].get('text') == jogador ||
        espacos[3].get('text') == jogador && espacos[4].get('text') == jogador && espacos[5].get('text') == jogador ||
        espacos[6].get('text') == jogador && espacos[7].get('text') == jogador && espacos[8].get('text') == jogador ||
        espacos[0].get('text') == jogador && espacos[4].get('text') == jogador && espacos[8].get('text') == jogador ||
        espacos[2].get('text') == jogador && espacos[4].get('text') == jogador && espacos[6].get('text') == jogador ||
        espacos[0].get('text') == jogador && espacos[3].get('text') == jogador && espacos[6].get('text') == jogador ||
        espacos[1].get('text') == jogador && espacos[4].get('text') == jogador && espacos[7].get('text') == jogador ||
        espacos[2].get('text') == jogador && espacos[5].get('text') == jogador && espacos[8].get('text') == jogador){
        gameHappening=false;
        $$("#result").set({
            class: `${jogador}`,
            text: `${jogador} ganhou!`
        })
    }else if (espacos[0].get('text') != '' && espacos[1].get('text') != '' && espacos[2].get('text') != '' && 
            espacos[3].get('text') != '' && espacos[4].get('text') != '' && espacos[5].get('text') != '' && 
            espacos[6].get('text') != '' && espacos[7].get('text') != '' && espacos[8].get('text') != ''){
        gameHappening = false;
        $$("#result").set({
            class: ``,
            text: `Velha!`
        })
    }else{
        $$("#result").set({
            class: oponente,
            text: `Vez do jogador ${oponente}`
        })
    }
}

let marcar = function () {
    let classe = this.get('class');
    if (this.get('text') == '' && gameHappening) {
        this.set({
            text: `${jogador}`,
            class: `${classe} ${jogador}`
        })
        checarVencedor();
    }

    if(jogador=='X'){
        jogador='O';
        oponente='X'
    }
    else{
        jogador='X';
        oponente='O';
    }
}

let resetar = function(){
    $$("#area").dispose();
    $$('#resetar').dispose();
    $$('p').dispose();
    botaoRemovido.inject(document.body);
    i = 1;
    gameHappening=true;
    jogador='X';
    for(j=0;j<9;j++){
        espacos.pop();
    }
}

let gerar = function () {
    var botaoReset = new Element("button",{
        id: 'resetar',
        text: 'Resetar',
        events:{
            click: resetar
        }
    })

    var area = new Element("div", {
        id: 'area'
    });
    area.inject(document.body);
    do{
        if(i<7){
            if (i % 3 == 0) {
                var result = new Element("div", {
                    id: `espaco${i}`,
                    text: "",
                    class: 'space bottomBorder',
                    events: {
                        click: marcar
                    }
                })
            }
            else {
                var result = new Element("div", {
                    id: `espaco${i}`,
                    text: "",
                    class: 'space bottomBorder rightBorder',
                    events: {
                        click: marcar
                    }
                })
            }
        }else if (i>=7){
            if(i%3==0){
                var result = new Element("div", {
                    id: `espaco${i}`,
                    text: "",
                    class: 'space',
                    events: {
                        click: marcar
                    }
                })
            }   
            else{
                var result = new Element("div", {
                    id: `espaco${i}`,
                    text: "",
                    class: "space rightBorder",
                    events: {
                        click: marcar
                    }
                })
            }
        }

        area.grab(result);
        espacos.push($$(`#espaco${i}`));      
        i++;
        
    }while(i<=9);

    var turno=new Element('p', {
        id: `result`,
        class: jogador,
        text: `Vez do jogador ${jogador}`
    });

    botaoRemovido = generate.dispose();
    botaoReset.inject(document.body);
    turno.inject(document.body);
}