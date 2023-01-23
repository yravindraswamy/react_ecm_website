import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.getProductsListFromApi()
  }

  getProductsListFromApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const productsUrl = 'https://apis.ccbp.in/products'
    const response = await fetch(productsUrl, options)
    if(response.ok===true){
      const data = response.json();
      const updatedData = data.map(product =>({
        id:product.id,
        imageUrl:product.image_url,
        price:product.price,
        brand:product.brand,
        title:product.title
      }))
      console.log(updatedData)
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
