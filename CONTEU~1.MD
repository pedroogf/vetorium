# Plataforma de Aprendizado — Geometria Analítica
## Especificação Completa de Conteúdo para a Aba "Aprender"

> **Brief para o Claude Code:** Este documento contém todo o conteúdo didático da seção "Aprender" de uma plataforma web de Geometria Analítica. A plataforma já possui calculadora vetorial gráfica, exercícios e fórmulas; esta aba é responsável pela teoria. O conteúdo é baseado principalmente em **Paulo Winterle — Vetores e Geometria Analítica (Pearson)**, com complementos de Boulos & Camargo, Reis & Silva e Steinbruch & Winterle.
>
> **Objetivo do Claude Code:** Construir a aba "Aprender" com 13 tópicos, cada um contendo seus subtópicos. Cada subtópico deve renderizar (a) o texto explicativo com fórmulas em LaTeX (KaTeX/MathJax), (b) um ou mais exemplos resolvidos passo a passo e (c) uma representação visual interativa — preferencialmente em 3D quando o conceito for espacial, em 2D quando for plano. As especificações visuais estão detalhadas em cada subtópico.

---

## Stack Técnico Sugerido

- **Renderização 3D:** Three.js ou React Three Fiber (`@react-three/fiber` + `@react-three/drei`)
- **Renderização 2D:** D3.js, Plotly.js ou JSXGraph (este último é excelente para Geometria Analítica)
- **Fórmulas matemáticas:** KaTeX (mais rápido) ou MathJax
- **Animações:** Framer Motion para transições de UI; GSAP para animações matemáticas complexas
- **Controles de câmera 3D:** OrbitControls (rotação, zoom, pan)
- **Cores sugeridas para vetores:** vermelho (eixo X / vetor 1), verde (eixo Y / vetor 2), azul (eixo Z / vetor 3), laranja (vetor resultado)
- **Convenção visual:** sempre exibir eixos coordenados com rótulos, grade de fundo translúcida e iluminação básica

## Padrões de UI por Subtópico

Cada subtópico deve seguir o layout:

1. **Cabeçalho** com numeração (ex: "2.3 — Módulo, direção e sentido") e tempo estimado de leitura
2. **Bloco de Explicação** com texto didático e fórmulas em LaTeX
3. **Bloco de Visualização Interativa** (canvas 2D ou 3D) com controles claramente identificados
4. **Bloco de Exemplo Resolvido** (passo a passo, com botão "mostrar próxima etapa")
5. **Botão "Praticar"** que leva à aba de Exercícios filtrada por este subtópico
6. **Navegação** "Anterior" / "Próximo" no rodapé

---

# TÓPICO 1 — Introdução à Geometria Analítica

## 1.1 — O que é Geometria Analítica

**Explicação:**

A Geometria Analítica é o ramo da matemática que estuda figuras geométricas (pontos, retas, planos, curvas e superfícies) por meio de equações algébricas. Sua ideia central, atribuída a **René Descartes** (1596–1650) e **Pierre de Fermat** (1601–1665), foi associar a cada ponto do espaço um conjunto de números (suas coordenadas), transformando problemas geométricos em problemas algébricos e vice-versa.

Em outras palavras: a Geometria Analítica é a **ponte entre álgebra e geometria**. Onde a Geometria Euclidiana clássica usava régua e compasso, a Geometria Analítica usa equações.

**Por que estudar Geometria Analítica?**

- Fornece a base matemática para Cálculo, Álgebra Linear, Física e Engenharia.
- É a linguagem da Computação Gráfica, Robótica, Visão Computacional e Games.
- Permite descrever fenômenos físicos no espaço (forças, velocidades, campos).

**Visualização interativa:**

Cena 3D com um ponto $P$ no espaço. Ao mover sliders $x$, $y$, $z$, o ponto se desloca e suas coordenadas aparecem dinamicamente. Linhas tracejadas conectam $P$ às projeções nos planos coordenados, mostrando como cada coordenada "constrói" a posição do ponto.

---

## 1.2 — Breve Histórico e Importância

**Explicação:**

A Geometria Analítica nasceu no século XVII com a obra *La Géométrie* (1637) de Descartes, apêndice do *Discurso do Método*. Fermat, independentemente, desenvolveu ideias semelhantes. Antes deles, os gregos (Euclides, Apolônio) estudavam curvas como objetos puramente geométricos; após Descartes, qualquer curva passou a ser descrita por uma equação.

Marcos importantes:

- **Descartes e Fermat (séc. XVII):** sistema de coordenadas.
- **Euler (séc. XVIII):** generalização para o espaço tridimensional.
- **Hamilton, Grassmann, Gibbs (séc. XIX):** desenvolvimento do conceito de vetor.
- **Séc. XX–XXI:** Geometria Analítica como fundamento da Computação Gráfica.

**Visualização interativa:**

Linha do tempo horizontal navegável (scroll lateral) com retratos dos matemáticos e um pequeno trecho da obra original que cada um produziu. Ao clicar em "Descartes", abre um modal com a famosa fórmula da distância já no formato moderno.

---

## 1.3 — Sistema Cartesiano no Plano (R²)

**Explicação:**

O **plano cartesiano** é formado por duas retas perpendiculares orientadas: o **eixo das abscissas** (eixo $x$, horizontal) e o **eixo das ordenadas** (eixo $y$, vertical). O ponto de interseção é a **origem** $O = (0, 0)$.

Todo ponto $P$ do plano é identificado por um **par ordenado** $(x, y)$, onde:

$$P = (x, y), \quad x, y \in \mathbb{R}$$

Os eixos dividem o plano em quatro **quadrantes**:

- **1º quadrante:** $x > 0, y > 0$
- **2º quadrante:** $x < 0, y > 0$
- **3º quadrante:** $x < 0, y < 0$
- **4º quadrante:** $x > 0, y < 0$

**Exemplo:**

Localize os pontos $A = (3, 2)$, $B = (-2, 4)$, $C = (-3, -1)$ e $D = (4, -3)$.

- $A$ está no 1º quadrante (anda 3 para a direita, sobe 2).
- $B$ está no 2º quadrante.
- $C$ está no 3º quadrante.
- $D$ está no 4º quadrante.

**Visualização interativa:**

Plano cartesiano 2D com grade. O usuário pode clicar em qualquer ponto e ler suas coordenadas. Há também um campo de entrada $(x, y)$: ao digitar, o ponto correspondente é marcado. Os quatro quadrantes são levemente coloridos para facilitar a memorização.

---

## 1.4 — Sistema Cartesiano no Espaço (R³)

**Explicação:**

No espaço, usamos **três eixos mutuamente perpendiculares**: $x$, $y$ e $z$. Cada ponto $P$ do espaço é identificado por uma **terna ordenada**:

$$P = (x, y, z), \quad x, y, z \in \mathbb{R}$$

Os três eixos definem três **planos coordenados**:

- Plano $xy$ (chão): $z = 0$
- Plano $xz$: $y = 0$
- Plano $yz$: $x = 0$

E o espaço se divide em **oito octantes**. O 1º octante é onde $x, y, z > 0$.

**Exemplo:**

O ponto $P = (2, 3, 4)$ está no 1º octante. Para localizá-lo: ande 2 unidades em $x$, 3 em $y$ e suba 4 em $z$.

**Visualização interativa (3D):**

Cena 3D com os três eixos coloridos (X vermelho, Y verde, Z azul) e rótulos. O usuário insere $(x, y, z)$ ou move sliders; o ponto aparece com linhas tracejadas mostrando a "caminhada" $x \to y \to z$ a partir da origem. OrbitControls permite rotacionar a cena com o mouse. Botão "Mostrar octantes" colore translucidamente cada um deles.

---

## 1.5 — Orientação dos Eixos e Regra da Mão Direita

**Explicação:**

O sistema $(x, y, z)$ é chamado **dextrogiro** (orientação positiva) quando obedece à **regra da mão direita**: posicionando a mão direita aberta de modo que os dedos apontem do eixo $x$ para o eixo $y$ (fechando-os por uma rotação de 90°), o **polegar** indicará o sentido positivo do eixo $z$.

Esta convenção é universal em Física, Engenharia e Computação Gráfica e é essencial para definir corretamente o **produto vetorial** mais adiante.

**Visualização interativa:**

Modelo 3D de uma mão direita (modelo simples) sobreposto aos três eixos. O usuário pode arrastar a mão e ver como os dedos sempre indicam $x \to y$ e o polegar sempre aponta para $+z$. Botão alternativo "Mostrar sistema levogiro" para comparação.

---

## 1.6 — Pré-requisitos Matemáticos

**Explicação:**

Para aproveitar bem o conteúdo de Geometria Analítica, é desejável conhecer:

- **Álgebra básica:** equações do 1º e 2º grau, sistemas lineares
- **Trigonometria:** seno, cosseno, tangente, lei dos cossenos
- **Geometria plana:** teorema de Pitágoras, semelhança de triângulos
- **Matrizes e determinantes** (2x2 e 3x3) — fundamental para produto vetorial e misto

**Visualização:**

Página com cards expansíveis para cada pré-requisito, cada card contendo um resumo de 1 minuto e um botão "Revisar" que abre um mini-módulo de revisão (opcional).

---

# TÓPICO 2 — Vetores: Conceitos Fundamentais

## 2.1 — Grandezas Escalares e Vetoriais

**Explicação:**

Em ciência e matemática, distinguimos dois tipos fundamentais de grandezas:

- **Escalar:** caracterizada apenas por um **número real** (módulo) e uma unidade. Exemplos: massa, temperatura, tempo, energia.
- **Vetorial:** exige **três informações** para ser completamente descrita — **módulo** (intensidade), **direção** (a reta sobre a qual atua) e **sentido** (orientação na reta). Exemplos: força, velocidade, aceleração, deslocamento.

**Exemplo:**

"5 kg" é uma grandeza escalar — basta o número. Mas "5 N para o norte" é uma grandeza vetorial: precisa do módulo (5 N), direção (norte–sul) e sentido (para o norte).

**Visualização interativa:**

Painel comparativo: à esquerda, um termômetro mostrando "25 °C" (escalar — só um número). À direita, uma seta no plano com sliders para módulo e ângulo, mostrando que a mesma grandeza muda completamente se mudarmos qualquer um dos três atributos.

---

## 2.2 — Definição de Vetor (Segmento Orientado)

**Explicação:**

Um **vetor** é matematicamente definido como um **segmento de reta orientado**. Dados dois pontos $A$ e $B$ no espaço, o segmento orientado de $A$ até $B$ é denotado por:

$$\vec{AB}$$

- $A$ é o **ponto inicial** (ou origem).
- $B$ é o **ponto final** (ou extremidade).

Graficamente, o vetor é representado por uma **seta** que parte de $A$ e termina em $B$.

**Visualização interativa:**

Plano 2D onde o usuário clica em dois pontos $A$ e $B$. Imediatamente uma seta é desenhada entre eles e o vetor $\vec{AB}$ é nomeado. Ao trocar $A$ por $B$, a seta inverte o sentido (mostrando que $\vec{AB} \neq \vec{BA}$).

---

## 2.3 — Vetores Equipolentes

**Explicação:**

Dois segmentos orientados $\vec{AB}$ e $\vec{CD}$ são chamados **equipolentes** quando possuem:

- Mesmo **módulo** (comprimento)
- Mesma **direção** (são paralelos)
- Mesmo **sentido**

