export const save = (key: string, value: any): any => {
  localStorage.setItem(key, value)
}

export const read = (key: string): any => localStorage.getItem(key)

export const saveJson = (key: string, json: any): any => {
  save(key, JSON.stringify(json))
}

export const readJson = (key: string): any => JSON.parse(read(key))
