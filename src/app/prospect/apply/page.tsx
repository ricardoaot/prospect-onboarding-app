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

  Country: z.string().nonempty('Country is required'),
  city: z.string().nonempty('City is required'),
  fullAddress: z.string().nonempty('Full address is required'),
  LocationCoordinates: z.string().nonempty('Location coordinates are required'),

  bankName: z.string().nonempty('Bank name is required'),
  bankAccountNumber: z.string().nonempty('Bank account number is required'),
  taxID: z.string().nonempty('Tax ID is required'),
  documentOrPassport: z.string().nonempty('Document Or Passport are required'),

  otherRelevantDetails: z.string().nullable(),
  fileOtherInfo: z.string().nullable()
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
    $phone: String!
  ) {
    createProspect(
      name: $name,
      lastname: $lastname,
      birthday: $birthday,
      email: $email,
      phone: $phone
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
      name: '',
      lastname: '',
      birthday: '',
      email: '',
      phone: '',
    },
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
                      name="Country"
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
                      name="LocationCoordinates"
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
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                      save
                    </Button>
                  </>
                )}
              </form>
            )}
            {isApplicationSubmited && (
              <p>All steps completed!</p>
            )}
            <Button onClick={() => onBack()} variant="contained" color="primary" style={{ marginTop: 20 }}>
              Back
            </Button>
            <Button onClick={() => onNext()} variant="contained" color="primary" style={{ marginTop: 20 }}>
              Next
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
}
