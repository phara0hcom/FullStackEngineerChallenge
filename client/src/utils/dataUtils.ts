export const stringToJSON = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
