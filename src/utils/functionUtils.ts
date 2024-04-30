function formatDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    
    const hoursString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minutesString = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
    const secondsString = seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}` : '';
  
    const parts = [hoursString, minutesString, secondsString].filter(part => part !== '');
  
    if (parts.length === 0) {
      return '0 seconds';
    }
  
    return parts.join(' ');
  }

export {
    formatDuration
}