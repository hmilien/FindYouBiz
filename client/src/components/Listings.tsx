import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createListing, deleteListing, getListings, patchListing } from '../api/listings-api'
import Auth from '../auth/Auth'
import { Listing } from '../types/Listing'

interface ListingsProps {
  auth: Auth
  history: History
}

interface ListingsState {
  listings: Listing[]
  newName:string
  newMarketName:string,
  newBusinessCategoryName:string,
  newBusinessModel:string,
  newDescription:string,
  newPhoneNumber:string,
  newPostalCode:string,
  newAddress:string,
  loadingListings: boolean
}

export class Listings extends React.PureComponent<ListingsProps, ListingsState> {
  state: ListingsState = {
    listings: [],
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

  onEditButtonClick = (listingId: string) => {
    this.props.history.push(`/listings/${listingId}/edit`)
  }


  onListingCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
       this.props.history.push(`/listings/create`)
    } catch(e) {
      alert('Listing creation failed :'+ e.message)
    }
  }

  onListingDelete = async (listingId: string) => {
    try {
      await deleteListing(this.props.auth.getIdToken(), listingId,"2") //todo : stop using hardecoded marketid
      this.setState({
        listings: this.state.listings.filter(listing => listing.listingId != listingId)
      })
    } catch(e) {
      alert('Listing deletion failed:' + e.message)
    }
  }
  
  async componentDidMount() {
    try {
      const listings = await getListings(this.props.auth.getIdToken())
      this.setState({
        listings,
        loadingListings: false
      })
    } catch (e) {
      alert(`Failed to fetch listings: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">BUSINESS DIRECTORY</Header>
        {this.renderListings()}
        {this.renderCreateListingInput()}
      </div>
    )
  }

  renderCreateListingInput() {
    return (
             <Input
            action={{
              color: 'blue',
              labelPosition: 'left',
              icon: 'add',
              content: 'New Business',
              onClick: this.onListingCreate
            }} /> )
  }

  renderListings() {
    if (this.state.loadingListings) {
      return this.renderLoading()
    }
    if(this.state.listings)
       return this.renderListingsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Listing
        </Loader>
      </Grid.Row>
    )
  }

  renderListingsList() {
    return (
      <Grid padded>
        {this.state.listings.map((listing, pos) => {
          return (
            <Grid.Row key={listing.listingId}>    
             {listing.pictureUrl && (
                <Image src={listing.pictureUrl} size="small" wrapped />
              )}          
              <Grid.Column width={2} floated="right">
                {listing.name}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {listing.description}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {listing.address}
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                {listing.businessCategoryName}
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                {listing.phoneNumber}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(listing.listingId)}
                >
                <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onListingDelete(listing.listingId)}>     <Icon name="delete" />
                </Button>
              </Grid.Column>             
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }  
}
