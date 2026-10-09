# Duett — Roteiro do comercial para o Gemini (Veo)

Comercial de **40 segundos**, 16:9, em **5 cenas de 8 s** (8 s é a duração de cada clipe que o Gemini gera em vídeo). Mesma história da versão animada em GSAP (`propaganda/index.html`), então dá para misturar as duas na edição: os clipes do Gemini como imagem real e os letreiros, números e logo da versão GSAP por cima.

---

## 1. Como usar

1. Abra o Gemini e escolha a geração de vídeo (Veo).
2. Cole primeiro o **Prompt mestre** (seção 3) para fixar estilo, marca e regras.
3. Depois peça **uma cena por vez**, colando o prompt de cada cena (seção 4). Gere 2 ou 3 variações e fique com a melhor.
4. Na edição (CapCut, Premiere, DaVinci), junte as 5 cenas, coloque a narração e a trilha e sobreponha os textos e o logo. **Não peça para o Gemini escrever textos ou o logo no vídeo**, porque ele costuma deformar letras. Os letreiros prontos estão na versão GSAP.

---

## 2. Briefing rápido

| Item | Definição |
| --- | --- |
| Marca | Duett Software (duettsoftware.com) |
| Produto em foco | **Inventário inteligente com drone** + **WMS** (Recebimento → Putaway → Picking → Packing → Shipping) |
| Público | Gerentes de logística, operações e TI de indústrias e centros de distribuição |
| Mensagem | O estoque real bate com o sistema, em minutos e não em dias |
| Tom | Tecnológico, confiante e limpo, sem exagero |
| Cores | Azul Duett `#4146FF`, navy `#090039`, verde-menta `#06ECB7`, azul-céu `#3699FF` |
| Fechamento | "Duett. Seu armazém, em tempo real." + "Agende uma demonstração" |
| Contato na tela final | duettsoftware.com · contato@duettsoftware.com · +55 51 3524-8824 |

---

## 3. Prompt mestre (cole primeiro)

```
Você vai me ajudar a produzir um comercial de 40 segundos para a Duett Software,
empresa brasileira de software para logística e indústria. O comercial tem 5 cenas
de 8 segundos, em 16:9, estilo cinematográfico e tecnológico, com aparência de
filmagem real (não desenho animado).

Estilo visual de todas as cenas:
- Armazém/centro de distribuição moderno, limpo, com prateleiras altas, paletes e caixas de papelão.
- Iluminação fria com destaques em azul (#4146FF) e verde-menta (#06ECB7); sombras em azul-marinho (#090039).
- Câmera estável, movimentos suaves (dolly, drone FPV, push-in), profundidade de campo rasa, 24 fps.
- Pessoas reais, uniformes neutros com colete refletivo e capacete quando fizer sentido, ambiente brasileiro.

Regras:
- NÃO escrever textos, letreiros, números ou logotipos no vídeo (eles entram na edição).
- NÃO mostrar marcas de terceiros.
- Deixar espaço livre (céu/parede/área escura) no terço esquerdo da imagem para colocar textos depois.
- Áudio: apenas ambiente e efeitos sonoros sutis; a narração e a música serão adicionadas na edição.

Confirme que entendeu e aguarde as cenas, que vou enviar uma por vez.
```

> Se preferir que o Gemini já gere a voz junto, troque a última regra de áudio por:
> "Inclua narração em português do Brasil, voz masculina (ou feminina) adulta, calma e confiante, falando exatamente o texto entre aspas de cada cena."

---

## 4. Cenas

### Cena 1 · O problema (0–8 s)

**Narração:** "Seu estoque está onde o sistema diz?"

**Prompt:**
```
Cena 1 de 5, 8 segundos. Amanhecer dentro de um armazém grande e pouco iluminado.
Um operador de logística com prancheta e coletor de dados conta caixas em uma
prateleira alta, confere a tela do coletor, para e franze a testa, como se o número
não batesse. Câmera faz um push-in lento do plano médio para o rosto dele.
Luz azulada fria vindo das janelas altas, poeira no ar. Clima de dúvida e tensão leve.
Terço esquerdo da imagem mais escuro e limpo. Sem textos na tela.
Som: ambiente de armazém, bipes de coletor, eco.
```

**Na edição:** sobrepor "Seu estoque está onde o sistema *diz?*" e o cartão "Sistema 1.248 / Contagem 1.193" (cena 1 da versão GSAP).

---

### Cena 2 · O drone decola (8–16 s)

**Narração:** "Com a Duett, o inventário é feito por drone. Em minutos, não em dias."

**Prompt:**
```
Cena 2 de 5, 8 segundos. Um pequeno drone quadricóptero branco e preto decola do chão
de um armazém moderno e começa a voar pelo corredor entre prateleiras altas cheias de
paletes. Câmera em estilo drone FPV segue o drone por trás, deslizando suavemente pelo
corredor. Um feixe de luz verde-menta (#06ECB7) sai do drone e varre as caixas como um
scanner. As luzes do armazém acendem em sequência ao fundo, em tons de azul (#4146FF).
Sensação de tecnologia e velocidade. Sem textos na tela.
Som: zumbido suave das hélices, whoosh ao passar.
```

