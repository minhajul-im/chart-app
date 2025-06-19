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

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined" && key && value) {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined" && key) {
    localStorage.removeItem(key);
  }
};
