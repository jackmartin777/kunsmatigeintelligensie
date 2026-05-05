---
term: "Temperatuur"
slug: "temperatuur"
shortDefinition: "'n Instelling in KI-modelle wat bepaal hoe kreatief of voorspelbaar die antwoorde is — hoër temperatuur = meer kreatief en gevarieerd, laer temperatuur = meer konsekwent en feitelik."
related: ["prompt", "tokens", "groot-taalmodel-llm", "inferensie"]
tags: ["tegnies", "prakties"]
---

## Wat is temperatuur in KI?

Temperatuur (*temperature*) is 'n parameterinstelling wat beheer hoeveel **willekeurigheid** in die model se antwoorde ingesluit word. Dit is vernoem na die termodinamiese konsep van temperatuur — soos hoe warm water meer energie het en meer onvoorspelbaar beweeg.

## Die reeks: 0 tot 2

Die meeste modelle gebruik 'n temperatuurreeks van 0 tot 2 (of 0 tot 1 in sommige gevalle):

| Temperatuur | Effek | Geskik vir |
|-------------|-------|-----------|
| 0.0 – 0.3 | Baie voorspelbaar, herhaalbaar | Feitelike vrae, kodeerwing |
| 0.4 – 0.7 | Gebalanseerd | Algemene gebruik |
| 0.8 – 1.2 | Meer kreatief | Kreatiewe skryfwerk |
| 1.3 – 2.0 | Hoogs willekeurig | Brainstorm, eksperimenteel |

## Hoe werk dit tegnies?

By elke stap genereer die model 'n lys moontlike volgende tokens met waarskynlikhede. By lae temperatuur word die mees waarskynlike token feitlik altyd gekies. By hoë temperatuur word selfs minder waarskynlike tokens soms gekies, wat tot meer verrassende, diverse uitvoer lei.

## Praktiese voorbeelde

**Lae temperatuur (0.2) vir 'n feitelike vraag:**
> Vraag: "Wat is die hoofstad van Suid-Afrika?"
> Antwoord: "Die uitvoerende hoofstad van Suid-Afrika is Pretoria. Die wetgewende hoofstad is Kaapstad en die regstelselhoofstad is Bloemfontein."

**Hoë temperatuur (1.5) vir dieselfde vraag:**
> Antwoord kan varieer, soms minder akkuraat maar moontlik meer oorspronklik geformuleer.

**Hoë temperatuur vir kreatiewe skryfwerk:**
Stel hoër temperature wanneer jy unieke stories, idees of name benodig — die onvoorspelbaarheid word 'n voordeel.

## Wanneer jy temperatuur kan aanpas

In verskeie KI-toepassings (soos die OpenAI API, Claude API) kan jy temperatuur direk instel. In gebruikersvriendelike koppelvlakke soos ChatGPT is dit dikwels versteek agter opsies soos "Creativiteit: Hoog/Medium/Laag".

## 'n Nuttige metafoor

Dink aan 'n kafee-bestelling:
- **Lae temperatuur** = "Gee my dieselfde koffie as gister" (voorspelbaar, konsekwent)
- **Hoë temperatuur** = "Verras my iets" (divers, onverwags — soms heerlik, soms nie)
