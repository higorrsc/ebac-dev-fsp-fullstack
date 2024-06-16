import { getAccessToken } from '@/lib/actions'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: ''
}

const apiService = {
  get: async function (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: 'GET',
        headers
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json)
        })
        .catch((error) => reject(error))
    })
  },

  post: async function (url: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json)
        })
        .catch((error) => reject(error))
    })
  },

  getWithAuth: async function (url: string): Promise<any> {
    const token = await getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: 'GET',
        headers
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json)
        })
        .catch((error) => reject(error))
    })
  },

  postWithAuth: async function (url: string, data: any): Promise<any> {
    const token = await getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json)
        })
        .catch((error) => reject(error))
    })
  }
}

export default apiService
