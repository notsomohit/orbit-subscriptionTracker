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
    const res = await fetch(`${API_BASE}/subscription`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      let errorMsg = `Failed to fetch subscriptions (${res.status})`;
      try {
        const errJson = await res.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    if (Array.isArray(data.data?.data)) return data.data.data;
    if (Array.isArray(data.data)) return data.data;
    return [];
  },

  async getSubscriptionById(id: string): Promise<Subscription> {
    const res = await fetch(`${API_BASE}/subscription/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      let errorMsg = `Subscription not found (${res.status})`;
      try {
        const errJson = await res.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    return data.data?.data || data.data;
  },

  async createSubscription(payload: CreateSubscriptionPayload): Promise<{ subscription: Subscription; workflowRunId: string }> {
    const res = await fetch(`${API_BASE}/subscription`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMsg = 'Failed to create subscription';
      try {
        const errJson = await res.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    return data.data?.data || data.data;
  },

  async updateSubscription(id: string, updates: Partial<CreateSubscriptionPayload & { status: Subscription['status'] }>): Promise<Subscription> {
    const res = await fetch(`${API_BASE}/subscription/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      let errorMsg = 'Failed to update subscription';
      try {
        const errJson = await res.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    return data.data?.data || data.data;
  },

  async deleteSubscription(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/subscription/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      let errorMsg = 'Failed to delete subscription';
      try {
        const errJson = await res.json();
        if (errJson.message) errorMsg = errJson.message;
      } catch {}
      throw new Error(errorMsg);
    }

    return true;
  },

  // Active Workflows Info computed from actual user active subscriptions
  async getActiveWorkflows(): Promise<WorkflowRunInfo[]> {
    const subs = await this.getSubscriptions();
    return subs
      .filter((s) => s.status === 'active')
      .map((s) => ({
        subscriptionId: s._id,
        subscriptionName: s.name,
        renewalDate: s.renewalDate,
        workflowRunId: 'wfr_' + (s._id ? s._id.slice(-6) : 'live'),
        reminders: computeWorkflowReminders(s),
      }));
  },
};