Todos os segmentos orientados equipolentes entre si representam o **mesmo vetor**. Assim, um vetor não tem posição fixa: pode ser "transladado" livremente pelo espaço, desde que preserve módulo, direção e sentido.

$$\vec{AB} \equiv \vec{CD} \iff \text{mesma direção, módulo e sentido}$$

**Visualização interativa:**

Cena 2D ou 3D mostrando inicialmente um vetor $\vec{AB}$. O usuário pode arrastar a seta (mantendo orientação e tamanho) e ver várias cópias equipolentes — todas representando o mesmo vetor. Há um botão "Mostrar todas as representações" que preenche o plano com setas equipolentes em posições diferentes.

---

## 2.4 — Módulo, Direção e Sentido

**Explicação:**

Todo vetor $\vec{v}$ possui três atributos fundamentais:

- **Módulo** $|\vec{v}|$: o comprimento da seta (sempre $\geq 0$).
- **Direção:** a reta-suporte da seta (ou qualquer reta paralela a ela).
- **Sentido:** uma das duas orientações possíveis sobre essa reta.

Dois vetores podem ter a mesma direção mas sentidos opostos.

**Exemplo:**

$\vec{u}$ tem módulo 5, direção horizontal e sentido para a direita.
$\vec{w}$ tem módulo 5, direção horizontal e sentido para a esquerda.
$\vec{u}$ e $\vec{w}$ têm a **mesma direção**, **módulos iguais**, mas **sentidos opostos**.

**Visualização interativa:**

Vetor manipulável com três controles separados: (a) slider de módulo (estica/encolhe), (b) dial circular de direção (rotaciona), (c) botão de "inverter sentido". O usuário percebe que mudar qualquer um dos três produz um vetor diferente.

---

## 2.5 — Vetor Nulo, Vetor Unitário e Versor

**Explicação:**

- **Vetor nulo** $\vec{0}$: vetor de módulo zero. Não tem direção nem sentido definidos. Algebricamente, é o elemento neutro da adição.
- **Vetor unitário:** todo vetor cujo módulo vale 1, isto é, $|\vec{v}| = 1$.
- **Versor de $\vec{v}$:** o vetor unitário de mesma direção e sentido de $\vec{v}$. É obtido dividindo $\vec{v}$ pelo seu módulo:

$$\hat{v} = \frac{\vec{v}}{|\vec{v}|}$$

O versor "limpa" a informação do módulo, restando apenas a orientação.

**Exemplo:**

Se $\vec{v} = (3, 4)$, então $|\vec{v}| = \sqrt{9 + 16} = 5$, e o versor é:

$$\hat{v} = \frac{1}{5}(3, 4) = \left(\frac{3}{5}, \frac{4}{5}\right)$$

Verifique: $\left(\frac{3}{5}\right)^2 + \left(\frac{4}{5}\right)^2 = \frac{9 + 16}{25} = 1$. ✓

**Visualização interativa:**

Vetor $\vec{v}$ desenhado em 2D. Ao apertar o botão "Versor", uma seta menor é desenhada sobre $\vec{v}$, com exatamente 1 unidade de comprimento, e suas componentes são mostradas. Slider para mudar $\vec{v}$ e ver o versor se ajustar em tempo real.

---

## 2.6 — Vetores Opostos

**Explicação:**

O **vetor oposto** de $\vec{v}$, denotado $-\vec{v}$, é o vetor de **mesmo módulo** e **mesma direção** de $\vec{v}$, mas **sentido contrário**.

$$\vec{v} + (-\vec{v}) = \vec{0}$$

Se $\vec{AB}$ é um vetor, então $\vec{BA} = -\vec{AB}$.

**Visualização interativa:**

Vetor $\vec{v}$ com botão "Mostrar oposto". Aparece $-\vec{v}$ sobreposto na mesma reta-suporte, mas apontando para o lado contrário. Ao somar visualmente os dois (regra do triângulo), a seta resultante colapsa em um ponto, evidenciando o vetor nulo.

---

## 2.7 — Representação Geométrica

**Explicação:**

Resumindo o que vimos: graficamente, um vetor é representado por uma **seta** com:

- **Ponto de aplicação:** origem da seta (qualquer ponto, dada a equipolência).
- **Comprimento da seta:** módulo do vetor.
- **Direção:** a reta da seta.
- **Ponta (cabeça):** indica o sentido.

Esta representação é a mesma em $\mathbb{R}^2$ (plano) e $\mathbb{R}^3$ (espaço).

**Visualização interativa:**

Galeria de vetores em 2D e 3D — o usuário alterna entre as duas dimensões com um toggle. Em 3D, OrbitControls permite girar a cena e observar os vetores de diferentes ângulos. Todos os vetores são clicáveis para destacar e mostrar seus atributos.

---

# TÓPICO 3 — Operações Geométricas com Vetores

## 3.1 — Adição: Regra do Triângulo

**Explicação:**

Dados dois vetores $\vec{u}$ e $\vec{v}$, a **soma** $\vec{u} + \vec{v}$ é construída geometricamente pela **regra do triângulo**:

1. Desenhe $\vec{u}$ a partir de um ponto qualquer $A$, terminando em $B$.
2. Translade $\vec{v}$ para que sua origem coincida com $B$. Termina em $C$.
3. O vetor soma $\vec{u} + \vec{v} = \vec{AC}$ vai diretamente de $A$ a $C$.

A interpretação física é intuitiva: se você caminha primeiro $\vec{u}$ e depois $\vec{v}$, sua posição final em relação à origem é $\vec{u} + \vec{v}$.

**Visualização interativa:**

Plano 2D com dois vetores $\vec{u}$ e $\vec{v}$ ajustáveis. Botão "Animar soma" mostra passo a passo: $\vec{u}$ aparece, $\vec{v}$ é arrastado até a ponta de $\vec{u}$, e a seta resultante é traçada. Em 3D, o mesmo procedimento, com possibilidade de rotacionar a cena.

---

## 3.2 — Adição: Regra do Paralelogramo

**Explicação:**

Uma forma equivalente de somar vetores é a **regra do paralelogramo**:

1. Desenhe $\vec{u}$ e $\vec{v}$ a partir do mesmo ponto $A$.
2. Complete o paralelogramo cujos lados são $\vec{u}$ e $\vec{v}$.
3. A diagonal que parte de $A$ é o vetor $\vec{u} + \vec{v}$.

Esta regra é equivalente à do triângulo e é particularmente útil para somar vetores que representam forças concorrentes.

**Visualização interativa:**

Dois vetores com origem comum. Botão "Mostrar paralelogramo" desenha os lados opostos (cópias equipolentes de $\vec{u}$ e $\vec{v}$) e a diagonal aparece em destaque. Sliders independentes mudam $\vec{u}$ e $\vec{v}$ em tempo real.

---

## 3.3 — Propriedades da Adição

**Explicação:**

A adição de vetores satisfaz propriedades algébricas idênticas às da adição de números reais:

- **Comutativa:** $\vec{u} + \vec{v} = \vec{v} + \vec{u}$
- **Associativa:** $(\vec{u} + \vec{v}) + \vec{w} = \vec{u} + (\vec{v} + \vec{w})$
- **Elemento neutro:** $\vec{v} + \vec{0} = \vec{v}$
- **Elemento oposto:** $\vec{v} + (-\vec{v}) = \vec{0}$

**Visualização interativa:**

Quatro painéis lado a lado, um para cada propriedade. Em "Comutativa", são mostradas as duas formas de somar e a coincidência da resultante. Em "Associativa", três vetores são somados em duas ordens diferentes e o resultado é o mesmo.

---

## 3.4 — Subtração de Vetores

**Explicação:**

A **subtração** $\vec{u} - \vec{v}$ é definida como a soma de $\vec{u}$ com o oposto de $\vec{v}$:

$$\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$$

Geometricamente, se $\vec{u}$ e $\vec{v}$ partem do mesmo ponto, então $\vec{u} - \vec{v}$ é o vetor que vai da **extremidade de $\vec{v}$ até a extremidade de $\vec{u}$**.

**Exemplo:**

Se $A$ e $B$ são pontos do espaço, então $\vec{AB} = \vec{OB} - \vec{OA}$, onde $O$ é a origem.

**Visualização interativa:**

Dois vetores $\vec{u}$ e $\vec{v}$ com origem comum. Botão "Subtrair" desenha o vetor que liga a ponta de $\vec{v}$ à ponta de $\vec{u}$, destacando-o em laranja. Permite alternar entre "$\vec{u} - \vec{v}$" e "$\vec{v} - \vec{u}$" para mostrar que são opostos.

---

## 3.5 — Multiplicação de Vetor por Escalar

**Explicação:**

Dado um vetor $\vec{v}$ e um número real $k$ (escalar), o produto $k\vec{v}$ é um novo vetor com:

- **Módulo:** $|k\vec{v}| = |k| \cdot |\vec{v}|$
- **Direção:** mesma de $\vec{v}$
- **Sentido:** mesmo de $\vec{v}$ se $k > 0$; oposto se $k < 0$; nulo se $k = 0$

**Exemplo:**

Se $\vec{v}$ tem módulo 4, então $2\vec{v}$ tem módulo 8 (mesmo sentido) e $-\frac{1}{2}\vec{v}$ tem módulo 2 (sentido oposto).

**Visualização interativa:**

Vetor $\vec{v}$ com um slider para $k$ variando de $-3$ a $3$. À medida que o slider se move, $k\vec{v}$ é redesenhado em tempo real, mostrando o efeito de esticar, encolher e inverter.

---

## 3.6 — Propriedades da Multiplicação por Escalar

**Explicação:**

Para escalares $a, b \in \mathbb{R}$ e vetores $\vec{u}, \vec{v}$:

- **Distributiva em relação à soma de vetores:** $a(\vec{u} + \vec{v}) = a\vec{u} + a\vec{v}$
- **Distributiva em relação à soma de escalares:** $(a + b)\vec{v} = a\vec{v} + b\vec{v}$
- **Associativa com escalares:** $a(b\vec{v}) = (ab)\vec{v}$
- **Identidade:** $1 \cdot \vec{v} = \vec{v}$

Estas propriedades, juntamente com as da adição, fazem do conjunto dos vetores um **espaço vetorial** — tópico central da Álgebra Linear.

**Visualização interativa:**

Mini-laboratório com dois vetores e dois sliders escalares. O usuário verifica cada propriedade fazendo as duas combinações lado a lado e vê os vetores resultantes se sobrepondo, confirmando a igualdade.

---

## 3.7 — Vetores Paralelos (Colineares)

**Explicação:**

Dois vetores $\vec{u}$ e $\vec{v}$ são **paralelos** (ou **colineares**) quando possuem a mesma direção, isto é, quando existe um escalar $k$ tal que:

$$\vec{u} = k\vec{v}$$

Se $k > 0$, os vetores têm o mesmo sentido; se $k < 0$, sentidos opostos. O vetor nulo é considerado paralelo a qualquer vetor.

**Visualização interativa:**

Dois vetores no plano. O usuário arrasta um deles; se passar a ser paralelo ao outro, um indicador "PARALELOS! k ≈ ..." se acende, exibindo o valor aproximado do escalar.

---

# TÓPICO 4 — Vetores em Coordenadas

## 4.1 — Vetores no Plano (R²)

**Explicação:**

