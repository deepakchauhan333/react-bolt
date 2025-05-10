import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { HERO_TITLE, HERO_SUBTITLE } from '@/lib/constants'

export function Hero() {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 blur-3xl opacity-60 dark:opacity-30" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-secondary/20 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm",
              "border border-border bg-background/50 backdrop-blur-sm",
              "text-muted-foreground mb-5 animate-fade-in"
            )}
          >
            <Sparkles className="h-3.5 w-3.5 mr-2 text-primary" />
            <span>Discover the future of AI tools</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 animate-fade-in">
            {HERO_TITLE}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            {HERO_SUBTITLE}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/tools">
                Explore Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base">
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background">
        <svg
          className="absolute bottom-0 w-full h-16 text-background fill-current"
          viewBox="0 0 1440 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 22L40 27.8C80 33.7 160 45.3 240 49.5C320 53.7 400 50.3 480 45.2C560 40 640 33 720 25.2C800 17.3 880 8.7 960 8.8C1040 9 1120 18 1200 20C1280 22 1360 17 1400 14.5L1440 12V54H1400C1360 54 1280 54 1200 54C1120 54 1040 54 960 54C880 54 800 54 720 54C640 54 560 54 480 54C400 54 320 54 240 54C160 54 80 54 40 54H0V22Z" />
        </svg>
      </div>
    </div>
  )
}