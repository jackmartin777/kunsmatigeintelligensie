import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Brain, Heart, Users, BookOpen, Mail } from 'lucide-react';

const values = [
  {
    icon: Brain,
    title: 'Duidelikheid',
    description:
      'Ons verduidelik komplekse konsepte in eenvoudige taal, sonder om akkuraatheid op te offer.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-900/30',
  },
  {
    icon: Heart,
    title: 'Menslikheid',
    description:
      'Tegnologie moet die mens dien, nie andersom nie. Ons fokus op wat KI beteken vir gewone mense.',
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Users,
    title: 'Toeganklikheid',
    description:
      'Ons skryf vir almal — nie net tegnici nie. Geen voorkennis nodig om te begin leer nie.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
  },
  {
    icon: BookOpen,
    title: 'Eerlikheid',
    description:
      'Geen hype of oordrywing nie. Ons wys beide die moontlikhede en die beperkings van KI.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/30',
  },
];

export function AboutPage() {
  return (
    <>
      <SEO
        title="Oor ons"
        description="Leer meer oor kunsmatigeintelligensie.co.za - ons missie, waardes en die span agter die projek."
        canonical="/oor-ons"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Oor ons' }]} />

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            Oor ons
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            Ons missie is om kunsmatige intelligensie toeganklik te maak vir elke
            Afrikaanssprekende.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
            Ons missie
          </h2>
          <div className="prose max-w-none">
            <p>
              Kunsmatige intelligensie verander die wêreld — hoe ons werk, leer,
              kommunikeer en leef. Maar die meeste inligting oor KI is in Engels, gevul
              met tegniese jargon, en gerig op 'n tegniese gehoor.
            </p>
            <p>
              Ons glo dat elke Afrikaanssprekende die reg het om KI te verstaan — nie net
              wat dit is nie, maar hoe om dit veilig te gebruik, en hoe om die etiese
              vrae daaromheen te oorweeg.
            </p>
            <p>
              Hierdie webwerf is ons bydrae: 'n versameling artikels, 'n woordeboek, en
              praktiese gidse — alles in eenvoudige, duidelike Afrikaans.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
            Ons waardes
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="gradient-border bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700 hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="font-semibold text-lg text-surface-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Get involved */}
        <section className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-primary-50 dark:from-purple-950/30 dark:to-primary-950/30 border border-purple-100 dark:border-purple-900">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
            Word betrokke
          </h2>
          <div className="prose max-w-none mb-6">
            <p>
              Hierdie projek is 'n werk in wording. As jy wil help — of dit nou met
              skryfwerk, vertaling, tegniese bydraes, of net terugvoer is — ons sal
              graag van jou hoor.
            </p>
          </div>
          <a
            href="mailto:hallo@kunsmatigeintelligensie.co.za"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-primary-600 text-white font-semibold hover:from-purple-500 hover:to-primary-500 transition-all hover:-translate-y-0.5 shadow-glow-purple"
          >
            <Mail className="h-4 w-4" />
            hallo@kunsmatigeintelligensie.co.za
          </a>
        </section>
      </div>
    </>
  );
}
