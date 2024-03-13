
export default function debounce(func, delay = 1000) {
    let timerId;
    return function() {
        let args = arguments;
        console.count('debounce called before timeout', );
        if(timerId) {
            clearTimeout(timerId);
        }
        
        timerId = setTimeout(()=> {
            func(...args);
            console.log('debounce called with args',args);
        }, delay);
    }
}