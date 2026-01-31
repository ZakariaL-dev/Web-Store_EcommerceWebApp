// My Components
import SearchWrapper from "@/components/StoreComponents/SearchComp/SearchWrapper";

export const metadata = {
  title: "Search",
};

const page = () => {
  return (
    <div className="mt-24 lg:max-w-7xl max-w-5xl mx-auto mb-6 px-6">
      <header className="text-2xl font-bold mb-5">Search results</header>
      <div className="w-full">
        <SearchWrapper />
      </div>
    </div>
  );
};

export default page;
