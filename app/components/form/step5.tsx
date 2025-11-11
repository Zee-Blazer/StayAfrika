'use client';

import { FaTrash } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep5 } from "@/lib/redux/slices/formSlice";

const Step5 = () => {
    const dispatch = useAppDispatch();
    const uploadedImages = useAppSelector((state) => state.form.step5.uploadedImages);
    const minImages = 5;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: Array<{ id: string; preview: string; file: File | null }> = [];
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push({
                        id: `${Date.now()}-${Math.random()}`,
                        preview: reader.result as string,
                        file: file
                    });
                    if (newImages.length === files.length) {
                        dispatch(updateStep5({ 
                            uploadedImages: [...uploadedImages, ...newImages] 
                        }));
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDeleteImage = (id: string) => {
        dispatch(updateStep5({ 
            uploadedImages: uploadedImages.filter(img => img.id !== id) 
        }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Add some photos of your work
            </h1>

            <p className="text-sm sm:text-base text-[#666666] mt-3">
                Upload a minimum of 5 photos to continue
            </p>

            <div className="mt-6 border-2 border-dashed border-[#D6D6D6] rounded-lg p-6 sm:p-8 text-center">
                <MdCloudUpload className="text-5xl sm:text-6xl text-[#888888] mx-auto mb-4" />
                
                <h3 className="text-base sm:text-lg font-bold text-[#888888] mb-2">
                    Upload your file(s) here
                </h3>
                
                <p className="text-xs sm:text-sm text-[#888888] mb-4">
                    JPG, PNG, up to 2MB per file
                </p>
                
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                />
                <label
                    htmlFor="fileInput"
                    className="inline-block bg-[#006B5C] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#005a4d] transition-colors text-sm sm:text-base"
                >
                    Browse File
                </label>
            </div>

            {uploadedImages.length > 0 && (
                <>
                    <div className="border-t border-[#D6D6D6] mt-8 mb-6"></div>
                    
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-[#2C3E50]">Media Preview</h3>
                        <span className="text-[#10B981] font-medium text-sm sm:text-base">
                            {uploadedImages.length}/{minImages}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-32">
                        {uploadedImages.map((image) => (
                            <div
                                key={image.id}
                                className="relative rounded-lg overflow-hidden aspect-square"
                            >
                                <img
                                    src={image.preview}
                                    alt="Upload preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => handleDeleteImage(image.id)}
                                    className="absolute top-2 right-2 bg-[#EBEBEB] rounded-full p-2 hover:bg-[#d6d6d6] transition-colors"
                                >
                                    <FaTrash className="text-red-500 text-xs" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Step5;
