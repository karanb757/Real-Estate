import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-black dark:bg-gray-900"> {/* Adjust this value */}
      <div className="flex justify-center min-h-[calc(100vh-84px)]">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: "url('/login.png')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">

            <div className="ml-40">
            <SignIn />
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
}