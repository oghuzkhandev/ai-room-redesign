import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <h1 className="mb-10 text-yellow-600">Welcome to my Application Sign in and Enjoy</h1>
      <SignIn />
    </div>
  );
}
