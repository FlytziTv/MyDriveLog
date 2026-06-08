import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-[32px] font-bold text-neutral-900 tracking-tight">
            MyDriveLog
          </h1>
          <p className="text-[15px] text-neutral-500">
            Gérez vos véhicules intelligemment
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-8">
          <Link
            href="/register"
            className="w-full flex items-center justify-center text-sm h-11 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 cursor-pointer transition-colors duration-300"
          >
            Commencer
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center text-neutral-900 font-medium text-sm cursor-pointer underline-offset-2 hover:underline transition-all duration-500"
          >
            J&apos;ai déjà un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
