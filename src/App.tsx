import React from 'react';
import { Brain, Cpu, Notebook as Robot, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
            alt="AI Agtergrond"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">
            Kunsmatige Intelligensie
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ontdek die toekoms van tegnologie en hoe KI ons wêreld transformeer
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
            Leer Meer
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Hoofkenmerke van KI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-blue-500" />}
              title="Masjienleer"
              description="Stelsels wat kan leer en aanpas uit ervaring"
            />
            <FeatureCard
              icon={<Robot className="w-12 h-12 text-blue-500" />}
              title="Robotika"
              description="Intelligente masjiene vir outomatisering"
            />
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-blue-500" />}
              title="Neurale Netwerke"
              description="Gevorderde verwerkingstegnieke"
            />
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-blue-500" />}
              title="Natuurlike Taal"
              description="Begrip en verwerking van menslike taal"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                alt="KI Toepassing"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Wat is Kunsmatige Intelligensie?</h2>
              <p className="text-gray-300 mb-6">
                Kunsmatige intelligensie (KI) is 'n tak van rekenaarwetenskap wat fokus op die ontwikkeling
                van intelligente masjiene wat kan dink en leer soos mense. Dit het die potensiaal om ons
                lewens te verbeter deur gevorderde probleemoplossing en outomatisering.
              </p>
              <p className="text-gray-300">
                Van selfbestuurende motors tot mediese diagnose, KI transformeer elke aspek van ons samelewing
                en skep nuwe moontlikhede vir die toekoms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition-colors">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

export default App;
