import { Slot, Redirect } from "expo-router";
import { useAuth } from '../../providers/AuthProvider';

export default function ProctedtLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href='/login' />
  }

  return <Slot />;
}