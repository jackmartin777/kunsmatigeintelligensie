import { Link } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Shield,
  MessageSquare,
  Compass,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';

const steps = [
  {
    number: 1,
    icon: Brain,
    title: 'Verstaan wat KI is',
    description:
      'Begin met die basiese beginsels. Wat is kunsmatige intelligensie regtig? Hoe werk dit? Wat kan dit doen - en wat nie?',
    link: '/artikels/wat-is-kunsmatige-intelligensie',
    linkText: 'Lees: Wat is KI?',
  },
  {
    number: 2,
    icon: BookOpen,
    title: 'Leer die woordeskat',
    description:
      'KI het sy eie taal - prompts, tokens, hallusinasies. Ons woordeboek verduidelik elke term in eenvoudige Afrikaans.',
    link: '/woordeboek',
    linkText: 'Verken die woordeboek',
  },
  {
    number: 3,
    icon: MessageSquare,
    title: 'Leer hoe om met KI te praat',
    description:
      'Die manier waarop jy jou vraag stel, bepaal die antwoord wat jy kry. Leer hoe om goeie prompts te skryf.',
    link: '/woordeboek/prompt',
    linkText: 'Leer oor prompts',
  },
  {
    number: 4,
    icon: Shield,
    title: 'Gebruik KI veilig',
    description:
      'KI is kragtig, maar nie sonder risiko nie. Leer hoe om jou privaatheid te beskerm en foute te vermy.',
    link: '/artikels/hoe-om-chatgpt-veilig-te-gebruik',
    linkText: 'Lees die veiligheidsgids',
  },
  {
    number: 5,
    icon: Compass,
    title: 'Verken dieper',
    description:
      'Nou dat jy die basiese ken, kan jy dieper delf. Verken spesifieke onderwerpe wat jou interesseer.',
    link: '/artikels',
    linkText: 'Sien alle artikels',
  },
];

export function BeginHierPage() {
  return (
    <>
      <SEO
        title="Begin hier"
        description="Nuut tot KI? Begin hier. 'n Stap-vir-stap gids om kunsmatige intelligensie te verstaan."
        canonical="/begin-hier"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Begin hier' }]} />

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
            Begin hier
          </h1>
          <p className="text-lg text-surface-600">
            Nuut tot kunsmatige intelligensie? Hierdie gids neem jou stap vir stap deur
            die basiese beginsels. Geen voorkennis nodig nie.
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl shadow-sm border border-surface-200 p-6 sm:p-8"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute left-12 top-full w-0.5 h-8 bg-surface-200" />
              )}

              <div className="flex items-start gap-6">
                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="h-5 w-5 text-primary-600" />
                    <h2 className="text-xl font-semibold text-surface-900">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-surface-600 mb-4">{step.description}</p>

                  <Link
                    to={step.link}
                    className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  >
                    {step.linkText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick tips */}
        <section className="mt-12 bg-primary-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-surface-900 mb-4">
            Vinnige wenke vir beginners
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-surface-700">
                <strong>Wees geduldig</strong> - KI is 'n nuwe veld met baie konsepte.
                Neem jou tyd om dit te verstaan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-surface-700">
                <strong>Eksperimenteer</strong> - die beste manier om te leer is om
                self te probeer. Gebruik gratis gereedskap soos ChatGPT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-surface-700">
                <strong>Bly skepties</strong> - moenie alles glo wat KI sê nie.
                Verifieer belangrike inligting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-surface-700">
                <strong>Beskerm jouself</strong> - deel nooit persoonlike of
                sensitiewe inligting met KI-stelsels nie.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
