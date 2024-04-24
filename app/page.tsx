import Image from "next/image";
import Decider from "./components/decider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pl-24 pr-24">
      <Decider />
    </main>
  );
}
