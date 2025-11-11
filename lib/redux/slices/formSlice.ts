import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Types for form data
export interface Step1Data {
  category: string;
}

export interface Step2Data {
  years: number;
}

export interface Step3Data {
  experience: string;
  highlights: string;
  achievements: string;
}

export interface Step4Data {
  searchQuery: string;
  showAddressForm: boolean;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Step5Data {
  uploadedImages: Array<{ id: string; preview: string; file: File | null }>;
}

export interface Step6Data {
  title: string;
  description: string;
  guestCount: number;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
  file: File | null;
  fileName: string;
}

export interface Step7Data {
  activities: Activity[];
  showForm: boolean;
}

export interface Schedule {
  id: string;
  days: string[];
  timeFrom: string;
  timeTo: string;
}

export interface Step8Data {
  schedules: Schedule[];
}

export interface Step9Data {
  transportation: string;
  selectedTransport: string[];
  paymentRequired: string;
  paymentLink: string;
  requiredItems: string;
}

export interface Step10Data {
  price: string;
  includeTaxes: boolean;
}

export interface FormState {
  currentStep: number;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
  step8: Step8Data;
  step9: Step9Data;
  step10: Step10Data;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

const initialState: FormState = {
  currentStep: 0,
  step1: { category: '' },
  step2: { years: 1 },
  step3: { experience: '', highlights: '', achievements: '' },
  step4: {
    searchQuery: '',
    showAddressForm: false,
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  step5: { uploadedImages: [] },
  step6: { title: '', description: '', guestCount: 1 },
  step7: { activities: [], showForm: false },
  step8: { schedules: [] },
  step9: {
    transportation: '',
    selectedTransport: [],
    paymentRequired: '',
    paymentLink: '',
    requiredItems: '',
  },
  step10: { price: '', includeTaxes: false },
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
};

// Async thunk for form submission
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData: FormState, { rejectWithValue }) => {
    try {
      // Simulate API call to a real endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: formData.step1.category,
          experience_years: formData.step2.years,
          title: formData.step6.title,
          description: formData.step6.description,
          price: formData.step10.price,
          guests: formData.step6.guestCount,
          location: {
            city: formData.step4.city,
            state: formData.step4.state,
            country: formData.step4.country,
          },
          activities_count: formData.step7.activities.length,
          schedules_count: formData.step8.schedules.length,
          transportation_offered: formData.step9.transportation === 'Yes',
          payment_required: formData.step9.paymentRequired === 'Yes',
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred during submission'
      );
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 9) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    updateStep1: (state, action: PayloadAction<Partial<Step1Data>>) => {
      state.step1 = { ...state.step1, ...action.payload };
    },
    updateStep2: (state, action: PayloadAction<Partial<Step2Data>>) => {
      state.step2 = { ...state.step2, ...action.payload };
    },
    updateStep3: (state, action: PayloadAction<Partial<Step3Data>>) => {
      state.step3 = { ...state.step3, ...action.payload };
    },
    updateStep4: (state, action: PayloadAction<Partial<Step4Data>>) => {
      state.step4 = { ...state.step4, ...action.payload };
    },
    updateStep5: (state, action: PayloadAction<Partial<Step5Data>>) => {
      state.step5 = { ...state.step5, ...action.payload };
    },
    updateStep6: (state, action: PayloadAction<Partial<Step6Data>>) => {
      state.step6 = { ...state.step6, ...action.payload };
    },
    updateStep7: (state, action: PayloadAction<Partial<Step7Data>>) => {
      state.step7 = { ...state.step7, ...action.payload };
    },
    updateStep8: (state, action: PayloadAction<Partial<Step8Data>>) => {
      state.step8 = { ...state.step8, ...action.payload };
    },
    updateStep9: (state, action: PayloadAction<Partial<Step9Data>>) => {
      state.step9 = { ...state.step9, ...action.payload };
    },
    updateStep10: (state, action: PayloadAction<Partial<Step10Data>>) => {
      state.step10 = { ...state.step10, ...action.payload };
    },
    resetForm: () => initialState,
    resetSubmitState: (state) => {
      state.isSubmitting = false;
      state.submitError = null;
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.submitSuccess = false;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitSuccess = true;
        state.submitError = null;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitSuccess = false;
        state.submitError = action.payload as string;
      });
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateStep1,
  updateStep2,
  updateStep3,
  updateStep4,
  updateStep5,
  updateStep6,
  updateStep7,
  updateStep8,
  updateStep9,
  updateStep10,
  resetForm,
  resetSubmitState,
} = formSlice.actions;

export default formSlice.reducer;
