function round(num, precision){
    const precisionCalc = Math.pow(10, precision);
    return Math.round(num*precisionCalc)/precisionCalc
}

export function formatNum(num){
    const abbreviations  = 'kmb';
    let base = Math.floor(Math.log(Math.abs(num))/Math.log(1000));
    const suffix = abbreviations[Math.min(2, base-1)];
    base = abbreviations.indexOf(suffix) + 1;
    return suffix ? round(num/Math.pow(1000, base), 1)+suffix: ''+num

}