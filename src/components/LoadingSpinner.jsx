const LoadingSpinner = () => {
    return (
      <div className="loading-spinner flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        <span className="ml-4 text-lg text-gray-700">Loading...</span>
      </div>
    );
  };
  
  export default LoadingSpinner;