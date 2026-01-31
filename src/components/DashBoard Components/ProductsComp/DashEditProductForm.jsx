"use client";

// Stores
import { useProductStore } from "@/utils/ProductStore";

// React
import { useRef, useState } from "react";

// Slugify
import slugify from "slugify";

// Shadcn Comp
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

// React Icons
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { BiCartAdd } from "react-icons/bi";

// Next
import Image from "next/image";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const DashEditProductForm = ({ current }) => {
  const { updateProduct } = useProductStore();

  const [NewProduct, setNewProduct] = useState(current);
  const [discount, setDiscount] = useState(10);
  const finalPrice =
    NewProduct.status === "on sale"
      ? (NewProduct.price - (NewProduct.price * discount) / 100).toFixed(2)
      : NewProduct.price;

  // Handle Variant Changes
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...NewProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...NewProduct, variants: updatedVariants });
  };
  const addVariant = () => {
    setNewProduct({
      ...NewProduct,
      variants: [...NewProduct.variants, { size: "", color: "", quantity: 0 }],
    });
  };
  const removeVariant = (index) => {
    const updatedVariants = NewProduct.variants.filter((_, i) => i !== index);
    setNewProduct({ ...NewProduct, variants: updatedVariants });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_Upload_Preset_Name,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloud_Name}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await res.json();
    return data.secure_url;
  };

  // Separate state for image files and their local previews
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState(current?.previewImages);
  const fileInputRef = useRef(null);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const imageToRemove = previews[index];

    setPreviews((prev) => prev.filter((_, i) => i !== index));

    if (imageToRemove.startsWith("blob:")) {
      setImageFiles((prev) =>
        prev.filter(
          (_, i) => i !== index - (previews.length - imageFiles.length),
        ),
      );
    }
  };

  // handle Submit Product
  const [Loading, setLoading] = useState(false);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Separate existing URLs from new File objects
      const existingUrls = previews.filter((url) => url.startsWith("http"));
      const newFiles = imageFiles;

      // 2. Upload only the new files to Cloudinary
      const uploadPromises = newFiles.map((file) => uploadToCloudinary(file));
      const newUploadedUrls = await Promise.all(uploadPromises);

      // 3. Combine them back into a single array
      const allImageUrls = [...existingUrls, ...newUploadedUrls];

      const productToSubmit = {
        ...NewProduct,
        price: finalPrice,
        previewImages: allImageUrls, // Send only the URLs to your database
      };

      // 4. Update the product in your store
      const { success, message } = await updateProduct(
        productToSubmit._id,
        productToSubmit,
      );

      HandeResults(success, message);

      if (success === true) {
        setImageFiles([]);
        setNewProduct(productToSubmit);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error in cloud update product dash:", error);
      HandeResults(false, `Failed to upload images to the cloud: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-3xl mx-auto bg-gray-50 p-3 rounded-2xl border-2">
      <header className="w-full text-2xl font-bold">Edit Your Product</header>
      <Separator className="my-2" />
      {/* title */}
      <Label htmlFor="title" className={"w-full mb-1 text-lg"}>
        Title
      </Label>
      <Input
        id="title"
        value={NewProduct.title}
        onChange={(e) =>
          setNewProduct({
            ...NewProduct,
            title: e.target.value,
            slug: slugify(e.target.value, { lower: true }),
          })
        }
        type="text"
        placeholder="title"
        className="mb-4"
      />
      {/* description */}
      <Label htmlFor="description" className={"w-full mb-1 text-lg"}>
        Description
      </Label>
      <Textarea
        id="description"
        value={NewProduct.description}
        onChange={(e) =>
          setNewProduct({
            ...NewProduct,
            description: e.target.value,
          })
        }
        type="text"
        placeholder="Detailed description..."
        className="mb-4"
      />
      {/* price */}
      <Label htmlFor="price" className={"w-full mb-1 text-lg"}>
        Price (Dz)
      </Label>
      <Input
        id="price"
        value={NewProduct.price}
        onChange={(e) =>
          setNewProduct({
            ...NewProduct,
            price: e.target.value,
          })
        }
        type="number"
        className="mb-4"
      />
      {/*  */}
      <div className="flex w-full gap-2 items-center lg:flex-nowrap flex-wrap">
        {/* category */}
        <div className="flex-1">
          <Label htmlFor="category" className={"w-full mb-1 text-lg"}>
            Category
          </Label>
          <Select
            id="category"
            value={NewProduct.category}
            onValueChange={(e) =>
              setNewProduct({
                ...NewProduct,
                category: e,
              })
            }
          >
            <SelectTrigger className="mb-4 w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="man">Man</SelectItem>
              <SelectItem value="woman">Woman</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* status */}
        <div className="flex-1">
          <Label htmlFor="status" className={"w-full mb-1 text-lg"}>
            Status
          </Label>
          <Select
            id="status"
            value={NewProduct.status}
            onValueChange={(e) =>
              setNewProduct({
                ...NewProduct,
                status: e,
              })
            }
          >
            <SelectTrigger className="mb-4 w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="on sale">On sale</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* dicount amount */}
        {NewProduct.status === "on sale" ? (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between md:w-full lg:flex-2">
            <div className="flex-1 mr-4">
              <Label htmlFor="discount" className={"w-full mb-2"}>
                Discount Percentage (%)
              </Label>
              <Input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Sale Price</p>
              <p className="text-xl font-bold text-orange-600">
                {finalPrice} Dz
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/*  */}
      {/* variants */}
      <header className="w-full flex items-center justify-between mt-4">
        <h1 className="text-2xl font-bold">Variants</h1>
        <Button
          type="button"
          className="flex items-center gap-2 bg-gray-500"
          onClick={addVariant}
        >
          <AiOutlinePlus />
          Add Variant
        </Button>
      </header>
      <Separator className="my-2" />
      {NewProduct.variants.map((variant, index) => (
        <div
          key={index}
          className="flex gap-2 items-end bg-gray-50 p-2 rounded-md"
        >
          <div className="flex-1">
            <Input
              placeholder="Size (e.g. XL)"
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Color"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
            />
          </div>
          <div className="w-24">
            <Input
              type="number"
              placeholder="Qty"
              min={0}
              value={variant.quantity}
              onChange={(e) =>
                handleVariantChange(index, "quantity", e.target.value)
              }
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-red-500"
            onClick={() => removeVariant(index)}
            disabled={NewProduct.variants.length === 1}
          >
            <MdDeleteOutline className="w-4 h-4" />
          </Button>
        </div>
      ))}
      {/* Images */}
      <header className="w-full flex items-center justify-between mt-2.5">
        <h1 className="text-2xl font-bold">Images</h1>
        <Button
          type="button"
          className="flex items-center gap-2 bg-gray-500"
          onClick={() => fileInputRef.current.click()}
        >
          <BiImageAdd />
          Add Image
        </Button>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </header>
      {/* image preview */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-2">
        {previews.map((url, index) => (
          <div
            key={index}
            className="relative group aspect-square border-2 rounded-xl overflow-hidden bg-white"
          >
            <Image
              src={url}
              alt={`Product preview ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <MdDeleteOutline size={16} />
            </button>
          </div>
        ))}

        {previews.length === 0 && (
          <div className="col-span-full py-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400">
            <BiImageAdd size={48} />
            <p>No images selected yet</p>
          </div>
        )}
      </div>
      <footer className="w-full flex justify-end mb-2 mt-5">
        {Loading === false ? (
          <Button
            type="submit"
            className="flex items-center gap-2"
            onClick={(e) => handleSubmitProduct(e)}
          >
            <BiCartAdd /> Edit Product
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <Spinner />
            Processing ...
          </Button>
        )}
      </footer>
    </form>
  );
};

export default DashEditProductForm;
