import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, MessageCircle, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Book,
    title: "Quran Recitation",
    description: "Listen to beautiful recitations from renowned reciters with Arabic text and English translations.",
    link: "/quran",
  },
  {
    icon: MessageCircle,
    title: "Islamic AI Assistant",
    description: "Ask questions about Islamic teachings, practices, history, and get knowledgeable responses.",
    link: "/chat",
  },
  {
    icon: Heart,
    title: "Support the Mission",
    description: "Your donations help maintain this free service for the entire Muslim community worldwide.",
    link: "/donate",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-arabic text-3xl md:text-5xl text-gold mb-6"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Quran AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-primary-foreground/80 mb-2"
          >
            by Halal Production
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-primary-foreground/70 mb-8 max-w-lg mx-auto"
          >
            Your gateway to Quranic knowledge — listen to beautiful recitations and explore Islamic wisdom with AI-powered guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="gold-gradient text-primary font-semibold px-8 hover:opacity-90 border-0">
              <Link to="/quran">
                <Book className="mr-2 w-5 h-5" />
                Explore the Quran
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold">
              <Link to="/chat">
                <MessageCircle className="mr-2 w-5 h-5" />
                Ask a Question
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background islamic-pattern-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Star className="w-6 h-6 text-gold mx-auto mb-3" />
            <h2 className="text-3xl font-display font-bold text-foreground">What We Offer</h2>
            <p className="text-muted-foreground mt-2">Guided by the Quran, powered by technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Link
                  to={f.link}
                  className="block p-8 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-card-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verse spotlight */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="font-arabic text-2xl md:text-3xl text-gold leading-loose mb-4">
            إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ
          </p>
          <p className="text-primary-foreground/80 italic">
            "Indeed, this Quran guides to that which is most suitable"
          </p>
          <p className="text-primary-foreground/50 text-sm mt-2">— Surah Al-Isra 17:9</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
