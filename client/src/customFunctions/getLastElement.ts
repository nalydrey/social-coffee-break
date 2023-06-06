type GetLastElement = <T>(arr: T[]) => T | undefined

 export const getLastElement: GetLastElement = (arr) => {
    const length = arr.length
    const lastNumber = length-1
    if(length>0){
      return arr[lastNumber]
    }
  }