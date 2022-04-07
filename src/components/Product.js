
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import HTTP from '../axiosConfig';

function Product() {
    const [products, setproducts] = useState([])
    const [showAddModal, setshowAddModal] = useState(false)
    const [showEditModal, setshowEditModal] = useState(false)
    const [selectedProduct, setselectedProduct] = useState({})
    
    useEffect( () => {
       fetchProducts();
        
    }, []);

    const fetchProducts = async() => {
        try{
            const response = await HTTP.get('https://ty-shop.herokuapp.com/api/products')
            console.log(response.data);
            if(response.data.error) {
                const errMessage = response.data.message;
            } else{
                const fetchedProducts = response.data.products;
                console.log('products', fetchedProducts);
                setproducts(fetchedProducts)
         }
        
        } catch (err) {
            console.log(err);
        }
    }

    const updateShowAddModal = () =>{
        setShowAddModal(true)
    }
    const hideShowModal = () =>{
        setShowAddModal(false)
    }

    const deleteProduct = async (productId) => {
        console.log('Product Id', productId);
        try{
            const response = await HTTP.delete( 'https://ty-shop.herokuapp.com/api/products/${productId}' )
            if(response.data.error){
                alert(response.data.message)
            }else{
                const productsCopy = [...products];
                const index = productsCopy.findIndex(product =>{
                    if(product._id === productId)
                    return product
                
                 } )
            }
        productsCopy.splice(index,1);

        setproducts(productsCopy);
        alert(response.data.message)
        }
    catch(err){
        alert(err.message)
    }
}

const updateaTheSelectedProduct = (product) =>{
    console.log('selected product', product)
    setshowEditModal(true)
    setselectedProduct(product)
}
    return (
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th>Product Image</th>
                    <th> <button onClick = {updateShowAddModal}>Add</button></th>
                </tr>
            </thead>
            <tbody>
                {products.length>0 && products.map((product) =>  {
                    return <tr key ={product._id} >
                        <td>{product._id}</td>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td>{product.productDescription}</td>
                        <td> <img 
                        style = {{height :'60px'}}
                        src = {product.productImageURL} alt= {product.productName} /> 

                        </td>
                        <td>
                            <button onClick = {() => {
                                updateaTheSelectedProduct(product)
                            }}>

                            </button>

                        <button className ="btn btn-primary mb-2">Edit</button>
                        <button className ="btn btn-danger"
                        onClick = {() => {deleteProduct(product._id)}}>Delete</button>
                        </td>
                    </tr>
                })}
            
            </tbody>
            </Table>
            <AddProduct showAddModal={showAddModal} 
            fetchProducts= {fetchProducts}
            hideShowModal ={hideShowModal}/>

            <EditProduct showEditModal={showEditModal} 
            hideEditShowModal = {hideEditShowModal}
            fetchProducts= {fetchProducts}
            selectedProduct={selectedProduct}/>
        </div>
    )
   } 

export default Product;
