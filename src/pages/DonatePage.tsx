import { motion } from "framer-motion";
import { Heart, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const DonatePage = () => {
  const handleDonate = (amount?: number) => {
    // PayPal donation link placeholder — replace with actual PayPal.me link or button ID
    const paypalUrl = amount
      ? `https://www.paypal.com/donate?amount=${amount}&currency_code=USD`
      : "https://www.paypal.com/donate";
    window.open(paypalUrl, "_blank");
  };

  return (
    <div className="min-h-screen pt-20 bg-background islamic-pattern-bg">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Heart className="w-10 h-10 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Support Quran AI</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your donations help us maintain and improve this free service for the entire Muslim community worldwide. Every contribution matters.
          </p>
        </motion.div>

        {/* Donation amounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display text-xl font-semibold text-card-foreground mb-6 text-center">
            One-Time Donation
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[5, 10, 25, 50].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleDonate(amount)}
                className="h-14 text-lg font-semibold border-gold/30 hover:border-gold hover:bg-secondary text-foreground"
              >
                ${amount}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => handleDonate()}
            className="w-full gold-gradient text-primary font-semibold h-12 text-base border-0 hover:opacity-90"
          >
            Donate via PayPal
          </Button>
        </motion.div>

        {/* Trust signals */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "Secure", desc: "All transactions processed securely through PayPal" },
            { icon: Heart, title: "No Ads", desc: "We maintain purity of purpose with no advertisements" },
            { icon: Star, title: "Transparent", desc: "100% of donations go to service maintenance & improvement" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center p-4"
            >
              <item.icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="font-semibold text-sm text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 font-arabic text-lg">
          جزاكم الله خيرا
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          May Allah reward you with goodness
        </p>
      </div>
    </div>
  );
};

export default DonatePage;
