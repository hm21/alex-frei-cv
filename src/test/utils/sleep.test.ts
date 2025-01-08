export async function sleep(duration: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}
