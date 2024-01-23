import Navbar from "./components/Navbar";
import RegisteredStats from "./components/RegisteredStats";

export default async function Home() {
  return (
    <main className='h-screen w-screen'>
      <Navbar></Navbar>
      <RegisteredStats></RegisteredStats>
    </main>
  );
}
