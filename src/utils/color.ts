/**
 * 将 16 进制颜色转换成 RGB
 *
 * @param hex 16 进制颜色
 * @param alpha 透明度
 * @returns RGB 颜色
 */
export const hexToRgb = (hex: string, alpha: number) => {
  let r: number, g: number, b: number;
  if (hex.length === 4) {
    r = +`0x${hex[1]}${hex[1]}`;
    g = +`0x${hex[2]}${hex[2]}`;
    b = +`0x${hex[3]}${hex[3]}`;
  } else {
    r = +`0x${hex[1]}${hex[2]}`;
    g = +`0x${hex[3]}${hex[4]}`;
    b = +`0x${hex[5]}${hex[6]}`;
  }
  return `rgb(${r} ${g} ${b} / ${alpha})`;
};
