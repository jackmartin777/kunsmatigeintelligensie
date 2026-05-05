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
import { useInView } from '../hooks/useInView';

const steps = [
  {
    number: 1,
    icon: Brain,
    title: 'Verstaan wat KI is',
    description:
      'Begin met die basiese beginsels. Wat is kunsmatige intelligensie regtig? Hoe werk dit? Wat kan dit doen — en wat nie?',
    link: '/artikels/wat-is-kunsmatige-intelligensie',
    linkText: 'Lees: Wat is KI?',
    color: 'from-primary-500 to-blue-500',
    iconBg: 'bg-primary-100 dark:bg-primary-900/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    number: 2,
    icon: BookOpen,
    title: 'Leer die woordeskat',
    description:
      'KI het sy eie taal — prompts, tokens, hallusinasies. Ons woordeboek verduidelik elke term in eenvoudige Afrikaans.',
    link: '/woordeboek',
    linkText: 'Verken die woordeboek',
    color: 'from-purple-500 to-violet-500',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    number: 3,
    icon: MessageSquare,
    title: 'Leer hoe om met KI te praat',
    description:
      'Die manier waarop jy jou vraag stel, bepaal die antwoord wat jy kry. Leer hoe om goeie prompts te skryf.',
    link: '/woordeboek/prompt',
    linkText: 'Leer oor prompts',
    color: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    number: 4,
    icon: Shield,
    title: 'Gebruik KI veilig',
    description:
      'KI is kragtig, maar nie sonder risiko nie. Leer hoe om jou privaatheid te beskerm en foute te vermy.',
    link: '/artikels/hoe-om-chatgpt-veilig-te-gebruik',
    linkText: 'Lees die veiligheidsgids',
    color: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    number: 5,
    icon: Compass,
    title: 'Verken dieper',
    description:
      'Nou dat jy die basiese ken, kan jy dieper delf. Verken spesifieke onderwerpe wat jou interesseer.',
    link: '/artikels',
    linkText: 'Sien alle artikels',
    color: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
];

const tips = [
  { text: 'Wees geduldig', detail: 'KI is \'n nuwe veld met baie konsepte. Neem jou tyd om dit te verstaan.' },
  { text: 'Eksperimenteer', detail: 'Die beste manier om te leer is om self te probeer. Gebruik gratis gereedskap soos ChatGPT.' },
  { text: 'Bly skepties', detail: 'Moenie alles glo wat KI sê nie. Verifieer belangrike inligting.' },
  { text: 'Beskerm jouself', detail: 'Deel nooit persoonlike of sensitiewe inligting met KI-stelsels nie.' },
];

export function BeginHierPage() {
  const [tipsRef, tipsVisible] = useInView<HTMLDivElement>({ threshold: 0.2 });

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
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            Begin hier
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            Nuut tot kunsmatige intelligensie? Hierdie gids neem jou stap vir stap deur
            die basiese beginsels. Geen voorkennis nodig nie.
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group gradient-border bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6 sm:p-8 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute left-12 top-full w-0.5 h-6 bg-gradient-to-b from-surface-300 dark:from-surface-600 to-transparent" />
              )}

              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-start gap-6">
                {/* Step number circle */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center font-bold text-lg ${step.iconColor} group-hover:scale-110 transition-transform`}>
                  {step.number}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                    <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-surface-600 dark:text-surface-400 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <Link
                    to={step.link}
                    className={`inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg bg-gradient-to-r ${step.color} text-white hover:opacity-90 transition-opacity`}
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
        <section
          ref={tipsRef}
          className={`mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-primary-50 dark:from-purple-950/30 dark:to-primary-950/30 border border-purple-100 dark:border-purple-900 transition-all duration-700 ${tipsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">
            Vinnige wenke vir beginners
          </h2>

          <ul className="space-y-4">
            {tips.map((tip) => (
              <li key={tip.text} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-surface-700 dark:text-surface-300">
                  <strong className="text-surface-900 dark:text-white">{tip.text}</strong>
                  {' — '}
                  {tip.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
