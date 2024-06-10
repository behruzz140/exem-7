import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { auth } from "@service-auth";
import { getCookies , removeCookiesAll } from "@coocse";
import { ModalDeleteAcount } from "@modals";
import { Draever } from "@ui";
import Admin from '../../assets/admin.jpg'
function Index() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any>({});
  const adminId = Number(getCookies("admin_id"));

  const getAdminData = async (id: number) => {
    try {
      const response = await auth.getAdminId(id);
      if (response.status === 200) {
        setAdminData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAdminData(adminId);
  }, []);

  const addAccount = () => {
   removeCookiesAll(["admin_id" , "access_token" , "refresh_token"])
   toast.info("Added new account ")
    setTimeout(()=>{navigate("/signup")},1000)
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full flex items-center justify-center bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row items-center justify-around bg-white p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={Admin}
              alt="Admin img"
              className="w-[90%] h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col sm:flex-row items-start gap-[60px] p-4">
            <div className="flex flex-col items-start gap-3">
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">First Name</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.first_name}
                </h1>
              </div>
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">Last Name</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.last_name}
                </h1>
              </div>
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">Phone Number</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.phone_number}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">Email</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.email}
                </h1>
              </div>
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">Created At</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.createdAt ? adminData?.createdAt.slice(0, 10) : ""}
                </h1>
              </div>
              <div className="border-b-2 border-blue-500 pb-1 mb-3">
                <h2 className="text-blue-600 font-semibold">Updated At</h2>
                <h1 className="text-[18px] font-semibold text-gray-700">
                  {adminData?.lastUpdateAt ? adminData?.lastUpdateAt.slice(0, 10) : ""}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Draever id={adminId} data={adminData} />
                <ModalDeleteAcount id={adminId} />
                <button
                  onClick={addAccount}
                  className="py-2 px-5 rounded-md bg-[#0074cc] text-white font-medium hover:bg-[#005c99] duration-300 active:bg-[#004080]"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
