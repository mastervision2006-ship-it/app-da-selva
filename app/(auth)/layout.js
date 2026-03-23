export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0F07] flex flex-col items-center justify-center px-5 max-w-md mx-auto">
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌿</div>
          <h1 className="text-xl font-bold text-white">Dieta da Selva</h1>
          <p className="text-xs text-[#9CA88E] mt-1">Protocolo de alimentação ancestral</p>
        </div>
        {children}
      </div>
    </div>
  );
}
