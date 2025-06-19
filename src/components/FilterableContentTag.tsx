import React from 'react';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react'; // For a clear/remove icon if active
import { cn } from "@/lib/utils";

interface FilterableContentTagProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  onClear?: () => void; // Optional: if an active tag can be cleared directly
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const FilterableContentTag: React.FC<FilterableContentTagProps> = ({
  label,
  isActive,
  onClick,
  onClear,
  className,
  variant = "secondary",
}) => {
  console.log("Rendering FilterableContentTag:", label, "isActive:", isActive);

  const handleClear = (e: React.MouseEvent) => {
    if (onClear) {
      e.stopPropagation(); // Prevent onClick if clear is handled
      onClear();
    }
  };

  return (
    <Badge
      variant={isActive ? "default" : variant}
      className={cn(
        "cursor-pointer transition-all text-sm py-1 px-3",
        isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={onClick}
      role="checkbox"
      aria-checked={isActive}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {label}
      {isActive && onClear && (
        <button
          onClick={handleClear}
          className="ml-1.5 -mr-0.5 p-0.5 rounded-full hover:bg-primary-foreground/20"
          aria-label={`Clear filter for ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default FilterableContentTag;