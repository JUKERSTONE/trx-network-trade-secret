export const getSeedArray = ({tracks, indicies, state}: any) => {
  console.log(
    '🚀 ~ file: getSeedArray.ts ~ line 2 ~ getSeedArray ~ tracks',
    tracks,
  );
  const feeder: any = [];
  indicies.map((number: any, key: any) => {
    if (state) {
      const id = tracks[number]
        ? tracks[number].web.spotify.id ?? tracks[number].trackID
        : null;
      feeder.push(id);
    } else feeder.push(tracks[number]);
  });
  return feeder;
};
