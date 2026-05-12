'use strict';
// ═══════════════════════════════════════════════════════════════
//  Aprender — Geometria Analítica
//  Estrutura de navegação: 13 tópicos, 100 subtópicos.
//  (Conteúdo teórico, exemplos resolvidos e visualizações
//   interativas serão implementados em etapas posteriores —
//   por ora, apenas placeholders com o texto da especificação.)
// ═══════════════════════════════════════════════════════════════

const GA_TOPICS = [
  {
    title: 'Introdução à Geometria Analítica',
    subs: [
      { id: '1.1', title: 'O que é Geometria Analítica',
        viz: String.raw`Cena 3D com um ponto $P$ no espaço. Ao mover sliders $x$, $y$, $z$, o ponto se desloca e suas coordenadas aparecem dinamicamente. Linhas tracejadas conectam $P$ às projeções nos planos coordenados, mostrando como cada coordenada "constrói" a posição do ponto.` },
      { id: '1.2', title: 'Breve Histórico e Importância',
        viz: String.raw`Linha do tempo horizontal navegável (scroll lateral) com retratos dos matemáticos e um pequeno trecho da obra original que cada um produziu. Ao clicar em "Descartes", abre um modal com a famosa fórmula da distância já no formato moderno.` },
      { id: '1.3', title: 'Sistema Cartesiano no Plano (R²)',
        viz: String.raw`Plano cartesiano 2D com grade. O usuário pode clicar em qualquer ponto e ler suas coordenadas. Há também um campo de entrada $(x, y)$: ao digitar, o ponto correspondente é marcado. Os quatro quadrantes são levemente coloridos para facilitar a memorização.` },
      { id: '1.4', title: 'Sistema Cartesiano no Espaço (R³)',
        viz: String.raw`Cena 3D com os três eixos coloridos (X vermelho, Y verde, Z azul) e rótulos. O usuário insere $(x, y, z)$ ou move sliders; o ponto aparece com linhas tracejadas mostrando a "caminhada" $x \to y \to z$ a partir da origem. OrbitControls permite rotacionar a cena com o mouse. Botão "Mostrar octantes" colore translucidamente cada um deles.` },
      { id: '1.5', title: 'Orientação dos Eixos e Regra da Mão Direita',
        viz: String.raw`Modelo 3D de uma mão direita (modelo simples) sobreposto aos três eixos. O usuário pode arrastar a mão e ver como os dedos sempre indicam $x \to y$ e o polegar sempre aponta para $+z$. Botão alternativo "Mostrar sistema levogiro" para comparação.` },
      { id: '1.6', title: 'Pré-requisitos Matemáticos',
        viz: String.raw`Página com cards expansíveis para cada pré-requisito, cada card contendo um resumo de 1 minuto e um botão "Revisar" que abre um mini-módulo de revisão (opcional).` },
    ],
  },
  {
    title: 'Vetores: Conceitos Fundamentais',
    subs: [
      { id: '2.1', title: 'Grandezas Escalares e Vetoriais',
        viz: String.raw`Painel comparativo: à esquerda, um termômetro mostrando "25 °C" (escalar — só um número). À direita, uma seta no plano com sliders para módulo e ângulo, mostrando que a mesma grandeza muda completamente se mudarmos qualquer um dos três atributos.` },
      { id: '2.2', title: 'Definição de Vetor (Segmento Orientado)',
        viz: String.raw`Plano 2D onde o usuário clica em dois pontos $A$ e $B$. Imediatamente uma seta é desenhada entre eles e o vetor $\vec{AB}$ é nomeado. Ao trocar $A$ por $B$, a seta inverte o sentido (mostrando que $\vec{AB} \neq \vec{BA}$).` },
      { id: '2.3', title: 'Vetores Equipolentes',
        viz: String.raw`Cena 2D ou 3D mostrando inicialmente um vetor $\vec{AB}$. O usuário pode arrastar a seta (mantendo orientação e tamanho) e ver várias cópias equipolentes — todas representando o mesmo vetor. Há um botão "Mostrar todas as representações" que preenche o plano com setas equipolentes em posições diferentes.` },
      { id: '2.4', title: 'Módulo, Direção e Sentido',
        viz: String.raw`Vetor manipulável com três controles separados: (a) slider de módulo (estica/encolhe), (b) dial circular de direção (rotaciona), (c) botão de "inverter sentido". O usuário percebe que mudar qualquer um dos três produz um vetor diferente.` },
      { id: '2.5', title: 'Vetor Nulo, Vetor Unitário e Versor',
        viz: String.raw`Vetor $\vec{v}$ desenhado em 2D. Ao apertar o botão "Versor", uma seta menor é desenhada sobre $\vec{v}$, com exatamente 1 unidade de comprimento, e suas componentes são mostradas. Slider para mudar $\vec{v}$ e ver o versor se ajustar em tempo real.` },
      { id: '2.6', title: 'Vetores Opostos',
        viz: String.raw`Vetor $\vec{v}$ com botão "Mostrar oposto". Aparece $-\vec{v}$ sobreposto na mesma reta-suporte, mas apontando para o lado contrário. Ao somar visualmente os dois (regra do triângulo), a seta resultante colapsa em um ponto, evidenciando o vetor nulo.` },
      { id: '2.7', title: 'Representação Geométrica',
        viz: String.raw`Galeria de vetores em 2D e 3D — o usuário alterna entre as duas dimensões com um toggle. Em 3D, OrbitControls permite girar a cena e observar os vetores de diferentes ângulos. Todos os vetores são clicáveis para destacar e mostrar seus atributos.` },
    ],
  },
  {
    title: 'Operações Geométricas com Vetores',
    subs: [
      { id: '3.1', title: 'Adição: Regra do Triângulo',
        viz: String.raw`Plano 2D com dois vetores $\vec{u}$ e $\vec{v}$ ajustáveis. Botão "Animar soma" mostra passo a passo: $\vec{u}$ aparece, $\vec{v}$ é arrastado até a ponta de $\vec{u}$, e a seta resultante é traçada. Em 3D, o mesmo procedimento, com possibilidade de rotacionar a cena.` },
      { id: '3.2', title: 'Adição: Regra do Paralelogramo',
        viz: String.raw`Dois vetores com origem comum. Botão "Mostrar paralelogramo" desenha os lados opostos (cópias equipolentes de $\vec{u}$ e $\vec{v}$) e a diagonal aparece em destaque. Sliders independentes mudam $\vec{u}$ e $\vec{v}$ em tempo real.` },
      { id: '3.3', title: 'Propriedades da Adição',
        viz: String.raw`Quatro painéis lado a lado, um para cada propriedade. Em "Comutativa", são mostradas as duas formas de somar e a coincidência da resultante. Em "Associativa", três vetores são somados em duas ordens diferentes e o resultado é o mesmo.` },
      { id: '3.4', title: 'Subtração de Vetores',
        viz: String.raw`Dois vetores $\vec{u}$ e $\vec{v}$ com origem comum. Botão "Subtrair" desenha o vetor que liga a ponta de $\vec{v}$ à ponta de $\vec{u}$, destacando-o em laranja. Permite alternar entre "$\vec{u} - \vec{v}$" e "$\vec{v} - \vec{u}$" para mostrar que são opostos.` },
      { id: '3.5', title: 'Multiplicação de Vetor por Escalar',
        viz: String.raw`Vetor $\vec{v}$ com um slider para $k$ variando de $-3$ a $3$. À medida que o slider se move, $k\vec{v}$ é redesenhado em tempo real, mostrando o efeito de esticar, encolher e inverter.` },
      { id: '3.6', title: 'Propriedades da Multiplicação por Escalar',
        viz: String.raw`Mini-laboratório com dois vetores e dois sliders escalares. O usuário verifica cada propriedade fazendo as duas combinações lado a lado e vê os vetores resultantes se sobrepondo, confirmando a igualdade.` },
      { id: '3.7', title: 'Vetores Paralelos (Colineares)',
        viz: String.raw`Dois vetores no plano. O usuário arrasta um deles; se passar a ser paralelo ao outro, um indicador "PARALELOS! k ≈ ..." se acende, exibindo o valor aproximado do escalar.` },
    ],
  },
  {
    title: 'Vetores em Coordenadas',
    subs: [
      { id: '4.1', title: 'Vetores no Plano (R²)',
        viz: String.raw`Plano cartesiano onde o usuário desenha um vetor a partir da origem; as componentes $x$ e $y$ são automaticamente projetadas nos eixos com linhas tracejadas, e o vetor é decomposto em $x\vec{i} + y\vec{j}$ visualmente (duas setas pequenas indo dos eixos formando a "caminhada").` },
      { id: '4.2', title: 'Vetores no Espaço (R³)',
        viz: String.raw`Cena 3D com o vetor desenhado a partir da origem. Três linhas tracejadas, uma em cada cor de eixo, mostram a decomposição. Sliders permitem mudar cada componente independentemente. OrbitControls para girar a cena.` },
      { id: '4.3', title: 'Igualdade de Vetores',
        viz: String.raw`Dois campos de entrada lado a lado. O usuário insere as componentes de $\vec{u}$ e $\vec{v}$; se forem iguais, ambas as setas se sobrepõem perfeitamente e um selo "IGUAIS" aparece. Caso contrário, ficam separadas.` },
      { id: '4.4', title: 'Operações Vetoriais em Coordenadas',
        viz: String.raw`Calculadora 3D: o usuário define dois vetores e seleciona a operação. A cena 3D exibe os vetores originais (mais transparentes) e o resultado (em destaque), com animação mostrando, por exemplo, a translação na soma.` },
      { id: '4.5', title: 'Vetor Definido por Dois Pontos',
        viz: String.raw`O usuário clica em dois pontos na cena 3D. O vetor $\vec{AB}$ é traçado entre eles, e o cálculo das componentes aparece em uma caixa lateral, animado.` },
      { id: '4.6', title: 'Ponto Médio de um Segmento',
        viz: String.raw`Dois pontos $A$ e $B$ ajustáveis em 3D. O ponto $M$ é destacado em outra cor, e ao mover qualquer extremo, $M$ se reposiciona suavemente. Linhas conectam $A$ a $M$ e $M$ a $B$ com tamanhos iguais.` },
      { id: '4.7', title: 'Cálculo do Módulo (Norma)',
        viz: String.raw`Vetor 3D com cálculo do módulo passo a passo: primeiro a projeção no plano $xy$ (com seu próprio módulo $\sqrt{x^2 + y^2}$ destacado), depois a "subida" em $z$ formando o triângulo retângulo final cujo cateto é $\sqrt{x^2 + y^2}$ e a hipotenusa é $|\vec{v}|$.` },
      { id: '4.8', title: 'Condição de Paralelismo via Coordenadas',
        viz: String.raw`Dois vetores em 3D. Um indicador colorido brilha verde quando são paralelos (proporção dentro de tolerância numérica). O painel lateral mostra os três quocientes calculados em tempo real.` },
    ],
  },
  {
    title: 'Dependência e Independência Linear',
    subs: [
      { id: '5.1', title: 'Combinação Linear de Vetores',
        viz: String.raw`Plano 2D com dois vetores fixos $\vec{u}$ e $\vec{v}$ e sliders para escalares $a$ e $b$. À medida que o usuário ajusta $a$ e $b$, o vetor $a\vec{u} + b\vec{v}$ é desenhado e "rastreia" sua trajetória, evidenciando que todo o plano pode ser alcançado.` },
      { id: '5.2', title: 'Vetores Linearmente Independentes (LI) e Dependentes (LD)',
        viz: String.raw`Cena 3D com três vetores manipuláveis. Um painel exibe "LI" ou "LD" em tempo real, com explicação ("paralelos", "coplanares", "geram o espaço"). Quando são LD, o plano ou reta que os contém é destacado translucidamente.` },
      { id: '5.3', title: 'Base no Plano e no Espaço',
        viz: String.raw`Dois vetores LI em $\mathbb{R}^2$ definidos pelo usuário. Sliders para os coeficientes $a, b$ permitem "gerar" qualquer vetor do plano como $a\vec{v_1} + b\vec{v_2}$. Um rastro mostra quais pontos do plano podem ser alcançados (todos!).` },
      { id: '5.4', title: 'Base Canônica',
        viz: String.raw`Cena 3D destacando os três vetores canônicos sobre os eixos. Ao escrever um vetor $\vec{v} = (a, b, c)$, mostra-se a "construção" $a\vec{i} + b\vec{j} + c\vec{k}$ como três passos sequenciais animados.` },
      { id: '5.5', title: 'Coordenadas de um Vetor em Relação a uma Base',
        viz: String.raw`Cena 3D com duas grades sobrepostas: a grade canônica (cinza) e uma grade "oblíqua" gerada por uma base não-canônica (colorida). O mesmo vetor $\vec{w}$ aparece com duas conjuntos de coordenadas, mostrando que a representação depende da base.` },
      { id: '5.6', title: 'Mudança de Base (Introdução)',
        viz: String.raw`Dois "mundos" 3D lado a lado, cada um com sua base. O usuário define um vetor em um mundo e vê suas coordenadas no outro, com a matriz de transformação exibida.` },
    ],
  },
  {
    title: 'Produto Escalar',
    subs: [
      { id: '6.1', title: 'Definição e Interpretação',
        viz: String.raw`Dois vetores em 2D com ângulo $\theta$ ajustável. Um mostrador exibe $\vec{u} \cdot \vec{v}$ em tempo real. À medida que o ângulo passa de $0°$ a $90°$, $180°$, o valor varia entre $|\vec{u}||\vec{v}|$, $0$ e $-|\vec{u}||\vec{v}|$.` },
      { id: '6.2', title: 'Cálculo em Coordenadas',
        viz: String.raw`Calculadora dinâmica: o usuário insere as componentes e vê o cálculo expandido passo a passo, como uma "linha de soma" animada. À direita, os vetores são desenhados em 3D para referência geométrica.` },
      { id: '6.3', title: 'Propriedades do Produto Escalar',
        viz: String.raw`Mini-laboratório onde o usuário verifica cada propriedade com vetores ajustáveis: os dois lados da igualdade são calculados em painéis separados, mostrando que coincidem.` },
      { id: '6.4', title: 'Ângulo Entre Dois Vetores',
        viz: String.raw`Dois vetores 3D ajustáveis. Um arco colorido entre eles indica o ângulo, e o valor (em graus e radianos) é exibido em tempo real. Pré-sets para ângulos especiais (30°, 45°, 60°, 90°, 180°).` },
      { id: '6.5', title: 'Vetores Ortogonais',
        viz: String.raw`Vetor $\vec{u}$ fixo; o usuário arrasta a ponta de $\vec{v}$. Quando $\vec{u} \cdot \vec{v}$ cruza o zero, um pequeno ícone de "ângulo reto" aparece e a interface destaca a ortogonalidade.` },
      { id: '6.6', title: 'Projeção Ortogonal de um Vetor sobre Outro',
        viz: String.raw`Dois vetores em 2D ou 3D. Uma linha tracejada desce perpendicularmente da ponta de $\vec{u}$ até a reta-suporte de $\vec{v}$, e o segmento projetado é destacado em outra cor. À medida que o usuário gira $\vec{v}$, a projeção é recalculada e redesenhada continuamente.` },
      { id: '6.7', title: 'Aplicações: Trabalho e Decomposição de Forças',
        viz: String.raw`Cena com um plano inclinado e um bloco. Uma força é aplicada com ângulo ajustável. O trabalho é calculado em tempo real conforme o ângulo varia, evidenciando que para $\theta = 90°$, $W = 0$.` },
      { id: '6.8', title: 'Cossenos Diretores',
        viz: String.raw`Vetor 3D com três arcos coloridos mostrando os ângulos $\alpha$, $\beta$, $\gamma$ com cada eixo. Em tempo real, exibe os três cossenos e a soma dos seus quadrados (sempre 1).` },
    ],
  },
  {
    title: 'Produto Vetorial',
    subs: [
      { id: '7.1', title: 'Definição do Produto Vetorial',
        viz: String.raw`Dois vetores 3D no mesmo plano (representado translucidamente). O vetor produto $\vec{u} \times \vec{v}$ é desenhado em laranja perpendicularmente ao plano. Ao girar $\vec{v}$, o plano e o vetor produto se recalculam.` },
      { id: '7.2', title: 'Cálculo via Determinante',
        viz: String.raw`Calculadora visual: o determinante $3 \times 3$ é exibido com a matriz simbólica; ao clicar em "expandir", a animação destaca cada minor sendo calculado e o resultado é construído coordenada a coordenada.` },
      { id: '7.3', title: 'Regra da Mão Direita',
        viz: String.raw`Modelo 3D de uma mão direita animada que se ajusta automaticamente conforme o usuário muda $\vec{u}$ e $\vec{v}$. Botão "Inverter ordem" alterna entre $\vec{u} \times \vec{v}$ e $\vec{v} \times \vec{u}$, mostrando que o vetor produto inverte de sentido.` },
      { id: '7.4', title: 'Propriedades do Produto Vetorial',
        viz: String.raw`Quadro com cada propriedade ilustrada por um par de cenas comparativas que evidenciam visualmente a igualdade ou desigualdade.` },
      { id: '7.5', title: 'Interpretação Geométrica: Área',
        viz: String.raw`Dois vetores formam um paralelogramo translúcido. O vetor produto sai perpendicular ao plano com comprimento igual à área. Ao mover os vetores, paralelogramo e vetor produto mudam de tamanho juntos, com o valor numérico da área exibido.` },
      { id: '7.6', title: 'Aplicações Físicas e Geométricas',
        viz: String.raw`Simulações curtas: chave de boca girando um parafuso (torque), partícula carregada em campo magnético, plano com normal calculada. Cada uma mostra como o produto vetorial dá origem ao vetor relevante.` },
    ],
  },
  {
    title: 'Produto Misto',
    subs: [
      { id: '8.1', title: 'Definição do Produto Misto',
        viz: String.raw`Cena 3D com três vetores partindo da origem. O paralelogramo gerado por $\vec{v}$ e $\vec{w}$ é mostrado, sua normal ($\vec{v} \times \vec{w}$) é desenhada, e a projeção de $\vec{u}$ sobre essa normal aparece, fornecendo geometricamente o valor do produto misto.` },
      { id: '8.2', title: 'Cálculo via Determinante 3x3',
        viz: String.raw`Determinante interativo: o usuário insere as componentes e o cálculo é feito pela regra de Sarrus animada, com cada termo aparecendo em sequência.` },
      { id: '8.3', title: 'Propriedades do Produto Misto',
        viz: String.raw`Tabela de propriedades com botões "Demonstrar"; cada um mostra duas cenas 3D paralelas comparando os valores do produto misto sob permutações.` },
      { id: '8.4', title: 'Interpretação Geométrica: Volume',
        viz: String.raw`Três vetores formando um paralelepípedo translúcido. Conforme o usuário muda os vetores, o sólido se deforma e o volume é atualizado em tempo real. Botão "Mostrar tetraedro" extrai o tetraedro de um dos vértices.` },
      { id: '8.5', title: 'Condição de Coplanaridade de Três Vetores',
        viz: String.raw`Três vetores em 3D. À medida que o usuário aproxima o terceiro do plano dos dois primeiros, o paralelepípedo se achata visivelmente e o valor numérico do produto misto se aproxima de zero, com um indicador "COPLANARES" se acendendo.` },
      { id: '8.6', title: 'Aplicações',
        viz: String.raw`Quatro pontos arrastáveis em 3D. Quando o produto misto de $\vec{AB}$, $\vec{AC}$, $\vec{AD}$ é zero, o plano que os contém é destacado.` },
    ],
  },
  {
    title: 'Estudo da Reta no Espaço',
    subs: [
      { id: '9.1', title: 'Equação Vetorial da Reta',
        viz: String.raw`Cena 3D com um ponto $P_0$ ajustável e um vetor $\vec{v}$ ajustável. A reta é desenhada como uma linha contínua e o usuário pode arrastar um slider $t$ para ver o ponto $P$ "andar" sobre a reta — para frente quando $t > 0$, para trás quando $t < 0$.` },
      { id: '9.2', title: 'Equações Paramétricas',
        viz: String.raw`A mesma cena 3D, agora com as três equações paramétricas exibidas em um painel. Conforme o usuário muda $t$, os três valores são destacados e o ponto $P$ correspondente brilha sobre a reta.` },
      { id: '9.3', title: 'Equações Simétricas',
        viz: String.raw`Painel comparativo: forma vetorial, paramétrica e simétrica de uma mesma reta exibidas lado a lado, com o ponto $P_0$ e o vetor $\vec{v}$ destacados em cada uma.` },
      { id: '9.4', title: 'Equações Reduzidas',
        viz: String.raw`A reta 3D é exibida; ao trocar a forma exibida (vetorial → paramétrica → simétrica → reduzida), o painel se atualiza e o usuário vê a mesma reta descrita de quatro maneiras equivalentes.` },
      { id: '9.5', title: 'Reta Definida por Dois Pontos',
        viz: String.raw`Cena 3D onde o usuário clica em dois pontos e a reta é desenhada. Slider $t$ permite percorrer a reta; uma faixa em destaque ($0 \leq t \leq 1$) corresponde ao segmento $\overline{AB}$.` },
      { id: '9.6', title: 'Casos Particulares (Retas Paralelas aos Eixos e Planos)',
        viz: String.raw`Painel com botões pré-configurados: "Paralela ao eixo X", "Paralela ao plano YZ", etc. Cada clique desenha um exemplo da reta na cena 3D.` },
      { id: '9.7', title: 'Ângulo Entre Duas Retas',
        viz: String.raw`Duas retas 3D ajustáveis. Um arco mostra o ângulo entre elas, com o valor em graus exibido. Botão "Tornar perpendicular" alinha automaticamente os vetores diretores em ortogonalidade.` },
      { id: '9.8', title: 'Posições Relativas: Paralelas, Concorrentes e Reversas',
        viz: String.raw`Duas retas com cores diferentes, totalmente ajustáveis. Um indicador exibe a posição relativa em tempo real. Quando concorrentes, o ponto de interseção é marcado; quando reversas, a "distância mínima" (a ser estudada no Tópico 11) é destacada com um segmento perpendicular comum.` },
      { id: '9.9', title: 'Condições de Paralelismo e Ortogonalidade',
        viz: String.raw`Duas retas com botões "Tornar paralelas" e "Tornar ortogonais" que alinham automaticamente as direções, com explicação em popup.` },
      { id: '9.10', title: 'Interseção entre Retas',
        viz: String.raw`Duas retas 3D. Ao habilitar "Calcular interseção", o sistema é resolvido e, se houver solução, o ponto comum aparece destacado com um marcador esférico.` },
    ],
  },
  {
    title: 'Estudo do Plano',
    subs: [
      { id: '10.1', title: 'Equação Geral do Plano',
        viz: String.raw`Plano translúcido manipulável em 3D. O usuário ajusta $P_0$ e $\vec{n}$; o plano gira ortogonalmente ao normal, com este último desenhado como uma seta saindo do plano.` },
      { id: '10.2', title: 'Equação Vetorial do Plano',
        viz: String.raw`Plano definido por $P_0$, $\vec{u}$ e $\vec{v}$ manipuláveis. Sliders $s$ e $t$ deslocam um ponto $P$ sobre toda a extensão do plano.` },
      { id: '10.3', title: 'Equações Paramétricas do Plano',
        viz: String.raw`Plano em 3D com painel paramétrico. Dois sliders ($s$ e $t$) movem o ponto $P$ sobre o plano em duas direções perpendiculares (definidas por $\vec{u}$ e $\vec{v}$).` },
      { id: '10.4', title: 'Vetor Normal ao Plano',
        viz: String.raw`Plano com $\vec{u}$ e $\vec{v}$ desenhados sobre ele. O vetor normal é construído animadamente via produto vetorial. Botão "Inverter normal" mostra que $-\vec{n}$ também é normal ao plano.` },
      { id: '10.5', title: 'Plano Determinado por Três Pontos',
        viz: String.raw`Três pontos arrastáveis em 3D; o plano que passa por eles é redesenhado em tempo real, com a equação geral atualizada continuamente.` },
      { id: '10.6', title: 'Casos Particulares (Planos Coordenados e Paralelos aos Eixos)',
        viz: String.raw`Galeria de planos especiais com botões pré-definidos. Cada um exibe a equação e a posição do plano no sistema de coordenadas.` },
      { id: '10.7', title: 'Ângulo Entre Dois Planos',
        viz: String.raw`Dois planos translúcidos em 3D com seus normais visíveis. O arco entre os normais é desenhado e o valor do ângulo é exibido. Sliders ajustam a orientação de cada plano.` },
      { id: '10.8', title: 'Ângulo Entre Reta e Plano',
        viz: String.raw`Plano e reta ajustáveis. O ângulo é desenhado como um arco entre a reta e sua projeção no plano, com o valor numérico atualizado em tempo real.` },
      { id: '10.9', title: 'Posições Relativas entre Dois Planos',
        viz: String.raw`Dois planos manipuláveis; quando concorrentes, a reta de interseção é desenhada em destaque. Quando paralelos, o vetor distância entre eles é mostrado perpendicularmente.` },
      { id: '10.10', title: 'Posições Relativas entre Reta e Plano',
        viz: String.raw`Reta e plano ajustáveis. Etiqueta dinâmica exibe a posição relativa; quando concorrentes, o ponto de interseção é destacado.` },
      { id: '10.11', title: 'Interseções (Reta ∩ Plano, Plano ∩ Plano)',
        viz: String.raw`Tudo em uma cena 3D só: reta e dois planos, todos manipuláveis. O usuário pode habilitar/desabilitar cada elemento e ver suas interseções (pontos ou retas) sendo construídas dinamicamente.` },
    ],
  },
  {
    title: 'Distâncias',
    subs: [
      { id: '11.1', title: 'Distância entre Dois Pontos',
        viz: String.raw`Dois pontos arrastáveis em 3D com a distância calculada em tempo real e exibida sobre o segmento que os une.` },
      { id: '11.2', title: 'Distância de Ponto a Reta',
        viz: String.raw`Reta 3D e ponto externo. Um segmento perpendicular do ponto à reta é desenhado, com a distância exibida. Animação mostra o paralelogramo formado por $\vec{AP}$ e $\vec{v}$, seu vetor produto e a altura sendo extraída como $|\vec{AP} \times \vec{v}|/|\vec{v}|$.` },
      { id: '11.3', title: 'Distância de Ponto a Plano',
        viz: String.raw`Plano e ponto externo. Um segmento perpendicular ao plano (na direção do normal) liga $P$ ao plano com o comprimento $d$ destacado. Ao mover o ponto, a distância é recalculada.` },
      { id: '11.4', title: 'Distância entre Duas Retas Paralelas',
        viz: String.raw`Duas retas paralelas 3D com o segmento mínimo entre elas destacado em destaque.` },
      { id: '11.5', title: 'Distância entre Duas Retas Reversas',
        viz: String.raw`Duas retas reversas em 3D. Um segmento perpendicular comum (a "perpendicular comum") é construído passo a passo, com o paralelepípedo correspondente exibido translucidamente. A altura desse paralelepípedo é destacada como sendo a distância.` },
      { id: '11.6', title: 'Distância entre Reta e Plano Paralelos',
        viz: String.raw`Reta paralela a um plano. O segmento perpendicular do ponto da reta até o plano é desenhado, indicando a distância.` },
      { id: '11.7', title: 'Distância entre Dois Planos Paralelos',
        viz: String.raw`Dois planos paralelos translúcidos com uma seta entre eles indicando a distância mínima, perpendicular a ambos.` },
    ],
  },
  {
    title: 'Cônicas',
    subs: [
      { id: '12.1', title: 'Introdução às Seções Cônicas',
        viz: String.raw`Cone duplo translúcido com um plano cortante manipulável. Conforme o usuário gira o plano, a curva de interseção aparece em destaque sobre o cone e também é "extraída" para um painel 2D ao lado, mostrando como cada inclinação gera uma cônica diferente.` },
      { id: '12.2', title: 'Circunferência: Equação Reduzida e Geral',
        viz: String.raw`Plano 2D com centro arrastável e slider de raio. A circunferência se redesenha em tempo real, com a equação reduzida e geral exibidas simultaneamente.` },
      { id: '12.3', title: 'Elipse: Definição, Elementos e Equações',
        viz: String.raw`Plano 2D com dois focos arrastáveis e um valor $2a$ ajustável. A elipse é redesenhada em tempo real. Linhas de cada ponto da elipse aos dois focos podem ser exibidas, mostrando que a soma é constante.` },
      { id: '12.4', title: 'Hipérbole: Definição, Elementos e Equações',
        viz: String.raw`Plano 2D com hipérbole completa (dois ramos), focos e assíntotas (em tracejado). Ajustando $a$ e $b$, o usuário vê a forma da curva mudar e como ela se aproxima das assíntotas para grandes valores.` },
      { id: '12.5', title: 'Parábola: Definição, Elementos e Equações',
        viz: String.raw`Plano 2D com foco, diretriz e parâmetro $p$ ajustáveis. A parábola é desenhada em tempo real. Para qualquer ponto da curva, segmentos podem ser desenhados até o foco e perpendicularmente à diretriz, mostrando que têm o mesmo comprimento.` },
      { id: '12.6', title: 'Translação de Eixos',
        viz: String.raw`Cônica originalmente centrada na origem; sliders $h$ e $k$ a transladam pelo plano. Os novos eixos de simetria são desenhados sobre o centro deslocado.` },
      { id: '12.7', title: 'Rotação de Eixos',
        viz: String.raw`Cônica rotacionada (eixo principal inclinado). Slider de ângulo $\theta$ gira os eixos coordenados, e o usuário vê a equação no novo sistema. Quando o ângulo atinge o valor "correto", o termo $xy$ desaparece.` },
      { id: '12.8', title: 'Equação Geral do 2º Grau e Identificação de Cônicas',
        viz: String.raw`Calculadora que recebe os coeficientes $A, B, C, D, E, F$ e identifica automaticamente a cônica, desenhando-a no plano, exibindo o discriminante e sugerindo translações/rotações necessárias para colocar em forma reduzida.` },
    ],
  },
  {
    title: 'Superfícies Quádricas',
    subs: [
      { id: '13.1', title: 'Introdução às Superfícies no Espaço',
        viz: String.raw`Cena 3D com galeria de quádricas: o usuário pode clicar em cada tipo e ver a superfície renderizada com transparência, podendo girar livremente.` },
      { id: '13.2', title: 'Esfera',
        viz: String.raw`Esfera 3D com centro arrastável e slider de raio. As três interseções com os planos coordenados (circunferências) podem ser destacadas.` },
      { id: '13.3', title: 'Elipsoide',
        viz: String.raw`Elipsoide com três sliders independentes para $a$, $b$, $c$. Os três cortes principais (com os planos coordenados) podem ser exibidos como elipses 2D em painéis laterais.` },
      { id: '13.4', title: 'Hiperboloide de Uma Folha',
        viz: String.raw`Hiperboloide 3D rotacionável com sliders $a, b, c$. Botão "Mostrar regras" destaca a propriedade notável: o hiperboloide de uma folha é uma superfície regrada (pode ser construída inteiramente por retas).` },
      { id: '13.5', title: 'Hiperboloide de Duas Folhas',
        viz: String.raw`Duas folhas distintas renderizadas em 3D. Slider para o termo independente permite ver a transição entre o cone (caso $= 0$) e o hiperboloide de duas folhas.` },
      { id: '13.6', title: 'Paraboloide Elíptico',
        viz: String.raw`Paraboloide 3D com cortes horizontais (elipses) e cortes verticais (parábolas) destacáveis. Demonstração da propriedade refletora: raios paralelos que incidem na superfície convergem para o foco.` },
      { id: '13.7', title: 'Paraboloide Hiperbólico',
        viz: String.raw`Sela 3D rotacionável. Plano de corte horizontal manipulável; o usuário vê a hipérbole resultante. Plano vertical mostra as parábolas. Botão "Regras" exibe as retas que compõem a superfície.` },
      { id: '13.8', title: 'Cone Quádrico',
        viz: String.raw`Cone duplo 3D. Slider que faz a transição contínua do hiperboloide de uma folha → cone → hiperboloide de duas folhas, mudando o termo independente da equação.` },
      { id: '13.9', title: 'Cilindros Quádricos',
        viz: String.raw`Galeria com cada tipo de cilindro em 3D. A cônica geradora é destacada no plano $xy$ e o usuário vê a "extrusão" para cima e para baixo ao longo de $z$.` },
      { id: '13.10', title: 'Superfícies de Revolução (Introdução)',
        viz: String.raw`Plano $xz$ com uma curva geratriz desenhável pelo usuário (livre ou escolhida em um menu). Botão "Girar" inicia uma animação onde a curva gira em torno do eixo $z$ no espaço 3D, gerando a superfície correspondente.` },
    ],
  },
];

