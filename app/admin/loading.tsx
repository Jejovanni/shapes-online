export default function AdminLoading() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-10">
                <div className="space-y-3">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-10 w-24 bg-gray-200 rounded-xl"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 h-32"></div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="h-12 bg-gray-50 border-b border-gray-100"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-5 border-b border-gray-50 flex justify-between">
                        <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                        <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                        <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}