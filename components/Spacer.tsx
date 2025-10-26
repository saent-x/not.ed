import { FC } from 'react';
import { View } from 'react-native';

type SpacerProps = {
  size?: number;
};

export const Spacer: FC<SpacerProps> = ({ size }) => {
  return <View style={{ marginTop: size ?? 68 }} />;
};
