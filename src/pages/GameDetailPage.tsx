import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Carousel, { CarouselSlide } from '@/components/Carousel';
import ImpactBreakdownDisplay, { ImpactCategory } from '@/components/ImpactBreakdownDisplay';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { AlertCircle, CheckCircle, Info, BookOpen, Users, ShieldQuestion } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample game data - in a real app, this would come from an API
const sampleGameData: { [key: string]: any } = {
  'chronicles-of-valor': {
    id: 'chronicles-of-valor',
    title: 'Chronicles of Valor',
    ageRating: 'M',
    description: "Chronicles of Valor is an epic open-world RPG set in the war-torn land of Eldoria. Players embark on a perilous journey to uncover ancient secrets and forge their destiny. The game features a rich narrative, complex characters, and challenging moral choices. Be warned, it explores mature themes including significant character death, grief, and the consequences of violence. Player choices can lead to vastly different outcomes, impacting the world and its inhabitants.",
    screenshots: [
      { id: 'ss1', imageUrl: 'https://images.unsplash.com/photo-1593305842310-9beeef589989?q=80&w=1280&h=720&auto=format&fit=crop', altText: 'Gameplay Screenshot 1' },
      { id: 'ss2', imageUrl: 'https://images.unsplash.com/photo-1519669556878-63bd5502a65b?q=80&w=1280&h=720&auto=format&fit=crop', altText: 'Gameplay Screenshot 2' },
      { id: 'ss3', imageUrl: 'https://images.unsplash.com/photo-1580327354310-c779520867f0?q=80&w=1280&h=720&auto=format&fit=crop', altText: 'Gameplay Screenshot 3' },
    ],
    impactData: [
      {
        id: 'content_warnings',
        categoryTitle: 'Key Content Warnings',
        items: [
          { id: 'violence', title: 'Intense Violence', description: 'Depictions of graphic combat, blood, and gore.', level: 'high_concern', icon: AlertCircle },
          { id: 'death_themes', title: 'Themes of Death & Loss', description: 'Game centrally features character death, grief, and moral dilemmas related to loss. Not suitable for all players.', level: 'high_concern', icon: AlertCircle, details: ["Multiple main character deaths.", "Exploration of bereavement processes."]},
          { id: 'language', title: 'Strong Language', description: 'Frequent use of strong profanity.', level: 'concern', icon: AlertCircle },
        ],
      },
      {
        id: 'positive_aspects',
        categoryTitle: 'Positive Aspects',
        items: [
          { id: 'storytelling', title: 'Rich Storytelling', description: 'Complex narrative with deep character development.', level: 'positive', icon: BookOpen },
          { id: 'problem_solving', title: 'Strategic Thinking', description: 'Requires players to solve complex puzzles and make strategic decisions.', level: 'positive', icon: CheckCircle },
        ],
      },
      {
        id: 'parental_guidance',
        categoryTitle: 'Parental Guidance & Discussion',
        items: [
          {id: 'discussion_death', title: 'Discussing Death Themes', description: 'This game provides an opportunity to discuss difficult topics like loss and morality if the child is mature enough. Consider co-playing or discussing scenes afterwards.', level: 'informational', icon: ShieldQuestion }
        ]
      }
    ] as ImpactCategory[],
    systemRequirements: "Minimum: OS: Windows 10, Processor: Intel Core i5, Memory: 8 GB RAM, Graphics: NVIDIA GeForce GTX 970, Storage: 50 GB available space.",
    userReviewsSummary: "Mixed. Praised for story, criticized for difficulty and dark themes. (7/10)"
  },
  // Add more sample games as needed
  'math-blasters': {
    id: 'math-blasters',
    title: 'Math Blasters Adventure',
    ageRating: 'E',
    description: "Join the Math Blasters on an exciting adventure across the galaxy! Solve math puzzles to power your spaceship, defeat alien Zurgs, and rescue friendly creatures. This game makes learning arithmetic, fractions, and basic algebra fun and engaging for young learners.",
    screenshots: [
      { id: 'ss_math1', imageUrl: 'https://images.unsplash.com/photo-1509869175624-9457b0bc1726?q=80&w=1280&h=720&auto=format&fit=crop', altText: 'Math Blasters Gameplay 1' },
      { id: 'ss_math2', imageUrl: 'https://images.unsplash.com/photo-1639755903909-52baca535590?q=80&w=1280&h=720&auto=format&fit=crop', altText: 'Math Blasters Gameplay 2' },
    ],
    impactData: [
      {
        id: 'educational_value',
        categoryTitle: 'Educational Value',
        items: [
          { id: 'arithmetic', title: 'Arithmetic Skills', description: 'Reinforces addition, subtraction, multiplication, and division.', level: 'positive', icon: CheckCircle },
          { id: 'problem_solving', title: 'Logical Thinking', description: 'Puzzles encourage problem-solving and critical thought.', level: 'positive', icon: CheckCircle },
        ],
      },
       {
        id: 'positive_aspects',
        categoryTitle: 'Other Positive Aspects',
        items: [
          { id: 'engagement', title: 'Engaging Gameplay', description: 'Fun characters and story keep children motivated.', level: 'positive', icon: Info },
        ],
      }
    ] as ImpactCategory[],
    systemRequirements: "Minimum: OS: Windows/Mac/Linux, Processor: 1GHz, Memory: 1 GB RAM, Graphics: Any, Storage: 500 MB available space.",
    userReviewsSummary: "Overwhelmingly Positive. Parents and kids love it! (9/10)"
  }
};


