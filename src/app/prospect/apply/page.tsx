"use client"
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextField, Button, Stepper, Step, StepLabel, Box, Paper } from '@mui/material';
import { request, gql } from "graphql-request";
import { ProspectForm } from '../../../type/prospect'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  lastname: z.string().min(2, 'Lastname is required'),
  birthday: z.string().nonempty('Birthday is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().nonempty('Phone number is required'),
  profilePhoto: z.string().nonempty('Profile photo is required'),

  country: z.string().nonempty('Country is required'),
  city: z.string().nonempty('City is required'),
  fullAddress: z.string().nonempty('Full address is required'),
  locationCoordinates: z.string().nonempty('Location coordinates are required'),

  bankName: z.string().nonempty('Bank name is required'),
  bankAccountNumber: z.string().nonempty('Bank account number is required'),
  taxID: z.string().nonempty('Tax ID is required'),
  documentOrPassport: z.string().nonempty('Document Or Passport are required'),

  otherRelevantDetails: z.string(),
  fileOtherInfo: z.string()
});

const steps = [
  'Personal Information',
  'Location Information',
  'Bank Information',
  'Other Information'
];


// Define GraphQL mutation

const CREATE_PROSPECT = gql`
  mutation CreateProspect(
    $name: String!,
    $lastname: String!,
    $birthday: Date!,
    $email: String!,
    $phone: String!,
    $profilePhoto: String!,

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
      name: $name,
      lastname: $lastname,
      birthday: $birthday,
      email: $email,
      phone: $phone,
      profilePhoto: $profilePhoto,

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
    ) {
      id
      name
      lastname
      birthday
      email
      phone
    }
  }
`;

export default function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isApplicationSubmited, setIsApplicationSubmited] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'Augusto',
      lastname: 'Talledo',
      birthday: '2025-01-12',
      email: 'no-repeat-this-email-1@example.com',
      phone: '8987879',
      profilePhoto: 'fot',
      country: 'PE',
      city: 'Lima',
      fullAddress: 'Addresssss',
      locationCoordinates: '12.04318,-77.02824',
      bankName: 'BCP',
      bankAccountNumber: '5435643656',
      taxID: '6576756',
      documentOrPassport: '234324',
      otherRelevantDetails: 'Other info important',
      fileOtherInfo: 'This file'
    }
    /*
      defaultValues: {
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      phone: '',
      profilePhoto: '',
      country: '',
      city: '',
      fullAddress: '',
      locationCoordinates: '',
      bankName: '',
      bankAccountNumber: '',
      taxID: '',
      documentOrPassport: '',
      otherRelevantDetails: '',
      fileOtherInfo: ''
    }
    */
  });

  const saveApplication = async (data: ProspectForm) => {
    try {
      console.log('Form Data:', data);
      const onboardingUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await request(`${onboardingUrl}/graphql`, CREATE_PROSPECT, data);
      console.log("Datos guardados:", response);
      setIsApplicationSubmited(true)

    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  };

  const onNext = () => {
    setActiveStep((prevStep) => (prevStep < steps.length - 1 ? (prevStep + 1) : prevStep));
  };
  const onBack = () => {
    setActiveStep((prevStep) => (prevStep >= 1 ? (prevStep - 1) : prevStep));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Prospect Onboarding</h1>

      <Box sx={{ width: "100%", p: 3 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>

          <div style={{ maxWidth: 600, margin: 'auto' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep < steps.length && (
              <form onSubmit={handleSubmit(saveApplication)}>

                {/*Personal Information*/}
                {activeStep === 0 && (
                  <>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Name" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />

                    <Controller
                      name="lastname"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Last Name" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="birthday"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Birthdate" type="date" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Email" type="email" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Phone" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />

                    <Controller
                      name="profilePhoto"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Profile Photo" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />

                  </>
                )}

                {/*Location Information*/}
                {activeStep === 1 && (
                  <>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Country" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="city"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="city" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="fullAddress"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Full Address" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="locationCoordinates"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Location Coordinates" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                  </>
                )}
                {/*Bank Information*/}
                {activeStep === 2 && (
                  <>
                    <Controller
                      name="bankName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Bank name" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="bankAccountNumber"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Bank account number" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="taxID"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Tax ID" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="documentOrPassport"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Document or passport" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                  </>
                )}

                {/*Other inbformation*/}
                {activeStep === 3 && (
                  <>
                    <Controller
                      name="otherRelevantDetails"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="Other Relevant Details" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                    <Controller
                      name="fileOtherInfo"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField {...field} label="File Uploader" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                      )}
                    />
                  </>
                )}

                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2">
                    {activeStep > 0 &&
                      <Button onClick={() => onBack()} variant="contained" color="primary" style={{ marginTop: 20 }}>
                        Back
                      </Button>

                    }
                    <Button onClick={() => onNext()} variant="contained" color="primary" style={{ marginTop: 20 }}>
                      Next
                    </Button>
                  </div>

                  {activeStep === 3 &&
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                      save
                    </Button>
                  }
                </div>
              </form>
            )}
            {isApplicationSubmited && (
              <p>Thanks for your application! We will reach out to you as soon as possible! </p>
            )}

          </div>
        </Paper>
      </Box>
      <a
        href="/prospect/list"
        className="px-6 py-3 text-xl font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Qualifying Prospects
      </a>
    </div>
  );
}
