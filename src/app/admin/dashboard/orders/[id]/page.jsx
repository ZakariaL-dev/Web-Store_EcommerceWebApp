// My Components
import DashOrderDetailsWrapper from "@/components/DashBoard Components/OrdersComp/DashOrderDetailsWrapper";

export const metadata = {
  title: "Order Details",
};

const page = async ({ params }) => {
  const { id } = await params;
  return <DashOrderDetailsWrapper id={id} />;
};

export default page;
