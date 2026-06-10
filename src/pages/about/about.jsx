import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import {
    Target,
    Heart,
    Award,
    TrendingUp,
    Users,
    Building2,
    CheckCircle,
    Briefcase,
} from 'lucide-react'

const stats = [
    { number: '50,000+', label: 'Active Job Seekers' },
    { number: '5,000+', label: 'Partner Companies' },
    { number: '10,000+', label: 'Jobs Posted' },
    { number: '95%', label: 'Success Rate' },
]

const values = [
    {
        icon: <Target className="w-8 h-8" />,
        title: 'Our Mission',
        description:
            'Revolutionize the recruitment process by making it more efficient, transparent, and successful for both candidates and companies.',
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: 'People First',
        description:
            'We believe the right job can transform lives, and the right talent can transform businesses. Every connection matters.',
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: 'Verified Quality',
        description:
            'All company profiles are verified for authenticity so seekers can apply with confidence and employers attract genuine talent.',
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: 'Career Growth',
        description:
            'Smart matching algorithms connect the right people with the right opportunities, driving long-term career advancement.',
    },
]

export default function About() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About Job Finder</h1>
                    <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                        Connecting talented professionals with leading companies through an innovative,
                        user-friendly recruitment platform.
                    </p>
                </div>
            </section>

            {/* Mission copy */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
                        <div className="w-16 h-1 bg-purple-600 mx-auto rounded-full" />
                    </div>
                    <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                        <p>
                            Job Finder is a comprehensive job recruitment platform designed to connect talented
                            professionals with leading companies. We bridge the gap between job seekers and
                            employers through our innovative, user-friendly platform.
                        </p>
                        <p>
                            Our mission is to revolutionize the recruitment process by making it more efficient,
                            transparent, and successful for both candidates and companies. We believe that the
                            right job can transform lives, and the right talent can transform businesses.
                        </p>
                        <p>
                            With over 50,000 active job seekers and 5,000+ partner companies, Job Finder has
                            become a trusted platform for career advancement and talent acquisition. Our smart
                            matching algorithms and verified company profiles ensure meaningful connections that
                            lead to successful hires.
                        </p>
                        <p>
                            Whether you're looking for your dream job or seeking the perfect candidate, Job
                            Finder provides the tools, resources, and support you need to achieve your goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Trusted by Thousands</h2>
                        <p className="text-purple-100 text-lg">
                            Join our growing community of professionals and companies
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-purple-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values / Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our core values shape every feature we build and every match we make.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                            <Briefcase className="w-7 h-7 text-purple-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Find Your Dream Job?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                        Join thousands of professionals who have already found their perfect match on Job Finder.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link to="/find-jobs" className='flex items-center'>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Browse Jobs
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/company" className='flex items-center'>
                                <Building2 className="w-5 h-5 mr-2" />
                                Browse Companies
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
