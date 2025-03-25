"use client"
import { useEffect, useState } from 'react';
import { useForm, Controller, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  MenuItem,
  Select,
  FormHelperText,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { ProspectForm, Country } from '../../../type'
import Swal from "sweetalert2"
import { getCountries } from '@/components/ProspectApplication/CountryListQueries';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_PROSPECT } from '@/graphql/mutations';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  lastname: z.string().min(2, 'Lastname is required'),
  birthday: z.string().nonempty('Birthday is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().nonempty('Phone number is required'),

  profilePhoto: z
    .instanceof(File, { message: 'Profile photo is required' })
    .refine((file) => file.size > 0, 'Profile photo is required'),

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

type FormSchema = z.infer<typeof schema>;

const steps = [
  'Personal Information',
  'Location Information',
  'Bank Information',
  'Other Information'
];

const stepFields: Record<number, Path<FormSchema>[]> = {
  0: ["name", "lastname", "birthday", "email", "phone", "profilePhoto"],
  1: ["country", "city", "fullAddress", "locationCoordinates"],
  2: ["bankName", "bankAccountNumber", "taxID", "documentOrPassport"],
  3: ["otherRelevantDetails", "fileOtherInfo"]
};

//TODO: move create query to another file
// Define GraphQL mutation


export default function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isApplicationSubmited, setIsApplicationSubmited] = useState(false);
  const [countries, setCountries] = useState<Country[]>([])
  const [isAllowedCountry, setIsAllowedCountry] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  //TODO: deocuople this page in components
  //TODO: apply SSR to load the countries in the server

  const getAndSetCountries = async () => {
    const countriesData = await getCountries()
    console.log('countriesData', countriesData)
    setCountries(countriesData)
  }

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };


  //TODO: implement i18 to manage strings values separately and categorize by language

  const showInvalidCountryMessage = () => {
    Swal.fire({
      title: "Country no allowed",
      text: "Thanks for your interest in apply but currently we only accept countries where USD is one of their officials currencies",
      icon: "error",
      showConfirmButton: false,
    });
  }

  const handleSelectCountry = (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value
    const allowedCountry = countries.find((country) => country.id === selectedCountry)?.hasUSD || false

    setIsAllowedCountry(allowedCountry)

    if (!allowedCountry)
      showInvalidCountryMessage()
  };

  useEffect(() => {
    getAndSetCountries()
  }, [])

  const {
    control,
    handleSubmit,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    //Default values set for an easy test
    defaultValues: {
      name: 'Augusto',
      lastname: 'Talledo',
      birthday: '2025-01-12',
      email: 'no-repeat-this-email-1@example.com',
      phone: '8987879',
      country: 'PER',
      city: 'Lima',
      fullAddress: 'Address (Test)',
      locationCoordinates: '12.04318,-77.02824',
      bankName: 'BCP',
      bankAccountNumber: '5435643656',
      taxID: '10767566546',
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

  const [createProspect] = useMutation(CREATE_PROSPECT);

  const saveApplication = async (
    data: ProspectForm
  ) => {

    try {
      if (!isAllowedCountry) {
        showInvalidCountryMessage();
        return false;
      }

      await createProspect({
        variables: {
          ...data,
          profilePhoto: data.profilePhoto,
        },
      });

      setIsApplicationSubmited(true);
    } catch (err) {
      let errorMessage = 'Something went wrong. Please try again later.';

      if (err instanceof ApolloError) {
        const graphqlError = err.graphQLErrors?.[0];

        if (graphqlError?.extensions?.code === 'PROSPECT_EMAIL_ALREADY_EXISTS') {
          errorMessage = 'Prospect Email already exists, please try a different email.';
        }
      }

      console.error('Error:', err);

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        timer: 3500,
        showConfirmButton: false,
        position: 'top',
        toast: true,
      });
    }
  };

  const areValidStepFields = async (activeStep: number): Promise<boolean> => {
    return trigger(stepFields[activeStep])
  }

  const onNext = async () => {
    const areValidStepFieldsResult = await areValidStepFields(activeStep)

    if (!areValidStepFieldsResult) {
      Swal.fire({
        title: "Required Fields",
        text: "Please fill the required fields",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        position: 'top',
        toast: true
      });

      return false
    }
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

                {isApplicationSubmited ? (
                  <>
                    <div className="min-h-[400px] bg-gray-100 flex items-center justify-center">
                      <p>Thanks for your application! We will reach out to you as soon as possible! </p>
                    </div>
                  </>
                ) : (
                  <>

                    {/*Personal Information*/}
                    {activeStep === 0 && (
                      <div className="flex flex-col space-y-4">
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
                          defaultValue={undefined}
                          render={({ field: { onChange, ref } }) => (
                            <input
                              type="file"
                              ref={ref}
                              accept="image/*"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files?.[0] || null;
                                onChange(file);
                                handleImageChange(file);
                              }}
                              style={{ display: 'block', margin: '16px 0' }}
                            />
                          )}
                        />

                        {imagePreview && (
                          <Box mt={2}>
                            <Typography variant="body2" color="text.secondary">
                              Preview:
                            </Typography>
                            <Box
                              component="img"
                              src={imagePreview}
                              alt="Preview"
                              sx={{ mt: 1, width: '200px', borderRadius: 2, boxShadow: 1 }}
                            />
                          </Box>
                        )}
                      </div>
                    )}

                    {/*Location Information*/}
                    {activeStep === 1 && (
                      <>
                        <Controller
                          name="country"
                          control={control}
                          defaultValue=""
                          render={({ field, fieldState }) => (
                            <>
                              <Select
                                {...field}
                                labelId="country-label"
                                label="Country"
                                fullWidth
                                error={!!fieldState.error}
                                onChange={(event) => {
                                  field.onChange(event.target.value);
                                  handleSelectCountry(event);
                                }}
                              >
                                {countries.map((country) => (
                                  <MenuItem key={country.id} value={country.id}>
                                    {country.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                            </>
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
                    {/*Buttons*/}
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {activeStep > 0 &&
                          <Button onClick={() => onBack()} variant="contained" color="primary" style={{ marginTop: 20 }}>
                            Back
                          </Button>

                        }
                        {activeStep < 3 &&
                          <Button onClick={() => onNext()} variant="contained" color="primary" style={{ marginTop: 20 }}>
                            Next
                          </Button>
                        }
                      </div>

                      {activeStep === 3 &&
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                          save
                        </Button>
                      }
                    </div>
                  </>
                )}
              </form>
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
