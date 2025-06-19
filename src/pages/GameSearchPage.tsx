import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import GamePreviewCard from '@/components/GamePreviewCard';
import FilterableContentTag from '@/components/FilterableContentTag';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';

const allGames = [
  { id: 'game1', title: 'Math Blasters Adventure', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop', ageRating: 'E', shortDescription: 'Learn math while exploring exciting worlds!', detailPagePath: '/games/math-blasters', genre: 'Educational', tags: ['learning', 'math'] },
  { id: 'game2', title: 'Eco Warriors', imageUrl: 'https://images.unsplash.com/photo-1612287230202-956de3e90dea?q=80&w=400&auto=format&fit=crop', ageRating: 'E10+', shortDescription: 'Solve environmental puzzles and save the planet.', detailPagePath: '/games/eco-warriors', genre: 'Puzzle', tags: ['environment', 'problem-solving'] },
  { id: 'game3', title: 'Cosmic Coders', imageUrl: 'https://images.unsplash.com/photo-1542773998-9325f0a098d7?q=80&w=400&auto=format&fit=crop', ageRating: 'T', shortDescription: 'Code your way through space missions.', detailPagePath: '/games/cosmic-coders', genre: 'Educational', tags: ['coding', 'sci-fi', 'learning'] },
  { id: 'game4', title: 'Kingdoms & Chronicles', imageUrl: 'https://images.unsplash.com/photo-1593305842310-9beeef589989?q=80&w=400&auto=format&fit=crop', ageRating: 'M', shortDescription: 'Epic RPG with mature themes and complex storyline.', detailPagePath: '/games/kingdoms-chronicles', genre: 'RPG', tags: ['mature', 'story-rich', 'violence'] },
  { id: 'game5', title: 'Art Studio Deluxe', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131c5a1?q=80&w=400&auto=format&fit=crop', ageRating: 'E', shortDescription: 'Unleash your creativity with digital art tools.', detailPagePath: '/games/art-studio', genre: 'Creative', tags: ['art', 'creativity'] },
  { id: 'game6', title: 'Strategy Masters', imageUrl: 'https://images.unsplash.com/photo-1600097246039-209135769756?q=80&w=400&auto=format&fit=crop', ageRating: 'T', shortDescription: 'Lead your armies to victory in this RTS.', detailPagePath: '/games/strategy-masters', genre: 'Strategy', tags: ['rts', 'tactical'] },
];

const ITEMS_PER_PAGE = 9;

const GameSearchPage: React.FC = () => {
  console.log('GameSearchPage loaded');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [ageRating, setAgeRating] = useState<string>(searchParams.get('rating') || 'all');
  const [genres, setGenres] = useState<string[]>(searchParams.getAll('genre') || []);
  const [impactTags, setImpactTags] = useState<string[]>(searchParams.getAll('tags') || []);
  const [playerCount, setPlayerCount] = useState<number[]>([1]); // Assuming single player focus for slider

  const [currentPage, setCurrentPage] = React.useState(1);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (ageRating !== 'all') params.set('rating', ageRating);
    genres.forEach(g => params.append('genre', g));
    impactTags.forEach(t => params.append('tag', t));
    // Add other filters to params if needed
    setSearchParams(params);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const toggleGenre = (genre: string) => {
    setGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };
  
  const toggleImpactTag = (tag: string) => {
    setImpactTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filteredGames = allGames.filter(game => {
    const matchesSearch = searchTerm ? game.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesAge = ageRating === 'all' ? true : game.ageRating === ageRating;
    const matchesGenre = genres.length === 0 ? true : genres.some(g => game.genre?.toLowerCase() === g.toLowerCase());
    const matchesTags = impactTags.length === 0 ? true : impactTags.every(t => game.tags?.includes(t));
    return matchesSearch && matchesAge && matchesGenre && matchesTags;
  });

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <Sidebar title="Filter Games" className="md:sticky md:top-20 md:self-start">
            <Accordion type="multiple" defaultValue={['age', 'genre']} className="w-full">
              <AccordionItem value="age">
                <AccordionTrigger>Age Rating</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={ageRating} onValueChange={setAgeRating}>
                    {['all', 'E', 'E10+', 'T', 'M'].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating} id={`age-${rating}`} />
                        <Label htmlFor={`age-${rating}`}>{rating === 'all' ? 'All Ages' : rating}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="genre">
                <AccordionTrigger>Genre</AccordionTrigger>
                <AccordionContent>
                  {['Educational', 'Puzzle', 'RPG', 'Strategy', 'Creative', 'Action'].map(genre => (
                    <div key={genre} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={genres.includes(genre)}
                        onCheckedChange={() => toggleGenre(genre)}
                      />
                      <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="impact-tags">
                <AccordionTrigger>Impact Tags</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {['learning', 'problem-solving', 'creativity', 'cooperative', 'violence', 'mature themes'].map(tag => (
                         <FilterableContentTag
                            key={tag}
                            label={tag}
                            isActive={impactTags.includes(tag)}
                            onClick={() => toggleImpactTag(tag)}
                            onClear={() => setImpactTags(prev => prev.filter(t => t !== tag))}
                            className="capitalize"
                        />
                    ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="player-count">
                <AccordionTrigger>Player Count</AccordionTrigger>
                <AccordionContent>
                  <Label htmlFor="player-slider" className="block mb-2 text-sm">Min Players: {playerCount[0]}</Label>
                  <Slider
                    id="player-slider"
                    min={1} max={4} step={1}
                    defaultValue={playerCount}
                    onValueChange={setPlayerCount}
                    className="my-4"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button onClick={handleApplyFilters} className="w-full mt-6">
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </Sidebar>

          {/* Main Content Area for Game Results */}
          <main className="flex-1">
            <div className="mb-6 flex gap-2">
              <Input
                type="search"
                placeholder="Refine search by game title..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow"
                aria-label="Refine search"
              />
              <Button onClick={handleApplyFilters}><Search className="h-5 w-5" /></Button>
            </div>
            
            {filteredGames.length > 0 && (
                 <p className="text-sm text-muted-foreground mb-4">Showing {filteredGames.length} game(s)</p>
            )}

            {paginatedGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedGames.map(game => (
                  <GamePreviewCard key={game.id} {...game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold">No Games Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                     const page = i + 1;
                     // Basic pagination display logic, could be more complex for many pages
                     if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                isActive={currentPage === page}
                                >
                                {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                     } else if (Math.abs(page - currentPage) === 2) {
                        return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>;
                     }
                     return null;
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameSearchPage;