import { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const DonationPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after 30 seconds initially
    const initialTimer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!show) {
      // Show again every 3 minutes after dismissal
      const repeatTimer = setTimeout(() => setShow(true), 180000);
      return () => clearTimeout(repeatTimer);
    }
  }, [show]);

  const handleDonate = () => {
    window.open("https://www.paypal.com/donate?business=husseinfatu111@gmail.com", "_blank");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <Heart className="w-8 h-8 text-gold mb-3" />
            <h3 className="font-display font-bold text-card-foreground text-lg mb-2">
              Support Quran AI 🤲
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your donation helps keep this free service running for the Ummah. Every contribution counts!
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleDonate}
                className="flex-1 gold-gradient text-primary border-0 font-semibold"
              >
                Donate Now 💚
              </Button>
              <Button
                variant="outline"
                onClick={() => setShow(false)}
                className="text-muted-foreground"
              >
                Later
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationPopup;
