"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// Next
import Image from "next/image";

// React
import { useEffect, useRef, useState } from "react";

// React Icons
import { BiImageAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


const MainBanner = () => {
  const { config, updateConfigure } = useConfigureStore();

  useEffect(() => {
    if (config?.banners) {
      setPreviews(config.banners);
    }
  }, [config]);

  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState(config?.banners || []);
  const fileInputRef = useRef(null);
  // Handle Image Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };
  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
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

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const existingUrls = previews.filter((url) => url.startsWith("http"));
      const newFiles = imageFiles;

      // 2. Upload only the new files to Cloudinary
      const uploadPromises = newFiles.map((file) => uploadToCloudinary(file));
      const newUploadedUrls = await Promise.all(uploadPromises);

      // 3. Combine them back into a single array
      const allImageUrls = [...existingUrls, ...newUploadedUrls];

      const { success, message } = await updateConfigure(
        process.env.NEXT_PUBLIC_Store_Config,
        allImageUrls,
        "banners",
      );
      HandeResults(success, message);

      if (success === true) {
        setImageFiles([]);
      }
      setLoading(false);
    } catch (error) {
      HandeResults(false, `Failed to upload images to the cloud: ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (!config || !config.banners) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading Banners...
      </div>
    );
  }

  return (
    <div className="w-full border-2 rounded-lg p-3 bg-slate-50">
      <header className="w-full flex items-center justify-between mt-2.5">
        <h1 className="text-lg mb-3 font-bold px-3">Main Page Banners</h1>
        <Button
          type="button"
          className="flex items-center gap-2 bg-gray-500"
          onClick={() => fileInputRef.current.click()}
        >
          <BiImageAdd />
          Add Banner
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
      <div className="mt-6 flex justify-end px-1.5">
        <Button
          className="bg-green-600 hover:bg-green-800 px-8"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Banners"}
        </Button>
      </div>
    </div>
  );
};

export default MainBanner;
