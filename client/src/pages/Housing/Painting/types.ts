import { ReactNode } from 'react';

export interface ServiceCardProps {
  label: string;
  tag?: string;
  icon: string;
}

export interface DetailedServiceCardProps {
  title: string;
  rating: string;
  reviews: string;
  features: string[];
  image: string;
  onEstimateClick: () => void;
}

export interface StepProps {
  number: string;
  title: string;
  description: string;
}

export interface PromiseCardProps {
  title: string;
  icon: string;
}

export interface ServiceFeatureProps {
  icon: ReactNode;
  text: string;
}