/*
📁 useful-snippets
Uma coleção de snippets úteis para o dia a dia com JavaScript.
Organizado por categorias, comentado e fácil de expandir.
*/

// =========================
// 🔠 STRINGS
// =========================

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const toSlug = (str) => str.toLowerCase().normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');
const isPalindrome = (str) => str === str.split('').reverse().join('');
const countWord = (str, word) => str.split(word).length - 1;
const reverseString = (str) => [...str].reverse().join('');
const removeExtraSpaces = (str) => str.replace(/\s+/g, ' ').trim();
const truncateString = (str, num) => str.length > num ? str.slice(0, num) + '...' : str;
const camelToKebab = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const kebabToCamel = (str) => str.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
const escapeHTML = (str) => str.replace(/[&<>'"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'}[c]));
const unescapeHTML = (str) => str.replace(/&(amp|lt|gt|#39|quot);/g, (m) => ({'&amp;': '&', '&lt;': '<', '&gt;': '>', '&#39;': "'", '&quot;': '"'}[m]));

// =========================
// 📦 ARRAYS
// =========================

const removeDuplicates = (arr) => [...new Set(arr)];
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
const groupBy = (arr, key) => arr.reduce((acc, obj) => {
  const value = obj[key];
  acc[value] = acc[value] || [];
  acc[value].push(obj);
  return acc;
}, {});
const flattenArray = (arr) => arr.flat(Infinity);
const countUnique = (arr) => new Set(arr).size;
const sumArray = (arr) => arr.reduce((acc, val) => acc + val, 0);
const getMax = (arr) => Math.max(...arr);
const getMin = (arr) => Math.min(...arr);
const chunkArray = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (_, i) => arr.slice(i * size, i * size + size));
const arrayAverage = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const removeFalsy = (arr) => arr.filter(Boolean);
const difference = (a, b) => a.filter(x => !b.includes(x));

// =========================
// 🧠 OBJETOS
// =========================

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
const shallowEqual = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  return aKeys.length === bKeys.length && aKeys.every(key => a[key] === b[key]);
};
const invertObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
const filterTruthy = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
const mergeObjects = (...objs) => Object.assign({}, ...objs);
const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
const pick = (obj, keys) => Object.fromEntries(keys.map(k => [k, obj[k]]));

// =========================
// 🌐 API / HTTP
// =========================

const fetchWithTimeout = (url, timeout = 5000) =>
  Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);

const getJson = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err) {
    console.error('Erro ao buscar:', err);
    return null;
  }
};

const postJson = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('Erro ao enviar:', err);
    return null;
  }
};

// =========================
// 📅 DATAS
// =========================

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const daysBetween = (d1, d2) => Math.floor(Math.abs(new Date(d1) - new Date(d2)) / (1000 * 60 * 60 * 24));
const isWeekend = (date) => [0, 6].includes(new Date(date).getDay());
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const getWeekDayName = (date) => new Date(date).toLocaleDateString('pt-BR', { weekday: 'long' });
const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
const getStartOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));
const getEndOfDay = (date) => new Date(date.setHours(23, 59, 59, 999));

// =========================
// ➕ MATH / UTILS
// =========================

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0;
  const v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
const isBrowser = () => typeof window !== 'undefined';
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
const throttle = (fn, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
const waitUntil = (conditionFn, interval = 100) => new Promise(resolve => {
  const intervalId = setInterval(() => {
    if (conditionFn()) {
      clearInterval(intervalId);
      resolve();
    }
  }, interval);
});
