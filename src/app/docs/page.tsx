import HeroPageLayout from '@/components/ui/hero-page-layout';
import ClickableCard from '@/components/docs/clickable-card';
import { BookOpen, Code, Layers, GitBranch, Terminal, Users } from 'lucide-react';

const docsSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Your first steps with our platform: setup, basic usage, and core concepts.",
    link: "#getting-started",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Detailed documentation for our API endpoints, request formats, and responses.",
    link: "#api-reference",
  },
  {
    icon: Layers,
    title: "Integrations",
    description: "Connect with your favorite tools and services using our seamless integrations.",
    link: "#integrations",
  },
  {
    icon: GitBranch,
    title: "Contribution Guide",
    description: "Learn how to contribute to our open-source projects and community.",
    link: "#contribution-guide",
  },
  {
    icon: Terminal,
    title: "CLI Tools",
    description: "Master our command-line interface for efficient workflows and automation.",
    link: "#cli-tools",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our vibrant community, ask questions, and share your experiences with other users.",
    link: "#community",
  },
];

export default function DocsPage() {
  return (
    <HeroPageLayout
      title="Documentation"
      description="Comprehensive guides and references to help you get the most out of our platform."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-12 px-4">
        {docsSections.map((section, idx) => (
          <ClickableCard
            key={idx}
            link={section.link}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-start space-y-4 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <section.icon size={36} className="text-blue-400" />
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <p className="text-neutral-300 text-balance">{section.description}</p>
          </ClickableCard>
        ))}
      </div>
    </HeroPageLayout>
  );
}
