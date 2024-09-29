import Image from "next/image";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MainContainer from '../components/MainContainer';
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <SearchBar />
      <div className="flex-grow"> 
        <MainContainer />
      </div>
      <Footer />
    </div>
  );
}
