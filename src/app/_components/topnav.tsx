import { SignIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="flex flex-wrap items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="">Gallery</div>
      <div className="">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignIn>
          <UserButton />
        </SignIn>
      </div>
    </nav>
  );
}
