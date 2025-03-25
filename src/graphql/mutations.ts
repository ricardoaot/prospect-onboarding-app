// graphql/mutations.ts
import { gql } from '@apollo/client';

// Mutation to qualify a prospect
export const QUALIFY_PROSPECT = gql`
  mutation QualifyProspect(
    $id: String!, 
    $status: String!
  ) {
    qualifyProspect(
      id: $id, 
      status: $status
    )
  }
`;

export const CREATE_PROSPECT = gql`
  mutation CreateProspect(
    $name: String!,
    $lastname: String!,
    $birthday: Date!,
    $email: String!,
    $phone: String!,

    $profilePhoto: Upload!,

    $country: String!,
    $city: String!,
    $fullAddress: String!,
    $locationCoordinates: String!,

    $bankName: String!,
    $bankAccountNumber: String!,
    $taxID: String!,
    $documentOrPassport: String!,

    $otherRelevantDetails: String!,
    $fileOtherInfo: String! 
  ) {
    createProspect(
      data: {
        name: $name,
        lastname: $lastname,
        birthday: $birthday,
        email: $email,
        phone: $phone,

        country: $country,
        city: $city,
        fullAddress: $fullAddress,
        locationCoordinates: $locationCoordinates,

        bankName: $bankName,
        bankAccountNumber: $bankAccountNumber,
        taxID: $taxID,
        documentOrPassport: $documentOrPassport,

        otherRelevantDetails: $otherRelevantDetails,
        fileOtherInfo: $fileOtherInfo
      },

      profilePhoto: $profilePhoto
    ) {
      id
      name
      lastname
      birthday
      email
      phone
      profilePhoto
    }
  }
`;
