import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyHeaderProps {
    title: string;
    location: string;
    rent: number;
    deposit: number;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
    title,
    location,
    rent,
    deposit,
}) => {
    return (
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-6">
                    <Link
                        to="/propertylist"
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-gray-900 tracking-tight leading-tight line-clamp-1 font-sans">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1 font-medium">
                            {location}
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                            <p className="text-lg font-semibold text-emerald-600">
                                ₹{rent.toLocaleString()}
                                <span className="text-sm text-gray-500 font-normal">+</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-500">Deposit</p>
                            <p className="text-lg font-semibold text-gray-900">
                                ₹{deposit.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};