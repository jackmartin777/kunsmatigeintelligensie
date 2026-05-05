---
term: "Inferensie"
slug: "inferensie"
shortDefinition: "Die proses waar 'n reeds-opgeleide KI-model 'n antwoord of voorspelling genereer gebaseer op nuwe inset-data."
related: ["groot-taalmodel-llm", "tokens", "prompt"]
tags: ["tegnies", "prakties"]
---

## Wat is inferensie?

Inferensie (*inference*) is wat gebeur wanneer jy 'n vraag aan 'n KI-model stel en dit 'n antwoord genereer. Dit is die **"gebruik"-fase** van KI, teenoor die "opleidings"-fase.

Dink daaraan soos hierdie onderskeid:
- **Opleiding** = die KI leer (maande van berekeningsintensiewe verwerking van datastelle)
- **Inferensie** = jy gebruik die opgeleide model (sekondes om jou vraag te beantwoord)

## Die proses stap vir stap

1. **Jy stuur 'n prompt** — jou teks word in tokens omgesit
2. **Die model verwerk** — die neurale netwerk bereken die mees waarskynlike volgende tokens
3. **'n Antwoord word gegenereer** — een token op 'n slag, gebaseer op statistiese waarskynlikheid
4. **Jy ontvang die antwoord** — die tokens word terugvertaal na leesbare teks

## Hoekom is inferensie-spoed belangrik?

In grootskaalse KI-toepassings soos ChatGPT, wat miljoene gebruikers per dag het, is inferensie-spoed en koste kritiek. Dit verklaar hoekom:

- Sommige modelle goedkoper is om te gebruik as ander
- Sommige reaksies vinniger is
- Kleiner modelle soms gebruik word vir eenvoudige take

## Inferensie vs. opleiding: die koste-verskil

| | Opleiding | Inferensie |
|-|-----------|------------|
| Koste | Massief (miljoene rande vir groot modelle) | Relatief goedkoop |
| Tyd | Weke tot maande | Millisekondes tot sekondes |
| Herhaling | Een keer (of af en toe vir opdaterings) | Miljarde kere per dag |
| GPU-gebruik | Intensief | Matig |

## Interessante feit

Wanneer ChatGPT of Claude 'n antwoord "tik", sien jy letterlik inferensie in aksie: die model genereer een token op 'n slag, en dit word in reële tyd vertoon.
