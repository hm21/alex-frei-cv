/// Generates a unique ID based on the current time.
export const generateUniqueId = () => {
  const characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const timestamp: string = Math.floor(Date.now() / 1000)
    .toString(36)
    .padStart(8, '0');

  let randomPart: string = '';
  for (let i = 0; i < 20; i++) {
    randomPart += characters[Math.randomNextInt(characters.length)];
  }

  return `${timestamp}${randomPart}`;
};
