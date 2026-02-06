import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          © 2026. Built with <Heart className="inline h-4 w-4 text-destructive fill-destructive" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground transition-colors underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