// ─── Flat index: (topicIdx, subIdx) ↔ flatIdx ────────────────────
const GA_FLAT = [];
GA_TOPICS.forEach((t, ti) => {
  t.subs.forEach((s, si) => {
    GA_FLAT.push({ topicIdx: ti, subIdx: si, topic: t, sub: s });
  });
});
const GA_TOTAL = GA_FLAT.length;

// ─── Runtime state ─────────────────────────────────────────────
let _gaCur = 0;
const _gaVis = new Set();
const _gaOpen = new Set([0]);   // tópicos expandidos (1º aberto por padrão)
let _gaInit = false;

// ─── Public API ────────────────────────────────────────────────
function initLearnGA() {
  if (_gaInit) { _gaRenderAll(); return; }
  _gaInit = true;
  _gaOpen.add(GA_FLAT[_gaCur].topicIdx);
  _gaRenderAll();
}

function gaGoto(flatIdx) {
  if (flatIdx < 0 || flatIdx >= GA_TOTAL) return;
  _gaVis.add(_gaCur);
  _gaCur = flatIdx;
  _gaOpen.add(GA_FLAT[_gaCur].topicIdx);
  _gaRenderAll();
  const content = document.getElementById('learn-content');
  if (content) content.scrollTop = 0;
}

function gaNext() { if (_gaCur < GA_TOTAL - 1) gaGoto(_gaCur + 1); }
function gaPrev() { if (_gaCur > 0)            gaGoto(_gaCur - 1); }

