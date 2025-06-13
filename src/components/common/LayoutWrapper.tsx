export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex min-h-screen w-full max-w-[430px] flex-col bg-white">
        {children}
      </div>
    </div>
  );
}
