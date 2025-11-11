
interface ProgressBarProps {
    progress?: number;
}

const ProgressBar = ({ progress = 0 }: ProgressBarProps) => {

    return (
        <div className="bg-[#EBEBEB] h-1.5 sm:h-2 mx-4 sm:mx-8 md:mx-12 lg:mx-16 dark:bg-[#EBEBEB]">
            <div 
                className="bg-[#FF6B35] h-1.5 sm:h-2 transition-all duration-300" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}

export default ProgressBar;
