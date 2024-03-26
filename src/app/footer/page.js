const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="border-t p-8 text-center text-gray-500 mt-16">
        &copy; {currentYear} All rights reserved
      </footer>
    </>
  );
};

export default Footer;

