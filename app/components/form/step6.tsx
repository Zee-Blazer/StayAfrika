'use client';

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep6 } from "@/lib/redux/slices/formSlice";

const Step6 = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form.step6);

    const maxTitleLength = 45;
    const maxDescriptionLength = 200;

    const handleTitleChange = (value: string) => {
        if (value.length <= maxTitleLength) {
            dispatch(updateStep6({ title: value }));
        }
    };

    const handleDescriptionChange = (value: string) => {
        if (value.length <= maxDescriptionLength) {
            dispatch(updateStep6({ description: value }));
        }
    };

    const incrementGuests = () => dispatch(updateStep6({ guestCount: formData.guestCount + 1 }));
    const decrementGuests = () => {
        if (formData.guestCount > 0) dispatch(updateStep6({ guestCount: formData.guestCount - 1 }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Name your moment and tell guests more
            </h1>

            <div className="mt-6 space-y-6 mb-32">
                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g., Sunset sketching by the Lagoon"
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.title.length}/{maxTitleLength}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="e.g., Spend a peaceful evening sketching the waterfront with guidance from a local artist. All materials provided, no experience needed. Just bring your creativity."
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] resize-none text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.description.length}/{maxDescriptionLength}
                    </div>
                </div>

                <div className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg flex justify-between items-center">
                    <span className="text-[#2C3E50] text-sm sm:text-base">Guest</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={decrementGuests}
                            className="w-8 h-8 flex items-center justify-center text-xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                        >
                            -
                        </button>
                        <span className="text-lg sm:text-xl font-semibold text-[#2C3E50] min-w-10 text-center">
                            {formData.guestCount}
                        </span>
                        <button
                            onClick={incrementGuests}
                            className="w-8 h-8 flex items-center justify-center text-xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step6;
