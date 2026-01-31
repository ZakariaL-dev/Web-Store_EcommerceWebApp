// My Components
import ContactInfo from "@/components/StoreComponents/InfoComp/ContactInfo";
import ContactMsg from "@/components/StoreComponents/InfoComp/ContactMsg";
import ContactQuickRes from "@/components/StoreComponents/InfoComp/ContactQuickRes";

export const metadata = {
  title: "Contact Us",
};

const page = () => {
  return (
    <div className="w-full mt-24 max-w-7xl mx-auto mb-6 paddingfix">
      <header className="flex flex-col items-center gap-2 mb-10">
        <h1 className="text-3xl font-bold">Get In Touch</h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
          We&apos;d love to hear from you! Whether you have a question about our
          products, need assistance with your order, or want to provide
          feedback, our team is here to help.
        </p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-y-8">
          <ContactInfo />
          <ContactQuickRes />
        </div>
        <ContactMsg />
      </main>
    </div>
  );
};

export default page;
