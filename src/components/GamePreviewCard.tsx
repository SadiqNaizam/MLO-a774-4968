import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Eye } from 'lucide-react'; // Example icon

interface GamePreviewCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  ageRating: string; // e.g., "E", "T", "M", "AO" or "PEGI 3", "PEGI 12"
  shortDescription?: string;
  detailPagePath: string; // e.g., `/games/${id}`
  genre?: string;
}

const GamePreviewCard: React.FC<GamePreviewCardProps> = ({
  id,
  title,
  imageUrl,
  ageRating,
  shortDescription,
  detailPagePath,
  genre
}) => {
  console.log("Rendering GamePreviewCard:", title);

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg">
      <Link to={detailPagePath} className="block">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={`Cover art for ${title}`}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap ml-2 shrink-0">{ageRating}</Badge>
          </div>
          {genre && <p className="text-xs text-muted-foreground">{genre}</p>}
          {shortDescription && (
            <CardDescription className="text-sm line-clamp-3">{shortDescription}</CardDescription>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link to={detailPagePath}>
            <Eye className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GamePreviewCard;