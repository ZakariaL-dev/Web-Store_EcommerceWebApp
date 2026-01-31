// My Components
import LogInForm from "@/components/RegisterComponents/LogInForm";


export const metadata = {
  title: "Sign In",
};

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-100 px-8 overflow-hidden">
      <div className="lg:w-1/3 md:w-1/2 w-full h-136 rounded-2xl backdrop-blur-2xl shadow-xl bg-[linear-gradient(to_right_top,#1b889f,#2a8faf,#3c95bd,#519bcb,#67a1d8,#65a6dd,#63ace2,#60b1e7,#45b7e1,#32bbd6,#33bec8,#45c0b8)]">
        <div className="px-6 py-4.5 text-white mb-3">
          <h1 className="font-bold text-3xl">Welcom Back!!</h1>
          <p className="pl-3">We are glad to see you 😉</p>
        </div>
        <div className="w-full bg-white lg:h-[80%] h-[85%] rounded-t-4xl rounded-b-2xl p-4">
          <h1 className="bg-[linear-gradient(to_right_top,#1b889f,#2a8faf,#3c95bd,#519bcb,#67a1d8,#65a6dd,#63ace2,#60b1e7,#45b7e1,#32bbd6,#33bec8,#45c0b8)] bg-clip-text text-transparent font-bold text-3xl mb-6 h-10">
            Log In
          </h1>
          <LogInForm />
        </div>
      </div>
    </div>
  );
};

export default page;
