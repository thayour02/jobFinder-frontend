import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiRequest } from '../../utils/store';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingCard } from '../../components/ui/Loading';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Building,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import Pagination from '../../component/Pagination';

const PAGE_SIZE = 10;

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Intern'];
const EXPERIENCE_LEVELS = [
  { value: '0-2', label: '0 - 2 years' },
  { value: '3-5', label: '3 - 5 years' },
  { value: '6-10', label: '6 - 10 years' },
  { value: '10-50', label: '10+ years' },
];
const SORT_OPTIONS = [
  { value: 'Newest', label: 'Newest First' },
  { value: 'Oldest', label: 'Oldest First' },
  { value: 'A-Z', label: 'Title (A-Z)' },
  { value: 'Z-A', label: 'Title (Z-A)' },
];

const selectClass =
  'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2';

const JobCard = ({ job }) => {
  const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '';
  const salary = Number(job.salary);
  const salaryLabel = salary ? `$${salary.toLocaleString()}` : 'Competitive';

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600">
            <Link to={`/job-details/${job._id}`}>{job.jobTitle}</Link>
          </h3>
          {job.isUrgent && <Badge variant="destructive" className="text-xs shrink-0">Urgent</Badge>}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <Building className="w-4 h-4 mr-1 shrink-0" />
            <span className="truncate max-w-[10rem]">{job.company?.name || 'Company'}</span>
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            {job.location}
          </span>
          {postedDate && (
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 shrink-0" />
              {postedDate}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {job.jobType && <Badge variant="outline">{job.jobType}</Badge>}
          {(job.experience || job.experience === 0) && (
            <Badge variant="outline">{job.experience} yrs exp</Badge>
          )}
          {job.vacancy && <Badge variant="secondary">{job.vacancy} vacancies</Badge>}
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {job.detail?.[0]?.desc || job.desc}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center text-purple-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-1" />
            {salaryLabel}
          </div>
          <Link
            to={`/job-details/${job._id}`}
            className="inline-flex items-center justify-center rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 h-9 px-3 text-sm font-medium transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FindJob() {
  const navigate = useNavigate();

  // List state (isolated to this page)
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Input state (what the user is typing/selecting)
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [expInput, setExpInput] = useState('');

  // Applied filters (what's actually queried) — only changes on Search / sort / clear
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jType: '',
    exp: '',
    sort: 'Newest',
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(page));
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.jType) params.set('jType', filters.jType);
    if (filters.exp) params.set('exp', filters.exp);
    if (filters.sort) params.set('sort', filters.sort);

    const res = await apiRequest({
      url: `/jobs/find-jobs?${params.toString()}`,
      method: 'GET',
    });
    setLoading(false);

    if (!res.success) {
      toast.error(res.message || 'Failed to fetch jobs');
      setJobs([]);
      return;
    }
    setJobs(Array.isArray(res.data) ? res.data : []);
    setTotal(res.total || 0);
  }, [page, filters]);

  useEffect(() => {
    fetchJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchJobs]);

  const handleSearch = () => {
    setPage(1);
    setFilters((f) => ({
      ...f,
      search: searchInput.trim(),
      location: locationInput.trim(),
      jType: typeInput,
      exp: expInput,
    }));
  };

  const handleSortChange = (value) => {
    setPage(1);
    setFilters((f) => ({ ...f, sort: value }));
  };

  const handleClear = () => {
    setSearchInput('');
    setLocationInput('');
    setTypeInput('');
    setExpInput('');
    setPage(1);
    setFilters({ search: '', location: '', jType: '', exp: '', sort: 'Newest' });
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs, companies..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Location..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>

              <select
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                className={selectClass}
              >
                <option value="">All Job Types</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={expInput}
                onChange={(e) => setExpInput(e.target.value)}
                className={selectClass}
              >
                <option value="">All Experience</option>
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                ))}
              </select>

              <select
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className={selectClass}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button onClick={handleClear} variant="outline">Clear</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="mb-4 text-gray-600 text-sm">
          Showing <span className="font-semibold">{jobs.length}</span> of{' '}
          <span className="font-semibold">{total}</span> jobs
        </div>

        {/* Jobs grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => <LoadingCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={handleClear}>Clear Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
