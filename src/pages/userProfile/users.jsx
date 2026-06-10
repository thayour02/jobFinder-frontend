import ListBox from '../../component/listBox'
import { useCallback, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest, updateUrl } from '../../utils/store'
import { toast } from 'react-hot-toast'
import Head from '../../component/header'
import Pagination from '../../component/Pagination'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { LoadingCard } from '../../components/ui/Loading'
import { Users, MapPin, Briefcase, User as UserIcon } from 'lucide-react'

export default function UsersList() {
    const navigate = useNavigate()
    const location = useLocation()
    const { sort, setSort } = useContext(GlobalContext)
    const { data, setData } = useContext(GlobalContext)
    const { isFetching, setIsFetching } = useContext(GlobalContext)
    const { recordsCount, setRecordCount } = useContext(GlobalContext)
    const { page, setPage } = useContext(GlobalContext)
    const { searchQuery, setSearchQuery, cmpLocation, setCmpLocation } = useContext(GlobalContext)
    const { numPage, setNumPage } = useContext(GlobalContext)

    const fetchUser = useCallback(async () => {
        setIsFetching(true)
        updateUrl({
            pageNum: page,
            query: searchQuery,
            cmpLoc: cmpLocation,
            sort: sort,
            navigate: navigate,
            location: location,
        })
        const queryParams = new URLSearchParams(location.search)
        const res = await apiRequest({
            url: `/users?${queryParams.toString()}`,
            method: 'GET',
        })
        if (!res.success) {
            toast.error(res.message)
            setIsFetching(false)
            return
        }
        setNumPage(res?.numPage)
        setRecordCount(res?.total)
        setData(Array.isArray(res?.data) ? res.data : [])
        setIsFetching(false)
    }, [page, searchQuery, cmpLocation, sort, navigate, location])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        await fetchUser()
    }

    const handleShowMore = (newPage) => {
        setPage(newPage)
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Seekers</h2>
                    <p className="text-gray-500 font-medium">
                        Discover talented professionals from our community.
                    </p>
                </div>

                {/* Search / Filter Bar */}
                <div className="mb-8">
                    <Head
                        handleClick={handleSearchSubmit}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        cmpLocation={cmpLocation}
                        setCmpLocation={setCmpLocation}
                    />
                </div>

                {/* Results meta row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-600 font-medium">
                        Showing{' '}
                        <span className="font-semibold text-gray-900">{recordsCount ?? 0}</span>{' '}
                        user{recordsCount !== 1 ? 's' : ''} available
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                        <ListBox sort={sort} setSort={setSort} />
                    </div>
                </div>

                {/* Grid */}
                {isFetching ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                ) : data?.length === 0 ? (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No users found matching your criteria.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data?.map((com, index) => (
                                <Link key={index} to={`/user-profile/${com?._id}`}>
                                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent className="p-5">
                                            <div className="flex items-center gap-4 mb-4">
                                                {/* Avatar */}
                                                <div className="w-14 h-14 rounded-full overflow-hidden bg-purple-100 flex-shrink-0 flex items-center justify-center">
                                                    {com?.profileUrl ? (
                                                        <img
                                                            src={com.profileUrl}
                                                            alt={`${com?.firstName} ${com?.LastName}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserIcon className="w-7 h-7 text-purple-400" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {com?.firstName} {com?.LastName}
                                                    </p>
                                                    <p className="text-sm text-purple-500 truncate">{com?.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {com?.location && (
                                                    <Badge variant="secondary" className="flex items-center gap-1 text-xs py-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {com.location}
                                                    </Badge>
                                                )}
                                                <Badge variant="outline" className="flex items-center gap-1 text-xs py-1">
                                                    <Briefcase className="w-3 h-3" />
                                                    {com?.application?.length ?? 0} applied
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            Showing {data?.length} of {recordsCount} records
                        </p>
                    </>
                )}

                {/* Pagination */}
                {numPage > 1 && (
                    <div className="w-full flex items-center justify-center pt-10">
                        <Pagination
                            currentPage={page}
                            totalPages={numPage}
                            onPageChange={handleShowMore}
                            loading={isFetching}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