**Na edição:** logo Duett montando as duas metades (cena 3 da versão GSAP) no início, com "Inventário inteligente + WMS".

---

### Cena 3 · Detecção e ocupação (16–24 s)

**Narração:** "Cada caixa detectada, cada posição conferida, e o nível de ocupação em tempo real."

**Prompt:**
```
Cena 3 de 5, 8 segundos. Visão aérea de cima para baixo (top-down), como a câmera de um
drone, sobrevoando lentamente um armazém: paletes com caixas de papelão, uma paleteira
laranja, um operador de capacete laranja caminhando. A câmera desce devagar e faz um
leve zoom. Uma linha de luz verde-menta horizontal atravessa a imagem de cima para baixo,
como um scanner. Cores realistas com leve tom azulado. Sem caixas desenhadas, sem textos,
sem números (serão adicionados na edição).
Som: zumbido distante do drone, bipes digitais suaves.
```

**Na edição:** sobrepor as caixas de detecção ("CX-0482 · 98%", "PALETE · 97%", "AVARIA · CX-0391"), o contador "1.248 caixas detectadas", "99,7% acurácia" e a barra "Nível de ocupação 87%" (cena 4 da versão GSAP, que usa a mesma composição aérea).

---

### Cena 4 · WMS ponta a ponta (24–32 s)

**Narração:** "E o WMS acompanha tudo: recebimento, armazenagem, separação, embalagem e expedição."

**Prompt:**
```
Cena 4 de 5, 8 segundos. Montagem dinâmica em um centro de distribuição moderno,
seguindo a mesma caixa de papelão: 1) a caixa chega na doca de recebimento e um operador
lê o código de barras com um coletor; 2) uma empilhadeira guarda o palete em uma
prateleira alta; 3) uma operadora separa a caixa com um tablet na mão; 4) a caixa é
fechada e recebe uma etiqueta na bancada de embalagem; 5) a caixa entra em um caminhão
que fecha as portas. Transições rápidas e fluidas com movimento de câmera contínuo
(match cut). Iluminação limpa, destaques azuis e verde-menta. Sem textos na tela.
Som: bipe de leitura, motor elétrico da empilhadeira, fita adesiva, porta do caminhão.
```

**Na edição:** linha do tempo Recebimento → Putaway → Picking → Packing → Shipping acendendo etapa por etapa (cena 5 da versão GSAP), e no final "Pedidos/hora 342 · Erros de separação 0 · Rastreabilidade 100%".

---

### Cena 5 · Resultado e chamada (32–40 s)

**Narração:** "Duett. Seu armazém, em tempo real. Agende uma demonstração."

**Prompt:**
```
Cena 5 de 5, 8 segundos. Sala de controle de operações logísticas, à noite, com uma
grande tela de dashboard iluminando o ambiente em azul e verde-menta (sem textos legíveis
na tela, apenas gráficos e formas abstratas). Uma gestora de operações observa a tela,
cruza os braços e sorri, satisfeita. Pela janela de vidro atrás dela, o armazém organizado
com o drone pousando. A câmera recua devagar e a imagem escurece suavemente para um fundo
azul-marinho (#090039) nos últimos 2 segundos, deixando o centro livre para o logotipo.
Sem textos, sem logotipos.
Som: ambiente calmo, um acorde final grave.
```

**Na edição:** tela final da versão GSAP (cena 7): logo Duett, "Seu armazém, *em tempo real.*", botão "Agende uma demonstração" e contatos.

---

## 5. Narração completa (para gravar ou para voz por IA)

| Tempo | Texto |
| --- | --- |
| 0–6 s | Seu estoque está onde o sistema diz? |
| 8–15 s | Com a Duett, o inventário é feito por drone. Em minutos, não em dias. |
| 16–23 s | Cada caixa detectada, cada posição conferida, e o nível de ocupação em tempo real. |
| 24–31 s | E o WMS acompanha tudo: recebimento, armazenagem, separação, embalagem e expedição. |
| 33–39 s | Duett. Seu armazém, em tempo real. Agende uma demonstração. |

Cerca de 70 palavras: dá folga de respiro entre as frases. Voz adulta, calma e confiante, português do Brasil.

## 6. Trilha e efeitos

- **Música:** eletrônica corporativa minimalista, 100–110 BPM. Começa só com um pulso grave e tenso (cena 1), abre com a entrada do drone (cena 2), ganha batida na cena 4 e termina num acorde aberto e limpo no logo.
- **Efeitos:** bipe de coletor, zumbido de hélice, "scan" digital nas detecções, "tick" a cada etapa do WMS, whoosh nas transições.
- Pode pedir a trilha ao próprio Gemini: *"Gere uma trilha instrumental de 40 segundos, eletrônica corporativa minimalista, 105 BPM, começando tensa e abrindo para um final otimista e limpo, sem voz."*

## 7. Versões curtas

- **15 s (Reels/Stories, 9:16):** cenas 2 + 3 + 5. Narração: "Inventário por drone, em minutos. Cada caixa detectada, em tempo real. Duett. Agende uma demonstração." Peça ao Gemini os mesmos prompts com "formato vertical 9:16".
- **6 s (bumper):** cena 3 com o logo no final. Narração: "Duett. Seu armazém, em tempo real."
