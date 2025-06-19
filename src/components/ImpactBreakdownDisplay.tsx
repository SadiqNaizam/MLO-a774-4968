import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info, ShieldQuestion, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

// Define types for impact data
type ImpactLevel = 'positive' | 'neutral' | 'concern' | 'high_concern' | 'informational';

interface ImpactItem {
  id: string;
  title: string;
  description: string;
  level: ImpactLevel;
  icon?: React.ElementType; // Lucide icon component
  details?: string[]; // Optional list of specific points
}

export interface ImpactCategory {
  id: string;
  categoryTitle: string;
  items: ImpactItem[];
}

interface ImpactBreakdownDisplayProps {
  impactData: ImpactCategory[];
}

const levelStyles: Record<ImpactLevel, { badgeVariant: "default" | "secondary" | "destructive" | "outline" | null | undefined, iconColor: string, IconComponent: React.ElementType }> = {
  positive: { badgeVariant: 'default', iconColor: 'text-green-600', IconComponent: ThumbsUp },
  neutral: { badgeVariant: 'secondary', iconColor: 'text-gray-600', IconComponent: Info },
  informational: { badgeVariant: 'outline', iconColor: 'text-blue-600', IconComponent: ShieldQuestion },
  concern: { badgeVariant: 'destructive', iconColor: 'text-yellow-600', IconComponent: AlertCircle },
  high_concern: { badgeVariant: 'destructive', iconColor: 'text-red-600', IconComponent: ThumbsDown },
};

const ImpactBreakdownDisplay: React.FC<ImpactBreakdownDisplayProps> = ({ impactData }) => {
  console.log("Rendering ImpactBreakdownDisplay with", impactData.length, "categories.");

  if (!impactData || impactData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No impact information available for this game.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {impactData.map((category) => (
        <Card key={category.id} className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">{category.categoryTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.length > 0 ? category.items.map((item) => {
              const { badgeVariant, iconColor, IconComponent: DefaultIcon } = levelStyles[item.level] || levelStyles.neutral;
              const Icon = item.icon || DefaultIcon;
              return (
                <div key={item.id} className="p-3 border rounded-lg bg-background hover:bg-accent/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", iconColor)} aria-hidden="true" />
                    <div>
                      <h4 className="font-semibold text-base">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      {item.details && item.details.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                          {item.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                        </ul>
                      )}
                    </div>
                    <Badge variant={badgeVariant || 'secondary'} className="ml-auto shrink-0 capitalize text-xs">
                        {item.level.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-muted-foreground">No specific items in this category.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Example of how you might structure data for this component:
// export const exampleGameImpactData: ImpactCategory[] = [
//   {
//     id: 'concerns',
//     categoryTitle: 'Potential Concerns',
//     items: [
//       { id: 'violence', title: 'Violence', description: 'Depictions of combat and aggressive actions.', level: 'concern', icon: AlertCircle, details: ["Mild cartoon violence", "Fantasy combat"] },
//       { id: 'language', title: 'Language', description: 'Use of strong or suggestive language.', level: 'concern', icon: AlertCircle },
//       { id: 'death_themes', title: 'Themes of Death', description: 'Game explores or depicts death and loss.', level: 'high_concern', details: ["Character death is a central plot point."] },
//     ],
//   },
//   {
//     id: 'positives',
//     categoryTitle: 'Positive Aspects',
//     items: [
//       { id: 'problem_solving', title: 'Problem Solving', description: 'Encourages critical thinking and puzzle solving.', level: 'positive', icon: Sparkles },
//       { id: 'creativity', title: 'Creativity', description: 'Offers tools for creative expression.', level: 'positive', icon: Sparkles },
//     ],
//   },
//   {
//     id: 'parental_guidance',
//     categoryTitle: 'Parental Guidance',
//     items: [
//       { id: 'discussion_points', title: 'Discussion Points', description: 'Consider discussing themes of X and Y with your child.', level: 'informational', icon: ShieldQuestion }
//     ]
//   }
// ];

export default ImpactBreakdownDisplay;