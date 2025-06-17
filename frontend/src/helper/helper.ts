export const getFilterableUrl = (url: string, filters = {}) => {
  Object.entries(filters).forEach(([key, value], index) => {
    if (index === 0) {
      url += "?";
    } else {
      url += "&";
    }
    url += `${key}=${value || null}`;
  });

  return url;
};
