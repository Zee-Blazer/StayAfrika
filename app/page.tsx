'use client';

import FormHeader from "@/app/components/constants/header";
import ProgressBar from "./components/constants/progress-bar";
import Footer from "./components/constants/footer";
import FormContent from "./components/form";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { nextStep, previousStep, submitForm } from "@/lib/redux/slices/formSlice";
import { useState } from "react";
import { validateStep } from "@/lib/utils/formValidation";

export default function Home() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const formState = useAppSelector((state) => state.form);
  const [triggerSubmit, setTriggerSubmit] = useState(false);
  const totalSteps = 10;

  const isCurrentStepValid = validateStep(currentStep, formState);

  const handleNext = () => {
    if (isCurrentStepValid) {
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleSubmit = async () => {
    setTriggerSubmit(true);
    setTimeout(() => setTriggerSubmit(false), 100);
    await dispatch(submitForm(formState));
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen pb-20">
      <FormHeader />
      <ProgressBar progress={progressPercentage} />
      <FormContent currentStep={currentStep} triggerSubmit={triggerSubmit} />
      <Footer 
        onNext={handleNext} 
        onBack={handleBack} 
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === totalSteps - 1}
        onSubmit={handleSubmit}
        isNextDisabled={!isCurrentStepValid}
      />
    </div>
  );
}
