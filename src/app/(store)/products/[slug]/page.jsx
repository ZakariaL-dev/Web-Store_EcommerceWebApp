// My Components
import StoreProductPageWrapper from "@/components/StoreComponents/ProductComp/StoreProductWrapper";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  function formatSlug(s) {
    if (!s) return "Product";
    return s
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return {
    title: formatSlug(slug),
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  return (
    <div className="mt-24 mb-6 px-6">
      <StoreProductPageWrapper slug={slug} />
    </div>
  );
};

export default page;
