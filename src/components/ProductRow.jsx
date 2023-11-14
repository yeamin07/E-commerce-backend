import '../App.css'
import { useQueryClient,useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { icons } from "../assets";
import { removeProduct } from "../services/product.js";


const ProductRow = ({item}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const removeProductMutation = useMutation({
        mutationFn: (id)=> removeProduct(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries(['products'])
        }
    })

  return (
    <tr className="product-row d-flex justify-content-around align-items-center">
        <td>
            <img src={item.photo} alt={item.name} className="product-img" />
        </td>
        <td><h2>{item.name}</h2></td>
        <td><h2>{item.price}</h2></td>
        <td>
            <img onClick={() => navigate(`/admin/product-edit-form/${item.id}`)} src={icons.editIcon} alt={item.name} className="product-icon" />
        </td>
        <td>
            <img src={icons.crossIcon} className="product-icon" onClick={()=> removeProductMutation.mutate(item.id)} />
        </td>
    </tr>
  )
}

export default ProductRow

