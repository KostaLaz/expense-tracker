import React, { Component, useReducer } from 'react';
import AppNav from './AppNav';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, FormGroup, Form, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


class Expenses extends Component {
    state = { 

     date: new Date(),
     isLoading: true,
     expenses: [],
     categories: []

     }

     async componentDidMount(){
         const response = await fetch ('/api/categories');
         const body = await response.json();

         this.setState({categories: body, isLoading: false});
     }
    

    render() { 

        const title  = <h3>Add Expense</h3>;
        const {categories, isLoading} = this.state;

        if(isLoading)
          return(<div>Loadig...</div>)

          let optionList =  
            categories.map(category =>
              <option id = {category.id}>
                  {category.name}
              </option>)

              

        return (

            <div>
                <AppNav/>
                <Container>

                 {title}

                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <label for="title">Title</label>
                          <input type="text" name="title" id="title" onChange={this.handleChange}/>
                      </FormGroup>

                      <FormGroup>
                          <label for="category">Category</label>

                          <select>
                              {optionList}
                          </select>
                          
                          <input type="text" name="category" id="category" onChange={this.handleChange}/>
                      </FormGroup>

                      <FormGroup>
                          <label for="city">Date</label>
                          <DatePicker selected={this.state.date} onChange={this.handleChange}/>
                      </FormGroup>

                    <div className="row">
                      <FormGroup className="col-md-4-sb-3">
                          <label for="location">Location</label>
                          <input type="text" name="location" id="location" onChange={this.handleChange}/>
                      </FormGroup>
                      </div>

                      <FormGroup>
                          <Button color="primary" type="submit">Save</Button>{' '}
                          <Button color="secondary" tag={Link} to="/">Cancel</Button>

                      </FormGroup>

                      
                    </Form>
                </Container>
            </div>
          );
    }
}
 
export default Expenses;