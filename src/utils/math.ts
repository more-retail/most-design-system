export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getRandomInclusive(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
