import React, { useCallback, useContext, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GlobalContext } from '../../context';
import { apiRequest, updateUrl } from '../../utils/store';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner, LoadingCard } from '../../components/ui/Loading';
import { Badge } from '../../components/ui/Badge';
import { Search, MapPin, Building, Users, Briefcase } from 'lucide-react';

const CompanyCard = ({ company }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
              <p className="text-sm text-gray-500">{company.email}</p>
            </div>
          </div>
          {company.isVerified && (
            <Badge variant="success">Verified</Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {company.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            {company.jobCount || 0} Jobs Posted
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {company.about || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(`/company-profile/${company._id}`, '_blank')}
          >
            View Profile
          </Button>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {company.employees || 'N/A'} Employees
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  cmpLocation, 
  setCmpLocation, 
  sort, 
  setSort,
  onSearch 
}) => {
  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: '-name', label: 'Name (Z-A)' },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Search Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Location..."
              value={cmpLocation}
              onChange={(e) => setCmpLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <Button onClick={onSearch} className="w-full">
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CompanyModern() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Context state
  const { 
    sort, setSort, 
    data, setData, 
    isFetching, setIsFetching, 
    recordsCount, setRecordCount, 
    page, setPage, 
    searchQuery, setSearchQuery,
    cmpLocation, setCmpLocation,
    numPage, setNumPage 
  } = useContext(GlobalContext);
  
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    const newURL = updateUrl({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location
    });
    
    try {
      const response = await apiRequest({
        url: newURL,
        method: "GET",
      });
      
      setNumPage(response?.numPage);
      setRecordCount(response?.total);
      
      if (page === 1) {
        setData(response?.data || []);
        setLocalData(response?.data || []);
      } else {
        const updatedData = [...(data || []), ...(response?.data || [])];
        setData(updatedData);
        setLocalData(updatedData);
      }
    } catch (error) {
      toast.error('Failed to fetch companies');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [page, searchQuery, cmpLocation, sort, navigate, location, setData, setIsFetching]);

  // Handle search
  const handleSearch = useCallback(() => {
    setPage(1);
    fetchCompanies();
  }, [fetchCompanies]);

  // Handle show more
  const handleShowMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  // Memoized companies
  const companies = useMemo(() => localData || [], [localData]);

  // Initial fetch
  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Companies
          </h1>
          <p className="text-gray-600">
            Discover and connect with leading companies in your area
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cmpLocation={cmpLocation}
          setCmpLocation={setCmpLocation}
          sort={sort}
          setSort={setSort}
          onSearch={handleSearch}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{companies.length}</span> of{' '}
            <span className="font-semibold">{recordsCount}</span> companies
          </p>
        </div>

        {/* Companies Grid */}
        {loading && companies.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No companies found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && companies.length > 0 && page < numPage && (
          <div className="text-center mt-8">
            <Button 
              onClick={handleShowMore} 
              disabled={isFetching}
              variant="outline"
              size="lg"
            >
              {isFetching ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Companies'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
