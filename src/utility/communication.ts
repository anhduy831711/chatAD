export const getValueOfObject = (objectData: object) => {
  let result = [];
  for (const key in objectData) {
    if (objectData.hasOwnProperty(key)) {
      result.push(objectData[key])
    }
  }
  return result;
}