import BottomNav from '@/components/layout/BottomNav';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0F07] max-w-md mx-auto relative">
      <main className="pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
