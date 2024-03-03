export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 w-full min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
