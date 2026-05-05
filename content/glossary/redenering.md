---
term: "Redenering"
slug: "redenering"
shortDefinition: "Die vermoë van 'n KI om stap-vir-stap deur 'n probleem te dink — soos om wiskundige probleme op te los, logiese afleidings te maak, of komplekse vrae te ontleed."
related: ["groot-taalmodel-llm", "agent", "prompt"]
tags: ["konsep", "gevorderd"]
---

## Wat is KI-redenering?

Redenering (*reasoning*) in KI verwys na die vermoë van 'n model om **logies en stap-vir-stap** deur 'n probleem te werk, eerder as net om 'n vinnige antwoord te gee.

Vroeëre taalmodelle was goed daarin om teks te genereer maar het dikwels gefouteer wanneer noukeurige logiese denke vereis was — veral in wiskunde, fisika en komplekse redenering.

## Soorte redenering

### Wiskundige redenering
Die vermoë om meerstappe-berekeninge korrek uit te voer:
> "As 'n trein 120 km/h ry en ander trein 80 km/h in die teenoorgestelde rigting vertrek 30 minute later, wanneer ontmoet hulle?"

### Logiese redenering
Geldige afleidings maak uit gegewe feite:
> "Alle soogdiere asem lug. Dolfyne is soogdiere. Dus: dolfyne asem lug."

### Verbale redenering
Analogieë, vergelykings en taalkundige afleidings:
> "Dokter is tot hospitaal soos onderwyser is tot ___?"

### Ruimtelike redenering
Verstaan van fisiese ruimte en verhoudinge — 'n area waar KI steeds sukkel.

## Die "Ketting-van-Gedagtes" tegniek

Navorsers het ontdek dat as jy 'n KI **vra om sy denke te wys**, presteer dit aansienlik beter op rederingsprobleme. Dit is genoem *Chain-of-Thought (CoT) prompting*.

**Sonder CoT:**
> Vraag: "John het 5 appels. Hy gee 2 aan Mary en koop daarna 3 meer. Hoeveel het hy?"
> Antwoord: "6" ✓ (of soms fout)

**Met CoT:**
> Vraag: "Dink stap vir stap: John het 5 appels..."
> Antwoord: "Stap 1: John het 5 appels. Stap 2: Hy gee 2 weg, so 5 - 2 = 3. Stap 3: Hy koop 3 meer, so 3 + 3 = 6. Antwoord: 6." ✓ (akkurater)

## Nuwe modelle met beter redenering

In 2024-2025 het OpenAI (o1/o3), Anthropic (Claude) en ander modelle bekendgestel wat spesifiek ontwerp is vir beter redenering. Hierdie modelle **"dink" langer** voor hulle antwoord — soms vir sekondes tot minute — om meer akkurate antwoorde te gee.

## Die beperkings

Selfs met verbeterings faal KI-redenering soms op maniere wat mense verbouereerd laat — veral op:
- Gesundheidswese-redenering oor nuwe situasies
- Redenering oor fisieke wêreld-intuïsie
- Probleme wat baie stappe ver buiten die opleidingsdata vereis

Dit herinner ons dat KI-redenering statistiese patroonherkenning is — nie werklike begrip nie.
