import HeroPageLayout from '@/components/ui/hero-page-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SubmitIdeaPage() {
  return (
    <HeroPageLayout
      title="Submit Your Brilliant Idea"
      description="Have an innovative startup idea? Share it with our community and inspire others to build something amazing!"
    >
      <div className="w-full max-w-2xl mx-auto py-12 px-4">
        <form className="space-y-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg">
          <div>
            <Label htmlFor="idea-title" className="text-white text-lg mb-2 block">Idea Title</Label>
            <Input
              id="idea-title"
              type="text"
              placeholder="e.g., AI-powered personal assistant"
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="idea-description" className="text-white text-lg mb-2 block">Detailed Description</Label>
            <Textarea
              id="idea-description"
              placeholder="Describe your idea in detail, including its purpose, target audience, and unique features."
              rows={6}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-white text-lg mb-2 block">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Technology, Health, Education"
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-lg px-8 py-3 rounded-xl bg-purple-600 text-white border border-purple-600 shadow-none hover:bg-purple-700 transition-none"
          >
            Submit Idea
          </Button>
        </form>
      </div>
    </HeroPageLayout>
  );
}