const baseURL = `http://127.0.0.1:8000/api`


export const getAllProducts = async () => {
    const res = await fetch(`${baseURL}/products/`)
    return await res.json()
}

export const getProductById = async (id) => {
    const res = await fetch(`${baseURL}/products/${id}/`)
    return await res.json()
}

export const createProduct = async (product) => {
    const token = localStorage.getItem('token')
    return await fetch(`${baseURL}/products/`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: product
    })
}

export const updateProduct = async (obj) => {
    const token = localStorage.getItem('token')
    return await fetch(`${baseURL}/products/${obj.id}/`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: obj.product
    })
}

export const removeProduct = async(id) => {
    let token = localStorage.getItem('token')
     return await fetch(`${baseURL}/products/${id}/`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}