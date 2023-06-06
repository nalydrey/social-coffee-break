type isCoincidenceFunc = (
  arr1: (string | number)[],
  arr2: (string | number)[],
) => boolean

type matchValueInArrFunc = (arr1: string[], arr2: string[]) => string | null

export const isCoincidenceInArr: isCoincidenceFunc = (arr1, arr2) => {
  return arr1.some((el) => arr2.includes(el))
}

export const matchedValueInArr: matchValueInArrFunc = (arr1, arr2) => {
  console.log(arr1.find((el) => arr2.find((elem) => el === elem)) || null)
  return arr1.find((el) => arr2.find((elem) => el === elem)) || null
}
