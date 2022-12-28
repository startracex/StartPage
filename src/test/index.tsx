import React from "react";

export default class ShoppingList extends React.Component<any,any> {
   render() {
      return (
         <>
            <h5>Shopping List for {this.props.name}</h5>
         </>
      );
   }
}