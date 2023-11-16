import '../App.css'
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { icons } from '../assets'
import { removeUser, updateUser } from "../services/user";


const UserRow = ({ item }) => {
    const client = useQueryClient()

    const removeUserMutation = useMutation({
        mutationFn: (id) => removeUser(id),
        onSuccess: () => {
            client.invalidateQueries(['users'])
        }
    })

    const updateUserMutation = useMutation({
        mutationFn:updateUser,
        onSuccess: () => {
            client.invalidateQueries(['users'])
        }
    })

    return (
        <tr>
            <td><p>{item.username}</p></td>
            <td><p>{item.email}</p></td>
            <td><p>{item.special_user}</p></td>
            <td>
                {item.special_user === 'user' && (
                    <button onClick={()=>updateUserMutation.mutate({id:item.id, obj:item})}>Make Admin</button>
                )}
            </td>
            <td>
                {item.special_user !== 'super-admin' && (
                    <img src={icons.crossIcon} className="remove-user-icon" onClick={()=> removeUserMutation.mutate(item.id)} />
                )}
            </td>
        </tr>
    )
}

export default UserRow