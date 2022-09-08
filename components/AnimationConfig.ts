export const easing = {
  EASE_OUT_CIRC: [0, 0.55, 0.45, 1],
  EASE_IN_CUBIC: [0.32, 0, 0.67, 0],
  EASE_IN_CIRC: [0.55, 0, 1, 0.45],
};

export const AnimationConfig = {
  VERY_FAST: 0.12,
  FAST: 0.2,
  NORMAL: 0.3,
  EASING: easing.EASE_OUT_CIRC,
  EASING_INVERTED: easing.EASE_IN_CUBIC,
};
