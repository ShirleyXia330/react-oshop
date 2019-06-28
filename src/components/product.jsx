import React from "react";

const Product = ({ match, history }) => {
  return (
    <div>
      <h1>ID: {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/products")}
      >
        Save
      </button>
    </div>
  );
};

export default Product;
// class Product extends Component {
//   handleSave = () => {
//     this.props.history.replace("/products");
//   };

//   render() {
//     return (
//       <div style={{ margin: "20px" }}>
//         <h1>ID: {this.props.match.params.id}</h1>
//         <button className="btn btn-primary" onClick={this.handleSave}>
//           Save
//         </button>
//       </div>
//     );
//   }
// }
