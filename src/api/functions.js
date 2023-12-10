
/// format date
export const DateOnCard = ({ date }) => {
    const formattedDate = new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formattedDate 
}

///get new date
export const GetCurrentFormattedDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  
    return formattedDate.toUpperCase();
  };

/// good morning or gooodnight
export const Greeting = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let greet = '';

    if (hours >= 0 && hours < 12) {
        greet = 'Good Morning,';
        return greet
    } 
    if (hours > 12 && hours < 17 ){
        greet = 'Good Afternoon,'
        return greet
    }
        greet = 'Good Evening,'
        return greet
    
};
