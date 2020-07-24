import * as React from 'react'
import { Form, Button, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { History } from 'history'
import {createListing } from '../api/listings-api'

interface CreateListingProps {
  history: History
  match: {
    params: {
      listingId: string
    }
  }
  auth: Auth
}

interface CreateListingState {
  newName: string,
  newMarketName: string,
  newDescription:string,
  newBusinessCategoryName:string,
  newBusinessModel:string,
  newPhoneNumber:string,
  newPostalCode:string,
  newAddress:string,
  loadingListings: true   
}

export class CreateListing extends React.PureComponent< CreateListingProps, CreateListingState> {
      state: CreateListingState = {
      newName: '',
      newMarketName: '',
      newDescription:'',
      newBusinessCategoryName:'',
      newBusinessModel:'',
      newPhoneNumber:'',
      newPostalCode:'',
      newAddress:'',
      loadingListings: true   
    }
  
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newName: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newDescription: event.target.value })
  }

  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newAddress: event.target.value })
  }

  handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newPhoneNumber: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      
      if(!this.state.newName || !this.state.newDescription || !this.state.newPhoneNumber || !this.state.newAddress)
      {
        alert('All fields are required')
        return
      }
        
      const newListing = await createListing(this.props.auth.getIdToken(), {
        name: this.state.newName,
        marketName: this.state.newMarketName,  
        businessCategoryName:this.state.newBusinessCategoryName,
        businessModel:this.state.newBusinessModel,
        description:this.state.newDescription,
        phoneNumber:this.state.newPhoneNumber,
        postalCode:this.state.newPostalCode,
        address:this.state.newAddress
      })      
      
      if(newListing)
            this.props.history.push(`/listings/`)

    } catch (e) {
      alert('Could not create : ' + e.message)
    } 
  }
  
  render() 
  {
    return (
      <div>
        <h1>Create new business</h1>

        {this.renderInput()}

        <Form onSubmit={this.handleSubmit}>          
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderInput(){
    return(
       
      <Grid padded>
      <GridRow>
        <GridColumn width={2}>
             <label>Name : </label>
        </GridColumn>          
        <GridColumn>
           <input type="text" onChange={this.handleNameChange} />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={2}>
             <label>Description : </label>
        </GridColumn>          
        <GridColumn>
           <input type="text" onChange={this.handleDescriptionChange} />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={2}>
             <label>Address : </label>
        </GridColumn>          
        <GridColumn>
           <input type="text" onChange={this.handleAddressChange} />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={2}>
             <label>Phone : </label>
        </GridColumn>          
        <GridColumn>
           <input type="text" onChange={this.handlePhoneChange} />
        </GridColumn>
      </GridRow>     
    </Grid>  
    )
  }

  renderButton() {
    return (
      <div>
        <Button type="submit" color="blue"  > Submit </Button>
      </div>
    )
  }
}
