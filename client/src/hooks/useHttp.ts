export const useHttp = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  payload?: object | string | number,
) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
  const data = await response.json()
  return data
}
