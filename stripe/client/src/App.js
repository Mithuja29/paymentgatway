import React from "react";
import StripeCheckout from "react-stripe-checkout";

const App = () => {
    const [product, setProduct] = React.useState({
        name: "E- chenneling",
        price: 2000 * 100,
        productBy: "Goldengladiators",
    });

    const makePayment = (token)=>{
        const body = {
          token,
          product
        }
        const headers = {
          "Content-Type":"application/json"
        }
        return fetch("http://localhost:5000/payment",{
          method:"POST",
          headers,
          body:JSON.stringify(body)
        }).then((response)=>{
          console.log(response);
        }).catch((err)=>{
          console.log(err);
        });
    }
     return (
    <div>
      <StripeCheckout 
      name="pay your bill" 
      amount={product.price} 
      currency = "INR"
      token={makePayment}
      stripeKey="pk_test_51L7GHqSIkINhGnuzg0NFO1WtmqDrSaKgsracDKKwpbTyiA0zvRfAs8aDLXdpbTOvPblKdvrgjMEmZmDWLAku4AuN007MSVtMll"
      >
        <button> pay your bill {product.price/100} </button>
      </StripeCheckout>
    </div>
  );
};

export default App;