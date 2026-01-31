// My Components
import OrderDetailsWrapper from "@/components/AccountComponents/PageWrappers/OrderDetailsWrapper";

export const metadata = {
  title: "Order Details",
};

const page = async ({ params }) => {
  const { id } = await params;
  return <OrderDetailsWrapper id={id} />;
};

export default page;
