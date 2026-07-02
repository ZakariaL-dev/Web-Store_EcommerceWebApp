// My Components
import ProductsComplain from "@/components/DashBoard Components/ReportsComp/products/ProductsComplain";
import UsersComplain from "@/components/DashBoard Components/ReportsComp/users/UsersComplain";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const r = params.r;

  let title = "Reports"; // Fallback title
  if (r === "customers") title = "Users Complains";
  if (r === "products") title = "Products Complains";

  return { title };
}

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const r = params.r;
  return (
    <div className="flex flex-col w-full my-3">
      {r === "customers" && <UsersComplain />}
      {r === "products" && <ProductsComplain />}
    </div>
  );
};

export default page;
