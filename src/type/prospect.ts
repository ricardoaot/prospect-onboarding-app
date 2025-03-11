export type Prospect = {
    id: string;
    name: string;
    lastname: string;
    birthday: string;
    email: string;
    phone: string;
}

export type ProspectForm = Omit<Prospect, 'id'>;