Fixada a base canônica $\{\vec{i}, \vec{j}\}$ (vetores unitários nos eixos $x$ e $y$), todo vetor $\vec{v}$ do plano pode ser escrito unicamente como:

$$\vec{v} = x\vec{i} + y\vec{j}$$

Ou, equivalentemente, por suas **coordenadas**:

$$\vec{v} = (x, y)$$

Onde $x$ é a **componente horizontal** e $y$ a **componente vertical**.

**Visualização interativa:**

Plano cartesiano onde o usuário desenha um vetor a partir da origem; as componentes $x$ e $y$ são automaticamente projetadas nos eixos com linhas tracejadas, e o vetor é decomposto em $x\vec{i} + y\vec{j}$ visualmente (duas setas pequenas indo dos eixos formando a "caminhada").

---

## 4.2 — Vetores no Espaço (R³)

**Explicação:**

Analogamente, no espaço usamos a base canônica $\{\vec{i}, \vec{j}, \vec{k}\}$. Todo vetor pode ser escrito como:

$$\vec{v} = x\vec{i} + y\vec{j} + z\vec{k} = (x, y, z)$$

**Exemplo:**

O vetor $\vec{v} = (2, -3, 5)$ tem componente 2 em $x$, componente $-3$ em $y$ e componente 5 em $z$.

**Visualização interativa (3D):**

Cena 3D com o vetor desenhado a partir da origem. Três linhas tracejadas, uma em cada cor de eixo, mostram a decomposição. Sliders permitem mudar cada componente independentemente. OrbitControls para girar a cena.

---

## 4.3 — Igualdade de Vetores

**Explicação:**

Dois vetores são **iguais** se, e somente se, suas componentes correspondentes são iguais:

$$(x_1, y_1, z_1) = (x_2, y_2, z_2) \iff x_1 = x_2,\ y_1 = y_2,\ z_1 = z_2$$

Isto formaliza a noção de equipolência: vetores são iguais quando representam a mesma "lista" de coordenadas.

**Visualização interativa:**

Dois campos de entrada lado a lado. O usuário insere as componentes de $\vec{u}$ e $\vec{v}$; se forem iguais, ambas as setas se sobrepõem perfeitamente e um selo "IGUAIS" aparece. Caso contrário, ficam separadas.

---

## 4.4 — Operações Vetoriais em Coordenadas

**Explicação:**

As operações com vetores tornam-se simples cálculos componente a componente:

$$\vec{u} + \vec{v} = (x_1 + x_2,\ y_1 + y_2,\ z_1 + z_2)$$

$$\vec{u} - \vec{v} = (x_1 - x_2,\ y_1 - y_2,\ z_1 - z_2)$$

$$k\vec{v} = (kx,\ ky,\ kz)$$

**Exemplo:**

Sejam $\vec{u} = (2, -1, 3)$ e $\vec{v} = (4, 0, -2)$.

$\vec{u} + \vec{v} = (6, -1, 1)$
$\vec{u} - \vec{v} = (-2, -1, 5)$
$3\vec{u} = (6, -3, 9)$

**Visualização interativa:**

Calculadora 3D: o usuário define dois vetores e seleciona a operação. A cena 3D exibe os vetores originais (mais transparentes) e o resultado (em destaque), com animação mostrando, por exemplo, a translação na soma.

---

## 4.5 — Vetor Definido por Dois Pontos

**Explicação:**

Dados dois pontos $A = (x_A, y_A, z_A)$ e $B = (x_B, y_B, z_B)$, o vetor $\vec{AB}$ é obtido subtraindo as coordenadas de $A$ das de $B$:

$$\vec{AB} = B - A = (x_B - x_A,\ y_B - y_A,\ z_B - z_A)$$

**Regra mnemônica:** "extremidade menos origem".

**Exemplo:**

Se $A = (1, 2, 3)$ e $B = (4, 0, 7)$, então:

$$\vec{AB} = (4 - 1,\ 0 - 2,\ 7 - 3) = (3, -2, 4)$$

**Visualização interativa:**

O usuário clica em dois pontos na cena 3D. O vetor $\vec{AB}$ é traçado entre eles, e o cálculo das componentes aparece em uma caixa lateral, animado.

---

## 4.6 — Ponto Médio de um Segmento

**Explicação:**

O **ponto médio** $M$ do segmento $\overline{AB}$ é a média aritmética das coordenadas de $A$ e $B$:

$$M = \left(\frac{x_A + x_B}{2},\ \frac{y_A + y_B}{2},\ \frac{z_A + z_B}{2}\right)$$

**Exemplo:**

Se $A = (2, 4, 6)$ e $B = (8, 0, 2)$, então $M = (5, 2, 4)$.

**Visualização interativa:**

Dois pontos $A$ e $B$ ajustáveis em 3D. O ponto $M$ é destacado em outra cor, e ao mover qualquer extremo, $M$ se reposiciona suavemente. Linhas conectam $A$ a $M$ e $M$ a $B$ com tamanhos iguais.

---

## 4.7 — Cálculo do Módulo (Norma)

**Explicação:**

O **módulo** (ou **norma**) de um vetor $\vec{v} = (x, y, z)$ é dado pela generalização do Teorema de Pitágoras:

$$|\vec{v}| = \sqrt{x^2 + y^2 + z^2}$$

No plano: $|\vec{v}| = \sqrt{x^2 + y^2}$.

**Exemplo:**

Se $\vec{v} = (3, 4, 12)$, então:

$$|\vec{v}| = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$$

**Visualização interativa:**

Vetor 3D com cálculo do módulo passo a passo: primeiro a projeção no plano $xy$ (com seu próprio módulo $\sqrt{x^2 + y^2}$ destacado), depois a "subida" em $z$ formando o triângulo retângulo final cujo cateto é $\sqrt{x^2 + y^2}$ e a hipotenusa é $|\vec{v}|$.

---

## 4.8 — Condição de Paralelismo via Coordenadas

**Explicação:**

Dois vetores $\vec{u} = (x_1, y_1, z_1)$ e $\vec{v} = (x_2, y_2, z_2)$ são **paralelos** se, e somente se, suas coordenadas são proporcionais:

$$\frac{x_1}{x_2} = \frac{y_1}{y_2} = \frac{z_1}{z_2}$$

(considerando que nenhuma coordenada de $\vec{v}$ é zero; se for, a coordenada correspondente de $\vec{u}$ também deve ser).

**Exemplo:**

$\vec{u} = (2, 4, 6)$ e $\vec{v} = (1, 2, 3)$ são paralelos, pois $\frac{2}{1} = \frac{4}{2} = \frac{6}{3} = 2$. De fato, $\vec{u} = 2\vec{v}$.

**Visualização interativa:**

Dois vetores em 3D. Um indicador colorido brilha verde quando são paralelos (proporção dentro de tolerância numérica). O painel lateral mostra os três quocientes calculados em tempo real.

---

# TÓPICO 5 — Dependência e Independência Linear

## 5.1 — Combinação Linear de Vetores

**Explicação:**

Dados vetores $\vec{v_1}, \vec{v_2}, \ldots, \vec{v_n}$ e escalares $a_1, a_2, \ldots, a_n$, o vetor:

$$\vec{w} = a_1\vec{v_1} + a_2\vec{v_2} + \cdots + a_n\vec{v_n}$$

é chamado **combinação linear** dos vetores $\vec{v_1}, \ldots, \vec{v_n}$.

**Exemplo:**

Se $\vec{u} = (1, 0)$ e $\vec{v} = (0, 1)$, então o vetor $(3, -2) = 3\vec{u} + (-2)\vec{v}$ é uma combinação linear de $\vec{u}$ e $\vec{v}$.

**Visualização interativa:**

Plano 2D com dois vetores fixos $\vec{u}$ e $\vec{v}$ e sliders para escalares $a$ e $b$. À medida que o usuário ajusta $a$ e $b$, o vetor $a\vec{u} + b\vec{v}$ é desenhado e "rastreia" sua trajetória, evidenciando que todo o plano pode ser alcançado.

---

## 5.2 — Vetores Linearmente Independentes (LI) e Dependentes (LD)

**Explicação:**

Os vetores $\vec{v_1}, \ldots, \vec{v_n}$ são **linearmente dependentes (LD)** quando existe uma combinação linear deles, com escalares **não todos nulos**, que resulta no vetor nulo:

$$a_1\vec{v_1} + \cdots + a_n\vec{v_n} = \vec{0}, \quad \text{com algum } a_i \neq 0$$

Caso contrário, são **linearmente independentes (LI)**.

**Interpretação geométrica:**

- Dois vetores são LD se, e só se, são paralelos.
- Três vetores são LD se, e só se, são coplanares.

**Visualização interativa:**

Cena 3D com três vetores manipuláveis. Um painel exibe "LI" ou "LD" em tempo real, com explicação ("paralelos", "coplanares", "geram o espaço"). Quando são LD, o plano ou reta que os contém é destacado translucidamente.

---

## 5.3 — Base no Plano e no Espaço

**Explicação:**

Uma **base** de $\mathbb{R}^2$ é qualquer par de vetores LI; uma base de $\mathbb{R}^3$ é qualquer terna de vetores LI. Toda base permite escrever qualquer vetor do espaço de **modo único** como combinação linear de seus elementos.

**Visualização interativa:**

Dois vetores LI em $\mathbb{R}^2$ definidos pelo usuário. Sliders para os coeficientes $a, b$ permitem "gerar" qualquer vetor do plano como $a\vec{v_1} + b\vec{v_2}$. Um rastro mostra quais pontos do plano podem ser alcançados (todos!).

---

## 5.4 — Base Canônica

**Explicação:**

A **base canônica** de $\mathbb{R}^2$ é $\{\vec{i}, \vec{j}\} = \{(1,0), (0,1)\}$.
A base canônica de $\mathbb{R}^3$ é $\{\vec{i}, \vec{j}, \vec{k}\} = \{(1,0,0), (0,1,0), (0,0,1)\}$.

Estes vetores são unitários, mutuamente ortogonais e formam um sistema dextrogiro.

**Visualização interativa:**

Cena 3D destacando os três vetores canônicos sobre os eixos. Ao escrever um vetor $\vec{v} = (a, b, c)$, mostra-se a "construção" $a\vec{i} + b\vec{j} + c\vec{k}$ como três passos sequenciais animados.

---

## 5.5 — Coordenadas de um Vetor em Relação a uma Base

**Explicação:**

Dada uma base $\mathcal{B} = \{\vec{v_1}, \vec{v_2}, \vec{v_3}\}$, todo vetor $\vec{w}$ pode ser escrito de forma única:

$$\vec{w} = a\vec{v_1} + b\vec{v_2} + c\vec{v_3}$$

A terna $(a, b, c)$ é chamada **coordenadas de $\vec{w}$ na base $\mathcal{B}$**.

**Visualização interativa:**

Cena 3D com duas grades sobrepostas: a grade canônica (cinza) e uma grade "oblíqua" gerada por uma base não-canônica (colorida). O mesmo vetor $\vec{w}$ aparece com duas conjuntos de coordenadas, mostrando que a representação depende da base.

---

## 5.6 — Mudança de Base (Introdução)

**Explicação:**

Para mudar de uma base $\mathcal{B}$ para outra $\mathcal{B}'$, usamos uma **matriz de mudança de base** $M$ cujas colunas são as coordenadas dos novos vetores na base antiga. Se $[\vec{v}]_\mathcal{B}$ são as coordenadas antigas, as novas são:

