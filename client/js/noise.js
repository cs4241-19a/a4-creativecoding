export const fillMatrix = (width, height, value = 0) => {
  const len = width * height;
  const data = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    data[i] = value;
  }
  return data;
};

export const averageNeighbors = (x, y, width, height, data) => {
  const tl = ((x - 1 + width) % width) + ((y - 1 + height) % height) * width;
  const tc = x + ((y - 1 + height) % height) * width;
  const tr = ((x + 1 + width) % width) + ((y - 1 + height) % height) * width;
  const cl = ((x - 1 + width) % width) + y * width;
  const cc = x + y * width;
  const cr = ((x + 1 + width) % width) + y * width;
  const bl = ((x - 1 + width) % width) + ((y + 1 + height) % height) * width;
  const bc = x + ((y - 1 + height) % height) * width;
  const br = ((x + 1 + width) % width) + ((y + 1 + height) % height) * width;
  const avg =
    (data[tl] +
      data[tc] +
      data[tr] +
      data[cl] +
      data[cc] +
      data[cr] +
      data[bl] +
      data[bc] +
      data[br]) /
    9;
  return avg;
};

const normalize = data => {
  const max = Math.max.apply(null, data);
  if (max > 0) {
    for (let i = 0; i < data.length; i++) {
      data[i] /= max;
    }
  }
};

export const generateNoise = (width, height, simplex) => {
  const data = fillMatrix(width, height, 0);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      data[x + y * width] = averageNeighbors(x, y, width, height, data);
    }
  }
  normalize(data);
  return data;
};
