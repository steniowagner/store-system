export const Types = {
  OPEN_URL: 'social/OPEN_URL',
};

const Creators = {
  openURL: url => ({
    type: Types.OPEN_URL,
    payload: { url },
  }),
};

export default Creators;
