// My Components
import DashEditProductFormWrapper from "@/components/DashBoard Components/ProductsComp/DashEditProductFormWrapper";

export const metadata = {
  title: "Editing Product",
};

const page = async ({ params }) => {
  const { slug } = await params;
  return (
    <div className="w-full my-5">
      <DashEditProductFormWrapper slug={slug} />
    </div>
  );
};

export default page;
