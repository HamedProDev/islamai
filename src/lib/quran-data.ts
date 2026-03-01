export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: string;
}

export interface AyahWithTranslation extends Ayah {
  translation: string;
}

export const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy", identifier: "ar.alafasy" },
  { id: "ar.abdurrahmaansudais", name: "Abdul Rahman Al-Sudais", identifier: "ar.abdurrahmaansudais" },
  { id: "ar.hanirifai", name: "Hani Ar-Rifai", identifier: "ar.hanirifai" },
];

const API_BASE = "https://api.alquran.cloud/v1";

export async function fetchSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_BASE}/surah`);
  const data = await res.json();
  return data.data;
}

export async function fetchSurahAyahs(
  surahNumber: number,
  reciter: string = "ar.alafasy"
): Promise<{ arabic: AyahWithTranslation[]; surahName: string }> {
  const [arabicRes, translationRes, audioRes] = await Promise.all([
    fetch(`${API_BASE}/surah/${surahNumber}`),
    fetch(`${API_BASE}/surah/${surahNumber}/en.asad`),
    fetch(`${API_BASE}/surah/${surahNumber}/${reciter}`),
  ]);

  const [arabicData, translationData, audioData] = await Promise.all([
    arabicRes.json(),
    translationRes.json(),
    audioRes.json(),
  ]);

  const ayahs: AyahWithTranslation[] = arabicData.data.ayahs.map(
    (ayah: Ayah, index: number) => ({
      ...ayah,
      translation: translationData.data.ayahs[index]?.text || "",
      audio: audioData.data.ayahs[index]?.audio || "",
    })
  );

  return { arabic: ayahs, surahName: arabicData.data.englishName };
}
