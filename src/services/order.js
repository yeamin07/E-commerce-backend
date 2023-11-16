const baseURL = `http://127.0.0.1:8000/api`

export const getAllOrders = async() => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/orders/`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}

export const getOrderByUsername = async(username) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/orders/?search=${username}`,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}

export const createOrder = async (order) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/orders/`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    return await res.json()
}

export const updateOrder = async(obj) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/orders/${obj.id}/`,{
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj.payload)
    })
    return await res.json()
}

export const removeOrder = async(id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/orders/${id}/`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}