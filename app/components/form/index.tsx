'use client';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';
import Step8 from './step8';
import Step9 from './step9';
import Step10 from './step10';

const formSteps = [
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    Step10,
];

interface FormContentProps {
    currentStep?: number;
    triggerSubmit?: boolean;
}

const FormContent = ({ currentStep = 0, triggerSubmit = false }: FormContentProps) => {
    
    const CurrentStepComponent = formSteps[currentStep];

    if (!CurrentStepComponent) {
        return <div className="text-center text-red-500">Invalid step</div>;
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-6">
            {currentStep === 9 ? (
                <Step10 triggerSubmit={triggerSubmit} />
            ) : (
                <CurrentStepComponent />
            )}
        </div>
    );
};

export default FormContent;
