import Image from "next/image";
export const Register = (props) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#C5E4E7] font-mono">
      <div className="w-[945px] h-[600px] flex  items-center bg-white rounded-lg  drop-shadow-lg ">
        <Image
          src="/bg-sidebar-desktop.svg"
          alt="Splitter"
          width={275}
          height={565}
          className="pl-5"
        />
        <div className=" h-[465px] w-[490px] ml-20 relative">
          <form action="">
            <p className="font-bold text-[30px] text-[#052C5F] pb-[5px]">
              Register an Account
            </p>
            <p className="text-[14px] text-gray-400 pb-8">
              Please provide your name, email address and phone number.
            </p>
            <label className="text-sm" htmlFor="">
              <p className=" text-[#052C5F] pb-1 font-medium">Name</p>
            </label>
            <input
              className="block border-gray-200 rounded-md h-[38px]  border-2 w-[400px] mb-4"
              type="text"
            />
            <label className="text-sm" htmlFor="">
              <p className=" text-[#052C5F] font-medium pb-1">Email Address</p>
            </label>
            <input
              className="block border-gray-200 rounded-md h-[38px]  border-2 w-[400px] mb-4"
              type="email"
            />
            <label className="text-sm" htmlFor="">
              <p className="text-[#052C5F] font-medium pb-1">Password</p>
            </label>
            <input
              className="block border-gray-200 rounded-md h-[38px] p border-2 w-[400px] mb-4"
              type="password"
            />
            <div className="absolute bottom-0 right-[232px] ">
              <button className="w-[110px] h-[40px] bg-[#174A8A] rounded-lg text-white text-sm">
                Submit
              </button>
            </div>
          </form>
          <a
            onClick={() => props.onFormSwitch("Login")}
            className="text-[#174A8A] text-sm mt-2 block underline hover:text-red-500 cursor-pointer"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};
