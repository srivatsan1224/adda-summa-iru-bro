import React, { createContext, useState, useContext, ReactNode } from "react";

interface FormData {
  amenities: {
    bathrooms: number;
    balcony: number;
    waterSupply: string;
    selectedAmenities: string[];
    secondaryNumber: string;
    directions: string;
  };
  rentalDetails: {
    propertyType: string;
    expectedRent: string;
    expectedDeposit: string;
    rentNegotiable: boolean;
    monthlyMaintenance: string;
    availableFrom: string;
    preferredTenants: string[];
    furnishing: string;
    parking: string;
    description: string;
  };
  localityDetails: {
    city: string;
    locality: string;
    landmark: string;
    mapCenter: { lat: number; lng: number };
    markerPosition: { lat: number; lng: number };
  };
  gallery: {
    photos: string[];
    startTime: string;
    endTime: string;
    availableAllDay: boolean;
  };
  propertyDetails: {
    apartmentType: string;
    bhkType: string;
    floor: string;
    totalFloors: string;
    propertyAge: string;
    facing: string;
    builtUpArea: string;
  };
  main: {
    userData: {
      name: string;
      email: string;
      mobile: string;
      location: string;
    };
  };
}

interface FormContextProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    amenities: {
      bathrooms: 0,
      balcony: 0,
      waterSupply: "",
      selectedAmenities: [],
      secondaryNumber: "",
      directions: "",
    },
    rentalDetails: {
      propertyType: "onlyRent",
      expectedRent: "",
      expectedDeposit: "",
      rentNegotiable: false,
      monthlyMaintenance: "",
      availableFrom: "",
      preferredTenants: [],
      furnishing: "",
      parking: "",
      description: "",
    },
    localityDetails: {
      city: "Chennai",
      locality: "",
      landmark: "",
      mapCenter: { lat: 13.0827, lng: 80.2707 },
      markerPosition: { lat: 13.0827, lng: 80.2707 },
    },
    gallery: {
      photos: [],
      startTime: "",
      endTime: "",
      availableAllDay: false,
    },
    propertyDetails: {
      apartmentType: "",
      bhkType: "",
      floor: "",
      totalFloors: "",
      propertyAge: "",
      facing: "",
      builtUpArea: "",
    },
    main: {
      userData: {
        name: "",
        email: "",
        mobile: "",
        location: "",
      },
    },
  });

  const updateFormData = <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
