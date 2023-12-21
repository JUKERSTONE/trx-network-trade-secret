import { db } from "../../../../firestore";

export const getRankedTRX = async ({ userPreferences }: any) => {
  const genresPromises = userPreferences.map(async (userPreference: any) => {
    const trak = (await db.doc(`TRX/${userPreference}`).get()).data();
    return trak?.genres || []; // Return an empty array if there are no genres
  });

  const genresArrays: string[][] = await Promise.all(genresPromises);
  const accumulatedGenres: string[] = ([] as string[]).concat(...genresArrays); // Flatten the array of arrays

  const maxGenresPerQuery = 10;
  let allMatchingDocs = [];

  for (let i = 0; i < accumulatedGenres.length; i += maxGenresPerQuery) {
    const genresSubset = accumulatedGenres.slice(i, i + maxGenresPerQuery);

    const snapshot = await db
      .collection("TRX")
      .where("genres", "array-contains-any", genresSubset)
      .get();

    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    allMatchingDocs.push(...docs);
  }

  return allMatchingDocs;
};
