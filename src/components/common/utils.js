export const isNullOrUndefined = (obj) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return !obj;
};

export const isEmptyOrNullOrUndefined = (str) => {
  if (str === null || str === undefined || str === "") {
    return true;
  }
  return !str;
};
