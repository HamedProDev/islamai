import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Square, Search, ChevronLeft, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchSurahs, fetchSurahAyahs, RECITERS, type Surah, type AyahWithTranslation } from "@/lib/quran-data";

const QuranPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<AyahWithTranslation[]>([]);
  const [surahName, setSurahName] = useState("");
  const [reciter, setReciter] = useState(RECITERS[0].identifier);
  const [loading, setLoading] = useState(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSurahs().then((data) => {
      setSurahs(data);
      setFilteredSurahs(data);
    });
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFilteredSurahs(
      surahs.filter(
        (s) =>
          s.englishName.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.number.toString().includes(q)
      )
    );
  }, [search, surahs]);

  const loadSurah = async (num: number) => {
    setSelectedSurah(num);
    setLoading(true);
    stopAudio();
    try {
      const data = await fetchSurahAyahs(num, reciter);
      setAyahs(data.arabic);
      setSurahName(data.surahName);
    } catch {
      setAyahs([]);
    }
    setLoading(false);
  };

  const playAyah = (ayah: AyahWithTranslation) => {
    if (!ayah.audio) return;
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(ayah.audio);
    audioRef.current = audio;
    setPlayingAyah(ayah.numberInSurah);
    audio.play();
    audio.onended = () => {
      setPlayingAyah(null);
    };
  };

  const stopAudio = () => {
    audioRef.current?.pause();
    setPlayingAyah(null);
  };

  const changeReciter = async (newReciter: string) => {
    setReciter(newReciter);
    if (selectedSurah) {
      stopAudio();
      setLoading(true);
      const data = await fetchSurahAyahs(selectedSurah, newReciter);
      setAyahs(data.arabic);
      setLoading(false);
    }
  };

  // Surah list view
  if (!selectedSurah) {
    return (
      <div className="min-h-screen pt-20 bg-background islamic-pattern-bg">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
            The Holy Quran
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            114 Surahs — Select one to begin recitation
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by surah name or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[60vh]">
            <div className="space-y-2">
              {filteredSurahs.map((s, i) => (
                <motion.button
                  key={s.number}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.5) }}
                  onClick={() => loadSurah(s.number)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                    {s.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-card-foreground">{s.englishName}</p>
                    <p className="text-sm text-muted-foreground truncate">{s.englishNameTranslation} · {s.numberOfAyahs} ayahs</p>
                  </div>
                  <span className="font-arabic text-lg text-gold shrink-0">{s.name}</span>
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // Surah reader view
  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => { setSelectedSurah(null); stopAudio(); }} className="text-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Select value={reciter} onValueChange={changeReciter}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RECITERS.map((r) => (
                <SelectItem key={r.id} value={r.identifier}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">{surahName}</h1>
          <p className="text-muted-foreground text-sm">{ayahs.length} verses</p>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Button variant="outline" size="icon" onClick={() => { if (ayahs.length) playAyah(ayahs[0]); }} title="Play from start">
            <SkipBack className="w-4 h-4" />
          </Button>
          {playingAyah ? (
            <Button size="icon" className="gold-gradient text-primary border-0" onClick={stopAudio}>
              <Pause className="w-5 h-5" />
            </Button>
          ) : (
            <Button size="icon" className="gold-gradient text-primary border-0" onClick={() => { if (ayahs.length) playAyah(ayahs[0]); }}>
              <Play className="w-5 h-5" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={stopAudio}>
            <Square className="w-4 h-4" />
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading verses...</div>
        ) : (
          <div className="space-y-6">
            {ayahs.map((ayah) => (
              <motion.div
                key={ayah.numberInSurah}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  playingAyah === ayah.numberInSurah
                    ? "border-gold bg-secondary"
                    : "border-border bg-card hover:border-gold/30"
                }`}
                onClick={() => playAyah(ayah)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-semibold text-gold bg-secondary px-2 py-1 rounded-md shrink-0">
                    {ayah.numberInSurah}
                  </span>
                  {playingAyah === ayah.numberInSurah && (
                    <span className="text-xs text-gold animate-pulse">♪ Playing</span>
                  )}
                </div>
                <p className="arabic-text text-xl md:text-2xl text-card-foreground mb-4 text-right">
                  {ayah.text}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ayah.translation}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranPage;
