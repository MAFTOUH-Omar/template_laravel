export function getDescription() {
    const now = new Date();
    const options : any = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric' 
    };
    return now.toLocaleString('en-US', options);
}
