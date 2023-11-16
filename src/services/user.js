const baseURL = `http://127.0.0.1:8000/api`

export const getAllUsers = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseURL}/users/`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return await res.json()
}

export const updateUser = async (user) => {
    const token = localStorage.getItem('token')
    const payload = {
        ...user.obj,
        special_user: 'admin'
    }
    return await fetch(`${baseURL}/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}

export const removeUser = async(id) => {
    const token = localStorage.getItem('token')
    return await fetch(`${baseURL}/users/${id}/`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}