$$[\vec{v}]_{\mathcal{B}'} = M^{-1} [\vec{v}]_\mathcal{B}$$

Este tópico é aprofundado em Álgebra Linear; aqui apresentamos a ideia geral.

**Visualização interativa:**

Dois "mundos" 3D lado a lado, cada um com sua base. O usuário define um vetor em um mundo e vê suas coordenadas no outro, com a matriz de transformação exibida.

---

# TÓPICO 6 — Produto Escalar

## 6.1 — Definição e Interpretação

**Explicação:**

O **produto escalar** (ou **produto interno**) de dois vetores $\vec{u}$ e $\vec{v}$ é o **número real** definido por:

$$\vec{u} \cdot \vec{v} = |\vec{u}| \cdot |\vec{v}| \cdot \cos\theta$$

Onde $\theta$ é o ângulo entre os dois vetores ($0 \leq \theta \leq \pi$).

Observe que o resultado é um **escalar**, não um vetor — daí o nome.

**Interpretação intuitiva:**

O produto escalar mede "o quanto um vetor aponta na direção do outro". Se forem perpendiculares, vale zero. Se forem paralelos e de mesmo sentido, vale o produto dos módulos.

**Visualização interativa:**

Dois vetores em 2D com ângulo $\theta$ ajustável. Um mostrador exibe $\vec{u} \cdot \vec{v}$ em tempo real. À medida que o ângulo passa de $0°$ a $90°$, $180°$, o valor varia entre $|\vec{u}||\vec{v}|$, $0$ e $-|\vec{u}||\vec{v}|$.

---

## 6.2 — Cálculo em Coordenadas

**Explicação:**

Se $\vec{u} = (x_1, y_1, z_1)$ e $\vec{v} = (x_2, y_2, z_2)$, então:

$$\vec{u} \cdot \vec{v} = x_1 x_2 + y_1 y_2 + z_1 z_2$$

Esta fórmula é extremamente prática: basta multiplicar componentes correspondentes e somar.

**Exemplo:**

$\vec{u} = (1, 2, 3)$ e $\vec{v} = (4, -5, 6)$:

$$\vec{u} \cdot \vec{v} = 1 \cdot 4 + 2 \cdot (-5) + 3 \cdot 6 = 4 - 10 + 18 = 12$$

**Visualização interativa:**

Calculadora dinâmica: o usuário insere as componentes e vê o cálculo expandido passo a passo, como uma "linha de soma" animada. À direita, os vetores são desenhados em 3D para referência geométrica.

---

## 6.3 — Propriedades do Produto Escalar

**Explicação:**

- **Comutativa:** $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$
- **Distributiva:** $\vec{u} \cdot (\vec{v} + \vec{w}) = \vec{u} \cdot \vec{v} + \vec{u} \cdot \vec{w}$
- **Compatibilidade com escalares:** $(k\vec{u}) \cdot \vec{v} = k(\vec{u} \cdot \vec{v})$
- **Quadrado escalar:** $\vec{v} \cdot \vec{v} = |\vec{v}|^2 \geq 0$

A última propriedade fornece outra forma de calcular o módulo: $|\vec{v}| = \sqrt{\vec{v} \cdot \vec{v}}$.

**Visualização interativa:**

Mini-laboratório onde o usuário verifica cada propriedade com vetores ajustáveis: os dois lados da igualdade são calculados em painéis separados, mostrando que coincidem.

---

## 6.4 — Ângulo Entre Dois Vetores

**Explicação:**

Reorganizando a definição do produto escalar, obtemos uma fórmula direta para o ângulo:

$$\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}| \cdot |\vec{v}|}$$

$$\theta = \arccos\left(\frac{\vec{u} \cdot \vec{v}}{|\vec{u}| \cdot |\vec{v}|}\right)$$

**Exemplo:**

Seja $\vec{u} = (1, 1, 0)$ e $\vec{v} = (1, 0, 0)$.

$\vec{u} \cdot \vec{v} = 1$, $|\vec{u}| = \sqrt{2}$, $|\vec{v}| = 1$.

$\cos\theta = \frac{1}{\sqrt{2}} \Rightarrow \theta = 45°$. ✓

**Visualização interativa:**

Dois vetores 3D ajustáveis. Um arco colorido entre eles indica o ângulo, e o valor (em graus e radianos) é exibido em tempo real. Pré-sets para ângulos especiais (30°, 45°, 60°, 90°, 180°).

---

## 6.5 — Vetores Ortogonais

**Explicação:**

Dois vetores são **ortogonais** (perpendiculares) quando o ângulo entre eles é $90°$, o que equivale a:

$$\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$$

Esta é uma das aplicações mais usadas do produto escalar.

**Exemplo:**

$\vec{u} = (2, 3)$ e $\vec{v} = (-3, 2)$ são ortogonais, pois $\vec{u} \cdot \vec{v} = -6 + 6 = 0$.

**Visualização interativa:**

Vetor $\vec{u}$ fixo; o usuário arrasta a ponta de $\vec{v}$. Quando $\vec{u} \cdot \vec{v}$ cruza o zero, um pequeno ícone de "ângulo reto" aparece e a interface destaca a ortogonalidade.

---

## 6.6 — Projeção Ortogonal de um Vetor sobre Outro

**Explicação:**

A **projeção ortogonal** de $\vec{u}$ sobre $\vec{v}$ é o "componente" de $\vec{u}$ na direção de $\vec{v}$:

$$\text{proj}_{\vec{v}}\,\vec{u} = \frac{\vec{u} \cdot \vec{v}}{|\vec{v}|^2}\,\vec{v}$$

Geometricamente, é o "sombreado" de $\vec{u}$ sobre a reta-suporte de $\vec{v}$, projetado perpendicularmente.

**Exemplo:**

$\vec{u} = (3, 4)$ e $\vec{v} = (1, 0)$:

$\text{proj}_{\vec{v}}\,\vec{u} = \frac{3}{1} \cdot (1, 0) = (3, 0)$.

A projeção captura "quanto de $\vec{u}$ aponta para o eixo $x$".

**Visualização interativa:**

Dois vetores em 2D ou 3D. Uma linha tracejada desce perpendicularmente da ponta de $\vec{u}$ até a reta-suporte de $\vec{v}$, e o segmento projetado é destacado em outra cor. À medida que o usuário gira $\vec{v}$, a projeção é recalculada e redesenhada continuamente.

---

## 6.7 — Aplicações: Trabalho e Decomposição de Forças

**Explicação:**

Na Física, o **trabalho** $W$ realizado por uma força $\vec{F}$ que desloca um corpo por um vetor $\vec{d}$ é dado pelo produto escalar:

$$W = \vec{F} \cdot \vec{d} = |\vec{F}| \cdot |\vec{d}| \cdot \cos\theta$$

Outra aplicação fundamental é a **decomposição** de um vetor em componentes paralela e ortogonal a uma direção dada.

**Visualização interativa:**

Cena com um plano inclinado e um bloco. Uma força é aplicada com ângulo ajustável. O trabalho é calculado em tempo real conforme o ângulo varia, evidenciando que para $\theta = 90°$, $W = 0$.

---

## 6.8 — Cossenos Diretores

**Explicação:**

Os **cossenos diretores** de um vetor $\vec{v} = (x, y, z)$ são os cossenos dos ângulos $\alpha$, $\beta$, $\gamma$ que $\vec{v}$ forma com os eixos $x$, $y$, $z$, respectivamente:

$$\cos\alpha = \frac{x}{|\vec{v}|}, \quad \cos\beta = \frac{y}{|\vec{v}|}, \quad \cos\gamma = \frac{z}{|\vec{v}|}$$

Propriedade fundamental:

$$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$$

**Visualização interativa:**

Vetor 3D com três arcos coloridos mostrando os ângulos $\alpha$, $\beta$, $\gamma$ com cada eixo. Em tempo real, exibe os três cossenos e a soma dos seus quadrados (sempre 1).

---

# TÓPICO 7 — Produto Vetorial

## 7.1 — Definição do Produto Vetorial

**Explicação:**

O **produto vetorial** $\vec{u} \times \vec{v}$ é um **vetor** (diferente do produto escalar, que é um número) caracterizado por:

- **Módulo:** $|\vec{u} \times \vec{v}| = |\vec{u}| \cdot |\vec{v}| \cdot \sin\theta$
- **Direção:** perpendicular ao plano que contém $\vec{u}$ e $\vec{v}$
- **Sentido:** dado pela **regra da mão direita**

Se $\vec{u}$ e $\vec{v}$ forem paralelos, $\vec{u} \times \vec{v} = \vec{0}$.

**Visualização interativa (3D):**

Dois vetores 3D no mesmo plano (representado translucidamente). O vetor produto $\vec{u} \times \vec{v}$ é desenhado em laranja perpendicularmente ao plano. Ao girar $\vec{v}$, o plano e o vetor produto se recalculam.

---

## 7.2 — Cálculo via Determinante

**Explicação:**

Se $\vec{u} = (x_1, y_1, z_1)$ e $\vec{v} = (x_2, y_2, z_2)$, então:

$$\vec{u} \times \vec{v} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ x_1 & y_1 & z_1 \\ x_2 & y_2 & z_2 \end{vmatrix}$$

Expandindo:

$$\vec{u} \times \vec{v} = (y_1 z_2 - z_1 y_2,\ z_1 x_2 - x_1 z_2,\ x_1 y_2 - y_1 x_2)$$

**Exemplo:**

$\vec{u} = (1, 2, 3)$, $\vec{v} = (4, 5, 6)$:

$\vec{u} \times \vec{v} = (2 \cdot 6 - 3 \cdot 5,\ 3 \cdot 4 - 1 \cdot 6,\ 1 \cdot 5 - 2 \cdot 4) = (-3, 6, -3)$.

**Visualização interativa:**

Calculadora visual: o determinante $3 \times 3$ é exibido com a matriz simbólica; ao clicar em "expandir", a animação destaca cada minor sendo calculado e o resultado é construído coordenada a coordenada.

---

## 7.3 — Regra da Mão Direita

**Explicação:**

Para determinar o sentido de $\vec{u} \times \vec{v}$:

1. Aponte os dedos da mão direita na direção de $\vec{u}$.
2. Feche-os em direção a $\vec{v}$ (pelo menor ângulo).
3. O **polegar** indica o sentido de $\vec{u} \times \vec{v}$.

**Consequência importante:** $\vec{v} \times \vec{u} = -(\vec{u} \times \vec{v})$ — o produto vetorial é **anticomutativo**.

**Visualização interativa:**

Modelo 3D de uma mão direita animada que se ajusta automaticamente conforme o usuário muda $\vec{u}$ e $\vec{v}$. Botão "Inverter ordem" alterna entre $\vec{u} \times \vec{v}$ e $\vec{v} \times \vec{u}$, mostrando que o vetor produto inverte de sentido.

---

## 7.4 — Propriedades do Produto Vetorial

**Explicação:**

- **Anticomutativa:** $\vec{u} \times \vec{v} = -(\vec{v} \times \vec{u})$
- **Distributiva:** $\vec{u} \times (\vec{v} + \vec{w}) = \vec{u} \times \vec{v} + \vec{u} \times \vec{w}$
- **Compatibilidade escalar:** $(k\vec{u}) \times \vec{v} = k(\vec{u} \times \vec{v})$
- **NÃO é associativa:** em geral, $(\vec{u} \times \vec{v}) \times \vec{w} \neq \vec{u} \times (\vec{v} \times \vec{w})$
- $\vec{u} \times \vec{u} = \vec{0}$

