'use client'

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { login } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast("failure", { description: "Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }
  
    try {
      dispatch(login({ name, email }));
  
      toast("success", { description: "User successfully logged in!!" });
  
      setEmail("");
      setName("");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      toast("failure", { description: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (

    <div>
      <BackgroundGradientAnimation>

        <div className="absolute z-40 inset-0 flex min-h-screen items-center justify-center">
          <div className="mx-auto w-5/6 sm:w-full max-w-md bg-transparant backdrop-opacity-50 p-8 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-medium text-white text-center ">Sign-up</h1>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="relative z-0">
                <input
                  type="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  Name
                </label>
              </div>
              <div className="relative z-0 mt-6">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  Email
                </label>
              </div>
              <button
                type="submit"
                className={`mt-6 w-full rounded-md bg-blue-600 px-6 py-2 text-white font-medium transition hover:bg-blue-700 ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signning up..." : "Sign-up"}
              </button>
            </form>
          </div>
        </div>
      </BackgroundGradientAnimation >
    </div>
  );
}