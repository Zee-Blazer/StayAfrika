'use client';

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Modal, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateStep8 } from "@/lib/redux/slices/formSlice";
import type { Schedule } from "@/lib/redux/slices/formSlice";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Step8 = () => {
    const dispatch = useAppDispatch();
    const schedules = useAppSelector((state) => state.form.step8.schedules);
    
    const [openModal, setOpenModal] = useState(false);
    const [tempSchedule, setTempSchedule] = useState<Schedule>({
        id: '',
        days: [],
        timeFrom: '',
        timeTo: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleOpenModal = () => {
        setTempSchedule({
            id: `schedule-${Date.now()}`,
            days: [],
            timeFrom: '',
            timeTo: ''
        });
        setEditingId(null);
        setOpenModal(true);
    };

    const handleOpenModalEdit = (schedule: Schedule) => {
        setTempSchedule(schedule);
        setEditingId(schedule.id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingId(null);
    };

    const toggleDay = (day: string) => {
        const newDays = tempSchedule.days.includes(day)
            ? tempSchedule.days.filter(d => d !== day)
            : [...tempSchedule.days, day];
        setTempSchedule({ ...tempSchedule, days: newDays });
    };

    const handleSave = () => {
        if (tempSchedule.days.length > 0 && tempSchedule.timeFrom && tempSchedule.timeTo) {
            if (editingId) {
                // Edit existing schedule
                const updatedSchedules = schedules.map(s => 
                    s.id === editingId ? tempSchedule : s
                );
                dispatch(updateStep8({ schedules: updatedSchedules }));
            } else {
                // Add new schedule
                dispatch(updateStep8({ schedules: [...schedules, tempSchedule] }));
            }
            handleCloseModal();
        }
    };

    const handleClearSelection = () => {
        setTempSchedule({ ...tempSchedule, days: [], timeFrom: '', timeTo: '' });
    };

    const formatDays = (days: string[]) => {
        if (days.length === 0) return '';
        if (days.length === 1) return days[0];
        if (days.length === 2) return days.join(', ');
        return `${days[0]}, ${days[1]}...`;
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
        p: 3,
        maxHeight: '90vh',
        overflow: 'auto'
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-[#2C3E50] text-xl sm:text-2xl font-bold mt-4 sm:mt-6">
                When are you available?
            </h1>

            <p className="text-sm sm:text-base text-[#666666] mt-3">
                Set your availability for hosting this moment
            </p>

            <div className="mt-6 space-y-4 mb-32">
                {schedules.map((schedule) => (
                    <div
                        key={schedule.id}
                        onClick={() => handleOpenModalEdit(schedule)}
                        className="border border-[#D6D6D6] rounded-lg px-4 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div>
                            <div className="font-semibold text-[#2C3E50] text-sm sm:text-base mb-1">
                                {schedule.days.length > 0 ? formatDays(schedule.days) : 'Select days'}
                            </div>
                            <div className="text-[#666666] text-xs sm:text-sm">
                                {schedule.timeFrom && schedule.timeTo 
                                    ? `${schedule.timeFrom} - ${schedule.timeTo}` 
                                    : 'Set time'}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPencilAlt className="text-[#666666] text-base sm:text-lg" />
                            <MdKeyboardArrowDown className="text-[#666666] text-xl sm:text-2xl" />
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleOpenModal}
                    className="w-full border border-[#D6D6D6] rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <AiOutlinePlus className="text-xl sm:text-2xl text-[#666666]" />
                    <span className="text-[#666666] text-base sm:text-lg">Add availability</span>
                </button>
            </div>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="schedule-modal"
            >
                <Box sx={modalStyle}>
                    <h2 className="text-lg sm:text-xl font-bold text-[#2C3E50] mb-4">
                        Set your availability
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-3">
                                Days
                            </label>
                            <div className="w-full px-3 py-2 border border-[#D6D6D6] rounded-md bg-white">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => toggleDay(day)}
                                            className={`px-3 py-2 text-xs sm:text-sm rounded-md border transition-colors cursor-pointer ${
                                                tempSchedule.days.includes(day)
                                                    ? 'bg-[#006B5C] text-white border-[#006B5C]'
                                                    : 'bg-white text-[#2C3E50] border-[#D6D6D6] hover:bg-gray-50'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                From
                            </label>
                            <input
                                type="time"
                                value={tempSchedule.timeFrom}
                                onChange={(e) => setTempSchedule({ ...tempSchedule, timeFrom: e.target.value })}
                                placeholder="09:00"
                                className="w-full px-3 py-2 border border-[#D6D6D6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C3E50] mb-2">
                                To
                            </label>
                            <input
                                type="time"
                                value={tempSchedule.timeTo}
                                onChange={(e) => setTempSchedule({ ...tempSchedule, timeTo: e.target.value })}
                                placeholder="17:00"
                                className="w-full px-3 py-2 border border-[#D6D6D6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B5C] text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                            <button
                                onClick={handleSave}
                                className="w-full px-6 py-2 bg-[#006B5C] text-white rounded-lg hover:bg-[#005a4d] transition-colors text-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleClearSelection}
                                className="text-[#666666] underline text-sm cursor-pointer hover:text-[#2C3E50] text-center"
                            >
                                Clear selection
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Step8;
