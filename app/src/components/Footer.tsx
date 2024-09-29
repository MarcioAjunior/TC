// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white py-1">
      <div className="container mx-auto text-right">
        <p className="text-sm">
            Developed by
            <Link href="https://github.com/MarcioAjunior/TC3" passHref>
              <strong> <u>MarcioAJunior</u> </strong> como TC Fase 3. Machine Learning Engineering
            </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
