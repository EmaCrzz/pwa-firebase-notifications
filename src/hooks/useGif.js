import { useEffect, useState } from 'react'

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env

export default function useGif () {
  const [loading, setLoading] = useState(true)
  const [gif, setGif] = useState(null)
  const id = suggestionGif[Math.floor(Math.random() * suggestionGif.length)]

  useEffect(() => {
    const getGif = async () => {
      try {
        const apiURL = `${REACT_APP_API_URL}/gifs/${id}?api_key=${REACT_APP_API_KEY}`
        const resp = await fetch(apiURL)
        const data = await resp.json()
        setGif(fromApiResponseToGifs(data))
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    getGif()
  }, [])

  return { loading, gif }
}

const fromApiResponseToGifs = apiResponse => {
  const { data } = apiResponse
  const { images, title, id } = data
  const { url, height, width } = images.downsized_medium
  return { title, id, url, height, width }
}

const suggestionGif = [
  'Wsju5zAb5kcOfxJV9i',
  'MdA16VIoXKKxNE8Stk',
  '13HgwGsXF0aiGY',
  'fwbZnTftCXVocKzfxR',
  'KfwyWfTwMu1FG0XhO8',
  'QuIxFwQo0RMT1tASlV',
  'iIqmM5tTjmpOB9mpbn',
  'lTRuG1F4VZ3LHMpXY2',
  'QNFhOolVeCzPQ2Mx85',
  'QNFhOolVeCzPQ2Mx85',
  'HK1hAnDfVDWwNDFSUx',
  'LmNwrBhejkK9EFP504',
  'PiQejEf31116URju4V',
  'zOvBKUUEERdNm'
]