**Visualização interativa:**

Quadro com cada propriedade ilustrada por um par de cenas comparativas que evidenciam visualmente a igualdade ou desigualdade.

---

## 7.5 — Interpretação Geométrica: Área

**Explicação:**

O módulo do produto vetorial tem uma interpretação geométrica notável:

$$|\vec{u} \times \vec{v}| = \text{Área do paralelogramo formado por } \vec{u} \text{ e } \vec{v}$$

Consequentemente, a área do triângulo de lados $\vec{u}$ e $\vec{v}$ é:

$$\text{Área}_{\triangle} = \frac{1}{2}|\vec{u} \times \vec{v}|$$

**Exemplo:**

Vértices $A = (1, 0, 0)$, $B = (0, 1, 0)$, $C = (0, 0, 1)$. Vetores $\vec{AB} = (-1, 1, 0)$, $\vec{AC} = (-1, 0, 1)$. Produto vetorial $= (1, 1, 1)$, módulo $= \sqrt{3}$. Área do triângulo $= \frac{\sqrt{3}}{2}$.

**Visualização interativa (3D):**

Dois vetores formam um paralelogramo translúcido. O vetor produto sai perpendicular ao plano com comprimento igual à área. Ao mover os vetores, paralelogramo e vetor produto mudam de tamanho juntos, com o valor numérico da área exibido.

---

## 7.6 — Aplicações Físicas e Geométricas

**Explicação:**

O produto vetorial aparece em diversas situações:

- **Torque:** $\vec{\tau} = \vec{r} \times \vec{F}$
- **Momento angular:** $\vec{L} = \vec{r} \times \vec{p}$
- **Força de Lorentz:** $\vec{F} = q\vec{v} \times \vec{B}$
- **Cálculo do vetor normal a um plano**, definido por dois vetores nele contidos.

**Visualização interativa:**

Simulações curtas: chave de boca girando um parafuso (torque), partícula carregada em campo magnético, plano com normal calculada. Cada uma mostra como o produto vetorial dá origem ao vetor relevante.

---

# TÓPICO 8 — Produto Misto

## 8.1 — Definição do Produto Misto

**Explicação:**

O **produto misto** de três vetores $\vec{u}$, $\vec{v}$ e $\vec{w}$ é o **número real** obtido pela composição do produto vetorial com o produto escalar:

$$(\vec{u}, \vec{v}, \vec{w}) = \vec{u} \cdot (\vec{v} \times \vec{w})$$

Algumas notações alternativas: $[\vec{u}, \vec{v}, \vec{w}]$ ou simplesmente $\vec{u} \cdot \vec{v} \times \vec{w}$ (sem parênteses pois só há uma interpretação possível).

**Visualização interativa:**

Cena 3D com três vetores partindo da origem. O paralelogramo gerado por $\vec{v}$ e $\vec{w}$ é mostrado, sua normal ($\vec{v} \times \vec{w}$) é desenhada, e a projeção de $\vec{u}$ sobre essa normal aparece, fornecendo geometricamente o valor do produto misto.

---

## 8.2 — Cálculo via Determinante 3x3

**Explicação:**

Se $\vec{u} = (x_1, y_1, z_1)$, $\vec{v} = (x_2, y_2, z_2)$ e $\vec{w} = (x_3, y_3, z_3)$:

$$(\vec{u}, \vec{v}, \vec{w}) = \begin{vmatrix} x_1 & y_1 & z_1 \\ x_2 & y_2 & z_2 \\ x_3 & y_3 & z_3 \end{vmatrix}$$

**Exemplo:**

$\vec{u} = (1, 0, 0)$, $\vec{v} = (0, 2, 0)$, $\vec{w} = (0, 0, 3)$.

