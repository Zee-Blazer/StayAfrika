'use client';

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep7 } from "@/lib/redux/slices/formSlice";
import type { Activity } from "@/lib/redux/slices/formSlice";

interface ActivityListProps {
    activities: Activity[];
    onAddClick: () => void;
}

interface ActivityFormProps {
    onCancel: () => void;
}

const ActivityList = ({ activities, onAddClick }: ActivityListProps) => {
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Map out your moment
            </h1>

            <p className="text-sm sm:text-base text-[#666666] mt-3">
                Add activities to set expectations and get guests excited.
            </p>

            <div className="mt-6 space-y-4 mb-32">
                {activities.map((activity) => (
                    <div key={activity.id} className="border border-[#D6D6D6] rounded-lg px-3 py-4 flex gap-4">
                        <img 
                            src={activity.file ? URL.createObjectURL(activity.file as unknown as Blob) : "/placeholder.jpg"} 
                            alt={activity.title}
                            className="w-[60px] h-[60px] rounded-[10px] object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-[#2C3E50] text-sm sm:text-base">{activity.title}</span>
                                <span className="text-[#666666]">•</span>
                                <span className="text-[#666666] text-sm">{activity.time} mins</span>
                            </div>
                            <p className="text-[#666666] text-xs sm:text-sm mt-1 line-clamp-2">
                                {truncateText(activity.description, 80)}
                            </p>
                        </div>
                    </div>
                ))}

                <button
                    onClick={onAddClick}
                    className="w-full border border-[#D6D6D6] rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <AiOutlinePlus className="text-xl sm:text-2xl text-[#666666]" />
                    <span className="text-[#666666] text-base sm:text-lg">Add an activity</span>
                </button>
            </div>
        </div>
    );
};

const ActivityForm = ({ onCancel }: ActivityFormProps) => {
    const dispatch = useAppDispatch();
    const activities = useAppSelector((state) => state.form.step7.activities);
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        time: "0",
        file: null as File | null,
        fileName: ""
    });

    const maxTitleLength = 45;
    const maxDescriptionLength = 200;

    const handleTitleChange = (value: string) => {
        if (value.length <= maxTitleLength) {
            setFormData({ ...formData, title: value });
        }
    };

    const handleDescriptionChange = (value: string) => {
        if (value.length <= maxDescriptionLength) {
            setFormData({ ...formData, description: value });
        }
    };

    const incrementMinutes = () => {
        const currentTime = parseInt(formData.time) || 0;
        setFormData({ ...formData, time: (currentTime + 1).toString() });
    };
    
    const decrementMinutes = () => {
        const currentTime = parseInt(formData.time) || 0;
        if (currentTime > 0) {
            setFormData({ ...formData, time: (currentTime - 1).toString() });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ 
                ...formData, 
                file: file,
                fileName: file.name
            });
        }
    };

    const handleSubmit = () => {
        if (formData.title && formData.description) {
            const newActivity: Activity = {
                id: `activity-${Date.now()}`,
                title: formData.title,
                description: formData.description,
                time: formData.time,
                file: formData.file,
                fileName: formData.fileName
            };
            
            dispatch(updateStep7({ 
                activities: [...activities, newActivity],
                showForm: false 
            }));
        }
    };

    return (
        <div className="px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                Name your activity and tell guests more
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
                        placeholder="e.g., Guided Nature Walk"
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
                        placeholder="e.g., Take a relaxed walk through nearby trails while learning about local plants, birds, and landmarks from your host"
                        rows={4}
                        className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-[#2C3E50] resize-none text-sm sm:text-base"
                    />
                    <div className="text-right text-sm text-[#666666] mt-1">
                        {formData.description.length}/{maxDescriptionLength}
                    </div>
                </div>

                <div className="w-full px-4 py-3 border border-[#D6D6D6] rounded-lg flex justify-between items-center">
                    <span className="text-[#2C3E50] text-sm sm:text-base">Minutes</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={decrementMinutes}
                            className="w-8 h-8 flex items-center justify-center text-xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                        >
                            -
                        </button>
                        <span className="text-lg sm:text-xl font-semibold text-[#2C3E50] min-w-10 text-center">
                            {formData.time}
                        </span>
                        <button
                            onClick={incrementMinutes}
                            className="w-8 h-8 flex items-center justify-center text-xl font-bold text-[#2C3E50] bg-[#EBEBEB] rounded-full hover:bg-[#d6d6d6] transition-colors cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                        Cover Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <label className="w-full sm:w-[204px] px-4 py-3 border border-[#006B5C] rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                            <MdUpload className="text-xl text-[#666666]" />
                            <span className="text-[#666666] text-sm sm:text-base">Upload a file</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                        {formData.fileName && (
                            <span className="text-xs sm:text-sm text-[#666666] truncate max-w-full">{formData.fileName}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto px-6 py-3 border border-[#D6D6D6] rounded-lg text-[#666666] hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto px-6 py-3 bg-[#006B5C] text-white rounded-lg hover:bg-[#005a4d] transition-colors"
                    >
                        Add Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

const Step7 = () => {
    const dispatch = useAppDispatch();
    const { activities, showForm } = useAppSelector((state) => state.form.step7);

    const handleShowForm = () => {
        dispatch(updateStep7({ showForm: true }));
    };

    const handleCancelForm = () => {
        dispatch(updateStep7({ showForm: false }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            {!showForm ? (
                <ActivityList 
                    activities={activities} 
                    onAddClick={handleShowForm} 
                />
            ) : (
                <ActivityForm 
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
};

export default Step7;
