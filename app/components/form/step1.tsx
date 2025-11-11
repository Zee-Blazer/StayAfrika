'use client';

import { GiPaintBucket } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { FaBuildingColumns } from "react-icons/fa6";
import { TiTree } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep1 } from "@/lib/redux/slices/formSlice";

const categories = [
    {
        id: 1,
        icon: GiPaintBucket,
        name: "Art & Design"
    },
    {
        id: 2,
        icon: FaHeartbeat,
        name: "Fitness & Wellness"
    },
    {
        id: 3,
        icon: ImSpoonKnife,
        name: "Food & Drink"
    },
    {
        id: 4,
        icon: FaBuildingColumns,
        name: "History & Culture"
    },
    {
        id: 5,
        icon: TiTree,
        name: "Nature & Outdoors"
    }
];

const Step1 = () => {
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector((state) => state.form.step1.category);

    const handleCategorySelect = (categoryName: string) => {
        dispatch(updateStep1({ category: categoryName }));
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                What moment will you offer guests?
            </h1>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.name;
                    return (
                        <div 
                            key={category.id}
                            onClick={() => handleCategorySelect(category.name)}
                            className={`border ${
                                isSelected ? 'border-[#006B5C] bg-[#F0F9F7]' : 'border-[#D6D6D6]'
                            } py-4 sm:py-6 px-3 flex items-center gap-3 cursor-pointer hover:border-[#006B5C] transition-colors`}
                        >
                            <Icon className="text-xl sm:text-2xl shrink-0" />
                            <p className="text-[#2C3E50] text-sm sm:text-base">{category.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Step1;
