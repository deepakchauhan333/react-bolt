'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink, Star } from 'lucide-react';
import { SAMPLE_TOOL } from '@/lib/constants';
import { cn, truncate } from '@/lib/utils';

interface ToolCardProps {
  tool: any;
  featured?: boolean;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = tool.image_url || SAMPLE_TOOL.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={cn("overflow-hidden h-full transition-all duration-300", featured && "border-primary/20", isHovered && "shadow-lg")}>
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Image src={imageUrl} alt={tool.name} width={500} height={300} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2">{tool.name}</h3>

          {tool.rating && (
            <div className="flex items-center mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={cn(
                    "mr-0.5",
                    i < Math.floor(tool.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                  )}
                />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">{tool.rating}</span>
            </div>
          )}

          <p className="text-muted-foreground mb-4">{truncate(tool.description, 100)}</p>

          <Button asChild variant="default" className="w-full">
            <Link href={`/tools/${tool.id}`}>View Details</Link>
          </Button>
        </CardContent>

        <CardFooter className="px-5 pb-5 pt-0 flex justify-between gap-3">
          <Button asChild variant="outline" size="icon" className="shrink-0">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
