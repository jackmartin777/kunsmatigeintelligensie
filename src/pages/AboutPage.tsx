import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Brain, Heart, Users, BookOpen } from 'lucide-react';

/**
 * Renders the About page for the site, including SEO metadata, breadcrumbs, the mission,
 * values, and a call-to-action for contributors.
 *
 * The component outputs structured content in Afrikaans: a header, a "Ons missie" section,
 * a 2x2 values grid (Duidelikheid, Menslikheid, Toeganklikheid, Eerlikheid), and a
 * "Word betrokke" contact section with a mailto link.
 *
 * @returns A React element representing the About page.
 */
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
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Oor ons
          </h1>
          <p className="text-lg text-surface-600">
            Ons missie is om kunsmatige intelligensie toeganklik te maak vir elke
            Afrikaanssprekende.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Ons missie</h2>
          <div className="prose prose-lg max-w-none text-surface-600">
            <p>
              Kunsmatige intelligensie verander die wêreld - hoe ons werk, leer,
              kommunikeer en leef. Maar die meeste inligting oor KI is in Engels, gevul
              met tegniese jargon, en gerig op 'n tegniese gehoor.
            </p>
            <p>
              Ons glo dat elke Afrikaanssprekende die reg het om KI te verstaan - nie net
              wat dit is nie, maar hoe om dit veilig te gebruik, en hoe om die etiese
              vrae daaromheen te oorweeg.
            </p>
            <p>
              Hierdie webwerf is ons bydrae: 'n versameling artikels, 'n woordeboek, en
              praktiese gidse - alles in eenvoudige, duidelike Afrikaans.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-6">Ons waardes</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white rounded-xl p-6 border border-surface-200">
              <Brain className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="font-semibold text-lg text-surface-900 mb-2">
                Duidelikheid
              </h3>
              <p className="text-surface-600">
                Ons verduidelik komplekse konsepte in eenvoudige taal, sonder om
                akkuraatheid op te offer.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-surface-200">
              <Heart className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="font-semibold text-lg text-surface-900 mb-2">
                Menslikheid
              </h3>
              <p className="text-surface-600">
                Tegnologie moet die mens dien, nie andersom nie. Ons fokus op wat KI
                beteken vir gewone mense.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-surface-200">
              <Users className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="font-semibold text-lg text-surface-900 mb-2">
                Toeganklikheid
              </h3>
              <p className="text-surface-600">
                Ons skryf vir almal - nie net tegnici nie. Geen voorkennis nodig om te
                begin leer nie.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-surface-200">
              <BookOpen className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="font-semibold text-lg text-surface-900 mb-2">
                Eerlikheid
              </h3>
              <p className="text-surface-600">
                Geen hype of oordrywing nie. Ons wys beide die moontlikhede en die
                beperkings van KI.
              </p>
            </div>
          </div>
        </section>

        {/* Get involved */}
        <section className="bg-primary-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-surface-900 mb-4">
            Word betrokke
          </h2>
          <div className="prose prose-lg max-w-none text-surface-600">
            <p>
              Hierdie projek is 'n werk in wording. As jy wil help - of dit nou met
              skryfwerk, vertaling, tegniese bydraes, of net terugvoer is - ons sal
              graag van jou hoor.
            </p>
            <p>
              Stuur 'n e-pos na{' '}
              <a href="mailto:hallo@kunsmatigeintelligensie.co.za">
                hallo@kunsmatigeintelligensie.co.za
              </a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}