$(\vec{u}, \vec{v}, \vec{w}) = \begin{vmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{vmatrix} = 1 \cdot 2 \cdot 3 = 6$.

**Visualização interativa:**

Determinante interativo: o usuário insere as componentes e o cálculo é feito pela regra de Sarrus animada, com cada termo aparecendo em sequência.

---

## 8.3 — Propriedades do Produto Misto

**Explicação:**

- **Permutação cíclica preserva sinal:** $(\vec{u}, \vec{v}, \vec{w}) = (\vec{v}, \vec{w}, \vec{u}) = (\vec{w}, \vec{u}, \vec{v})$
- **Permutação não-cíclica inverte sinal:** $(\vec{u}, \vec{v}, \vec{w}) = -(\vec{v}, \vec{u}, \vec{w})$
- **Linear em cada argumento:** $(\vec{u} + \vec{u'}, \vec{v}, \vec{w}) = (\vec{u}, \vec{v}, \vec{w}) + (\vec{u'}, \vec{v}, \vec{w})$
- $(\vec{u}, \vec{v}, \vec{w}) = 0$ se, e só se, os três vetores são **coplanares**.

**Visualização interativa:**

Tabela de propriedades com botões "Demonstrar"; cada um mostra duas cenas 3D paralelas comparando os valores do produto misto sob permutações.

---

## 8.4 — Interpretação Geométrica: Volume

**Explicação:**

O **valor absoluto** do produto misto é o volume do **paralelepípedo** definido pelos três vetores:

$$V_{\text{paralelepípedo}} = |(\vec{u}, \vec{v}, \vec{w})|$$

E o volume do tetraedro de mesmos vetores como arestas é:

$$V_{\text{tetraedro}} = \frac{1}{6}|(\vec{u}, \vec{v}, \vec{w})|$$

**Visualização interativa (3D):**

Três vetores formando um paralelepípedo translúcido. Conforme o usuário muda os vetores, o sólido se deforma e o volume é atualizado em tempo real. Botão "Mostrar tetraedro" extrai o tetraedro de um dos vértices.

---

## 8.5 — Condição de Coplanaridade de Três Vetores

**Explicação:**

Três vetores $\vec{u}$, $\vec{v}$, $\vec{w}$ são **coplanares** (pertencem a um mesmo plano) se, e somente se:

$$(\vec{u}, \vec{v}, \vec{w}) = 0$$

Geometricamente, o paralelepípedo "achata" e o volume vai a zero.

**Visualização interativa:**

Três vetores em 3D. À medida que o usuário aproxima o terceiro do plano dos dois primeiros, o paralelepípedo se achata visivelmente e o valor numérico do produto misto se aproxima de zero, com um indicador "COPLANARES" se acendendo.

---

## 8.6 — Aplicações

**Explicação:**

- **Cálculo de volumes** de paralelepípedos e tetraedros sem precisar de fórmulas específicas.
- **Verificação de coplanaridade** de pontos: $A$, $B$, $C$, $D$ são coplanares se $(\vec{AB}, \vec{AC}, \vec{AD}) = 0$.
- **Equação de planos** (usado no Tópico 10).

**Exemplo:**

Verificar se $A=(1,1,1)$, $B=(2,2,2)$, $C=(3,3,3)$, $D=(0,0,0)$ são coplanares. $\vec{AB} = (1,1,1)$, $\vec{AC}=(2,2,2)$, $\vec{AD}=(-1,-1,-1)$. Como $\vec{AC} = 2\vec{AB}$, são todos colineares; o determinante é zero, portanto coplanares (trivialmente, pois estão sobre a mesma reta).

**Visualização interativa:**

Quatro pontos arrastáveis em 3D. Quando o produto misto de $\vec{AB}$, $\vec{AC}$, $\vec{AD}$ é zero, o plano que os contém é destacado.

---

# TÓPICO 9 — Estudo da Reta no Espaço

## 9.1 — Equação Vetorial da Reta

**Explicação:**

Uma reta $r$ no espaço fica determinada por um **ponto $P_0$** que lhe pertence e um **vetor diretor $\vec{v}$** (não nulo) com a direção da reta. Para qualquer ponto $P$ de $r$:

$$\vec{P_0 P} = t\vec{v}, \quad t \in \mathbb{R}$$

Em coordenadas, escrevendo $P = (x, y, z)$, $P_0 = (x_0, y_0, z_0)$ e $\vec{v} = (a, b, c)$:

$$(x, y, z) = (x_0, y_0, z_0) + t(a, b, c)$$

Esta é a **equação vetorial** da reta.

**Visualização interativa (3D):**

Cena 3D com um ponto $P_0$ ajustável e um vetor $\vec{v}$ ajustável. A reta é desenhada como uma linha contínua e o usuário pode arrastar um slider $t$ para ver o ponto $P$ "andar" sobre a reta — para frente quando $t > 0$, para trás quando $t < 0$.

---

## 9.2 — Equações Paramétricas

**Explicação:**

Separando a equação vetorial componente a componente, obtemos as **equações paramétricas** da reta:

$$\begin{cases} x = x_0 + at \\ y = y_0 + bt \\ z = z_0 + ct \end{cases}$$

O parâmetro $t$ percorre $\mathbb{R}$.

**Exemplo:**

Reta passando por $P_0 = (1, 2, 3)$ com $\vec{v} = (2, -1, 4)$:

$$\begin{cases} x = 1 + 2t \\ y = 2 - t \\ z = 3 + 4t \end{cases}$$

Para $t = 1$: $P = (3, 1, 7)$. Para $t = -1$: $P = (-1, 3, -1)$.

**Visualização interativa:**

A mesma cena 3D, agora com as três equações paramétricas exibidas em um painel. Conforme o usuário muda $t$, os três valores são destacados e o ponto $P$ correspondente brilha sobre a reta.

---

## 9.3 — Equações Simétricas

**Explicação:**

Se $a, b, c \neq 0$, isolando $t$ em cada uma das paramétricas:

$$\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$$

Estas são as **equações simétricas** (ou equações **na forma simétrica**) da reta. São especialmente convenientes para reconhecer rapidamente o ponto $P_0$ e o vetor diretor.

**Exemplo:**

A reta com paramétricas $x = 1 + 2t$, $y = 3 - t$, $z = 4t$ tem equações simétricas:

$$\frac{x - 1}{2} = \frac{y - 3}{-1} = \frac{z}{4}$$

**Visualização interativa:**

Painel comparativo: forma vetorial, paramétrica e simétrica de uma mesma reta exibidas lado a lado, com o ponto $P_0$ e o vetor $\vec{v}$ destacados em cada uma.

---

## 9.4 — Equações Reduzidas

**Explicação:**

Se $a \neq 0$, podemos eliminar o parâmetro $t$ usando $t = (x - x_0)/a$ e expressar $y$ e $z$ em função de $x$:

$$\begin{cases} y = mx + n \\ z = px + q \end{cases}$$

Estas são as **equações reduzidas** da reta na variável $x$. Analogamente, podem-se obter reduzidas em $y$ ou em $z$.

**Visualização interativa:**

A reta 3D é exibida; ao trocar a forma exibida (vetorial → paramétrica → simétrica → reduzida), o painel se atualiza e o usuário vê a mesma reta descrita de quatro maneiras equivalentes.

---

## 9.5 — Reta Definida por Dois Pontos

**Explicação:**

Se $A$ e $B$ são pontos distintos, a reta que passa por ambos tem como vetor diretor $\vec{v} = \vec{AB} = B - A$. A equação vetorial fica:

$$P = A + t(B - A), \quad t \in \mathbb{R}$$

Para $t = 0$, $P = A$. Para $t = 1$, $P = B$. Para $0 \leq t \leq 1$, $P$ está no segmento $\overline{AB}$.

**Exemplo:**

Reta por $A = (1, 0, 2)$ e $B = (3, 2, 4)$: $\vec{v} = (2, 2, 2)$, paramétricas $x = 1 + 2t$, $y = 2t$, $z = 2 + 2t$.

**Visualização interativa:**

Cena 3D onde o usuário clica em dois pontos e a reta é desenhada. Slider $t$ permite percorrer a reta; uma faixa em destaque ($0 \leq t \leq 1$) corresponde ao segmento $\overline{AB}$.

---

## 9.6 — Casos Particulares (Retas Paralelas aos Eixos e Planos)

**Explicação:**

- Reta paralela ao **eixo $x$**: vetor diretor $(1, 0, 0)$. As equações reduzem-se a $y = y_0$, $z = z_0$.
- Reta paralela ao **plano $xy$**: vetor diretor com $c = 0$; $z$ é constante.
- Análogos para os outros eixos e planos.

**Visualização interativa:**

Painel com botões pré-configurados: "Paralela ao eixo X", "Paralela ao plano YZ", etc. Cada clique desenha um exemplo da reta na cena 3D.

---

## 9.7 — Ângulo Entre Duas Retas

**Explicação:**

O **ângulo $\theta$ entre duas retas** $r_1$ e $r_2$ é o **menor** ângulo formado por seus vetores diretores $\vec{v_1}$ e $\vec{v_2}$, considerando $0 \leq \theta \leq 90°$:

$$\cos\theta = \frac{|\vec{v_1} \cdot \vec{v_2}|}{|\vec{v_1}| \cdot |\vec{v_2}|}$$

Note o valor absoluto: como retas não têm "sentido", o ângulo é sempre não-obtuso.

**Visualização interativa:**

Duas retas 3D ajustáveis. Um arco mostra o ângulo entre elas, com o valor em graus exibido. Botão "Tornar perpendicular" alinha automaticamente os vetores diretores em ortogonalidade.

---

## 9.8 — Posições Relativas: Paralelas, Concorrentes e Reversas

**Explicação:**

Duas retas no espaço podem assumir três posições relativas:

- **Paralelas** (incluindo coincidentes): vetores diretores são proporcionais.
- **Concorrentes:** se interceptam em exatamente um ponto; são coplanares.
- **Reversas:** não são paralelas e não se interceptam; não são coplanares.

**Teste prático:** sejam $r_1$ com ponto $P_1$ e diretor $\vec{v_1}$, e $r_2$ com $P_2$ e $\vec{v_2}$.

- Se $\vec{v_1} \parallel \vec{v_2}$: paralelas.
- Senão, calcule $(\vec{v_1}, \vec{v_2}, \vec{P_1 P_2})$. Se for zero: concorrentes; se não: reversas.

**Visualização interativa (3D):**

Duas retas com cores diferentes, totalmente ajustáveis. Um indicador exibe a posição relativa em tempo real. Quando concorrentes, o ponto de interseção é marcado; quando reversas, a "distância mínima" (a ser estudada no Tópico 11) é destacada com um segmento perpendicular comum.

---

## 9.9 — Condições de Paralelismo e Ortogonalidade

**Explicação:**

Duas retas com vetores diretores $\vec{v_1}$ e $\vec{v_2}$ são:

- **Paralelas** $\iff \vec{v_1} = k\vec{v_2}$ para algum $k \in \mathbb{R}$.
- **Ortogonais** $\iff \vec{v_1} \cdot \vec{v_2} = 0$.

Atenção: retas ortogonais no espaço não precisam se cruzar (podem ser reversas perpendiculares).

**Visualização interativa:**

Duas retas com botões "Tornar paralelas" e "Tornar ortogonais" que alinham automaticamente as direções, com explicação em popup.

---

## 9.10 — Interseção entre Retas

**Explicação:**

Para achar a interseção de $r_1: P = P_1 + t\vec{v_1}$ e $r_2: P = P_2 + s\vec{v_2}$, igualamos as paramétricas:

$$\begin{cases} x_1 + t a_1 = x_2 + s a_2 \\ y_1 + t b_1 = y_2 + s b_2 \\ z_1 + t c_1 = z_2 + s c_2 \end{cases}$$

Resolve-se o sistema em $t$ e $s$. Se houver solução única, o ponto de interseção é obtido substituindo em qualquer das retas.

**Exemplo:**

$r_1: (1+t, 2-t, 3+2t)$ e $r_2: (s, 1+s, 4)$. Igualando: $1+t = s$, $2-t = 1+s$, $3+2t = 4$. Da terceira: $t = 1/2$, $s = 3/2$. Substituindo na primeira reta: $P = (3/2, 3/2, 4)$.

**Visualização interativa:**

Duas retas 3D. Ao habilitar "Calcular interseção", o sistema é resolvido e, se houver solução, o ponto comum aparece destacado com um marcador esférico.

---

# TÓPICO 10 — Estudo do Plano

## 10.1 — Equação Geral do Plano

**Explicação:**

Um plano $\pi$ no espaço fica determinado por um ponto $P_0 = (x_0, y_0, z_0)$ que lhe pertence e um **vetor normal** $\vec{n} = (a, b, c)$ (perpendicular ao plano).

A condição para que $P = (x, y, z)$ pertença ao plano é $\vec{n} \cdot \vec{P_0 P} = 0$, ou seja:

$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$

Reorganizando, obtemos a **equação geral** do plano:

$$ax + by + cz + d = 0, \quad \text{onde } d = -(ax_0 + by_0 + cz_0)$$

**Visualização interativa (3D):**

Plano translúcido manipulável em 3D. O usuário ajusta $P_0$ e $\vec{n}$; o plano gira ortogonalmente ao normal, com este último desenhado como uma seta saindo do plano.

---

## 10.2 — Equação Vetorial do Plano

**Explicação:**

Um plano pode também ser descrito por um ponto $P_0$ e dois vetores LI $\vec{u}$ e $\vec{v}$ paralelos ao plano (chamados **vetores diretores** do plano). Todo ponto $P$ do plano satisfaz:

$$P = P_0 + s\vec{u} + t\vec{v}, \quad s, t \in \mathbb{R}$$

Esta é a **equação vetorial** do plano.

**Visualização interativa:**

Plano definido por $P_0$, $\vec{u}$ e $\vec{v}$ manipuláveis. Sliders $s$ e $t$ deslocam um ponto $P$ sobre toda a extensão do plano.

---

## 10.3 — Equações Paramétricas do Plano

**Explicação:**

Componente a componente, a equação vetorial fornece:

$$\begin{cases} x = x_0 + s u_1 + t v_1 \\ y = y_0 + s u_2 + t v_2 \\ z = z_0 + s u_3 + t v_3 \end{cases}$$

**Visualização interativa:**

Plano em 3D com painel paramétrico. Dois sliders ($s$ e $t$) movem o ponto $P$ sobre o plano em duas direções perpendiculares (definidas por $\vec{u}$ e $\vec{v}$).

---

## 10.4 — Vetor Normal ao Plano

**Explicação:**

O **vetor normal** $\vec{n}$ é qualquer vetor perpendicular ao plano. Se $\vec{u}$ e $\vec{v}$ são vetores diretores, então:

$$\vec{n} = \vec{u} \times \vec{v}$$

A partir do normal, recupera-se a equação geral diretamente.

**Exemplo:**

Plano que contém $\vec{u} = (1, 1, 0)$ e $\vec{v} = (0, 1, 1)$: $\vec{n} = \vec{u} \times \vec{v} = (1, -1, 1)$. Equação geral (se passar por $P_0 = (0,0,0)$): $x - y + z = 0$.

**Visualização interativa:**

Plano com $\vec{u}$ e $\vec{v}$ desenhados sobre ele. O vetor normal é construído animadamente via produto vetorial. Botão "Inverter normal" mostra que $-\vec{n}$ também é normal ao plano.

---

## 10.5 — Plano Determinado por Três Pontos

**Explicação:**

Três pontos $A$, $B$, $C$ não-colineares determinam um único plano. Para obter sua equação:

1. Calcular $\vec{AB}$ e $\vec{AC}$.
2. Calcular $\vec{n} = \vec{AB} \times \vec{AC}$.
3. Usar a equação geral com $\vec{n}$ e o ponto $A$.

**Exemplo:**

$A=(1,0,0)$, $B=(0,1,0)$, $C=(0,0,1)$: $\vec{AB}=(-1,1,0)$, $\vec{AC}=(-1,0,1)$, $\vec{n} = (1,1,1)$. Equação: $x + y + z - 1 = 0$.

**Visualização interativa:**

Três pontos arrastáveis em 3D; o plano que passa por eles é redesenhado em tempo real, com a equação geral atualizada continuamente.

---

## 10.6 — Casos Particulares (Planos Coordenados e Paralelos aos Eixos)

**Explicação:**

- Plano $xy$: $z = 0$.
- Plano $xz$: $y = 0$.
- Plano $yz$: $x = 0$.
- Plano paralelo ao plano $xy$ passando por $z = k$: $z = k$.
- Plano paralelo ao eixo $z$: equação da forma $ax + by + d = 0$ (sem $z$).

**Visualização interativa:**

Galeria de planos especiais com botões pré-definidos. Cada um exibe a equação e a posição do plano no sistema de coordenadas.

---

## 10.7 — Ângulo Entre Dois Planos

**Explicação:**

O **ângulo entre dois planos** é o ângulo (agudo ou reto) formado pelos seus vetores normais:

$$\cos\theta = \frac{|\vec{n_1} \cdot \vec{n_2}|}{|\vec{n_1}| \cdot |\vec{n_2}|}$$

**Visualização interativa:**

Dois planos translúcidos em 3D com seus normais visíveis. O arco entre os normais é desenhado e o valor do ângulo é exibido. Sliders ajustam a orientação de cada plano.

---

## 10.8 — Ângulo Entre Reta e Plano

**Explicação:**

O **ângulo $\theta$ entre uma reta e um plano** é o complemento do ângulo entre o vetor diretor $\vec{v}$ da reta e o vetor normal $\vec{n}$ do plano:

$$\sin\theta = \frac{|\vec{v} \cdot \vec{n}|}{|\vec{v}| \cdot |\vec{n}|}, \quad 0 \leq \theta \leq 90°$$

Quando $\vec{v} \parallel \vec{n}$, a reta é perpendicular ao plano ($\theta = 90°$); quando $\vec{v} \perp \vec{n}$, a reta é paralela ao plano ($\theta = 0°$).

**Visualização interativa:**

Plano e reta ajustáveis. O ângulo é desenhado como um arco entre a reta e sua projeção no plano, com o valor numérico atualizado em tempo real.

---

## 10.9 — Posições Relativas entre Dois Planos

**Explicação:**

Dois planos no espaço podem ser:

- **Paralelos distintos:** $\vec{n_1} \parallel \vec{n_2}$ mas as equações não são equivalentes.
- **Coincidentes:** equações múltiplas uma da outra.
- **Concorrentes:** $\vec{n_1} \nparallel \vec{n_2}$; se interceptam ao longo de uma reta.

**Visualização interativa:**

Dois planos manipuláveis; quando concorrentes, a reta de interseção é desenhada em destaque. Quando paralelos, o vetor distância entre eles é mostrado perpendicularmente.

---

## 10.10 — Posições Relativas entre Reta e Plano

**Explicação:**

Uma reta e um plano podem:

- **Estar contidos:** a reta inteira pertence ao plano ($\vec{v} \perp \vec{n}$ e $P_0 \in \pi$).
- **Ser paralelos disjuntos:** $\vec{v} \perp \vec{n}$ mas $P_0 \notin \pi$.
- **Ser concorrentes:** se interceptam em um único ponto ($\vec{v}$ não perpendicular a $\vec{n}$).

**Visualização interativa:**

Reta e plano ajustáveis. Etiqueta dinâmica exibe a posição relativa; quando concorrentes, o ponto de interseção é destacado.

---

## 10.11 — Interseções (Reta ∩ Plano, Plano ∩ Plano)

**Explicação:**

**Reta ∩ Plano:** substituir as paramétricas da reta na equação geral do plano, resolver para $t$ e obter o ponto.

**Plano ∩ Plano:** resolver o sistema formado pelas duas equações gerais; o resultado é uma reta (quando os planos são concorrentes).

**Exemplo:**

Reta $(1+t, 2t, 3-t)$ e plano $x + y + z = 6$. Substituindo: $1 + t + 2t + 3 - t = 6 \Rightarrow 2t = 2 \Rightarrow t = 1$. Ponto: $(2, 2, 2)$.

**Visualização interativa:**

Tudo em uma cena 3D só: reta e dois planos, todos manipuláveis. O usuário pode habilitar/desabilitar cada elemento e ver suas interseções (pontos ou retas) sendo construídas dinamicamente.

---

# TÓPICO 11 — Distâncias

## 11.1 — Distância entre Dois Pontos

**Explicação:**

A distância entre $A = (x_A, y_A, z_A)$ e $B = (x_B, y_B, z_B)$ é o módulo do vetor $\vec{AB}$:

$$d(A, B) = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$$

**Exemplo:**

$A = (1, 2, 3)$ e $B = (4, 6, 3)$: $d = \sqrt{9 + 16 + 0} = 5$.

**Visualização interativa:**

Dois pontos arrastáveis em 3D com a distância calculada em tempo real e exibida sobre o segmento que os une.

---

## 11.2 — Distância de Ponto a Reta

**Explicação:**

Dado um ponto $P$ externo e uma reta $r$ que passa por $A$ com vetor diretor $\vec{v}$:

$$d(P, r) = \frac{|\vec{AP} \times \vec{v}|}{|\vec{v}|}$$

A justificativa: $|\vec{AP} \times \vec{v}|$ é a área do paralelogramo formado por $\vec{AP}$ e $\vec{v}$, e a distância é a altura desse paralelogramo.

**Exemplo:**

$P = (1, 1, 1)$, reta por $A=(0,0,0)$ com $\vec{v}=(1,0,0)$. $\vec{AP}=(1,1,1)$, $\vec{AP} \times \vec{v} = (0, 1, -1)$, módulo $= \sqrt{2}$. $d = \sqrt{2}/1 = \sqrt{2}$.

**Visualização interativa:**

Reta 3D e ponto externo. Um segmento perpendicular do ponto à reta é desenhado, com a distância exibida. Animação mostra o paralelogramo formado por $\vec{AP}$ e $\vec{v}$, seu vetor produto e a altura sendo extraída como $|\vec{AP} \times \vec{v}|/|\vec{v}|$.

---

## 11.3 — Distância de Ponto a Plano

**Explicação:**

Para um ponto $P = (x_1, y_1, z_1)$ e um plano $ax + by + cz + d = 0$:

$$d(P, \pi) = \frac{|ax_1 + by_1 + cz_1 + d|}{\sqrt{a^2 + b^2 + c^2}}$$

Essa é uma das fórmulas mais usadas em Geometria Analítica e em Computação Gráfica (detecção de colisão).

**Exemplo:**

$P=(1,2,3)$, $\pi: 2x - y + 2z - 4 = 0$. Numerador: $|2 - 2 + 6 - 4| = 2$. Denominador: $\sqrt{4+1+4} = 3$. $d = 2/3$.

**Visualização interativa:**

Plano e ponto externo. Um segmento perpendicular ao plano (na direção do normal) liga $P$ ao plano com o comprimento $d$ destacado. Ao mover o ponto, a distância é recalculada.

---

## 11.4 — Distância entre Duas Retas Paralelas

**Explicação:**

Para duas retas paralelas $r_1$ e $r_2$, escolha qualquer ponto $P \in r_2$ e calcule a distância de $P$ à reta $r_1$, usando a fórmula da seção 11.2.

**Visualização interativa:**

Duas retas paralelas 3D com o segmento mínimo entre elas destacado em destaque.

---

## 11.5 — Distância entre Duas Retas Reversas

**Explicação:**

Para retas reversas $r_1$ (por $A$ com diretor $\vec{u}$) e $r_2$ (por $B$ com diretor $\vec{v}$):

$$d(r_1, r_2) = \frac{|(\vec{AB}, \vec{u}, \vec{v})|}{|\vec{u} \times \vec{v}|}$$

O numerador é o módulo do produto misto (volume do paralelepípedo), e o denominador é a área da base (paralelogramo formado por $\vec{u}$ e $\vec{v}$). A divisão fornece a altura — exatamente a distância entre as retas.

**Exemplo:**

$r_1$ por $A=(0,0,0)$ com $\vec{u}=(1,0,0)$ e $r_2$ por $B=(0,1,1)$ com $\vec{v}=(0,1,0)$. $\vec{AB}=(0,1,1)$; produto misto: $\begin{vmatrix} 0&1&1\\1&0&0\\0&1&0 \end{vmatrix} = -1$. $\vec{u}\times\vec{v}=(0,0,1)$, módulo $=1$. $d = 1$.

**Visualização interativa:**

Duas retas reversas em 3D. Um segmento perpendicular comum (a "perpendicular comum") é construído passo a passo, com o paralelepípedo correspondente exibido translucidamente. A altura desse paralelepípedo é destacada como sendo a distância.

---

## 11.6 — Distância entre Reta e Plano Paralelos

**Explicação:**

Se uma reta é paralela a um plano, escolha qualquer ponto da reta e calcule sua distância ao plano (seção 11.3).

**Visualização interativa:**

Reta paralela a um plano. O segmento perpendicular do ponto da reta até o plano é desenhado, indicando a distância.

---

## 11.7 — Distância entre Dois Planos Paralelos

**Explicação:**

Para planos paralelos $\pi_1: ax + by + cz + d_1 = 0$ e $\pi_2: ax + by + cz + d_2 = 0$:

$$d(\pi_1, \pi_2) = \frac{|d_1 - d_2|}{\sqrt{a^2 + b^2 + c^2}}$$

(Os coeficientes $a$, $b$, $c$ devem ser os mesmos nas duas equações — caso contrário, multiplique uma delas por um escalar adequado para igualá-los.)

**Visualização interativa:**

Dois planos paralelos translúcidos com uma seta entre eles indicando a distância mínima, perpendicular a ambos.

---

# TÓPICO 12 — Cônicas

## 12.1 — Introdução às Seções Cônicas

**Explicação:**

As **seções cônicas** (ou simplesmente **cônicas**) são curvas obtidas pela interseção de um plano com um **cone duplo de revolução**. Dependendo da inclinação do plano em relação ao eixo do cone, obtêm-se quatro tipos de curvas:

- **Circunferência:** plano perpendicular ao eixo.
- **Elipse:** plano oblíquo, cortando ambos os ramos cônicos não acontece.
- **Parábola:** plano paralelo a uma das geratrizes.
- **Hipérbole:** plano paralelo ao eixo do cone, cortando ambos os ramos.

Foram estudadas pelos gregos (Apolônio de Perga) e hoje aparecem em órbitas planetárias, antenas parabólicas, lentes, sistemas de navegação, e muito mais.

**Visualização interativa (3D):**

Cone duplo translúcido com um plano cortante manipulável. Conforme o usuário gira o plano, a curva de interseção aparece em destaque sobre o cone e também é "extraída" para um painel 2D ao lado, mostrando como cada inclinação gera uma cônica diferente.

---

## 12.2 — Circunferência: Equação Reduzida e Geral

**Explicação:**

A **circunferência** é o lugar geométrico dos pontos do plano equidistantes de um ponto fixo $C = (a, b)$ chamado **centro**. A distância constante é o **raio** $r$.

**Equação reduzida:**

$$(x - a)^2 + (y - b)^2 = r^2$$

**Equação geral:** desenvolvendo os quadrados,

$$x^2 + y^2 + Dx + Ey + F = 0$$

onde $D = -2a$, $E = -2b$, $F = a^2 + b^2 - r^2$.

**Exemplo:**

Circunferência de centro $(2, -1)$ e raio $3$: $(x-2)^2 + (y+1)^2 = 9$, ou $x^2 + y^2 - 4x + 2y - 4 = 0$.

**Visualização interativa:**

Plano 2D com centro arrastável e slider de raio. A circunferência se redesenha em tempo real, com a equação reduzida e geral exibidas simultaneamente.

---

## 12.3 — Elipse: Definição, Elementos e Equações

**Explicação:**

A **elipse** é o lugar geométrico dos pontos do plano cuja **soma das distâncias** a dois pontos fixos $F_1$ e $F_2$ (chamados **focos**) é constante igual a $2a$ ($a > c$, onde $2c$ é a distância entre os focos).

**Elementos principais:**

- **Centro:** ponto médio entre os focos.
- **Eixo maior:** segmento de comprimento $2a$ que contém os focos.
- **Eixo menor:** segmento perpendicular ao eixo maior, de comprimento $2b$.
- Relação fundamental: $a^2 = b^2 + c^2$.
- **Excentricidade:** $e = c/a$, com $0 < e < 1$.

**Equação reduzida (centro na origem, eixo maior em $x$):**

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$$

**Visualização interativa:**

Plano 2D com dois focos arrastáveis e um valor $2a$ ajustável. A elipse é redesenhada em tempo real. Linhas de cada ponto da elipse aos dois focos podem ser exibidas, mostrando que a soma é constante.

---

## 12.4 — Hipérbole: Definição, Elementos e Equações

**Explicação:**

A **hipérbole** é o lugar geométrico dos pontos cuja **diferença (em módulo) das distâncias** a dois focos $F_1$ e $F_2$ é constante igual a $2a$ ($a < c$).

**Elementos principais:**

- **Centro:** ponto médio dos focos.
- **Eixo real (transverso):** $2a$.
- **Eixo imaginário (conjugado):** $2b$.
- Relação: $c^2 = a^2 + b^2$.
- **Excentricidade:** $e = c/a > 1$.
- **Assíntotas:** retas $y = \pm (b/a) x$.

**Equação reduzida:**

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$

**Visualização interativa:**

Plano 2D com hipérbole completa (dois ramos), focos e assíntotas (em tracejado). Ajustando $a$ e $b$, o usuário vê a forma da curva mudar e como ela se aproxima das assíntotas para grandes valores.

---

## 12.5 — Parábola: Definição, Elementos e Equações

**Explicação:**

A **parábola** é o lugar geométrico dos pontos do plano equidistantes de um ponto fixo $F$ (foco) e uma reta fixa $d$ (diretriz).

**Elementos principais:**

- **Vértice:** ponto da parábola mais próximo da diretriz.
- **Eixo:** reta que contém o foco e é perpendicular à diretriz.
- **Parâmetro $p$:** distância do foco à diretriz.

**Equação reduzida (vértice na origem, eixo no $y$, foco em $(0, p/2)$):**

$$x^2 = 2py$$

Outras orientações: $y^2 = 2px$, $x^2 = -2py$, etc.

**Visualização interativa:**

Plano 2D com foco, diretriz e parâmetro $p$ ajustáveis. A parábola é desenhada em tempo real. Para qualquer ponto da curva, segmentos podem ser desenhados até o foco e perpendicularmente à diretriz, mostrando que têm o mesmo comprimento.

---

## 12.6 — Translação de Eixos

**Explicação:**

Quando o centro da cônica não está na origem, mas em $(h, k)$, substituímos $x \to x - h$ e $y \to y - k$ nas equações reduzidas. Por exemplo, uma elipse com centro em $(h, k)$:

$$\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1$$

**Visualização interativa:**

Cônica originalmente centrada na origem; sliders $h$ e $k$ a transladam pelo plano. Os novos eixos de simetria são desenhados sobre o centro deslocado.

---

## 12.7 — Rotação de Eixos

**Explicação:**

Para eliminar termos de produto $xy$ em equações do segundo grau, podemos **rotacionar** os eixos por um ângulo $\theta$. A transformação:

$$\begin{cases} x = x'\cos\theta - y'\sin\theta \\ y = x'\sin\theta + y'\cos\theta \end{cases}$$

leva a equação para a forma reduzida em novos eixos $x'$ e $y'$. O ângulo apropriado para a equação $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$ é dado por:

$$\cot(2\theta) = \frac{A - C}{B}$$

**Visualização interativa:**

Cônica rotacionada (eixo principal inclinado). Slider de ângulo $\theta$ gira os eixos coordenados, e o usuário vê a equação no novo sistema. Quando o ângulo atinge o valor "correto", o termo $xy$ desaparece.

---

## 12.8 — Equação Geral do 2º Grau e Identificação de Cônicas

**Explicação:**

A equação geral do 2º grau em duas variáveis é:

$$Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$$

A **classificação** da cônica é dada pelo **discriminante** $\Delta = B^2 - 4AC$:

- $\Delta < 0$: elipse (circunferência se $A = C$ e $B = 0$).
- $\Delta = 0$: parábola.
- $\Delta > 0$: hipérbole.

**Casos degenerados:** podem ocorrer pares de retas, pontos isolados ou conjunto vazio.

**Visualização interativa:**

Calculadora que recebe os coeficientes $A, B, C, D, E, F$ e identifica automaticamente a cônica, desenhando-a no plano, exibindo o discriminante e sugerindo translações/rotações necessárias para colocar em forma reduzida.

---

# TÓPICO 13 — Superfícies Quádricas

## 13.1 — Introdução às Superfícies no Espaço

**Explicação:**

Uma **superfície** em $\mathbb{R}^3$ é o lugar geométrico dos pontos $(x, y, z)$ que satisfazem uma equação $F(x, y, z) = 0$. Quando $F$ é polinomial de grau 2, a superfície é chamada **superfície quádrica**.

A equação geral é:

$$Ax^2 + By^2 + Cz^2 + Dxy + Exz + Fyz + Gx + Hy + Iz + J = 0$$

Após translações e rotações apropriadas, toda quádrica pode ser reduzida a uma das formas canônicas que veremos a seguir.

**Visualização interativa (3D):**

Cena 3D com galeria de quádricas: o usuário pode clicar em cada tipo e ver a superfície renderizada com transparência, podendo girar livremente.

---

## 13.2 — Esfera

**Explicação:**

A **esfera** de centro $C = (x_0, y_0, z_0)$ e raio $r$ é o lugar geométrico dos pontos do espaço a distância $r$ de $C$. Equação reduzida:

$$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = r^2$$

**Visualização interativa:**

Esfera 3D com centro arrastável e slider de raio. As três interseções com os planos coordenados (circunferências) podem ser destacadas.

---

## 13.3 — Elipsoide

**Explicação:**

O **elipsoide** é a "esfera generalizada" com três semieixos distintos $a$, $b$, $c$:

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$$

Quando $a = b = c$, recupera-se a esfera.

**Visualização interativa:**

Elipsoide com três sliders independentes para $a$, $b$, $c$. Os três cortes principais (com os planos coordenados) podem ser exibidos como elipses 2D em painéis laterais.

---

## 13.4 — Hiperboloide de Uma Folha

**Explicação:**

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 1$$

Tem aparência de "chaminé" ou "ampulheta aberta" — uma superfície contínua que se estende infinitamente ao longo de $z$, com uma "cintura" no plano $xy$.

Aplicação prática: torres de resfriamento de usinas nucleares têm este formato.

**Visualização interativa:**

Hiperboloide 3D rotacionável com sliders $a, b, c$. Botão "Mostrar regras" destaca a propriedade notável: o hiperboloide de uma folha é uma **superfície regrada** (pode ser construída inteiramente por retas).

---

## 13.5 — Hiperboloide de Duas Folhas

**Explicação:**

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = -1$$

Ou equivalentemente $\frac{z^2}{c^2} - \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$.

São **duas superfícies separadas** (duas "tigelas" simétricas que abrem-se uma para cima e outra para baixo).

**Visualização interativa:**

Duas folhas distintas renderizadas em 3D. Slider para o termo independente permite ver a transição entre o cone (caso $= 0$) e o hiperboloide de duas folhas.

---

## 13.6 — Paraboloide Elíptico

**Explicação:**

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = \frac{z}{c}$$

Tem forma de "tigela" ou "antena". Quando $a = b$, é um **paraboloide circular de revolução** — formato usado em antenas parabólicas e refletores.

**Visualização interativa:**

Paraboloide 3D com cortes horizontais (elipses) e cortes verticais (parábolas) destacáveis. Demonstração da propriedade refletora: raios paralelos que incidem na superfície convergem para o foco.

---

## 13.7 — Paraboloide Hiperbólico

**Explicação:**

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = \frac{z}{c}$$

Tem o famoso formato de **sela** (ou "batata Pringles"). Cortes horizontais são hipérboles; cortes verticais perpendiculares aos eixos $x$ e $y$ são parábolas com concavidades opostas.

É também uma superfície regrada.

**Visualização interativa:**

Sela 3D rotacionável. Plano de corte horizontal manipulável; o usuário vê a hipérbole resultante. Plano vertical mostra as parábolas. Botão "Regras" exibe as retas que compõem a superfície.

---

## 13.8 — Cone Quádrico

**Explicação:**

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} - \frac{z^2}{c^2} = 0$$

