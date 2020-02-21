import React, { Component, useReducer } from 'react';
import AppNav from './AppNav';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Table, Container, FormGroup, Form, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


class Expenses extends Component {

    emptyItem = {
      id: '103',
      expenseDate: new Date(),
      description: 'Test',
      location: '',
      category: [1, 'Travel']
    }

    constructor(props){
        super(props)

        this.state = { 
            date: new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            item: this.emptyItem
            }
        //When the constuctor gets called we automatically with this object onSubmit
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleChange = this.handleChange.bind(this);     
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async handleSubmit(event){
       event.preventDafoult(); //Prevent auto Submit
       const {item} = this.state; // Creating a copy of 
       
       await fetch('api/expenses', {

         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'applicetion/json'
         },
         body: JSON.stringify(this.item),  //Converting the values of the item variable into JSON

       });
          console.log(this.state);

          this.props.history.push("/expenses");   //Go back to the /expense route

    }

    async handleChange(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = {...this.state.item};
      item[name] = value;
      this.setState({item});
      console.log(state);

        }

      async handleDateChange(date){
        let item = {...this.state.item};
        item.expenseDate = date;
        this.setState({item});
        }

    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
          this.setState({expenses : updatedExpenses});
        });

    }
  

     async componentDidMount(){
         const response = await fetch ('/api/categories');
         const body = await response.json();
         this.setState({categories: body, isLoading: false});

         const responseExspenses = await fetch ('/api/expenses');
         const bodyExpenses = await responseExspenses.json();
         this.setState({expenses: bodyExpenses, isLoading: false});
     }
    

    render() { 

        const title  = <h3>Add Expense</h3>;
        const {categories} = this.state;
        const {expenses, isLoading} = this.state;

        if(isLoading)
          return(<div>Loadig...</div>)

          let optionList =  
            categories.map(category =>
              <option value = {category.id} key={category.id}>
                  {category.name}
              </option>)

              let rows = 
                  expenses.map(expense =>
                    <tr value={expense.id} key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td>{expense.expenseDate}</td>
                        <td>{expense.category.name}</td>
                        <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td> 
        
                    </tr>)

              

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

                          <select name="category" id="category" onChange={this.handleChange}>
                              {optionList}
                          </select>
                          
                      </FormGroup>

                      <FormGroup>
                          <label for="city">Date</label>
                          <DatePicker selected={this.state.date} onChange={this.handleDateChange}/>
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

                <Container>
            
                  <h3>Expense List</h3>

                    <Table className="mt-4">

                   <thead>  
                    <tr>       
                        <th width="20%">Description</th>
                        <th width="20%">Location</th>
                        <th width="20%">Date</th>
                        <th width="20">Category</th>
                        <th width="20%">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {rows}
                    </tbody>
                    </Table>

                </Container>
            </div>
          );
    }
}
 
export default Expenses;