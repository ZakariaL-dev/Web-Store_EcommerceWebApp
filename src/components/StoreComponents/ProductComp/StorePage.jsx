import StoreProductSlide from "./StoreProductSlide";

const StorePage = () => {
  return (
    <>
      <StoreProductSlide
        title="New Arrivals"
        option="new"
        footerText="Explore New"
      />

      <StoreProductSlide
        title="Products On Sale"
        option="on sale"
        footerText="Explore Sale"
      />

      <StoreProductSlide
        title="Popular Products"
        option="normal"
        footerText="Explore Popular Products"
      />

      <StoreProductSlide
        title="All Products"
        footerText="Explore All Products"
      />
    </>
  );
};

export default StorePage;
