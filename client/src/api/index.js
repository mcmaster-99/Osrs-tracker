import axios from 'axios'

//const apikey = 'ba29b0e4-cab5-42a7-b091-4e199883d6c3';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertTrade = trade => api.post(`/trade`, trade)
export const getAllTrades = () => api.get(`/trade`)
export const updateTradeById = (id, trade) => api.put(`/trade/${id}`, trade)
export const deleteTradeById = id => api.delete(`/trade/${id}`)
export const getTradeById = id => api.get(`/trade/${id}`)

const apis = {
    insertTrade,
    getAllTrades,
    updateTradeById,
    deleteTradeById,
    getTradeById,
}

export default apis
