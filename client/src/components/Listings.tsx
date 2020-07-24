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
    newName: 'La Fourchette 2',
    newMarketName: 'Montreal',
    newDescription:'La fourchette',
    newBusinessCategoryName:'Restaurant',
    newBusinessModel:'Regulier',
    newPhoneNumber:'514-979-0626',
    newPostalCode:'h1t3w8',
    newAddress:'Rue Francillon',
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
      this.setState({
        listings: [...this.state.listings, newListing],
        newDescription: ''
      })
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

  onListingCheck = async (pos: number) => {
    try {
      const listing = this.state.listings[pos]
      await patchListing(this.props.auth.getIdToken(), listing.listingId, {
        name:listing.name,
        description: listing.description,
        phoneNumber: listing.phoneNumber,
        postalCode:listing.postalCode,
        address:listing.address
      })
    } catch {
      alert('Listing deletion failed')
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

        {this.renderCreateListingInput()}

        {this.renderListings()}
      </div>
    )
  }

  renderCreateListingInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New Business',
              onClick: this.onListingCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
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
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onListingCheck(pos)}
                  checked={listing.createdAt != undefined}
                />
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {listing.description}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
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
                  onClick={() => this.onListingDelete(listing.listingId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {listing.pictureUrl && (
                <Image src={listing.pictureUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  /* calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  } */
}
