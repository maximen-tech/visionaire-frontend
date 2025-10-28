/**
 * Skeleton Loading Components
 *
 * Provides better perceived performance than spinners
 * by showing content placeholders
 */

interface SkeletonProps {
  className?: string;
}

/**
 * Basic skeleton block
 */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton for text lines
 */
export function SkeletonText({
  lines = 3,
  className = ""
}: {
  lines?: number;
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for results page
 */
export function SkeletonResults() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-12 w-48" />
        </div>

        {/* Valorisation Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto bg-indigo-400" />
            <Skeleton className="h-6 w-96 mx-auto bg-indigo-500" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-48 bg-white/20" />
              <Skeleton className="h-12 w-32 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <div className="flex justify-center gap-8">
              <div className="space-y-2">
                <Skeleton className="h-16 w-24 mx-auto" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-16 w-8" />
              <div className="space-y-2">
                <Skeleton className="h-16 w-24 mx-auto" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Cards */}
        <div>
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-4 pt-4">
                    <Skeleton className="h-12 w-20" />
                    <Skeleton className="h-12 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for waiting room
 */
export function SkeletonWaitingRoom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        {/* Dual View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6">
          {/* Log Stream */}
          <div className="bg-gray-900 rounded-lg p-4 h-96">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-4 w-full bg-gray-700" />
              ))}
            </div>
          </div>

          {/* Progressive Message */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <SkeletonText lines={5} />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-indigo-50 rounded-lg p-4">
          <SkeletonText lines={3} />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for card component
 */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={3} />
      </div>
    </div>
  );
}