É o **caso limite** entre os dois tipos de hiperboloide. Forma um cone duplo com vértice na origem, abrindo-se infinitamente para cima e para baixo.

**Visualização interativa:**

Cone duplo 3D. Slider que faz a transição contínua do hiperboloide de uma folha → cone → hiperboloide de duas folhas, mudando o termo independente da equação.

---

## 13.9 — Cilindros Quádricos

**Explicação:**

**Cilindros quádricos** são superfícies obtidas "extrudando" uma cônica do plano ao longo de um eixo perpendicular. Os principais tipos:

- **Cilindro elíptico:** $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$
- **Cilindro circular:** $x^2 + y^2 = r^2$
- **Cilindro hiperbólico:** $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$
- **Cilindro parabólico:** $y = ax^2$

Em qualquer um, a equação não envolve $z$ (a variável "livre"): qualquer reta paralela ao eixo $z$ e passando pela cônica geradora pertence ao cilindro.

**Visualização interativa:**

Galeria com cada tipo de cilindro em 3D. A cônica geradora é destacada no plano $xy$ e o usuário vê a "extrusão" para cima e para baixo ao longo de $z$.

---

## 13.10 — Superfícies de Revolução (Introdução)

**Explicação:**

Uma **superfície de revolução** é obtida girando uma curva (chamada **geratriz**) em torno de uma reta fixa (chamada **eixo de revolução**).

