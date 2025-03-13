export enum ProspectStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Blacklisted = "blacklisted",
}

// TODO add attempt attribute en prospect type and exclude in ProspectForm type

export type Prospect = {
    id: string;
    name: string;
    lastname: string;
    birthday: string;
    email: string;
    phone: string;
    profilePhoto: string;

    country: string;
    city: string;
    fullAddress: string;
    locationCoordinates: string;

    bankName: string;
    bankAccountNumber: string;
    taxID: string;
    documentOrPassport: string;

    otherRelevantDetails: string;
    fileOtherInfo: string;    
    status: ProspectStatus;

}

export type ProspectForm = Omit<Prospect, 'id' | 'status'>;