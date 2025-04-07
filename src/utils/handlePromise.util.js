export default async function handlePromise(promise, parseJson = false) {
  try {
    let data = await promise;

    if (parseJson && data.json) {
      data = await data.json();
    }

    return [null, data];
  } catch (error) {
    return [error, null];
  }
}
