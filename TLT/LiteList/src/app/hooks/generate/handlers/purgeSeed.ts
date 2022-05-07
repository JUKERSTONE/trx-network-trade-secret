export const handlePurgeSeed = ({seed}: any) => {
  const {SPOT, AM} = seed;
  // convert AM to spotify using isrc

  return {
    primary: [{service: 'spotify'}, {service: 'apple_muisc'}],
    secondary: [{service: 'youtube'}, {service: 'soundcloud'}],
    proposals: [{service: 'audiomack'}],
  };
};
