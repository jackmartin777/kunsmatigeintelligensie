---
term: "Konteksvenster"
slug: "konteksvenster"
shortDefinition: "Die hoeveelheid teks wat 'n KI-model op een slag kan 'sien' en verwerk."
related: ["tokens", "prompt", "groot-taalmodel-llm"]
tags: ["tegnies", "kernkonsep"]
---

# Konteksvenster

Die **konteksvenster** (Engels: context window) is die hoeveelheid teks wat 'n KI-model op een slag kan verwerk - beide jou invoer én sy uitset.

## Eenvoudige verduideliking

Dink aan die konteksvenster as die model se "werkende geheue". Net soos jy net soveel kan onthou terwyl jy 'n gesprek voer, kan 'n KI net soveel teks op een slag hanteer.

## Hoe dit werk

Wanneer jy met ChatGPT gesels:
1. Jou huidige vraag word ingesluit
2. Vorige boodskappe in die gesprek word ingesluit
3. Die model se stelselinstruksies word ingesluit
4. Al hierdie moet in die konteksvenster pas

## Praktiese implikasies

- **Lang gesprekke** - die model "vergeet" ouer dele van die gesprek
- **Lang dokumente** - kan nie 'n hele boek op een slag ontleed nie
- **Groter vensters** - nuwer modelle het groter konteksvensters

## Tipiese groottes

- GPT-3.5: ~4,000 tokens (±3,000 woorde)
- GPT-4: 8,000-128,000 tokens
- Claude: 100,000+ tokens

## Wenke

- Hou belangrike inligting naby die begin of einde van jou prompt
- As 'n gesprek lank word, begin soms oor met 'n vars gesprek
- Vir lang dokumente, werk in afdelings
