import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { Sparkles, Mail, Github, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full py-6 md:py-0 border-t">
      <div className="container flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 py-6">
        <div className="flex flex-col space-y-2 md:w-1/3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">{APP_NAME}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The comprehensive directory for discovering the best AI tools to enhance your productivity and creativity.
          </p>
        </div>
        
        <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Directory</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-muted-foreground hover:text-foreground transition-colors">
                  Featured
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div className="container border-t py-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <p className="text-xs text-muted-foreground order-2 md:order-1">
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </p>
        
        <div className="flex items-center space-x-4 order-1 md:order-2">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  )
}