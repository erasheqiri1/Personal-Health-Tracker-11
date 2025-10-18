import { Redirect } from 'expo-router';

export default function Index() {
  // e dërgon automatikisht te dashboard kur hap app-in
  return <Redirect href="/auth/login" />;
}
