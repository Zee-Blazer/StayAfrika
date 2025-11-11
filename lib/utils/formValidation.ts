import { FormState } from '@/lib/redux/slices/formSlice';

export const validateStep = (step: number, formState: FormState): boolean => {
  switch (step) {
    case 0: 
      return formState.step1.category.trim() !== '';

    case 1:
      return formState.step2.years >= 1;

    case 2:
      return (
        formState.step3.experience.trim() !== '' &&
        formState.step3.highlights.trim() !== '' &&
        formState.step3.achievements.trim() !== ''
      );

    case 3: 
      if (formState.step4.showAddressForm) {
        return (
          formState.step4.streetAddress.trim() !== '' &&
          formState.step4.city.trim() !== '' &&
          formState.step4.state.trim() !== '' &&
          formState.step4.zipCode.trim() !== '' &&
          formState.step4.country.trim() !== ''
        );
      }
      return formState.step4.searchQuery.trim() !== '';

    case 4: 
      return formState.step5.uploadedImages.length > 0;

    case 5: 
      return (
        formState.step6.title.trim() !== '' &&
        formState.step6.description.trim() !== '' &&
        formState.step6.guestCount >= 1
      );

    case 6: 
      return formState.step7.activities.length > 0;

    case 7: 
      return formState.step8.schedules.length > 0;

    case 8: 
      
      if (formState.step9.transportation === '') return false;
      
      if (formState.step9.transportation === 'Yes' && formState.step9.selectedTransport.length === 0) {
        return false;
      }
      
      if (formState.step9.paymentRequired === '') return false;
      
      if (formState.step9.paymentRequired === 'Yes' && formState.step9.paymentLink.trim() === '') {
        return false;
      }
      
      return formState.step9.requiredItems.trim() !== '';

    case 9: 
      return formState.step10.price.trim() !== '' && parseFloat(formState.step10.price) > 0;

    default:
      return true;
  }
};
