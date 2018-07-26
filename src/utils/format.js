export const formatSum = sum => sum.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

