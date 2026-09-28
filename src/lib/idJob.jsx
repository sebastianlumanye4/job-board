const BASE = "https://remotive.com/api/remote-jobs";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`jobApi request failed (${res.status}): ${url}`);
  return res.json();
}

function normalizeJob(job) {
  return {
    id: job.id,
    url: job.url,
    title: job.title,
    company: job.company_name,
    companyLogo: job.company_logo_url || job.company_logo,
    category: job.category,
    tags: job.tags || [],
    jobType: job.job_type,
    publicationDate: job.publication_date,
    location: job.candidate_required_location,
    salary: job.salary,
    description: job.description,
  };
}

export async function fetchDefaultJobs(limit = 20) {
  const data = await fetchJson(`${BASE}?limit=${limit}`);
  return (data.jobs || []).map(normalizeJob);
}

export async function searchJobs(term, { category, limit = 20 } = {}) {
  const params = new URLSearchParams({ search: term, limit });
  if (category) params.set("category", category);
  const data = await fetchJson(`${BASE}?${params.toString()}`);
  return (data.jobs || []).map(normalizeJob);
}

export async function fetchFeaturedJobs(count = 6) {
  const data = await fetchJson(`${BASE}?limit=50`);
  const jobs = data.jobs || [];
  const shuffled = [...jobs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(normalizeJob);
}