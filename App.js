import Layout from './Layout';
import { AuthProvider } from './src/contexts/authContext.tsx'

function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}