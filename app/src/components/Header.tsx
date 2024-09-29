import Link from 'next/link';


const Header: React.FC = () => {

  return (
    <header className="bg-[#000000] text-[#f0a818] py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">
            Dashboard
          </Link>
        </h1>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/metrics">
                <span className="hover:text-[#7890a8]">Métricas</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
