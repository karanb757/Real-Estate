// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <section className=" dark:bg-black mt-21"> {/* Adjust this value */}
//       <div className="flex justify-center min-h-[calc(100vh-84px)]">
//         <div
//           className="hidden bg-cover lg:block lg:w-2/5"
//           style={{
//             backgroundImage: "url('/login.png')",
//           }}
//         ></div>

//         <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
//           <div className="w-full">

//             <div className="ml-40">
//             <SignIn />
//             </div>
           
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden">
        
        <div
          className="w-1/2 bg-cover"
          style={{ backgroundImage: "url('/login.png')" }}
        >
        </div>

        <div className="w-full lg:w-1/2 bg-black flex flex-col justify-center items-center p-10 pt-24">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
              <h1 className="text-white text-3xl font-bold">Welcome back</h1>
              <p className="text-gray-400 text-sm mt-2">Log in to your account</p>
            </div>

            <SignIn appearance={{
              elements: {
                card: "bg-black border border-gray-800 text-white",
                formButtonPrimary: "bg-[#7f57f1] hover:bg-[#6a45d8] transition",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
              },
              variables: {
                colorPrimary: "#7f57f1",
                colorText: "#fff",
                colorBackground: "#000",
              }
            }} />
          </div>
        </div>

      </div>
    </section>
  );
}


