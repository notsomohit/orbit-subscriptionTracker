export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';
export type SubscriptionFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type SubscriptionCurrency = 'USD' | 'EUR' | 'RS';
export type SubscriptionCategory =
  | 'sports'
  | 'news'
  | 'entertainment'
  | 'lifestyle'
  | 'technology'
  | 'finance'
  | 'politics';

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscription {
  _id: string;
  id?: string;
  name: string;
  price: number;
  currency: SubscriptionCurrency;
  frequency: SubscriptionFrequency;
  category: SubscriptionCategory;
  paymentMethod: string;
  status: SubscriptionStatus;
  startDate: string;
  renewalDate: string;
  user: string | { _id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowRunInfo {
  subscriptionId: string;
  subscriptionName: string;
  renewalDate: string;
  workflowRunId?: string;
  reminders: {
    daysBefore: number;
    reminderDate: string;
    subject: string;
    status: 'scheduled' | 'sent' | 'skipped';
  }[];
}

export interface CreateSubscriptionPayload {
  name: string;
  price: number;
  currency: SubscriptionCurrency;
  frequency: SubscriptionFrequency;
  category: SubscriptionCategory;
  paymentMethod: string;
  startDate: string;
}
