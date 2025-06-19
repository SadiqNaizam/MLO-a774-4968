import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Textarea } from '@/components/ui/textarea'; // For displaying article content
import { BookOpen, HelpCircle, Lightbulb, ShieldCheck } from 'lucide-react';

const guides = [
  {
    id: 'understanding-ratings',
    title: "Understanding Game Ratings (ESRB, PEGI)",
    icon: ShieldCheck,
    snippet: "Demystify video game age ratings like ESRB (E, E10+, T, M, AO) and PEGI (3, 7, 12, 16, 18). Learn what content descriptors mean and how to use ratings as a first step in choosing appropriate games.",
    content: "Detailed explanation of ESRB ratings (Everyone, Everyone 10+, Teen, Mature, Adults Only) and PEGI ratings. Covers common content descriptors like Violence, Language, Nudity, Drug Reference, etc. Emphasizes that ratings are a guideline and parental discretion is key. Discusses regional differences and where to find rating information.",
  },
  {
    id: 'positive-impacts',
    title: "The Positive Impacts of Gaming",
    icon: Lightbulb,
    snippet: "Explore the benefits games can offer, from developing problem-solving skills and creativity to fostering social connections and improving reaction times. Not all screen time is equal!",
    content: "Explores cognitive benefits (problem-solving, spatial reasoning, memory), creative benefits (sandbox games, modding), social benefits (cooperative play, online communities), and emotional benefits (stress relief, sense of accomplishment). Provides examples of game genres that excel in these areas.",
  },
  {
    id: 'managing-screen-time',
    title: "Tips for Managing Screen Time Effectively",
    icon: HelpCircle,
    snippet: "Learn practical strategies for setting healthy screen time limits, encouraging breaks, and balancing gaming with other activities. Includes tips for using parental controls.",
    content: "Strategies for setting limits (time-based, activity-based), creating family media plans, importance of physical activity and offline hobbies. How to use built-in parental controls on consoles and PCs. Signs of problematic gaming and when to seek help.",
  },
];

const faqs = [
  { id: 'faq1', question: "Are all 'M' rated games bad for teens?", answer: "'M' (Mature 17+) rated games contain content that may be suitable for persons ages 17 and older. This can include intense violence, blood and gore, sexual content and/or strong language. It's crucial to look at specific content descriptors and reviews, not just the letter rating, and consider your individual child's maturity." },
  { id: 'faq2', question: "How can I find educational games?", answer: "Look for games labeled 'Educational' or with tags like 'Learning'. Many puzzle, simulation, and strategy games also have strong educational components. Read reviews and check descriptions for mentions of skills developed (e.g., math, reading, coding)." },
  { id: 'faq3', question: "What if my child only wants to play popular, violent games?", answer: "Open communication is key. Discuss why they're interested, what they enjoy, and your concerns. Explore alternatives together, try co-playing to understand the game, and set clear boundaries. Sometimes, finding less violent games in the same genre can be a good compromise." },
];

const ImpactGuidePage: React.FC = () => {
  console.log('ImpactGuidePage loaded');
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Impact Guides</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">Game Impact Guides & Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Informed perspectives for parents navigating the world of video games.
          </p>
        </header>

        {/* Articles/Guides Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 flex items-center"><BookOpen className="mr-3 h-8 w-8 text-primary"/> Articles & In-depth Guides</h2>
          <div className="space-y-6">
            {guides.map(guide => {
              const IconComponent = guide.icon;
              return (
                <Card key={guide.id} className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <IconComponent className="h-7 w-7 text-primary" />
                            <CardTitle className="text-xl">{guide.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="mb-4">{guide.snippet}</CardDescription>
                        {/* Displaying content snippet or full content for demonstration */}
                        <Textarea
                            value={guide.content.substring(0, 200) + "..."} // Show a snippet
                            readOnly
                            className="min-h-[80px] bg-muted/20 border-none resize-none text-sm"
                            aria-label={`Content for ${guide.title}`}
                        />
                         <Link to={`/guides/${guide.id}`} className="text-sm text-primary hover:underline mt-2 inline-block">
                            Read Full Guide &rarr;
                        </Link>
                        {/* In a real app, clicking a guide card might navigate to a full page for that guide */}
                    </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* FAQs Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 flex items-center"><HelpCircle className="mr-3 h-8 w-8 text-primary"/> Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(faq => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImpactGuidePage;