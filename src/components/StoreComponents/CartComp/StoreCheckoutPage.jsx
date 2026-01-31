"use client";

// Stores
import { useCartStore } from "@/utils/CartStore";
import { useUserStore } from "@/utils/UserStore";
import { useProductStore } from "@/utils/ProductStore";
import { useOrderStore } from "@/utils/OrderStore";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// React
import { useEffect, useMemo, useState } from "react";

// React Icons
import { MdOutlineLocationOn } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { FaRegCreditCard } from "react-icons/fa";

// Shadcn Comp
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// My Components
import StoreCouponDialogue from "./StoreCouponDialogue";

// Date FNS
import { format } from "date-fns";


const StoreCheckoutPage = () => {
  const {
    checkout,
    setCheckout,
    removeFromCart,
    syncToCheckout,
    appliedCoupon,
    setAppliedCoupon,
  } = useCartStore();
  const { currentUser } = useUserStore();
  const { addNewOrder } = useOrderStore();
  const { updateProduct } = useProductStore();
  const router = useRouter();

  const DeliveryBureaux = [
    "à coté de lycée ELMOGHILI, derrière le conseil judicaire - ADRAR",
    "Hay aroudj-derrière A D E en face le musé - CHLEF",
    "Maamoura-en face mosquée El Imam Houssein - LAGHOUAT",
    "Ain El beida, Cite el ahram -en face école gharbi lakhder - OUM EL BOUAGHI",
    "N°392 cité ennacer - OUM EL BOUAGHI",
    "Les allés jadida erriad -a côté supérette el bahja - BATNA",
    "Edimco, Cité somacob - BEJAIA",
    "El koures- en face salle des fêtes soukara - BISKRA",
    "Cité 220 log -à coté de CNRC - BECHAR",
    "Cité Ben Mokadem Mohammed N°276-Ramoul en face l'agence - BLIDA",
    "338log -En face de l'hôtel Sofy - BOUIRA",
    "Cité El Wiam-en face CASNOS - TAMANRASSET",
    "Cité El Salem Groupe N°016-à coté de warda com en face cem ben badis - TEBESSA",
    "En face Rond point cité des oliviers - TLEMCEN",
    "05 Route Ain Gaesma -à coté de la librairie Mimouni - TIARET",
    "Cité 2000 nouvelle ville batiment 2 - TIZI OUZOU",
    "Rue des Rosiers, El Malha Birkhadem - ALGER",
    "Ouled Fayet - pas loins de restaurant Zouhair - ALGER",
    "Résidence la paix A69-En face la mosquée dnc - ALGER",
    "Lido - Pas loin de stade de tennis - ALGER",
    "Cité berbih- a coté de la direction de l'action sociale et de la solidarité LA DASS - DJELFA",
    "Cité Konchovali- 190 log Batiment 07 70m gulf bank - JIJEL",
    "Cité Dalas 3ème tranche -à côté de la maison LG et IRIS - SETIF",
    "Logement covalente -derrière hôtel Rif,à coté la mosquée Imam Shaafel - SETIF",
    "Cité 5 juillet -en face la pharmacie 5 juillet - SAIDA",
    "Cité Mohammed Namous N°02 Mag 02- pas loin de Hammam Derradji - SKIKDA",
    "Benhamouda-En face l'école Feraoune Miloud - SIDI BELABBES",
    "Rue l'avant port-à côté de supérette Ben Amara - ANNABA",
    "à côté de cafetera de la fontaine - GUELMA",
    "Cité tlemcen, 72, Zouaghi Slimen - CONSTANTINE",
    "Zone industrielle, Nouvelle ville Ali Mendjeli - CONSTANTINE",
    "Beziwech rue takhabit-au dessous du cabinet de gynécologie dr khelifi - MEDEA",
    "Cité colonel Amirouche -En face Tribunal - MOSTAGANEM",
    "Cité cheikh Mokrani -à coté de la mosquée Aisha oum el mouminine - M'SILA",
    "Rue Mahour Mahie Eddine -en face les pompiers - MASCARA",
    "Cité 21 logement -en face rue si el houasse - OUARGLA",
    "Cité AADL 200 -a côté de la CASNOS - HASSI MESSAOUD",
    "Cooperative el manekh, USTO/HLM - ORAN",
    "Mélinium-En face la superette Prix Choc - ORAN",
    "Cité ancien stade-à côté de l'huissier de justice Djouadi Malika - EL BAYADH",
    "Cité Boumergued -en face la clinique Akhrouf - BORDJ BOU ARRERIDJ",
    "Rue Mohamed El Mahdi, Sur le chemin de l'hôtel les Lilas - BOUMERDES",
    "Rue khmiss tine -en face le premier arrondissement - ET TARF",
    "Cité Sidi Abdellah, derrière la poste - EL OUED",
    "Rue Abdelaziz Kader -à côté de la mosquée El Aman - SOUK AHRAS",
    "La nouvelle AADL 1700- en face l'ONPS - TIPAZA",
    "Jamouaa Milkia N°34 -à côté l'agence Sonalgaz - MILA",
    "Rond point cyliste -En face la daira - AIN DEFLA",
    "Mechria centre, rue El amir abdelkader - face le cafétéria turc - NAAMA",
    "Hai Ezaitoun -à coté de la mosquée Oussama Abu Zaid (El Bechari) - AIN TIMOUCHENT",
    "Région tmasekht beni yezgen-Bounoura a côté pharmacie abdelaziz - GHARDAIA",
    "Îlot 183, Boulevard de la république N°45, Centre ville - RELIZANE",
    "Rue Mithana -à côté la maison de jeune - OULED DJELLAL",
    "Cité sidi abdessalem -Entre BEA et CPA - TOUGGOURT",
  ];

  useEffect(() => {
    if (checkout.length === 0 && currentUser?.checkout?.length > 0) {
      setCheckout(currentUser.checkout);
    }
  }, [currentUser, checkout, setCheckout]);

  const subtotal = checkout.reduce((acc, item) => {
    const price =
      item.product.status === "on sale"
        ? item.product.price -
          (item.product.price * item.product.discount) / 100
        : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const BureauDeliveryFee = 300;
  const HomeDeliveryFee = 600;
  const [DeliveryPlace, setDeliveryPlace] = useState("Home");
  const [Payment, setPayment] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const [Place, setPlace] = useState({
    address: currentUser?.address,
    BAddress: "",
  });
  const [OpenCoupon, setOpenCoupon] = useState(false);

  // 1. Move the deliveryFee calculation outside the memo so it's a stable dependency
  const currentDeliveryFee =
    DeliveryPlace === "Home" ? HomeDeliveryFee : BureauDeliveryFee;

  // 2. Updated finalTotal logic
  const finalTotal = useMemo(() => {
    let baseSum = subtotal + currentDeliveryFee;

    if (appliedCoupon) {
      const discountStr = appliedCoupon.discount.toString().toLowerCase();
      if (discountStr.includes("%")) {
        baseSum = baseSum - (baseSum * parseFloat(discountStr)) / 100;
      } else if (discountStr === "free delivery") {
        baseSum = subtotal; // Total becomes just the subtotal
      } else {
        baseSum = baseSum - parseFloat(discountStr);
      }
    }
    return Math.max(0, baseSum);
  }, [subtotal, currentDeliveryFee, appliedCoupon]);

  const handlePlaceOrder = async () => {
    setLoading(true);

    if (DeliveryPlace === "Home" && !Place.address) {
      HandeResults(false, "Please enter your home delivery address.");
      setLoading(false);
      return;
    }

    if (DeliveryPlace === "Bureau" && !Place.BAddress) {
      HandeResults(false, "Please select a Bureau for pickup.");
      setLoading(false);
      return;
    }

    const formattedProducts = checkout.map((item) => {
      const currentPrice =
        item.product.status === "on sale"
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price;

      return {
        product: item.product._id,
        quantity: item.quantity,
        priceAtPurchase: currentPrice,
        color: item.color,
        size: item.size,
      };
    });

    const deliveryFee =
      DeliveryPlace === "Home" ? HomeDeliveryFee : BureauDeliveryFee;

    const finalOrder = {
      user: currentUser?._id,
      products: formattedProducts,
      totalAmount: finalTotal,
      deliveryFee: deliveryFee,
      timeOfOrder: format(new Date(), "E: dd/MM/yyyy - HH:mm:ss"),
      paymentMethod: Payment,
      deliveryPlace: DeliveryPlace,
      deliveryAddress: {
        address: DeliveryPlace === "Home" ? Place.address : "",
        bureauAddress: DeliveryPlace === "Bureau" ? Place.BAddress : "",
      },
    };

    const { success, message } = await addNewOrder(finalOrder);
    HandeResults(success, message);

    if (success === true) {
      const userId = currentUser._id || currentUser.id;

      const ProductQntDecreace = checkout.map((item) => {
        const currentVariants = item.product.variants;

        const updatedVariants = currentVariants.map((v) => {
          if (v.size === item.size && v.color === item.color) {
            return {
              ...v,
              quantity: v.quantity - item.quantity,
            };
          }
          return v;
        });

        return updateProduct(item.product._id, { variants: updatedVariants });
      });
      await Promise.all(ProductQntDecreace);

      const clearCartPromises = checkout.map((item) =>
        removeFromCart(userId, item._id),
      );
      await Promise.all(clearCartPromises);

      await syncToCheckout(userId, []);

      setAppliedCoupon(null);

      setCheckout([]);

      router.push("/");
    }
    setLoading(false);
  };

  if (!currentUser || !checkout) {
    return <div className="max-w-7xl mx-auto p-6">Loading checkout....</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-5">Finalize Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Shipping Address Form */}
        <section>
          {/* delivery */}
          <div>
            <header className="flex items-start gap-1 text-xl font-semibold">
              <MdOutlineLocationOn className="text-2xl" /> Delivery Address
            </header>
            <RadioGroup
              defaultValue="Home"
              value={DeliveryPlace}
              onValueChange={setDeliveryPlace}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4"
            >
              <div
                onClick={() => setDeliveryPlace("Home")}
                className={`flex items-center space-x-3 p-3 h-16 rounded-md cursor-pointer border-gray-800 transition-all ease-in-out duration-300  ${
                  DeliveryPlace === "Home"
                    ? " bg-slate-100 border-2"
                    : " bg-slate-50 hover:shadow-md"
                }`}
              >
                <RadioGroupItem value="Home" id="Home" />
                <IoHomeOutline className="text-xl" />
                <span>Home</span>
              </div>
              <div
                onClick={() => setDeliveryPlace("Bureau")}
                className={`flex items-center space-x-3 p-3 h-16 rounded-md cursor-pointer border-gray-800 transition-all ease-in-out duration-300  ${
                  DeliveryPlace === "Home"
                    ? " bg-slate-50 hover:shadow-md"
                    : " bg-slate-100 border-2"
                }`}
              >
                <RadioGroupItem value="Bureau" id="Bureau" />
                <HiOutlineBuildingOffice2 className="text-xl" />
                <span>Office</span>
              </div>
            </RadioGroup>
            <footer className="w-full my-3">
              {DeliveryPlace === "Home" ? (
                <div>
                  <Label htmlFor="address" className={"w-full mb-1 text-lg"}>
                    Your Address
                  </Label>
                  <Input
                    id="address"
                    value={Place.address}
                    onChange={(e) =>
                      setPlace({ ...Place, address: e.target.value })
                    }
                    type="text"
                    className="mb-4"
                  />
                </div>
              ) : (
                <div className="w-full my-4">
                  <Label htmlFor="Baddress" className={"w-full text-lg"}>
                    Choose the nearest Bureau Address:
                  </Label>
                  <NativeSelect
                    id="Baddress"
                    className="w-full! min-w-full"
                    value={Place.BAddress}
                    onChange={(e) =>
                      setPlace({ ...Place, BAddress: e.target.value })
                    }
                  >
                    <NativeSelectOption value="">
                      Select Bureau
                    </NativeSelectOption>

                    {DeliveryBureaux.map((b, i) => {
                      return (
                        <NativeSelectOption key={i} value={b}>
                          {b}
                        </NativeSelectOption>
                      );
                    })}
                  </NativeSelect>
                </div>
              )}
            </footer>
          </div>
          {/* payment */}
          <div>
            <header className="flex items-center gap-1 text-xl font-semibold">
              <BiMoneyWithdraw className="text-2xl" />
              Payment Method
            </header>
            <RadioGroup
              defaultValue="Cash"
              value={Payment}
              onValueChange={setPayment}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4"
            >
              <div
                onClick={() => setPayment("Cash")}
                className={`flex items-center space-x-3 p-3 h-16 rounded-md cursor-pointer border-gray-800 transition-all ease-in-out duration-300 ${
                  Payment === "Cash"
                    ? " bg-slate-100 border-2"
                    : "bg-slate-50 hover:shadow-md"
                }`}
              >
                <RadioGroupItem value="Cash" id="Cash" />
                <GiMoneyStack className="text-2xl" />
                <span>Cash on Delivery</span>
              </div>
              <div
                onClick={() => setPayment("Card")}
                className={`flex items-center space-x-3 p-3 h-16 rounded-md cursor-pointer border-gray-800 transition-all ease-in-out duration-300 ${
                  Payment === "Cash"
                    ? " bg-slate-50 hover:shadow-md"
                    : " bg-slate-100 border-2"
                }`}
              >
                <RadioGroupItem value="Card" id="Card" />
                <FaRegCreditCard className="text-xl" />
                <span>Credit/Debit Card</span>
              </div>
            </RadioGroup>
          </div>
        </section>

        {/* Right Side: Order Summary */}
        <div>
          <section className="bg-slate-50 p-6 rounded-xl border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {checkout.map((item) => (
              <div key={item._id} className="flex justify-between mb-3">
                <div className="flex items-start gap-2">
                  <Image
                    src={item.product.previewImages[0]}
                    alt={item.product.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-semibold">
                      {item.product.title} (x{item.quantity})
                    </div>
                    <div>
                      {item.color} / {item.size}
                    </div>
                  </div>
                </div>
                <div className="font-bold">{item.product.price} Dz</div>
              </div>
            ))}
            <Separator className="my-4" />
            <div className="w-full flex items-center justify-between font-semibold text-md ">
              <h1>Coupon Discount</h1>
              {appliedCoupon ? (
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-bold">
                    -{appliedCoupon.discount}
                  </span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[10px] text-red-500"
                    onClick={() => setAppliedCoupon(null)}
                  >
                    Remove ({appliedCoupon.code})
                  </Button>
                </div>
              ) : (
                <Button
                  variant={"link"}
                  className="font-bold text-blue-600 px-0"
                  onClick={() => setOpenCoupon(true)}
                >
                  Apply Coupon
                </Button>
              )}
            </div>
            <div className="flex justify-between font-semibold text-md mb-3">
              <span>Delivery Fee</span>
              <span
                className={`font-bold ${appliedCoupon?.discount.toLowerCase() === "free delivery" ? "text-gray-400 line-through" : "text-green-600"}`}
              >
                + {currentDeliveryFee} Dz
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total to Pay</span>
              <span className="text-indigo-900">
                {finalTotal.toFixed(2)} Dz
              </span>
            </div>
          </section>
          <footer className="w-full py-4 text-right">
            <Button
              disabled={loading}
              className={"w-1/3"}
              onClick={handlePlaceOrder}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Placing an order...
                </div>
              ) : (
                "Place Order"
              )}
            </Button>
          </footer>
        </div>

        {/* Coupon Dialogue */}
        {OpenCoupon && (
          <StoreCouponDialogue
            OpenStatus={OpenCoupon}
            OpenToggle={setOpenCoupon}
            onApplySuccess={(couponData) => setAppliedCoupon(couponData)}
          />
        )}
      </div>
    </div>
  );
};

export default StoreCheckoutPage;
