
interface FooterProps {
    onNext?: () => void;
    onBack?: () => void;
    isFirstStep?: boolean;
    isLastStep?: boolean;
    onSubmit?: () => void;
    isNextDisabled?: boolean;
}

const Footer = ({ onNext, onBack, isFirstStep = false, isLastStep = false, onSubmit, isNextDisabled = false }: FooterProps) => {

    const handleNextClick = () => {
        if (isNextDisabled) return;
        
        if (isLastStep && onSubmit) {
            onSubmit();
        } else if (onNext) {
            onNext();
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 md:p-5 flex flex-col items-center gap-2 sm:gap-3">
            <button
                onClick={handleNextClick}
                disabled={isNextDisabled}
                className={`text-white cursor-pointer text-sm sm:text-base rounded-lg px-10 sm:px-14 md:px-20 py-2.5 sm:py-3 md:py-3.5 transition-colors ${
                    isNextDisabled 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-[#006B5C] hover:bg-[#005a4d]'
                }`}
            >
                {isLastStep ? 'Create Moment' : 'Next'}
            </button>

            <button
                onClick={onBack}
                disabled={isFirstStep}
                className="bg-transparent cursor-pointer text-sm sm:text-base text-[#666666] rounded-lg px-10 sm:px-14 md:px-20 py-2.5 sm:py-3 md:py-3.5 hover:bg-gray-50 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                Back
            </button>
        </div>
    );
}

export default Footer;
