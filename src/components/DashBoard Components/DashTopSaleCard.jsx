// Next
import Image from "next/image";

const DashTopSaleCard = () => {
  return (
    <div className="flex items-start gap-2 border-b-2 border-t-2 px-3 py-2">
      {/* <div className="flex items-start "> */}
      <Image
        src={
          "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
        }
        alt="no pic"
        width={100}
        height={300}
        className="rounded-lg"
      ></Image>
      <div>
        {/* Product Details */}
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          numquam quos, nulla maxime.
        </h1>
        {/*  */}
        <div className="flex justify-between">
          <p className="font-semibold">1 price</p>
          <p className="font-bold text-xl">all prices</p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DashTopSaleCard;
