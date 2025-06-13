export const metadata = {
  title: "Swagger UI",
};

export default function SwaggerGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-0 min-h-screen w-full bg-white p-0 text-black">
      {children}
    </div>
  );
}
