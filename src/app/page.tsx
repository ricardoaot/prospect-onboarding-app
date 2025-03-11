"use client"
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TextField, Button, Stepper, Step, StepLabel } from '@mui/material';
import { request, gql } from "graphql-request";
import {ProspectForm} from '../type/prospect'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  lastname: z.string().min(2, 'Lastname is required'),
  birthday: z.string().nonempty('Birthday is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().nonempty('Phone number is required'),
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

  const savePersonalInfo = async (data: ProspectForm) => {
    try {
      console.log('Form Data:', data);
      const response = await request("http://localhost:3001/graphql", CREATE_PROSPECT, data);
      console.log("Datos guardados:", response);


    } catch (error) {
      console.error("Error al guardar la información:", error);
    }
  };

  const onNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep < steps.length ? (
        <form onSubmit={handleSubmit(savePersonalInfo)}>
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
                  <TextField {...field} label="Apellido" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                )}
              />
              <Controller
                name="birthday"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField {...field} label="Fecha de nacimiento" type="date" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField {...field} label="Correo electrónico" type="email" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField {...field} label="Teléfono" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
                )}
              />

            </>
          )}
          {activeStep === 1 && (
            <>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                save
              </Button>
            </>
          )}
        </form>
      ) : (
        <p>All steps completed!</p>
      )}
      <Button onClick={() => onNext()} variant="contained" color="primary" style={{ marginTop: 20 }}>
        Next
      </Button>
    </div>
  );
}
