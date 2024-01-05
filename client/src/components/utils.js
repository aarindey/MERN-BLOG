export function debounce(f){
    let timeout;
    return function(...args){
        if(timeout)clearTimeout(timeout);
        timeout=setTimeout(()=>{
            f(...args);
        },300);
    };
}