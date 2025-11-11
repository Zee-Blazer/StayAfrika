'use client';

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep3 } from "@/lib/redux/slices/formSlice";

const Step3 = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form.step3);

    const handleChange = (field: 'experience' | 'highlights' | 'achievements', value: string, maxLength: number) => {
        if (value.length <= maxLength) {
            dispatch(updateStep3({ [field]: value }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Tell us about your experience or training
            </h1>

            <p className="text-sm sm:text-base text-[#666666] mt-3">
                Help guests feel confident by sharing your background and qualifications.
            </p>

            <div className="mt-6 space-y-6 mb-32">
                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => handleChange('experience', e.target.value, 45)}
                        placeholder="e.g., ballroom dancer, fashion stylist, etc"
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.experience.length}/45
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Experience
                    </label>
                    <textarea
                        value={formData.highlights}
                        onChange={(e) => handleChange('highlights', e.target.value, 200)}
                        placeholder="e.g., I'm a practicing visual artist with over 8 years of experience in mixed media and have hosted several community art workshops."
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] resize-none text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.highlights.length}/200
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Career Highlights
                    </label>
                    <textarea
                        value={formData.achievements}
                        onChange={(e) => handleChange('achievements', e.target.value, 200)}
                        placeholder="e.g., My work was recently featured in a group exhibition at the National Gallery in Abuja."
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] resize-none text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.achievements.length}/200
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3;
