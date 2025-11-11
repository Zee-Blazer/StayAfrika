'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep9 } from "@/lib/redux/slices/formSlice";

const Step9 = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form.step9);

    const transportOptions = ['Car', 'Bus', 'Plane', 'Bike', 'Keke', 'Boat'];

    const handleTransportToggle = (option: string) => {
        const newSelection = formData.selectedTransport.includes(option)
            ? formData.selectedTransport.filter(item => item !== option)
            : [...formData.selectedTransport, option];
        dispatch(updateStep9({ selectedTransport: newSelection }));
    };

    const handleRequiredItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 200) {
            dispatch(updateStep9({ requiredItems: value }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto mb-32 px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                How should your guests prepare?
            </h1>

            <div className="mt-6 sm:mt-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Will you offer transportation?
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => dispatch(updateStep9({ transportation: 'Yes' }))}
                                className={`px-8 sm:px-12 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                    formData.transportation === 'Yes'
                                        ? 'bg-[#FFF7F5] text-gray-700 border-2 border-[#FF6B35]'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch(updateStep9({ transportation: 'No' }))}
                                className={`px-8 sm:px-12 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                    formData.transportation === 'No'
                                        ? 'bg-[#FFF7F5] text-gray-700 border-2 border-[#FF6B35]'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                No
                            </button>
                        </div>

                        {formData.transportation === 'Yes' && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How? (select all that apply)
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {transportOptions.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleTransportToggle(option)}
                                            className={`px-4 py-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                                formData.selectedTransport.includes(option)
                                                    ? 'bg-[#FFF7F5] text-gray-700 border-2 border-[#FF6B35]'
                                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Will guests need to pay to join?
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => dispatch(updateStep9({ paymentRequired: 'Yes' }))}
                                className={`px-8 sm:px-12 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                    formData.paymentRequired === 'Yes'
                                        ? 'bg-[#FFF7F5] text-gray-700 border-2 border-[#FF6B35]'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => dispatch(updateStep9({ paymentRequired: 'No' }))}
                                className={`px-8 sm:px-12 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                    formData.paymentRequired === 'No'
                                        ? 'bg-[#FFF7F5] text-gray-700 border-2 border-[#FF6B35]'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                No
                            </button>
                        </div>

                        {formData.paymentRequired === 'Yes' && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment link
                                </label>
                                <input
                                    type="url"
                                    value={formData.paymentLink}
                                    onChange={(e) => dispatch(updateStep9({ paymentLink: e.target.value }))}
                                    placeholder="Enter the URL where guests can make payment to you"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B5C] focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Required items
                        </label>
                        <textarea
                            value={formData.requiredItems}
                            onChange={handleRequiredItemsChange}
                            placeholder="Let guests know if they should come with any item (e.g., hat, flashlight, snacks)"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B5C] focus:border-transparent resize-none text-sm sm:text-base"
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {formData.requiredItems.length}/200
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step9;
