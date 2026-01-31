export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const t = params.t || "Service";

  if (t === "use") {
    return {
      title: `Terms of Use`,
    };
  } else {
    return {
      title: `Returns & Delivery Policy`,
    };
  }
}

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const t = params.t;

  return (
    <div className="w-full mt-24 max-w-7xl mx-auto mb-6">
      {t === "use" ? `Terms of Use` : `Returns & Delivery Policy`}
    </div>
  );
};

export default page;
