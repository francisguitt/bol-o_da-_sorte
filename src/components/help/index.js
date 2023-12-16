import { useState } from "react";
import './help.css';
import { IconBxsHelpCircle } from '../../icons';

export const Help = () => {
    const [help] = useState(`
        Passo 1: Primeiramente você deve confirmar o número de participantes do seu bolão e escolher um gerente do grupo. Este será o responsável por recolher o dinheiro, fazer as apostas e distribuir os prêmios.
    
        Passo 2: O gerente do grupo deverá abrir uma conta de jogador online, em sites confiáveis de apostas como a Lottoland.
        
        Passo 3: O próximo passo é selecionar a Loteria Lotofácil, marcar entre 15 e 20 dezenas ou fazer mais jogos.
        
        Passo 4: O gerente do bolão receberá uma notificação do resultado do bolão por e-mail, terá qualquer prêmio ganho automaticamente depositado na sua conta de jogador, onde deverá então realizar o saque e distribuir o prêmio entre todos os participantes.
    `);

    const handleHelp = () => {

        const novaAba = window.open('', '_blank');
        novaAba.document.write(`
            <html>
                <head>
                    <title>Ajuda</title>
                </head>
                <body>
                <h1 style="text-align:center;">Como Funciona um Bolão da Loto Facil</h1>
                    <div style="padding: 20px;">
                        <p>${help}</p>

                    </div>
                    <a href="/" style="margin-left:20px; ">Voltar</a>
                </body>
            </html>
        `);
    }

    return (
        <>
            <button onClick={handleHelp} className="button-help">
                <IconBxsHelpCircle style={{ marginTop: "10px" }} />
                <p style={{ fontSize: "12px", marginTop: "-8px", color: "#fff",letterSpacing:"1px" }}>Ajuda</p>
            </button>
        </>
    );
}
