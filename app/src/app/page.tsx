import Image from "next/image";
import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import MainContainer from './components/MainContainer';
import Footer from "@/app/components/Footer";
import { LoadingProvider } from './LoadingContext';

export default function Home() {
  return (
    <>
    <LoadingProvider>
    <div className="flex flex-col min-h-screen"> 
      <Header />
      <SearchBar />
      <div className="flex-grow"> 
        <MainContainer />
      </div>
      <Footer />
    </div>
    </LoadingProvider>
    </>
  );
}
