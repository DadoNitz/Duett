# Duett Software — versões do site

Recriação do site [duettsoftware.com](https://www.duettsoftware.com/) com os mesmos textos, links, contatos e logo, em três direções de scrollytelling (A–C, a rolagem é a linha do tempo da história) e quatro versões objetivas com rolagem normal na paleta azul da Duett (D–G). PT-BR e EN, com botão para trocar o idioma.

| Versão | Pasta | Ideia |
| --- | --- | --- |
| A · Just in Time | `jit/` | A rolagem vira uma linha de produção: o símbolo da Duett se monta, vira a peça da esteira, passa pelas estações (com relógio JIT e HUD) e termina numa etiqueta impressa com o convite para a demonstração. |
| B · Duas vozes | `duet/` | Editorial e claro. Indústria (serifa, foto) e software (sans, dados) lado a lado; capítulos com imagem fixa, projetos em trilho horizontal, metodologia em zigue-zague e "portas" que se fecham sobre o CTA. |
| C · Blueprint | `blueprint/` | Tudo começa como desenho técnico: fotos viram traço (filtro de detecção de bordas) e são "renderizadas" com a rolagem; títulos em contorno ganham tinta; esquema de integração com pulsos de dados; Gantt da metodologia; prancha "aprovada" no CTA. |
| D · Direto | `direto/` | Objetiva e na paleta do site original (azul #4146FF no topo, #090039, #06ECB7, #3699FF, #626F92 e tons claros). Rolagem normal, sem telas presas. Componentes inspirados no [React Bits](https://reactbits.dev), recriados em JS puro em `assets/shared/fx.js`: Aurora (WebGL), BlurText, GradientText, ShinyText, StarBorder, Magnet, CountUp, LogoLoop, SpotlightCard/MagicBento, TiltedCard e ClickSpark. |
| E · Bento | `bento/` | Objetiva, tudo em blocos arredondados (estilo Apple/Linear): topo azul com Aurora, números com CountUp, serviços em MagicBento com spotlight, projetos em mosaico, missão/visão e contato em blocos. |
| F · Claro | `claro/` | Corporativa e branca, centrada: grade animada (Squares) no topo, título SplitText, selo CircularText, projetos em CardSwap, metodologia em Stepper clicável, CTA azul com grade. |
| G · Noite | `noite/` | Escura e tecnológica: rede de partículas (Particles/Threads) no topo, título DecryptedText, faixa ScrollVelocity, cards com spotlight, projetos com TiltedCard e linha do tempo que se preenche ao rolar. |

`index.html` (raiz) é a página de escolha entre as versões.

## Propaganda comercial

`propaganda/` tem um comercial de 42 s feito em GSAP (palco 1920×1080): gancho → problema → logo → inventário por drone → WMS ponta a ponta → projetos e clientes → chamada final.

- `propaganda/index.html`: abre no navegador com play/pausa e linha do tempo (barra de espaço pausa).
- `propaganda/duett-propaganda.mp4`: o vídeo já renderizado (1080p, 30 fps, sem áudio).
- `propaganda/render.mjs`: gera o MP4 de novo (`node propaganda/render.mjs`, com o servidor local rodando; precisa de Playwright e ffmpeg).
- `propaganda/ROTEIRO-GEMINI.md`: roteiro com prompt mestre, 5 cenas de 8 s, narração e trilha para gerar a versão filmada no Gemini (Veo).

## Rodar localmente

É um site estático, sem build:

```bash
npx http-server -p 4173 .
# abra http://localhost:4173/
```

## Estrutura

```
assets/
  shared/content.js   todo o conteúdo PT/EN (textos, links, contatos, imagens)
  shared/logo.js      logo Duett inline (as duas metades do símbolo animam separadas)
  shared/kit.js       rolagem suave, abas, código de barras, seletor de versões
  shared/fx.js/.css   componentes estilo React Bits em JS puro (versões D–G)
  shared/parts.js     blocos de conteúdo comuns das versões E–G
  img/                imagens e logos originais do site
  fonts/              fontes auto-hospedadas (Google Fonts, licença OFL)
  vendor/             GSAP 3.13 (ScrollTrigger) e Lenis
jit/ duet/ blueprint/ direto/ bento/ claro/ noite/   index.html + style.css + main.js de cada versão
```

Para mudar um texto, edite `assets/shared/content.js`; todas as versões leem dali.

## Notas

- O site original não tem preços; nada foi omitido nesse ponto.
- Pequenas correções de digitação do original: "Clound Solutions" → "Cloud Solutions", "Cross-Plataform" → "Cross-Platform", "IOS" → "iOS", "Curriculo" → "Currículo", "automobilistico" → "automobilístico".
- Texto novo: o botão "Agendar uma demonstração" (abre e-mail para contato@duettsoftware.com) ao lado do WhatsApp original, e pequenos rótulos decorativos (estações, folhas, "render").
- Links "Termos e Condições" e "Política de Privacidade" continuam apontando para `#`, como no original.
- Respeita `prefers-reduced-motion`: sem rolagem suave, pins ou animações; todo o conteúdo fica visível.
