import React from "react";
import "./App.css";
import Cart from "./cart";
import Navbar from "./navbar";

import firebase from "firebase/app";
import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });

    //     this.setState({ products: products, loading: false });
    //   });

    firebase
      .firestore()
      .collection("products")
      //.where("price", ">", 10000)
      .orderBy("price", "asc")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({ products: products, loading: false });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products: products,
    // });

    const docRef = firebase
      .firestore()
      .collection("products")
      .doc(products[index].id);

    docRef
      .update({ qty: products[index].qty + 1 })
      .then(() => {
        console.log("ADDED SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty === 0) return;

    // products[index].qty -= 1;
    // this.setState({
    //   products: products,
    // });

    const docRef = firebase
      .firestore()
      .collection("products")
      .doc(products[index].id);

    docRef
      .update({ qty: products[index].qty - 1 })
      .then(() => {
        console.log("UPDATED SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //   products: items,
    // });

    const docRef = firebase.firestore().collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("DELETED SUCCESSFULLY");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((item) => {
      count += item.qty;
    });
    return count;
  };

  priceTotal = () => {
    const { products } = this.state;
    let price = 0;
    products.forEach((item) => {
      price = price + item.qty * item.price;
    });

    return price;
  };

  addProduct = () => {
    firebase
      .firestore()
      .collection("products")
      .add({
        img: "",
        title: "PLAYSTATION",
        qty: 1,
        price: 20999,
      })
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button
          onClick={this.addProduct}
          style={{
            fontSize: 20,
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Add a Product
        </button>*/}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteQuantity={this.handleDeleteProduct}
        />
        {loading && <h1>LOADING PRODUCTS....</h1>}
        <div style={{ fontSize: 20, padding: 10, textAlign: "left" }}>
          TOTAL:{this.priceTotal()}
        </div>
      </div>
    );
  }
}

export default App;
