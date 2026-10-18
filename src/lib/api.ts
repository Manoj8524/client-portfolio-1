const API_BASE = 'https://yt.jinskadamthodu.com/public/api';

export async function getLoaderImages() {
  try {
    const res = await fetch(`${API_BASE}/loader-images`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${API_BASE}/services`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json?.data || [];
    return items.sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
  } catch {
    return [];
  }
}

export async function getFeaturedWorks() {
  try {
    const res = await fetch(`${API_BASE}/featured-works`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

export async function getFilmPosters() {
  try {
    const res = await fetch(`${API_BASE}/film-poster-designs/all`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || json || [];
  } catch {
    return [];
  }
}

export async function getFilmPosterById(id: string | number) {
  try {
    const res = await fetch(`${API_BASE}/film-poster-designs/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || json;
  } catch {
    return null;
  }
}

export async function getVisionImages() {
  try {
    const res = await fetch(`${API_BASE}/vision-images/all`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || json || [];
  } catch {
    return [];
  }
}

export async function getEmployeePhotos() {
  try {
    const res = await fetch(`${API_BASE}/employee-photos/all`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || json || [];
  } catch {
    return [];
  }
}


export async function getClients() {
  try {
    const res = await fetch(`${API_BASE}/clients`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || json || [];
  } catch {
    return [];
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const res = await fetch(`${API_BASE}/newsletter-subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

export async function sendContactEnquiry(payload: Record<string, any>) {
  try {
    const res = await fetch(`${API_BASE}/contact-enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}

