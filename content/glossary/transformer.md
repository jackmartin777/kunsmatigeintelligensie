---
term: "Transformer"
slug: "transformer"
shortDefinition: "Die modelargitektuur wat die basis vorm van moderne taalmodelle soos ChatGPT en Claude — uitgevind in 2017 met die invloedryke navorsingsartikel 'Attention is All You Need'."
related: ["groot-taalmodel-llm", "neurale-netwerk", "diep-leer"]
tags: ["kernkonsep", "tegnies", "argitektuur"]
---

## Wat is 'n transformer?

'n Transformer is 'n spesifieke **argitektuur** (bouplan) vir 'n neurale netwerk. Dit is tans die dominante tegnologie agter feitlik alle moderne groot taalmodelle — ChatGPT, Claude, Gemini, Llama, en meer.

Die transformer is in 2017 deur Google-navorsers bekendgestel in 'n baanbrekende artikel getiteld "Attention is All You Need" — een van die mees invloedryke wetenskaplike artikels van die 21ste eeu.

## Die sleutelinnovering: aandagsmeganisme

Voor transformers het taalmodelle tekste woord vir woord van links na regs verwerk, soos 'n mens wat 'n sin lees. Die probleem: teen die einde van 'n lang sin "vergeet" die model die begin.

Die transformer het 'n nuwe meganisme bekendstel: **aandagsmeganisme** (*attention mechanism*). In plaas van reeks-na-reeks-verwerking, kan die transformer na **enige deel van die invoer gelyktydig kyk** en besluit watter dele die belangrikste is.

### 'n Eenvoudige voorbeeld

Neem die sin: "Die hond gehou van sy bene want hy was baie honger."

Wanneer die model die woord "hy" verwerk, moet dit verstaan dat "hy" na "die hond" verwys, nie na "bene" nie. Die aandagsmeganisme laat die model toe om hierdie verband oor lang afstande in die teks te herken.

## Hoekom is dit revolusionêr?

1. **Parallelle verwerking** — alle tokens word gelyktydig verwerk (vinniger opleiding)
2. **Lang-afstand-afhanklikhede** — kan verbande oor baie paragrawe verstaan
3. **Skaalbaarheid** — werk baie goed op groot hoeveelhede data en rekenaarskrag
4. **Veelsydigheid** — werk vir teks, beelde, klank, en selfs proteïenstrukture

## Transformers buite taal

Hoewel transformers aanvanklik vir taalverwerking geskep is, word hulle nou toegepas in:

- **Rekenaarvisie** (Vision Transformers / ViT)
- **Proteïenstruktuurbepaling** (AlphaFold)
- **Musiekgenerasie**
- **Kodegenerasie**

## Die erfenis

Die transformer is miskien die belangrikste KI-innovering sedert die neurale netwerk self. Dit het die KI-revolusie van die laat 2010's en vroeg 2020's moontlik gemaak en verander steeds die grense van wat KI kan doen.
