export interface IRecyclingRequest {
    _id: string;
    name: string;
    address: string;
    contactNumber: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    createdAt?: Date;
    updatedAt?: Date;
}
