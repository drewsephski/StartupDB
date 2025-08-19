import { Card } from '@/components/ui/card';
import HeroPageLayout from '@/components/ui/hero-page-layout';
import { Lightbulb, Users, BarChart, Settings, Globe } from 'lucide-react';

const categories = [
  {
    icon: Lightbulb,
    title: "Technology & Software",
    description: "Innovations in AI, web development, mobile apps, and more.",
  },
  {
    icon: Users,
    title: "Community & Social",
    description: "Platforms connecting people, fostering collaboration, and building communities.",
  },
  {
    icon: BarChart,
    title: "Business & Finance",
    description: "Solutions for startups, financial tech, e-commerce, and enterprise tools.",
  },
  {
    icon: Settings,
    title: "Productivity & Tools",
    description: "Apps and services designed to enhance efficiency and streamline workflows.",
  },
  {
    icon: Globe,
    title: "Environment & Sustainability",
    description: "Ideas focusing on green tech, renewable energy, and eco-friendly solutions.",
  },
  {
    icon: Lightbulb, // Reusing for example
    title: "Health & Wellness",
    description: "Innovations in fitness, mental health, telemedicine, and personal care.",
  },
];

export default function CategoriesPage() {
  return (
    <HeroPageLayout
      title="Explore Startup Categories"
      description="Browse through a diverse range of categories to find your next big idea or get inspired."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto py-12">
        {categories.map((category, idx) => (
          <Card key={idx} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-start space-y-4 text-white hover:bg-white/10 transition-colors duration-200">
            <category.icon size={36} className="text-purple-400" />
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="text-neutral-300 text-balance">{category.description}</p>
          </Card>
        ))}
      </div>
    </HeroPageLayout>
  );
}
