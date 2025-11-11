'use client';

import { MdLocationOn } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep4 } from "@/lib/redux/slices/formSlice";

const Step4 = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form.step4);

    const handleLocationSearch = () => {
        dispatch(updateStep4({ showAddressForm: true }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            {!formData.showAddressForm ? (
                <div>
                    <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                        Where should guests meet you?
                    </h1>

                    <div className="mt-6 relative">
                        <MdLocationOn className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#666666] text-xl" />
                        <input
                            type="text"
                            value={formData.searchQuery}
                            onChange={(e) => dispatch(updateStep4({ searchQuery: e.target.value }))}
                            placeholder="Enter your country..."
                            onFocus={handleLocationSearch}
                            className="w-full pl-12 pr-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                        Confirm the location
                    </h1>

                    <div className="mt-6 space-y-6 mb-32">
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                Country / Region
                            </label>
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => dispatch(updateStep4({ country: e.target.value }))}
                                placeholder="Nigeria"
                                className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                Street Address
                            </label>
                            <input
                                type="text"
                                value={formData.streetAddress}
                                onChange={(e) => dispatch(updateStep4({ streetAddress: e.target.value }))}
                                placeholder="e.g., 123 main street"
                                className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                City / Town / Village
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => dispatch(updateStep4({ city: e.target.value }))}
                                placeholder="e.g., Bwari"
                                className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                State / Province / Territory
                            </label>
                            <input
                                type="text"
                                value={formData.state}
                                onChange={(e) => dispatch(updateStep4({ state: e.target.value }))}
                                placeholder="e.g., Federal Capital Territory"
                                className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                value={formData.zipCode}
                                onChange={(e) => dispatch(updateStep4({ zipCode: e.target.value }))}
                                placeholder="e.g., 12345"
                                className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] text-sm sm:text-base"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step4;
