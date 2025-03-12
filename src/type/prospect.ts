export enum ProspectStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Blacklisted = "blacklisted",
}
export type Prospect = {
    id: string;
    name: string;
    lastname: string;
    birthday: string;
    email: string;
    phone: string;
    status: ProspectStatus;
}

export type ProspectForm = Omit<Prospect, 'id' | 'status'>;