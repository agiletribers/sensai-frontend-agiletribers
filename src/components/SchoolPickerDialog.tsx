"use client";

import React from 'react';
import { X } from 'lucide-react';

interface School {
    id: string;
    name: string;
    role?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    url?: string;
    slug?: string;
}

interface SchoolPickerDialogProps {
    open: boolean;
    onClose: () => void;
    schools: School[];
    onSelectSchool: (schoolId: string) => void;
    onCreateSchool: () => void;
}

export default function SchoolPickerDialog({
    open,
    onClose,
    schools,
    onSelectSchool,
    onCreateSchool
}: SchoolPickerDialogProps) {
    if (!open) return null;

    // Check if user owns any schools
    const hasOwnedSchool = schools.some(school =>
        school.role === 'owner'
    );

    return (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                className="w-full max-w-md bg-[#f5f5f5] rounded-lg shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Dialog Header */}
                <div className="flex justify-between items-center p-6">
                    <h2 className="text-xl font-light text-black">Select a School</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-800 hover:text-black transition-colors focus:outline-none cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Dialog Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {schools.map(school => (
                            <button
                                key={school.id}
                                onClick={() => onSelectSchool(school.id)}
                                className="w-full px-4 py-3 bg-[#ffffff] text-black text-left rounded-lg hover:bg-gray-200 transition-colors focus:outline-none cursor-pointer flex justify-between items-center"
                            >
                                <span>{school.name}</span>
                                {(school.role === 'owner' || school.role === 'admin') && (
                                    <span className={`text-xs px-2 py-1 rounded-full text-white ${school.role === 'owner' ? 'bg-[#f2ab55]' : 'bg-blue-600'
                                        }`}>
                                        {school.role === 'owner' ? 'Owner' : 'Admin'}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dialog Footer */}
                {!hasOwnedSchool && (<div className="flex justify-end gap-4 p-6">
                    <button
                        onClick={onCreateSchool}
                        className="px-6 py-2 bg-[#f2ab55] text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
                    >
                        Create a School
                    </button>

                </div>
                )}
            </div>
        </div>
    );
} 