# Duett Software — três versões do site

Recriação do site [duettsoftware.com](https://www.duettsoftware.com/) com os mesmos textos, links, contatos e logo, em três direções de scrollytelling (a rolagem é a linha do tempo da história). PT-BR e EN, com botão para trocar o idioma.

| Versão | Pasta | Ideia |
| --- | --- | --- |
| A · Just in Time | `jit/` | A rolagem vira uma linha de produção: o símbolo da Duett se monta, vira a peça da esteira, passa pelas estações (com relógio JIT e HUD) e termina numa etiqueta impressa com o convite para a demonstração. |
| B · Duas vozes | `duet/` | Editorial e claro. Indústria (serifa, foto) e software (sans, dados) lado a lado; capítulos com imagem fixa, projetos em trilho horizontal, metodologia em zigue-zague e "portas" que se fecham sobre o CTA. |
| C · Blueprint | `blueprint/` | Tudo começa como desenho técnico: fotos viram traço (filtro de detecção de bordas) e são "renderizadas" com a rolagem; títulos em contorno ganham tinta; esquema de integração com pulsos de dados; Gantt da metodologia; prancha "aprovada" no CTA. |

`index.html` (raiz) é a página de escolha entre as três.

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
  img/                imagens e logos originais do site
  fonts/              fontes auto-hospedadas (Google Fonts, licença OFL)
  vendor/             GSAP 3.13 (ScrollTrigger) e Lenis
jit/ duet/ blueprint/ index.html + style.css + main.js de cada versão
```

Para mudar um texto, edite `assets/shared/content.js`; as três versões leem dali.

## Notas

- O site original não tem preços; nada foi omitido nesse ponto.
- Pequenas correções de digitação do original: "Clound Solutions" → "Cloud Solutions", "Cross-Plataform" → "Cross-Platform", "IOS" → "iOS", "Curriculo" → "Currículo", "automobilistico" → "automobilístico".
- Texto novo: o botão "Agendar uma demonstração" (abre e-mail para contato@duettsoftware.com) ao lado do WhatsApp original, e pequenos rótulos decorativos (estações, folhas, "render").
- Links "Termos e Condições" e "Política de Privacidade" continuam apontando para `#`, como no original.
- Respeita `prefers-reduced-motion`: sem rolagem suave, pins ou animações; todo o conteúdo fica visível.