function gaToggleTopic(ti) {
  if (_gaOpen.has(ti)) _gaOpen.delete(ti);
  else                 _gaOpen.add(ti);
  _gaRenderNav();
}

// ─── Rendering ─────────────────────────────────────────────────
function _gaRenderAll() {
  _gaRenderNav();
  _gaRenderContent();
  _gaRenderProg();
  _gaRenderHeader();
}

function _gaRenderHeader() {
  const cur = GA_FLAT[_gaCur];
  const el = document.getElementById('learn-sub-title');
  if (el) el.textContent = `${cur.sub.id} — ${cur.sub.title}`;
}

function _gaRenderProg() {
  const f = document.getElementById('learn-prog-fill');
  const t = document.getElementById('learn-prog-txt');
  if (f) f.style.width = (_gaVis.size / GA_TOTAL * 100) + '%';
  if (t) t.textContent = _gaVis.size + ' / ' + GA_TOTAL;
}

function _gaRenderNav() {
  const el = document.getElementById('learn-nav');
  if (!el) return;
  const curTopic = GA_FLAT[_gaCur].topicIdx;
  const curSub   = GA_FLAT[_gaCur].subIdx;

  el.innerHTML = GA_TOPICS.map((t, ti) => {
    const open = _gaOpen.has(ti);
    const hasActive = ti === curTopic;
    const subsHtml = t.subs.map((s, si) => {
      const flatIdx = _gaFlatOf(ti, si);
      const active = (ti === curTopic && si === curSub);
      const done   = _gaVis.has(flatIdx);
      return `<div class="learn-sub-item${active?' active':''}${done?' done':''}" onclick="gaGoto(${flatIdx})">
        <span class="learn-sub-num">${s.id}</span>
        <span class="learn-sub-title">${_gaEsc(s.title)}</span>
      </div>`;
    }).join('');
    return `<div class="learn-topic${open?' open':''}${hasActive?' has-active':''}">
      <div class="learn-topic-header" onclick="gaToggleTopic(${ti})">
        <div class="learn-topic-num">${ti + 1}</div>
        <span class="learn-topic-title">${_gaEsc(t.title)}</span>
        <svg class="learn-topic-chevron" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
      </div>
      <div class="learn-topic-subs">${subsHtml}</div>
    </div>`;
  }).join('');

  // garantir que o subtópico ativo esteja visível no sidenav
  const act = el.querySelector('.learn-sub-item.active');
  if (act && typeof act.scrollIntoView === 'function') {
    act.scrollIntoView({ block: 'nearest' });
  }
}

