// React Icons
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineWorkHistory } from "react-icons/md";

const ContactInfo = () => {
  const infos = [
    {
      icon: MdOutlinePhonelinkRing,
      title: "Phone",
      desc: "+213 123 456 789",
      extraInfo: "Sat-Thu, 9:00 - 18:00",
    },
    {
      icon: MdOutlineAttachEmail,
      title: "Email",
      desc: "support@shopname.com",
      extraInfo: "We reply within 24 hours",
    },
    {
      icon: TfiLocationPin,
      title: "Store Location",
      desc: "123 Main Street, City, State 12389",
      extraInfo: "Visit us in person!",
    },
    {
      icon: MdOutlineWorkHistory,
      title: "Business Hours",
      desc: "Sat-Thu, 9:00 - 18:00",
      extraInfo: "Closed on major holidays",
    },
  ];
  return (
    <div className="bg-slate-50 p-4 rounded-2xl shadow-lg">
      <header className="text-2xl font-bold mb-7 ">Contact Information</header>
      <main className="space-y-3">
        {infos.map((f, i) => {
          return (
            <div key={i} className="flex items-start gap-3.5">
              <div className="bg-gray-700 rounded-full p-1 w-10 h-10 flex items-center justify-center">
                <f.icon className="text-gray-200 text-2xl" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{f.title}</h1>
                <p className="text-gray-500 text-sm">{f.desc}</p>
                <p className="text-gray-500 text-sm">{f.extraInfo}</p>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default ContactInfo;
