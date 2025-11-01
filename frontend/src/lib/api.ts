export type LeadFormData = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  ab_variant?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export async function submitLead(data: LeadFormData): Promise<void> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail ?? 'Не удалось отправить заявку');
  }
}

export async function trackAB(name: string, payload: Record<string, unknown>): Promise<void> {
  await fetch('/api/ab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
