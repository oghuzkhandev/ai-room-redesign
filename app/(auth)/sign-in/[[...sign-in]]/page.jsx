import { SignIn } from "@clerk/nextjs";


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <h1 className="mb-10 text-yellow-600 text-2xl">
        Welcome to my Application Sign in and Enjoy
      </h1>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "text-[15px] bg-purple-600 hover:bg-purple-500/70 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg rounded-lg transform transition-all duration-300 ease-in-out active:scale-95",
            input:
              "text-[14px] p-3 rounded-lg focus:ring-2 focus:ring-purple-600",
            socialButtons: "flex flex-col gap-4",
          },
        }}
      />
    </div>
  );
}
