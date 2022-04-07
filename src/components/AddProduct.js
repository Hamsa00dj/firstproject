import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function AddProduct(props) {
    const [singleProduct,  setsingleProduct] = useState({
        productName: '',
        productPrice: '',
        productImageURL: '',
        productDescription: ''
    })
    
    const handleClose = () =>{
        props.hideShowModal()
    }
    const addProduct = async () => {
        console.log('Single Product', singleProduct);
        try{
        const response = await axios('https://ty-shop.herokuapp.com/api/products', singleProduct)
        console.log('add api response',response);
        if(response.data.error){
            alert(response.data.error)
        } else{
            // to close modal
            props.hideShowModal();
            //to fetch the products after addind new products
            props.fetchProducts()
            alert(response.data.message)
        }
       } catch(err) {
           alert(err.message)
       }
      };

    const handleProductChange = (event) =>{
        setsingleProduct ({
            ...singleProduct,
            [event.target.name]:event.target.value
        })
    }
    return (
       <>
       <Modal show={props.showAddModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className = "form-group">
            <label>Product Name</label>
            <input name = "productName" 
            value= {singleProduct.productName}
            onChange = {handleProductChange}
            type ="text" className = "form-control"></input>
        </div>

        <div className = "form-group">
            <label>Product Price</label>
            <input name = "productPrice" 
              value= {singleProduct.productPrice}
              onChange = {handleProductChange}
            type ="text" className = "form-control"></input>
        </div>

        <div className = "form-group">
            <label>Product Description</label>
            <input name = "productDescription"
              value= {singleProduct.productDescription}
              onChange = {handleProductChange}
             type ="text" className = "form-control"></input>
        </div>

        <div className = "form-group">
            <label>Product productImageURL</label>
            <input name = "productImageURL"
              value= {singleProduct.productImageURL}
              onChange = {handleProductChange}
             type ="text" className = "form-control"></input>
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            addProduct  
          </Button>
        </Modal.Footer>
      </Modal>
       </>
    )
}

export default AddProduct