function _gaRenderContent() {
  const el = document.getElementById('learn-content');
  if (!el) return;
  const cur = GA_FLAT[_gaCur];
  const isFirst = _gaCur === 0;
  const isLast  = _gaCur === GA_TOTAL - 1;

  el.innerHTML = `
    <div class="learn-section">
      <div class="learn-section-eyebrow">Tópico ${cur.topicIdx + 1} · ${_gaEsc(cur.topic.title)}</div>
      <h1 class="learn-section-title">${cur.sub.id} — ${_gaEsc(cur.sub.title)}</h1>
      <div class="learn-section-sub">Subtópico ${_gaCur + 1} de ${GA_TOTAL}</div>

      <div class="learn-block">
        <div class="learn-block-title">Explicação</div>
        <div class="learn-block-body">
          <p class="learn-placeholder">${_gaEsc(cur.sub.title)} — conteúdo em construção.</p>
        </div>
      </div>

      <div class="learn-block">
        <div class="learn-block-title">Visualização interativa</div>
        <div class="learn-viz-box">
          <div class="learn-viz-inner">
            <div class="learn-viz-tag">Especificação da visualização</div>
            <div>${cur.sub.viz}</div>
          </div>
        </div>
      </div>

      <div class="learn-block">
        <div class="learn-block-title">Exemplo resolvido</div>
        <div class="learn-block-body">
          <p class="learn-placeholder">${_gaEsc(cur.sub.title)} — conteúdo em construção.</p>
        </div>
      </div>
    </div>

    <div class="learn-nav-btns">
      <button class="learn-btn learn-btn-prev" onclick="gaPrev()" ${isFirst?'disabled':''}>
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        Anterior
      </button>
      <button class="learn-btn learn-btn-next" onclick="gaNext()" ${isLast?'disabled':''}>
        Próximo
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
      </button>
    </div>
  `;

  if (typeof rerenderMath === 'function') rerenderMath(el);
}

// ─── Helpers ───────────────────────────────────────────────────
function _gaFlatOf(ti, si) {
  let n = 0;
  for (let i = 0; i < ti; i++) n += GA_TOPICS[i].subs.length;
  return n + si;
}

function _gaEsc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
