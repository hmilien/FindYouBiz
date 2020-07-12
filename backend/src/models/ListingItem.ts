export interface ListingItem {
  userId: string
  listingId: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}
