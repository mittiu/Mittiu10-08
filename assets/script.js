confirm("Are you sure you want to delete?")


function moverBotaoAleatoriamente(botao) {
    const telaLargura = $(window).width();
    const telaAltura = $(window).height();
    const maxLeft = telaLargura - botao.outerWidth();
    const maxTop = telaAltura - botao.outerHeight();

    const leftPos = Math.floor(Math.random() * maxLeft);
    const topPos = Math.floor(Math.random() * maxTop);

    botao.css({ position: 'absolute', left: leftPos + 'px', top: topPos + 'px' });
}

function mudarTela(telaAtual, telaProxima) {
    $("#tela" + telaAtual).removeClass("visivel").addClass("invisivel");
    $("#tela" + telaProxima).removeClass("invisivel").addClass("visivel");
}
// Função para validar as respostas
function validarRespostas() {
    const nome = $("#nome").val().trim();
    const idade = parseInt($("#idade").val());
    const nivelBeleza = parseInt($("#nivelBeleza").val());

    let validacaoCorreta = true;

    if (nome == "Mariana") {
        $("#nomeErro").text("Boboca tb servia");
    } 
    else if (nome == "mariana") {
        $("#nomeErro").text("");
        $("#nomeErro").text("Boboca tb servia");
    } 
    else if (nome == "Boboca") {
        $("#nomeErro").text("Serio q vc colocou boboca??kkkkkk Mas ta certo besta");
    } 
    else {
        $("#nomeErro").text("");
        $("#nomeErro").text("Erou");
        validacaoCorreta = false;
    }

    if (idade !== 19) {
        $("#idadeErro").text("Errado");
        validacaoCorreta = false;
    } else {
        $("#idadeErro").text("");
    }

    if (nivelBeleza < 9) {
        $("#nivelBelezaErro").text("Só isso??? mais um cadinho");
        validacaoCorreta = false;
    } else {
        $("#nivelBelezaErro").text("");
    }

    if (validacaoCorreta) {
        alert("Tudo certo!");
        // Se tudo estiver certo, você pode fazer a transição para a próxima tela ou ação
        mudarTela(2, 8); // Exemplo de transição para a próxima tela
    }
}

function validarRespostasTela3() {
    const nomeNamorado = $("#nomeNamorado").val().trim();
    const idadeNamorado = parseInt($("#idadeNamorado").val());
    const nivelNamorado = parseInt($("#nivelNamorado").val());
    const nivelBelezaNamorado = parseInt($("#nivelBelezaNamorado").val());

    let validacaoCorreta = true;

    if (nomeNamorado == "Mittiu") {
        $("#nomeNamoradoErro").text("");    } 
    else if (nomeNamorado == "Lucas") {
        $("#nomeNamoradoErro").text("");    } 
    else if (nomeNamorado == "Amor") {
        $("#nomeNamoradoErro").text("");    } 
    else if (nomeNamorado == "Mozi") {
        $("#nomeNamoradoErro").text("");    } 
    else {
        validacaoCorreta = false;
        $("#nomeNamoradoErro").text("Erradu");
    }

    if (idadeNamorado !== 22) {
        $("#idadeNamoradoErro").text("erradu boboca");
        validacaoCorreta = false;
    } else {
        $("#idadeNamoradoErro").text("");
    }

    if (nivelNamorado !== 18) {
        $("#nivelNamoradoErro").text("Serio q vc errou ://");
        validacaoCorreta = false;
    } else {
        $("#nivelNamoradoErro").text("");
    }

    if (nivelBelezaNamorado < 99999999) {
        $("#nivelBelezaNamoradoErro").text("SÒ ISSUuuuu?");   
        validacaoCorreta = false; }
    else {
        $("#nivelBelezaNamoradoErro").text("");
    }
    if (validacaoCorreta) {
        alert("Botei que ta certo só pra vc ir pra proxima pagina... mas ti amo infinito besta (Era brincadeira n tem 72 paginaskkkkkk)");
        mudarTela(8, 9); // Exemplo de transição para a próxima tela
        var audio = new Audio('assets/musica.mp3');
        audio.volume = 0.1;
        audio.play();
    }
}


$(document).ready(function(){
    let movimentoContador = 0;

    $("#btnSim").click(function() {
        if (movimentoContador < 1) {
            moverBotaoAleatoriamente($(this));
            movimentoContador++;
        } else {
            mudarTela(1, 2); // Muda para a segunda tela após o 10º movimento
        }
    });

    $("#btnNao").click(function() {
        alert("Tudo bem, você pode tentar novamente depois.");
    });

    // Clique no botão Validar
    $("#btnValidar").click(function() {
        validarRespostas();
    });
    // Clique no botão Validar da Tela 3
    $("#btnValidarTela3").click(function() {
        validarRespostasTela3();
    });

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 4){ 

        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;


        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}