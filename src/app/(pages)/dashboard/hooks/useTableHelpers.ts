export const useTableHelpers = () => {
  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    
    if (start.getFullYear() !== end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { ...formatOptions, year: 'numeric' })} - ${end.toLocaleDateString('en-US', { ...formatOptions, year: 'numeric' })}`;
    }
    
    return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}, ${start.getFullYear()}`;
  };
const getStatus=(hours:number)=>{
    if(hours>=40){
      return 'completed';
    }else if(hours>0 && hours<40){
      return 'incomplete';
    }else{
      return 'missing';
    }
  }
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'incomplete':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'missing':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAction = (status: string) => {
    switch (status) {
      case 'completed':
        return { text: 'View', color: 'text-blue-600 hover:text-blue-800' };
      case 'incomplete':
        return { text: 'Update', color: 'text-orange-600 hover:text-orange-800' };
      case 'missing':
        return { text: 'Create', color: 'text-red-600 hover:text-red-800' };
      default:
        return { text: 'View', color: 'text-blue-600 hover:text-blue-800' };
    }
  };

  return {
    formatDateRange,
    getStatusStyle,
    getAction,
    getStatus
  };
};