const GameDetailPage: React.FC = () => {
  console.log('GameDetailPage loaded');
  const { gameId } = useParams<{ gameId: string }>();
  
  // In a real app, fetch game data by gameId
  const game = gameId ? sampleGameData[gameId] : null;

  if (!game) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground">Sorry, we couldn't find details for this game.</p>
          <Button asChild className="mt-6">
            <Link to="/search">Back to Search</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const carouselSlides: CarouselSlide[] = game.screenshots.map((ss: any) => ({
    id: ss.id,
    imageUrl: ss.imageUrl,
    altText: ss.altText,
    aspectRatio: 16/9,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/search">Games</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{game.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-4xl font-bold text-primary">{game.title}</h1>
            <Badge variant={game.ageRating === 'M' || game.ageRating === 'AO' ? 'destructive' : 'secondary'} className="text-2xl px-4 py-2 whitespace-nowrap">
              {game.ageRating}
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardContent className="p-0">
                     <Carousel slides={carouselSlides} showArrows={true} />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle>Game Description</CardTitle></CardHeader>
                <CardContent>
                    <Textarea
                        value={game.description}
                        readOnly
                        className="min-h-[150px] text-base bg-muted/20 border-none resize-none"
                        aria-label="Game description"
                    />
                </CardContent>
            </Card>
            
            <ImpactBreakdownDisplay impactData={game.impactData} />
          </div>

          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
             <Card>
                <CardHeader><CardTitle>Details & More</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible defaultValue="parental-guidance" className="w-full">
                      <AccordionItem value="parental-guidance">
                        <AccordionTrigger className="text-base"><ShieldQuestion className="mr-2 h-5 w-5 text-blue-500" />Parental Guidance</AccordionTrigger>
                        <AccordionContent>
                          { (game.impactData.find((cat: ImpactCategory) => cat.id === 'parental_guidance')?.items.length ?? 0) > 0 ?
                             game.impactData.find((cat: ImpactCategory) => cat.id === 'parental_guidance')?.items.map((item: any) => (
                                <p key={item.id} className="text-sm text-muted-foreground mb-2">{item.description}</p>
                             )) : 
                             <p className="text-sm text-muted-foreground">General advice: Always review game content and discuss with your child.</p>
                          }
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="system-requirements">
                        <AccordionTrigger className="text-base">System Requirements</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{game.systemRequirements}</p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="user-reviews">
                        <AccordionTrigger className="text-base"><Users className="mr-2 h-5 w-5 text-yellow-500" />User Reviews Summary</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{game.userReviewsSummary}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                </CardContent>
             </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetailPage;