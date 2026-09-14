import type {
  Subscription,
  CreateSubscriptionPayload,
  WorkflowRunInfo,
  User,
} from '../types';
import dayjs from 'dayjs';

// Base API path (relative, works in both dev via Vite proxy and prod on Render)
const API_BASE = '/api/v1';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('orbit_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Realistic seed data that 100% matches your Mongoose schema:
let subscriptionsStore: Subscription[] = [
  {
    _id: 'sub_66d101a09f821',
    name: 'GitHub Copilot Business',
    price: 19,
    currency: 'USD',
    frequency: 'monthly',
    category: 'technology',
    paymentMethod: 'Credit Card (Visa •••• 4242)',
    status: 'active',
    startDate: '2026-08-01T00:00:00.000Z',
    renewalDate: '2026-09-01T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    _id: 'sub_66d102b18e712',
    name: 'Upstash Pro QStash & Redis',
    price: 320,
    currency: 'USD',
    frequency: 'yearly',
    category: 'technology',
    paymentMethod: 'Mastercard •••• 8812',
    status: 'active',
    startDate: '2026-01-15T00:00:00.000Z',
    renewalDate: '2027-01-15T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-01-15T12:00:00.000Z',
    updatedAt: '2026-01-15T12:00:00.000Z',
  },
  {
    _id: 'sub_66d103c27d603',
    name: 'Spotify Premium Family',
    price: 179,
    currency: 'RS',
    frequency: 'monthly',
    category: 'entertainment',
    paymentMethod: 'UPI (Google Pay)',
    status: 'active',
    startDate: '2026-08-10T00:00:00.000Z',
    renewalDate: '2026-09-09T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-08-10T09:30:00.000Z',
    updatedAt: '2026-08-10T09:30:00.000Z',
  },
  {
    _id: 'sub_66d104d36c594',
    name: 'The Financial Times Digital',
    price: 39,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'finance',
    paymentMethod: 'PayPal Express',
    status: 'active',
    startDate: '2026-08-05T00:00:00.000Z',
    renewalDate: '2026-09-04T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-08-05T14:15:00.000Z',
    updatedAt: '2026-08-05T14:15:00.000Z',
  },
  {
    _id: 'sub_66d105e45b485',
    name: 'Gym & Crossfit Membership',
    price: 2500,
    currency: 'RS',
    frequency: 'monthly',
    category: 'lifestyle',
    paymentMethod: 'Debit Card (HDFC)',
    status: 'cancelled',
    startDate: '2026-06-01T00:00:00.000Z',
    renewalDate: '2026-07-01T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-25T11:00:00.000Z',
  },
  {
    _id: 'sub_66d106f54a376',
    name: 'EuroSport Pass Daily',
    price: 5,
    currency: 'EUR',
    frequency: 'daily',
    category: 'sports',
    paymentMethod: 'Apple Pay',
    status: 'expired',
    startDate: '2026-08-20T00:00:00.000Z',
    renewalDate: '2026-08-21T00:00:00.000Z',
    user: 'usr_66c28f9901aa92110293',
    createdAt: '2026-08-20T18:00:00.000Z',
    updatedAt: '2026-08-22T00:00:00.000Z',
  },
];

// Helper to compute renewal date matching pre("save") hook in Mongoose model
export function calculateRenewalDate(startDate: string, frequency: Subscription['frequency']): string {
  const renewalPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };
  return dayjs(startDate).add(renewalPeriods[frequency], 'day').toISOString();
}

// Calculate reminder dates matching workflow.controller.js (REMINDERS = [7, 5, 2, 1])
export function computeWorkflowReminders(sub: Subscription): WorkflowRunInfo['reminders'] {
  const reminderIntervals = [
    { days: 7, subject: `📅 Reminder: Your ${sub.name} Subscription Renews in 7 Days!` },
    { days: 5, subject: `⏳ ${sub.name} Renews in 5 Days – Stay Subscribed!` },
    { days: 2, subject: `🚀 2 Days Left! ${sub.name} Subscription Renewal` },
    { days: 1, subject: `⚡ Final Reminder: ${sub.name} Renews Tomorrow!` },
  ];

  const renewal = dayjs(sub.renewalDate);

  return reminderIntervals.map(({ days, subject }) => {
    const reminderDate = renewal.subtract(days, 'day');
    const isPast = reminderDate.isBefore(dayjs());
    return {
      daysBefore: days,
      reminderDate: reminderDate.format('YYYY-MM-DD HH:mm'),
      subject,
      status: sub.status !== 'active' ? 'skipped' : isPast ? 'sent' : 'scheduled',
    };
  });
}

export const api = {
  // Auth API
  async login(credentials: { email: string; password: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/log-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.message || (res.status === 401 ? 'Invalid email or password' : 'Authentication failed');
      throw new Error(errorMessage);
    }

    if (!data?.data?.token || !data?.data?.user) {
      throw new Error('Invalid response from server');
    }

    return data.data;
  },

  async signUp(userData: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.message || (res.status === 409 ? 'User already exists' : 'Registration failed');
      throw new Error(errorMessage);
    }

    if (!data?.data?.token || !data?.data?.user) {
      throw new Error('Invalid response from server');
    }

    return data.data;
  },

  async getMe(): Promise<{ user: User }> {
    const token = localStorage.getItem('orbit_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || 'Unauthorized session');
    }

    return data.data;
  },

  async logout(): Promise<boolean> {
    try {
      await fetch(`${API_BASE}/auth/log-out`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } catch (e) {
      // ignore
    }
    return true;
  },

  // Subscriptions CRUD (/api/v1/subscription)
  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const res = await fetch(`${API_BASE}/subscription`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data?.data)) return data.data.data;
        if (Array.isArray(data.data)) return data.data;
      }
      // For any non-ok response (including 401), fall through to mock store.
      // Session expiry is handled by AuthContext.verifySession() and ProtectedRoute,
      // not by individual data-fetching calls.
    } catch (e) {
      // Network error: fall through to mock store
    }

    await new Promise((res) => setTimeout(res, 200));
    return subscriptionsStore.map((sub) => {
      if (new Date(sub.renewalDate) < new Date() && sub.status === 'active') {
        return { ...sub, status: 'expired' };
      }
      return sub;
    });
  },

  async getSubscriptionById(id: string): Promise<Subscription | undefined> {
    try {
      const res = await fetch(`${API_BASE}/subscription/${id}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data?.data || data.data;
      }
    } catch (e) {
      // fallback to store
    }

    await new Promise((res) => setTimeout(res, 150));
    return subscriptionsStore.find((s) => s._id === id);
  },

  async createSubscription(payload: CreateSubscriptionPayload): Promise<{ subscription: Subscription; workflowRunId: string }> {
    try {
      const res = await fetch(`${API_BASE}/subscription`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data?.data || data.data;
      }
    } catch (e) {
      // fallback
    }

    await new Promise((res) => setTimeout(res, 300));
    const renewalDate = calculateRenewalDate(payload.startDate, payload.frequency);
    const newSub: Subscription = {
      _id: 'sub_' + Math.random().toString(36).substring(2, 14),
      ...payload,
      renewalDate,
      status: 'active',
      user: 'usr_66c28f9901aa92110293',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    subscriptionsStore.unshift(newSub);
    return {
      subscription: newSub,
      workflowRunId: 'wfr_' + Math.random().toString(36).substring(2, 12),
    };
  },

  async updateSubscription(id: string, updates: Partial<CreateSubscriptionPayload & { status: Subscription['status'] }>): Promise<Subscription> {
    try {
      const res = await fetch(`${API_BASE}/subscription/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        return data.data?.data || data.data;
      }
    } catch (e) {
      // fallback
    }

    await new Promise((res) => setTimeout(res, 250));
    const index = subscriptionsStore.findIndex((s) => s._id === id);
    if (index === -1) throw new Error('Subscription not found');

    const current = subscriptionsStore[index];
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    if (updates.frequency || updates.startDate) {
      updated.renewalDate = calculateRenewalDate(
        updates.startDate || current.startDate,
        updates.frequency || current.frequency
      );
    }
    subscriptionsStore[index] = updated;
    return updated;
  },

  async deleteSubscription(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/subscription/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) return true;
    } catch (e) {
      // fallback
    }

    await new Promise((res) => setTimeout(res, 250));
    const idx = subscriptionsStore.findIndex((s) => s._id === id);
    if (idx !== -1) {
      subscriptionsStore.splice(idx, 1);
      return true;
    }
    return false;
  },

  // Active Workflows Info
  async getActiveWorkflows(): Promise<WorkflowRunInfo[]> {
    await new Promise((res) => setTimeout(res, 200));
    return subscriptionsStore
      .filter((s) => s.status === 'active')
      .map((s) => ({
        subscriptionId: s._id,
        subscriptionName: s.name,
        renewalDate: s.renewalDate,
        workflowRunId: 'wfr_' + s._id.slice(4),
        reminders: computeWorkflowReminders(s),
      }));
  },
};
