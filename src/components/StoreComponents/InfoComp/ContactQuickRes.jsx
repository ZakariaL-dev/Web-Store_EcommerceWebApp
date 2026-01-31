// React Icons
import { TbMessageCheck } from "react-icons/tb";

const ContactQuickRes = () => {
  return (
    <div className="bg-linear-to-r from-indigo-950 via-blue-900 to-cyan-300 p-6 rounded-2xl shadow-lg text-white space-y-2.5">
      <TbMessageCheck className="text-5xl" />
      <h1 className="font-bold text-xl">Quick Response</h1>
      <p className="text-lg">
        Our customer service team typically responds within 2-4 hours during
        business hours. For urgent matters, please call us directly.
      </p>
    </div>
  );
};

export default ContactQuickRes;
