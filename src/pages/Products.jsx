import '../App.css'
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from './../services/product';

import Header from '../components/Header'
import ProductRow from './../components/ProductRow';

const Products = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  })

  return (
    <>
      <Header />
      <div className="product-section">
        <div className="product-section__heading">
          <h4 className='d-flex justify-content-center py-3'>All Products</h4>
        </div>
        <div className="product-table-container">
          <table>
            <tbody>
              {data?.length !== 0 && data?.map(item => (
                <ProductRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Products