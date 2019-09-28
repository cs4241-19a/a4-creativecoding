/**
 * Return a random selection from given array
 * @param {Array} arr Arry of things to choose from
 */
export function random_choice(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

/**
 * Get a decimal number between `min` and `max` (inclusive)
 * @param {Int} min smallest allowed number(inclusive)
 * @param {Int} max largest allowed number(inclusive)
 */
export function random_range(min, max){
    const diff = max-min;
    return Math.random() * diff + min;
}

export function random_color(){
    return Math.floor(random_range(0, 0xFFFFFF));
}