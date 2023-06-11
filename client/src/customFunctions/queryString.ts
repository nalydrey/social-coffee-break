
export type QueryPayload = {
    [K in string]: (string | number)[] | string | number
}

export type QueryString = (object: QueryPayload) => string

export const queryString: QueryString = (obj) => {
    const query = Object.entries(obj).map(field => {
        if(Array.isArray(field[1])){
            return field[1].map(elem => `${field[0]}=${elem}`).join('&')
        }
        else{
            return `${field[0]}=${field[1]}`
        }
    }).join('&')
    return query
}

export const isPayload = (payload: QueryPayload) => {
    if(Object.entries(payload).length > 0 && !queryString(payload)){
      return false
    }
      return true
  }