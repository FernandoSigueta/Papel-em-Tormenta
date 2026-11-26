const PERGUNTAS_POR_EIXO = 3;
let Perguntas =         [
            {
                "eixo": "Competitividade",
                "invertida": false,
                "pergunta": "Gosto de desafios em que o resultado mostra quem foi melhor.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Mecânica",
                "invertida": false,
                "pergunta": "Fico satisfeito quando encontro uma combinação de poderes que funciona muito bem.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Interpretação",
                "invertida": false,
                "pergunta": "Aceito deixar meu personagem passar por dificuldades se isso deixar a história mais interessante.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Social",
                "invertida": true,
                "pergunta": "Prefiro ficar em silêncio e deixar os outros conversarem com os personagens do mundo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Colaboração",
                "invertida": false,
                "pergunta": "Costumo abrir mão de uma vantagem minha se isso ajudar o grupo a avançar.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Combate",
                "invertida": false,
                "pergunta": "Gosto de escolher poderes e equipamentos pensando em como serão usados em batalha.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Competitividade",
                "invertida": false,
                "pergunta": "Me esforço para ter o melhor desempenho do grupo durante a sessão.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Combate",
                "invertida": true,
                "pergunta": "Acho que os combates interrompem a parte mais interessante da sessão.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Estratégia",
                "invertida": false,
                "pergunta": "Gosto de combinar um plano com o grupo antes de entrar em uma missão.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Improviso",
                "invertida": false,
                "pergunta": "Gosto de inventar soluções criativas para problemas que não estavam previstos.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Exploração",
                "invertida": false,
                "pergunta": "Gosto de investigar ruínas, masmorras e lugares escondidos, mesmo sem uma missão ligada a eles.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Social",
                "invertida": false,
                "pergunta": "Gosto de fazer amizade com os personagens do mundo, como mercadores e moradores.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Interpretação",
                "invertida": true,
                "pergunta": "Me sinto desconfortável quando preciso falar como o meu personagem.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Exploração",
                "invertida": true,
                "pergunta": "Prefiro seguir direto o caminho da missão a me desviar para explorar lugares.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Exploração",
                "invertida": false,
                "pergunta": "Descobrir segredos e tesouros escondidos é uma das partes de que mais gosto em um jogo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Combate",
                "invertida": false,
                "pergunta": "Enfrentar um inimigo poderoso é um dos momentos mais emocionantes do jogo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Estratégia",
                "invertida": false,
                "pergunta": "Antes de agir, gosto de analisar todas as opções e escolher a mais eficiente.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Improviso",
                "invertida": true,
                "pergunta": "Fico desconfortável quando preciso decidir algo sem ter um plano.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Competitividade",
                "invertida": true,
                "pergunta": "Não me importo com quem foi melhor em um desafio; o importante é a diversão do grupo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Narrativa",
                "invertida": false,
                "pergunta": "Fico ansioso para saber o que vai acontecer na próxima parte da história.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Interpretação",
                "invertida": false,
                "pergunta": "Tomo decisões pensando no que meu personagem faria, e não no que seria mais vantajoso.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Social",
                "invertida": false,
                "pergunta": "Gosto de negociar, convencer e conversar para resolver os problemas da aventura.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Mecânica",
                "invertida": true,
                "pergunta": "Regras e números me deixam entediado durante o jogo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Estratégia",
                "invertida": true,
                "pergunta": "Planejar com antecedência tira a graça da aventura para mim.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Colaboração",
                "invertida": true,
                "pergunta": "Prefiro tomar as decisões sozinho a esperar a opinião de todo o grupo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Mecânica",
                "invertida": false,
                "pergunta": "Ler o livro de regras e descobrir combinações de habilidades é parte da diversão para mim.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Narrativa",
                "invertida": false,
                "pergunta": "Os momentos marcantes da história de uma campanha ficam comigo por muito tempo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Improviso",
                "invertida": false,
                "pergunta": "Prefiro reagir ao que acontece na mesa a seguir um roteiro definido.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Narrativa",
                "invertida": true,
                "pergunta": "Os detalhes da história e do mundo me interessam pouco durante o jogo.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            },
            {
                "eixo": "Colaboração",
                "invertida": false,
                "pergunta": "Gosto quando o grupo toma as decisões juntos, mesmo que demore.",
                "opcoes": [
                    "Discordo totalmente",
                    "Discordo",
                    "Neutro",
                    "Concordo",
                    "Concordo totalmente"
                ]
            }
        ];
