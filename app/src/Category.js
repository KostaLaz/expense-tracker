import React, { Component } from 'react';

class Category extends Component {
    state = { 
      isLoading : true,
      Categories : []
     }

     //async
     async componentDidMount(){
         const response = await fetch('api/categories');
         const body = await response.json();
         this.setState({Categories : body, isLoading : false});
     }


    render() {
        const {Categories, isLoading} = this.state;
        if(isLoading)
            return(<div>Loading...</div>)
        return ( 
            <div>
                <h2>Categories</h2>
                {
                    Categories.map(category =>
                        <div id = {category.name}>
                            {category.name}
                        </div>
                        )
                 }    

            </div>
         );
    }
}
 
export default Category;