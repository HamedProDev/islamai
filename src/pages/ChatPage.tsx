import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What are the 5 pillars of Islam?",
  "How do I perform Wudu?",
  "Tell me about Prophet Muhammad ﷺ",
  "What does the Quran say about patience?",
];

// Simple pre-programmed responses for common questions
const KNOWLEDGE: Record<string, string> = {
  "pillars": "The 5 Pillars of Islam are:\n\n1. Shahada 🕌 — Declaration of faith: There is no god but Allah, and Muhammad is His Messenger\n2. Salah 🤲 — Performing the 5 daily prayers\n3. Zakat 💰 — Giving 2.5% of savings to charity annually\n4. Sawm 🌙 — Fasting during Ramadan from dawn to sunset\n5. Hajj 🕋 — Pilgrimage to Mecca at least once in a lifetime if able\n\nThese are the foundational acts of worship that every Muslim strives to uphold. ✨",
  "wudu": "Wudu (Ablution) 💧 is the Islamic cleansing ritual performed before prayer:\n\n1. Make the intention (niyyah) in your heart ❤️\n2. Say Bismillah (In the name of Allah)\n3. Wash both hands up to the wrists 3 times\n4. Rinse the mouth 3 times\n5. Clean the nose 3 times\n6. Wash the face 3 times\n7. Wash both arms up to the elbows 3 times (right first)\n8. Wipe the head once with wet hands\n9. Wipe the ears once\n10. Wash both feet up to the ankles 3 times (right first)\n\nWudu is invalidated by using the restroom, passing gas, deep sleep, or bleeding. 🤲",
  "muhammad": "Prophet Muhammad ﷺ (570–632 CE) is the final messenger of Allah and the seal of the prophets. 🌟\n\n🕌 Born in Mecca to the Quraysh tribe\n📖 Received his first revelation at age 40 in the Cave of Hira\n🌙 The Quran was revealed to him over 23 years through Angel Jibreel\n🐪 He migrated from Mecca to Medina (the Hijra) in 622 CE\n💚 He is known for his exemplary character, mercy, and justice\n📚 His sayings and actions (Hadith & Sunnah) form a major source of Islamic guidance\n\nMuslims say ﷺ (peace be upon him) after his name out of respect. 🤲",
  "patience": "The Quran speaks extensively about Patience (Sabr) 🤲:\n\n📖 Indeed, Allah is with the patient. — Quran 2:153\n\n📖 And be patient, for indeed, Allah does not allow to be lost the reward of those who do good. — Quran 11:115\n\n📖 So verily, with hardship, there is ease. Verily, with hardship, there is ease. — Quran 94:5-6\n\nPatience in Islam encompasses:\n🕌 Sabr in obedience — persisting in worship\n💪 Sabr in adversity — enduring trials with faith\n🚫 Sabr from sin — restraining from what is forbidden\n\nIt is one of the most praised qualities in the Quran. ✨",
  "prayer": "Salah (Prayer) 🕌 is the second pillar of Islam. Muslims pray 5 times daily:\n\n🌅 Fajr — Dawn prayer (2 rakahs)\n☀️ Dhuhr — Midday prayer (4 rakahs)\n🌤️ Asr — Afternoon prayer (4 rakahs)\n🌅 Maghrib — Sunset prayer (3 rakahs)\n🌙 Isha — Night prayer (4 rakahs)\n\nPrayer involves standing, bowing (ruku), and prostrating (sujud) while reciting Quranic verses. It is preceded by Wudu (ablution) and facing the Qiblah (direction of the Kabah in Mecca). 🤲",
  "halal": "Halal & Haram guidance in Islam 📖:\n\n✅ Halal (Permissible):\n🥗 Most fruits, vegetables, grains\n🥩 Meat slaughtered with Bismillah (Zabiha)\n🐟 Fish and seafood (most scholars agree)\n💼 Lawful earnings and trade\n\n❌ Haram (Forbidden):\n🐷 Pork and its by-products\n🍷 Alcohol and intoxicants\n🥩 Meat not slaughtered in Allahs name\n🩸 Blood\n💸 Interest (Riba) in financial dealings\n🎰 Gambling\n\nWhen in doubt, consult a knowledgeable scholar. The Prophet ﷺ said: Leave that which makes you doubt for that which does not make you doubt. 🤲",
  "ramadan": "Ramadan 🌙 is the 9th month of the Islamic calendar, during which Muslims fast from dawn (Fajr) to sunset (Maghrib).\n\n📖 Key aspects:\n🍽️ Fasting (Sawm) from food, drink, and other needs\n🤲 Increased prayer, especially Taraweeh at night\n📚 Reading and reflecting on the Quran\n💰 Charity and generosity\n✨ Laylatul Qadr (Night of Power) in the last 10 nights\n\n📖 The month of Ramadan in which the Quran was revealed, a guidance for mankind. — Quran 2:185\n\nFasting teaches self-discipline, empathy for the less fortunate, and spiritual growth. 🤲",
};

function findResponse(question: string): string {
  const q = question.toLowerCase();
  for (const [key, value] of Object.entries(KNOWLEDGE)) {
    if (q.includes(key)) return value;
  }
  return "JazakAllah Khair for your question! 🤲\n\nThis is a great question that I'd love to answer in more detail. For a comprehensive AI-powered response, the full AI assistant will be available soon with Lovable Cloud integration.\n\nIn the meantime, I recommend consulting:\n- **IslamQA.info** for detailed scholarly answers\n- **Quran.com** for Quranic references\n- Your local mosque or Imam for personalized guidance\n\n*Remember: Always verify any information with qualified Islamic scholars.*";
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = findResponse(text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto max-w-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-card-foreground">Islamic AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Ask questions about Islam, Quran, and Islamic practices</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="font-arabic text-2xl text-gold mb-4">السلام عليكم</p>
              <p className="text-muted-foreground mb-8">Assalamu Alaikum! How can I help you today?</p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="p-3 text-sm text-left rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-sm transition-all text-card-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border text-card-foreground rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-xl p-4 rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-4">
        <form
          className="container mx-auto max-w-3xl flex gap-3"
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Islam, Quran, prayer..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping} className="gold-gradient text-primary border-0">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="container mx-auto max-w-3xl text-xs text-muted-foreground mt-2 text-center">
          Responses should be verified with qualified Islamic scholars
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
