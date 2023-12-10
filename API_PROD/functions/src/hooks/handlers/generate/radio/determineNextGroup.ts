import { findDifferentTracks } from "./findDifferentTracks";
import { findSimilarTracks } from "./findSimilarTracks";

interface determineNextGroupProps {
  responseType: "like" | "dislike";
  radioSliceIndex: number;
  rankedTracks: any[];
  n: number;
}

export const determineNextGroup = ({
  responseType,
  radioSliceIndex,
  rankedTracks,
  n,
}: determineNextGroupProps) => {
  // Basic logic:
  // - If the user liked the current group, find the next group of similar tracks
  // - If the user disliked the current group, find the next group of different tracks

  let nextGroup;

  if (responseType === "like") {
    // Find next group of similar tracks
    nextGroup = findSimilarTracks({ radioSliceIndex, rankedTracks, n });
  } else if (responseType === "dislike") {
    // Find next group of different tracks
    nextGroup = findDifferentTracks({ radioSliceIndex, rankedTracks, n });
  }

  return nextGroup;
};
