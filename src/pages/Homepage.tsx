import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Carousel, { CarouselSlide } from '@/components/Carousel';
import GamePreviewCard from '@/components/GamePreviewCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';

const featuredSlides: CarouselSlide[] = [
  { id: 'slide1', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726c?q=80&w=1920&auto=format&fit=crop', altText: 'Featured Game Guide: Understanding Game Ratings', content: <div className="p-6 bg-black/50 rounded-lg"><h3 className="text-2xl font-bold text-white">Understand Game Ratings</h3><p className="text-gray-200">Navigate ESRB, PEGI and more.</p><Button asChild className="mt-2"><a>Learn More &rarr;</a></Button></div>, aspectRatio: 16/9 },
  { id: 'slide2', imageUrl: 'https://images.unsplash.com/photo-1580236800795-1d79a0901e0e?q=80&w=1920&auto=format&fit=crop', altText: 'Discover Educational Games', content: <div className="p-6 bg-black/50 rounded-lg"><h3 className="text-2xl font-bold text-white">Discover Educational Games</h3><p className="text-gray-200">Games that make learning fun.</p><Button asChild className="mt-2"><a>Explore Now &rarr;</a></Button></div>, aspectRatio: 16/9 },
  { id: 'slide3', imageUrl: 'https://images.unsplash.com/photo-1607853554425-3cfdfe475169?q=80&w=1920&auto=format&fit=crop', altText: 'Tips for Healthy Gaming Habits', content: <div className="p-6 bg-black/50 rounded-lg"><h3 className="text-2xl font-bold text-white">Healthy Gaming Habits</h3><p className="text-gray-200">Tips for parents and kids.</p><Button asChild className="mt-2"><a>Read Tips &rarr;</a></Button></div>, aspectRatio: 16/9 },
];

const sampleGames = [
  { id: 'game1', title: 'Math Blasters Adventure', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop', ageRating: 'E', shortDescription: 'Learn math while exploring exciting worlds!', detailPagePath: '/games/math-blasters', genre: 'Educational' },
  { id: 'game2', title: 'Eco Warriors', imageUrl: 'https://images.unsplash.com/photo-1612287230202-956de3e90dea?q=80&w=800&auto=format&fit=crop', ageRating: 'E10+', shortDescription: 'Solve environmental puzzles and save the planet.', detailPagePath: '/games/eco-warriors', genre: 'Puzzle / Simulation' },
  { id: 'game3', title: 'Cosmic Coders', imageUrl: 'https://images.unsplash.com/photo-1542773998-9325f0a098d7?q=80&w=800&auto=format&fit=crop', ageRating: 'T', shortDescription: 'Code your way through space missions.', detailPagePath: '/games/cosmic-coders', genre: 'Educational / Sci-Fi' },
];

const guideSnippets = [
    { id: 'guide1', title: "Understanding Game Ratings", description: "A clear guide to ESRB, PEGI, and other rating systems so you can make informed choices.", link: "/guides/understanding-ratings" },
    { id: 'guide2', title: "Positive Impacts of Gaming", description: "Discover how video games can foster creativity, problem-solving, and social skills.", link: "/guides/positive-impacts" },
    { id: 'guide3', title: "Talking to Kids About Games", description: "Tips for discussing game content, screen time, and online safety with your children.", link: "/guides/talking-to-kids" },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero Section with Search */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">GameImpact: Play Smarter, Not Harder</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your trusted guide to understanding children's video games. Find insights on age ratings, content, and positive impacts.
            </p>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
              <Input
                type="search"
                placeholder="Search for a game title..."
                className="flex-grow text-lg p-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search for games"
              />
              <Button type="submit" size="lg" className="p-4">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </form>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="outline" asChild><Link to="/search?category=educational">Educational Games</Link></Button>
                <Button variant="outline" asChild><Link to="/search?rating=e">E for Everyone</Link></Button>
                <Button variant="outline" asChild><Link to="/guides">View All Guides</Link></Button>
            </div>
          </div>
        </section>

        {/* Featured Games/Guides Carousel */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Insights & Games</h2>
            <Carousel slides={featuredSlides} options={{ loop: true }} autoplayDelay={5000} />
          </div>
        </section>

        {/* Curated Game Lists */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">New & Noteworthy Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleGames.map(game => (
                <GamePreviewCard key={game.id} {...game} />
              ))}
            </div>
            <div className="text-center mt-10">
                <Button size="lg" asChild>
                    <Link to="/search">Explore All Games <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Links to ImpactGuidePage */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Helpful Guides for Parents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guideSnippets.map(guide => (
                <Card key={guide.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{guide.description}</CardDescription>
                  </CardContent>
                  <CardContent className="pt-0">
                     <Button variant="link" asChild className="p-0 h-auto">
                        <Link to={guide.link}>Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                     </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;