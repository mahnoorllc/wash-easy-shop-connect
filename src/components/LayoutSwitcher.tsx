import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Layout, Grid, List, Menu } from 'lucide-react';

type LayoutType = 'default' | 'grid' | 'list';

interface LayoutSwitcherProps {
  currentLayout?: LayoutType;
  onLayoutChange?: (layout: LayoutType) => void;
  className?: string;
}

export const LayoutSwitcher = ({ 
  currentLayout = 'default', 
  onLayoutChange,
  className = ''
}: LayoutSwitcherProps) => {
  const [layout, setLayout] = useState<LayoutType>(currentLayout);

  // Load saved layout preference
  useEffect(() => {
    const savedLayout = localStorage.getItem('preferred-layout') as LayoutType;
    if (savedLayout && ['default', 'grid', 'list'].includes(savedLayout)) {
      setLayout(savedLayout);
      onLayoutChange?.(savedLayout);
    }
  }, [onLayoutChange]);

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
    localStorage.setItem('preferred-layout', newLayout);
    onLayoutChange?.(newLayout);
    
    // Apply layout changes to document
    document.documentElement.setAttribute('data-layout', newLayout);
  };

  const layouts = [
    { 
      type: 'default' as LayoutType, 
      icon: Layout, 
      label: 'Default Layout',
      description: 'Standard navigation with dropdown menus'
    },
    { 
      type: 'grid' as LayoutType, 
      icon: Grid, 
      label: 'Grid Layout',
      description: 'Compact grid-style navigation'
    },
    { 
      type: 'list' as LayoutType, 
      icon: List, 
      label: 'List Layout',
      description: 'Simple list-style navigation'
    }
  ];

  const currentLayoutConfig = layouts.find(l => l.type === layout);
  const CurrentIcon = currentLayoutConfig?.icon || Layout;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
        >
          <CurrentIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Layout</span>
          <Menu className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {layouts.map(({ type, icon: Icon, label, description }) => (
          <DropdownMenuItem
            key={type}
            onClick={() => handleLayoutChange(type)}
            className={`flex items-start gap-3 p-3 cursor-pointer ${
              layout === type ? 'bg-blue-50 text-blue-700' : ''
            }`}
          >
            <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
            </div>
            {layout === type && (
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};