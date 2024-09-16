import { Slot, Redirect } from "expo-router";
import { useAuth } from '../../providers/AuthProvider';

export default function ProctedtLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/login' />
  }

  return <Slot />;
}