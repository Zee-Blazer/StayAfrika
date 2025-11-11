'use client';

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep2 } from "@/lib/redux/slices/formSlice";

const Step2 = () => {
    const dispatch = useAppDispatch();
    const years = useAppSelector((state) => state.form.step2.years);
    const selectedCategory = useAppSelector((state) => state.form.step1.category);

    const increment = () => dispatch(updateStep2({ years: years + 1 }));
    const decrement = () => {
        if (years > 0) dispatch(updateStep2({ years: years - 1 }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                How many years have you worked in {selectedCategory || 'your field'}?
            </h1>

            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 sm:gap-6">
                <button
                    onClick={decrement}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                >
                    -
                </button>
                <span className="text-3xl sm:text-4xl font-bold text-[#2C3E50] min-w-[60px] sm:min-w-20 text-center">
                    {years}
                </span>
                <button
                    onClick={increment}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Step2;