Exemplos:

- Esfera: gerada pela rotação de uma semicircunferência em torno de seu diâmetro.
- Cone: gerada por uma reta oblíqua girando em torno de um eixo concorrente.
- Cilindro circular: reta paralela ao eixo, girada.
- Toro: circunferência girada em torno de uma reta externa coplanar.

**Construção algébrica:** se a curva geratriz no plano $xz$ é $z = f(x)$ e gira em torno do eixo $z$, a superfície resultante tem equação $z = f(\sqrt{x^2 + y^2})$.

**Visualização interativa:**

Plano $xz$ com uma curva geratriz desenhável pelo usuário (livre ou escolhida em um menu). Botão "Girar" inicia uma animação onde a curva gira em torno do eixo $z$ no espaço 3D, gerando a superfície correspondente.

---

# Considerações Finais para o Desenvolvimento

## Sequência Pedagógica

O conteúdo foi estruturado seguindo a ordem de Paulo Winterle: **conceitos geométricos → álgebra de vetores → produtos vetoriais → retas e planos → distâncias → lugares geométricos clássicos (cônicas e quádricas)**. Cada tópico depende fortemente dos anteriores, então a navegação linear é recomendada para iniciantes, mas usuários avançados podem saltar diretamente para o tópico de interesse.

## Conexão com Outras Abas da Plataforma

- **Calculadora Vetorial:** botões em cada subtópico de vetores devem abrir a calculadora pré-preenchida com o exemplo correspondente.
- **Exercícios:** o botão "Praticar" filtra a lista de exercícios pelo subtópico atual.
- **Fórmulas:** as fórmulas em LaTeX devem ser clicáveis, levando à página de fórmulas com a explicação correspondente.

## Padronização das Visualizações 3D

Todas as cenas 3D devem ter:

1. Três eixos coloridos (X vermelho, Y verde, Z azul) com rótulos.
2. Grade no plano $xy$ semi-transparente.
3. OrbitControls (rotação com clique-arrasto, zoom com scroll, pan com clique-direito).
4. Botão "Resetar câmera" no canto.
5. Botão "Tela cheia" para imersão.
6. Toggle para ocultar/exibir labels.

## Acessibilidade

- Todas as fórmulas em LaTeX devem ter o atributo `aria-label` com leitura textual.
- Cores devem passar no contraste WCAG AA.
- Controles devem ser navegáveis por teclado (Tab + Enter).
- Visualizações 3D devem ter uma alternativa textual descrevendo o conceito.

## Bibliografia Recomendada (para citar no rodapé)

- WINTERLE, Paulo. *Vetores e Geometria Analítica*. 2ª ed. Pearson, 2014. **[fonte principal]**
- BOULOS, P.; CAMARGO, I. *Geometria Analítica: Um Tratamento Vetorial*. 3ª ed. Pearson, 2005.
- STEINBRUCH, A.; WINTERLE, P. *Geometria Analítica*. 2ª ed. Pearson, 1987.
- REIS, G. L.; SILVA, V. V. *Geometria Analítica*. 2ª ed. LTC, 1996.
- LIMA, E. L. *Coordenadas no Espaço*. SBM, Coleção do Professor de Matemática.

---

**Fim do documento.** Este brief contém 13 tópicos, 86 subtópicos, todas as explicações teóricas, exemplos resolvidos e especificações detalhadas para visualizações 2D e 3D interativas. Pronto para entregar ao Claude Code.
