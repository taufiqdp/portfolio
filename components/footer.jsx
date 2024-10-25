export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-8 text-center text-sm text-gray-600">
      <p>copyright © {currentYear}</p>
    </footer>
  );
}
