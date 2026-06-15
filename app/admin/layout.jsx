export const metadata = {
  title: 'Admin Dashboard | Study in Albania',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {children}
    </div>
  );
}
