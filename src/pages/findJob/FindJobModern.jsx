import React, { useCallback, useContext, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GlobalContext } from '../../context';
import { apiRequest, updateUrl } from '../../utils/store';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner, LoadingCard } from '../../components/ui/Loading';
import { Badge } from '../../components/ui/Badge';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Building,
  Users,
  Calendar,
  ArrowRight,
  Heart,
  Share2
} from 'lucide-react';
import Pagination from '../../component/Pagination';

const JobCard = ({ job }) => {
  const postedDate = new Date(job.createdAt).toLocaleDateString();
  const salaryRange = job.salary ? `$${job.salary.toLocaleString()}` : 'Competitive';
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">
                <Link to={`/job-details/${job._id}`}>
                  {job.jobTitle}
                </Link>
              </h3>
              {job.isUrgent && (
                <Badge variant="destructive" className="text-xs">Urgent</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {job.company?.name || 'Company'}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {postedDate}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline">{job.jobType}</Badge>
              <Badge variant="outline">{job.experience}</Badge>
              {job.vacancy && (
                <Badge variant="secondary">{job.vacancy} vacancies</Badge>
              )}
            </div>
            
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {job.desc}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-600 font-semibold">
                <DollarSign className="w-4 h-4 mr-1" />
                {salaryRange}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/job-details/${job._id}`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="ghost">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  location: jobLocation, 
  setLocation, 
  jobType, 
  setJobType,
  experience, 
  setExperience,
  sort, 
  setSort,
  onSearch,
  onClear
}) => {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Director'];
  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: 'jobTitle', label: 'Title (A-Z)' },
    { value: '-jobTitle', label: 'Title (Z-A)' },
    { value: '-salary', label: 'Highest Salary' },
    { value: 'salary', label: 'Lowest Salary' },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Search Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search jobs, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Location..."
              value={jobLocation}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            <option value="">All Experience Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          
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
          
          <div className="flex space-x-2">
            <Button onClick={onSearch} className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button onClick={onClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FindJobModern() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Context state
  const { 
    sort, setSort, 
    data, setData, 
    isFetching, setIsFetching, 
    recordsCount, setRecordCount, 
    page, setPage, 
    searchQuery, setSearchQuery
  } = useContext(GlobalContext);
  
  // Local state
  const [localData, setLocalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const newURL = updateUrl({
      pageNum: page,
      query: searchQuery,
      cmpLoc: jobLocation,
      sort: sort,
      navigate: navigate,
      location: location
    });
    
    try {
      const response = await apiRequest({
        url: newURL,
        method: "GET",
      });
      
      if (page === 1) {
        setData(response?.data || []);
        setLocalData(response?.data || []);
      } else {
        const updatedData = [...(data || []), ...(response?.data || [])];
        setData(updatedData);
        setLocalData(updatedData);
      }
      
      setRecordCount(response?.total || 0);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [page, searchQuery, jobLocation, sort, navigate, location, setData, setIsFetching, setRecordCount]);

  // Handle search
  const handleSearch = useCallback(() => {
    setPage(1);
    fetchJobs();
  }, [fetchJobs]);

  // Handle clear filters
  const handleClear = useCallback(() => {
    setSearchQuery('');
    setJobLocation('');
    setJobType('');
    setExperience('');
    setSort('-createdAt');
    setPage(1);
  }, [setSearchQuery, setSort]);

  // Handle show more
  const handleShowMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  // Memoized jobs
  const jobs = useMemo(() => localData || [], [localData]);

  // Initial fetch
  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={jobLocation}
          setLocation={setJobLocation}
          jobType={jobType}
          setJobType={setJobType}
          experience={experience}
          setExperience={setExperience}
          sort={sort}
          setSort={setSort}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{jobs.length}</span> of{' '}
            <span className="font-semibold">{recordsCount}</span> jobs
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="-salary">Highest Salary</option>
              <option value="salary">Lowest Salary</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading && jobs.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={handleClear}>Clear Filters</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {Math.ceil(recordsCount / 10) > 1 && (
          <div className="text-center mt-8">
            <Pagination 
              currentPage={page}
              totalPages={Math.ceil(recordsCount / 10)}
              onPageChange={handleShowMore}
              loading={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
}
