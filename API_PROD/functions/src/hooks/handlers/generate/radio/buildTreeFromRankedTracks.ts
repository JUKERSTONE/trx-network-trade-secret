import { determineNextGroup } from "./determineNextGroup";

export const buildTreeFromRankedTracks = ({ rankedTracks = [], n = 3 }) => {
  let radioTree = new Tree();
  let radioSliceIndex = 0;

  const isCurrentRadioSliceValid = radioSliceIndex < rankedTracks.length;

  while (isCurrentRadioSliceValid) {
    let radioSlice = rankedTracks.slice(radioSliceIndex, radioSliceIndex + n);
    let radioSliceNode = new TreeNode(radioSlice);

    // Assuming that determineNextGroup is a function that determines the next group of tracks
    // based on user interactions with the current group

    const isNextRadioSliceValid = radioSliceIndex + n < rankedTracks.length;

    if (isNextRadioSliceValid) {
      radioSliceNode.likeBranch = new TreeNode(
        determineNextGroup({
          responseType: "like",
          radioSliceIndex,
          rankedTracks,
          n,
        })
      );
      radioSliceNode.dislikeBranch = new TreeNode(
        determineNextGroup({
          responseType: "dislike",
          radioSliceIndex,
          rankedTracks,
          n,
        })
      );
    }

    radioTree.addNode(radioSliceNode);
    radioSliceIndex += n;
  }

  return radioTree;
};
