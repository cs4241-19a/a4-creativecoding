export const fillMatrix = (width, height, value = 0) => {
  const len = width * height;
  const data = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    data[i] = value;
  }
  return data;
};

export const normalize = data => {
  const max = Math.max.apply(null, data);
  if (max > 0) {
    for (let i = 0; i < data.length; i++) {
      data[i] /= max;
    }
  }
};
