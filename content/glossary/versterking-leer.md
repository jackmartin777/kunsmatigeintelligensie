---
term: "Versterkingsleer"
slug: "versterkingsleer"
shortDefinition: "'n Leermetode waar 'n KI-model leer deur beloning en straf te ontvang vir sy aksies — soos 'n hond wat leer deur behandeling te kry wanneer dit 'n truk reg doen."
related: ["masjienleer", "fyn-afstemming", "agent"]
tags: ["konsep", "opleiding"]
---

## Wat is versterkingsleer?

Versterkingsleer (*reinforcement learning / RL*) is 'n tipe masjienleer waar 'n **agent** (die lerende entiteit) leer om aksies te neem in 'n omgewing deur positiewe beloning te maksimeer en negatiewe straf te minimeer.

Dit is geïnspireer deur hoe diere leer: 'n rot druk 'n hefboom as dit leer dat die hefboom kos lewer. Mettertyd versterk die suksesvolle gedrag.

## Die kernkomponente

| Komponent | Beskrywing |
|-----------|-----------|
| **Agent** | Die lerende KI-stelsel |
| **Omgewing** | Die wêreld waarin die agent optree |
| **Staat** | Die huidige situasie |
| **Aksie** | Wat die agent doen |
| **Beloning** | Die terugvoer na 'n aksie |
| **Beleid** | Die strategie wat die agent volg |

## Hoe ChatGPT en Claude RL gebruik

Moderne taalmodelle gebruik 'n spesifieke variant genaamd **RLHF** — Reinforcement Learning from Human Feedback (Versterkingsleer uit Menslike Terugvoer).

Die proses:
1. Die model genereer baie antwoorde op dieselfde vraag
2. Menslike evalueerders rangskik die antwoorde (beste tot swakste)
3. 'n Beloningsmodel leer om hierdie menslike voorkeure te voorspel
4. Die taalmodel word dan verfyn om hoë beloningspunte te behaal

Dit is hoekom moderne taalmodelle so koöperatief, nuttig en minder skadelik is as vroeëre modelle — RLHF het hulle geleer wat mense verkies.

## Versterkingsleer in spele

Sommige van die mees dramatiese KI-prestasies is deur RL bereik:

- **AlphaGo / AlphaZero (Google DeepMind)** — leer Go en skaak deur miljoene speletjies teen hulself te speel, en bereik menslike kampioen-vlak in dae
- **OpenAI Five** — leer om Dota 2 te speel op professionele vlak
- **Atari speletjies** — DQN leer tientalle Atari-speletjies sonder menslike instruksie

## Uitdagings van versterkingsleer

- **Belonings-hacking:** Die agent vind maniere om hoog te skor sonder om werklik die bedoelde taak te voltooi
- **Stadige leer:** Vereís miljoene iterasies vir komplekse take
- **Omgewingsontwerpuitdagings:** Die beloningsisteem moet korrek gedefinieer wees
- **Veiligheid:** Agents kan gevaarlike strategieë leer as dit beloon word
