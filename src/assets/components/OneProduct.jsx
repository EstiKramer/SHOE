import "./OneProduct.scss"
const OneProduct = ({product, scrollPosition, onClose}) => {

    const closeWindow = () => {
        window.scrollTo(0, scrollPosition)
        onClose();
    }

    return ( <div className="modal">
      <div className="modal-overlay" onClick={closeWindow}></div>
      <div className="modal-content">
        <h1>{product.productName}</h1>
        <img src={product.imagePath} alt={product.productName} />
        <p>{product.description}</p>
        <p> Date of manufacture: {new Date(product.DateOfManufacture).toLocaleDateString()}</p>
        <p> Price: {product.price} ₪</p>
        <button onClick={closeWindow}>Close</button>
      </div>
    </div>  );
}
 
export default OneProduct;