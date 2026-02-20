import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useAuth = (URL, token) => {
    const [data, setdata] = useState()
    const [error, seterror] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.post(`${URL}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setdata(res?.data)
            } catch (err) {
                const status = err?.response?.status
                if (status === 400 || status === 500 || status === 404 || status === 403 || status === 401 || status === 409) {
                    seterror(err?.response?.data?.message)
                }
            }
        }
        fetchdata()
    }, [URL, token])
    return { data, error }
}

export default useAuth
