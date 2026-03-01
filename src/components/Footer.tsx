import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-10 islamic-pattern-bg">
    <div className="container mx-auto px-4 text-center space-y-4">
      <p className="font-arabic text-2xl text-gold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      <p className="text-sm text-primary-foreground/70">
        Quran AI by Halal Production — Serving the Ummah with knowledge and guidance
      </p>
      <p className="text-xs text-primary-foreground/50 flex items-center justify-center gap-1">
        Made with <Heart className="w-3 h-3 text-gold" /> for the Muslim community
      </p>
      <p className="text-xs text-primary-foreground/40 max-w-lg mx-auto">
        Disclaimer: AI responses should be verified with qualified Islamic scholars. This tool is meant to assist, not replace scholarly guidance.
      </p>
    </div>
  </footer>
);

export default Footer;
