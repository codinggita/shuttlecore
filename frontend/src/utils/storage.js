// Utility helpers for localStorage and sessionStorage

// ─── localStorage ───────────────────────────────────────────
export const setLocalItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
  }
};

export const getLocalItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
    return fallback;
  }
};

export const removeLocalItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.warn('localStorage is unavailable:', e);
  }
};

// ─── sessionStorage ──────────────────────────────────────────
export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('sessionStorage is unavailable:', e);
  }
};

export const getSessionItem = (key, fallback = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('sessionStorage is unavailable:', e);
    return fallback;
  }
};

export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {
    console.warn('sessionStorage is unavailable:', e);
  }
};

export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
  } catch (e) {
    console.warn('sessionStorage is unavailable:', e);
  }
};
