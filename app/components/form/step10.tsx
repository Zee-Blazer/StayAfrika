'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import { FaCheckCircle, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep10, resetSubmitState } from "@/lib/redux/slices/formSlice";

interface Step10Props {
    triggerSubmit?: boolean;
}

const Step10: React.FC<Step10Props> = ({ triggerSubmit }) => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form.step10);
    const submitSuccess = useAppSelector((state) => state.form.submitSuccess);
    const [showModal, setShowModal] = useState(false);
    const [showBreakdown, setShowBreakdown] = useState(false);

    useEffect(() => {
        if (triggerSubmit && !showModal) {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [triggerSubmit, showModal]);

    useEffect(() => {
        if (submitSuccess) {
            setShowModal(true);
        }
    }, [submitSuccess]);

    const calculateEarnings = () => {
        const priceValue = parseFloat(formData.price) || 0;
        const serviceFee = priceValue * 0.15; 
        const earnings = priceValue - serviceFee;
        return earnings.toFixed(2);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        dispatch(resetSubmitState());
    };

    const handleGoToDashboard = () => {
        console.log('Navigate to dashboard');
        window.location.href = '/dashboard';
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 500,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="max-w-2xl mx-auto mb-32 px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Price per guest
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6 sm:mb-8">
                Set a price for up to 5 guests
            </p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#006B5C] focus-within:border-transparent">
                        <span className="bg-[#F5F5F5] px-3 sm:px-4 py-3 text-gray-700 font-medium text-sm sm:text-base">
                            ₦
                        </span>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => dispatch(updateStep10({ price: e.target.value }))}
                            placeholder="0.00"
                            className="flex-1 px-3 py-3 focus:outline-none text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div className="flex items-start">
                    <input
                        type="checkbox"
                        id="includeTaxes"
                        checked={formData.includeTaxes}
                        onChange={(e) => dispatch(updateStep10({ includeTaxes: e.target.checked }))}
                        className="mt-1 h-4 w-4 text-[#006B5C] border-gray-300 rounded focus:ring-[#006B5C] cursor-pointer"
                    />
                    <label htmlFor="includeTaxes" className="ml-2 text-sm text-gray-700 cursor-pointer">
                        Include taxes/fees in the price
                    </label>
                </div>

                <div className="mt-6 sm:mt-8">
                    <p className="text-center text-sm sm:text-base text-gray-600 mb-4">
                        You&apos;ll get:
                    </p>
                    <div className="flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#2C3E50]">
                            ₦{calculateEarnings()}
                        </span>
                        <button
                            type="button"
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="ml-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                        >
                            <FaChevronDown 
                                className={`transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
                                size={20}
                            />
                        </button>
                    </div>

                    
                    {showBreakdown && formData.price && (
                        <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-md space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-gray-600">Guest price</span>
                                <span className="font-medium">₦{parseFloat(formData.price).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-gray-600">Service fee (15%)</span>
                                <span className="font-medium text-red-600">-₦{(parseFloat(formData.price) * 0.15).toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-sm sm:text-base">
                                <span>You earn</span>
                                <span className="text-[#006B5C]">₦{calculateEarnings()}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            
            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="success-modal"
            >
                <Box sx={modalStyle}>
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="text-center">
                        
                        <div className="flex justify-center mb-4">
                            <FaCheckCircle className="text-green-500" size={64} />
                        </div>

                        <h2 className="text-[#2C3E50] text-2xl font-bold mb-5">
                            Listing submitted successfully!
                        </h2>

                        <p className="text-[#666666] mb-6 leading-relaxed">
                            Our team is now reviewing your details. You&apos;ll be notified once your listing is approved and ready to go live
                        </p>

                        <button
                            onClick={handleGoToDashboard}
                            className="w-full bg-[#006B5C] text-white py-3 rounded-lg font-medium hover:bg-[#005548] transition-colors cursor-pointer mb-4"
                        >
                            Go to Dashboard
                        </button>

                        <button
                            onClick={handleCloseModal}
                            className="text-[#666666] text-base underline cursor-pointer hover:text-gray-800 transition-colors"
                        >
                            View my listing
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Step10;
