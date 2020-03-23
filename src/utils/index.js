import {Dimensions} from 'react-native';

export const screen_width = Dimensions.get('window').width;

export function xyrad(cx, cy, angle, r) {
  const rad = angle * (Math.PI / 180);

  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  return { rad, x, y };
}