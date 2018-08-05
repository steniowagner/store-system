// @flow

export const getButtonIcon = (theme: Object, type: string): string => {
  const { images } = theme;

  switch (type) {
    case 'danger':
      return images.delete;

    case 'detail':
      return images.detail;

    case 'edit':
      return images.edit;

    default:
      return images.smile;
  }
};

export const getButtonColor = (theme: Object, type: string): any => {
  const { colors } = theme;

  return colors[type];
};

export const getCancelBackgroundColor = (theme: Object): string => {
  const { colors } = theme;

  return colors.white;
};

export const getCancelTextColor = (theme: Object): string => {
  const { colors } = theme;

  return colors.affirmative;
};

export const getCancelBorderColor = (theme: Object): string => {
  const { colors } = theme;

  return colors.affirmative;
};
