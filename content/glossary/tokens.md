---
term: "Tokens"
slug: "tokens"
shortDefinition: "Die basiese eenhede waarin KI-modelle teks opdeel - tipies woorde of woorddele."
related: ["konteksvenster", "groot-taalmodel-llm", "prompt"]
tags: ["tegnies", "basiese"]
---

# Tokens

**Tokens** is die basiese eenhede waarin KI-taalmodelle teks opdeel om dit te verwerk. 'n Token kan 'n woord, deel van 'n woord, of selfs 'n leesteken wees.

## Eenvoudige verduideliking

Wanneer jy met ChatGPT praat, sien dit nie letters of woorde soos jy nie. Dit sien tokens - stukkies teks wat dit geleer het om te herken.

## Voorbeelde

Die sin "Hallo, hoe gaan dit?" mag opgedeel word in:
- "Hallo" (1 token)
- "," (1 token)
- " hoe" (1 token)
- " gaan" (1 token)
- " dit" (1 token)
- "?" (1 token)

## Hoekom dit saak maak

1. **Koste** - KI-dienste reken dikwels per token
2. **Limiet** - die konteksvenster word in tokens gemeet
3. **Verskillende tale** - Afrikaans gebruik meer tokens as Engels vir dieselfde idee

## Die taalprobleem

Tokeniseerders is tipies op Engels geoptimaliseer. Dit beteken:
- Engelse woorde = minder tokens
- Afrikaanse woorde = meer tokens
- Dit maak Afrikaanse gebruik duurder en minder doeltreffend

## Praktiese wenke

- 'n Tipiese Engelse woord ≈ 1-2 tokens
- 'n Tipiese Afrikaanse woord ≈ 1-3 tokens
- 'n Bladsy teks ≈ 500-750 tokens

## Hoe om tokens te skat

As ruwe skatting: tokens ≈ woorde × 1.3 (vir Engels) of woorde × 1.5 (vir Afrikaans)
