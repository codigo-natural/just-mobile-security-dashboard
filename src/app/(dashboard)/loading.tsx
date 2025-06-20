export default function Loading() {
  return (
    <div className='p-6 space-y-6 animate-pulse text-white bg-black min-h-screen'>
      <div className='text-3xl font-bold'>Dashboard</div>

      {/* Cards row */}
      <div className='grid grid-cols-4 gap-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='bg-gray-800 rounded-lg h-24 p-4'>
            <div className='w-1/2 h-4 bg-gray-700 mb-4 rounded'></div>
            <div className='w-1/4 h-6 bg-gray-600 rounded'></div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className='grid grid-cols-2 gap-6 mt-6'>
        {/* Pie chart skeleton */}
        <div className='bg-gray-800 rounded-lg p-6 h-80 flex flex-col justify-center items-center'>
          <div className='w-48 h-48 bg-gray-700 rounded-full mb-4'></div>
          <div className='w-1/2 h-4 bg-gray-600 rounded'></div>
        </div>

        {/* Bar chart skeleton */}
        <div className='bg-gray-800 rounded-lg p-6 h-80 flex flex-col justify-between'>
          <div className='space-y-2'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='w-full h-6 bg-gray-700 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
