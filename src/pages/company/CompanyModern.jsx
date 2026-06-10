import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { apiRequest } from '../../utils/store';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingCard } from '../../components/ui/Loading';
import { Badge } from '../../components/ui/Badge';
import { Search, MapPin, Building, Users, Briefcase } from 'lucide-react';
import Pagination from '../../component/Pagination';

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: 'Newest', label: 'Newest First' },
  { value: 'Oldest', label: 'Oldest First' },
  { value: 'A-Z', label: 'Name (A-Z)' },
  { value: 'Z-A', label: 'Name (Z-A)' },
];

const selectClass =
  'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">{company.name}</h3>
              <p className="text-sm text-gray-500 truncate">{company.email}</p>
            </div>
          </div>
          {company.isVerified && <Badge variant="success" className="shrink-0">Verified</Badge>}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 shrink-0" />
            <span className="truncate">{company.location || 'N/A'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2 shrink-0" />
            {company.jobPosts?.length ?? company.jobCount ?? 0} Jobs Posted
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {company.about || 'No description available'}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/company-profile/${company._id}`)}>
            View Profile
          </Button>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {company.employees || 'N/A'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CompanyModern() {
  // List state (isolated to this page)
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [numPage, setNumPage] = useState(1);

  // Input state
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  // Applied filters
  const [filters, setFilters] = useState({ search: '', location: '', sort: 'Newest' });

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(page));
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.sort) params.set('sort', filters.sort);

    const res = await apiRequest({ url: `/company?${params.toString()}`, method: 'GET' });
    setLoading(false);

    if (!res.success) {
      toast.error(res.message || 'Failed to fetch companies');
      setCompanies([]);
      return;
    }
    setCompanies(Array.isArray(res.data) ? res.data : []);
    setTotal(res.total || 0);
    setNumPage(res.numPage || Math.ceil((res.total || 0) / PAGE_SIZE) || 1);
  }, [page, filters]);

  useEffect(() => {
    fetchCompanies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchCompanies]);

  const handleSearch = () => {
    setPage(1);
    setFilters((f) => ({ ...f, search: searchInput.trim(), location: locationInput.trim() }));
  };

  const handleSortChange = (value) => {
    setPage(1);
    setFilters((f) => ({ ...f, sort: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Find Companies</h1>
          <p className="text-gray-600">Discover and connect with leading companies in your area</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search companies..."
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
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className={selectClass}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              <Button onClick={handleSearch} className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="mb-4 text-gray-600 text-sm">
          Showing <span className="font-semibold">{companies.length}</span> of{' '}
          <span className="font-semibold">{total}</span> companies
        </div>

        {/* Companies grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <LoadingCard key={i} />)}
          </div>
        ) : companies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => <CompanyCard key={company._id} company={company} />)}
          </div>
        )}

        {/* Pagination */}
        {numPage > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={numPage}
              onPageChange={setPage}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
