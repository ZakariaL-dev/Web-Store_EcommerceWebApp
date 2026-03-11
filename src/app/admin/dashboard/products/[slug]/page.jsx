import DashProductDetails from "@/components/DashBoard Components/ProductsComp/DashProductDetails";


export const metadata = {
  title: "Product Details",
};

const page = async ({params}) => {
  const {slug} = await params;
    return <DashProductDetails slug={slug} />;
}

export default page