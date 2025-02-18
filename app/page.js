import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">
        <Button variant="destructive">Click ME!</Button>
      </Link>
    </div>
  );
}
