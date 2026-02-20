import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (URL) => {
    const [data, setdata] = useState()
    const [error, seterror] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.post(`${URL}`)
                setdata(res?.data)
            } catch (err) {
                seterror(err?.response?.data?.message)
            }
        }
        fetchdata()
    }, [URL])
    return { data, error }
}

export default useFetch
