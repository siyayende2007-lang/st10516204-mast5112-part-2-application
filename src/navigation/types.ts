import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Role } from '../types';

export type RootStackParamList = {
  Welcome: undefined;
  Home: { role: Role };
  ManageMenu: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
