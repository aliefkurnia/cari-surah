import axios from "axios";

const BASE_URL = "https://equran.id/api/v2";

export const getSurahList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/surat`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching surah list", error);
    return [];
  }
};

export const getSurahDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/surat/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching surah detail", error);
    return null;
  }
};

export const getTafsir = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tafsir/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tafsir", error);
    return null;
  }
};

export const getDoaList = async () => {
  try {
    const response = await axios.get("https://equran.id/api/doa");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching doa list", error);
    return [];
  }
};

export const getQariList = () => [
  { id: "01", name: "Abdullah Al-Juhany" },
  { id: "02", name: "Abdul Muhsin Al-Qasim" },
  { id: "03", name: "Abdurrahman as-Sudais" },
  { id: "04", name: "Ibrahim Al-Dossari" },
  { id: "05", name: "Misyari Rasyid Al-Afasi" },
  { id: "06", name: "Yasser Al-Dosari" },
];

const levenshteinDistance = (a, b) => {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
};

export const findSimilarSurahByName = (surahList, name) => {
  if (!surahList || surahList.length === 0) return [];
  const query = name.toLowerCase().replace(/[-\s]/g, "");
  if (!query) return surahList;

  const withScores = surahList
    .map((s) => {
      const latin = s.namaLatin.toLowerCase().replace(/[-\s]/g, "");
      const arti = (s.arti || "").toLowerCase();
      if (latin.includes(query) || query.includes(latin)) return { s, score: 0 };
      if (arti.includes(query)) return { s, score: 1 };
      const dist = levenshteinDistance(latin, query);
      return { s, score: dist };
    })
    .filter((item) => item.score <= 4)
    .sort((a, b) => a.score - b.score);

  return withScores.map((item) => item.s);
};
