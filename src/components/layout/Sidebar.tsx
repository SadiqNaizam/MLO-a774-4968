import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title = "Filters", children, className = "" }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-72 lg:w-80 space-y-6 p-4 border-r bg-card text-card-foreground ${className}`}>
      {title && (
        <>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <Separator className="my-4" />
        </>
      )}
      {/* Adjust height based on viewport and surrounding elements like header/footer */}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3">
        <div className="space-y-4">
          {children ? children : (
            <p className="text-muted-foreground text-sm">Filter controls will appear here.</p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;