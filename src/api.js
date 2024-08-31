import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

// Mengambil daftar surah dari API
export const getSurahList = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.data; // Sesuaikan dengan struktur data API
  } catch (error) {
    console.error("Error fetching the surah list", error);
    return [];
  }
};

// Menghitung jarak Levenshtein antara dua string
const levenshteinDistance = (a, b) => {
  const distanceMatrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // Penghapusan
        distanceMatrix[j - 1][i] + 1, // Penyisipan
        distanceMatrix[j - 1][i - 1] + indicator // Substitusi
      );
    }
  }

  return distanceMatrix[b.length][a.length];
};

// Mencari surah yang mirip dengan nama yang diberikan
export const findSimilarSurahByName = (surahList, name) => {
  if (!surahList || surahList.length === 0) {
    return [];
  }

  const similarSurah = surahList.reduce((acc, surahItem) => {
    const surahNameWithoutSpace = surahItem.namaLatin
      .toLowerCase()
      .replace(/\s/g, "");
    const searchNameWithoutSpace = name.toLowerCase().replace(/\s/g, "");

    const distance = levenshteinDistance(
      surahNameWithoutSpace,
      searchNameWithoutSpace
    );
    if (distance <= 3) {
      // Toleransi jarak 3 karakter
      acc.push(surahItem);
    }
    return acc;
  }, []);

  return similarSurah.length > 0 ? similarSurah : surahList;
};
