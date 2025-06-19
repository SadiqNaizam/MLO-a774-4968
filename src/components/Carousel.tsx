import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  id: string | number;
  imageUrl?: string;
  altText?: string;
  content?: React.ReactNode; // For more complex slide content
  aspectRatio?: number; // e.g. 16/9 or 4/3
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayDelay?: number;
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayDelay = 4000,
  showArrows = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  ]);

  console.log("Rendering Carousel with", slides.length, "slides.");

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
              <Card className="m-1 border-none shadow-none bg-transparent"> {/* Adjust styling as needed */}
                <CardContent className="p-0"> {/* Adjust padding as needed */}
                  {slide.imageUrl ? (
                    <AspectRatio ratio={slide.aspectRatio || 16 / 9} className="bg-muted">
                      <img
                        src={slide.imageUrl}
                        alt={slide.altText || `Slide ${slide.id}`}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </AspectRatio>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                      {slide.content || <p>Slide {slide.id}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {showArrows && emblaApi && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;