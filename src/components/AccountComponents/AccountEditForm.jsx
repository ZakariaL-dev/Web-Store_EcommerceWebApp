"use client";

// Shadcn Comp
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

// Lucide React
import { ChevronDownIcon } from "lucide-react";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// Stores
import { useUserStore } from "@/utils/UserStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// React
import { useState, useRef } from "react";

// React Icons
import { TbPhotoPlus } from "react-icons/tb";


const AccountEditForm = () => {
  const router = useRouter();

  const fileInputRef = useRef(null);
  const { currentUser, updateUser } = useUserStore();

  const [NewCredentials, setNewCredentials] = useState({
    profileImage: currentUser.profileImage || "",
    userName: currentUser.userName,
    dateOfBirth: currentUser.dateOfBirth
      ? new Date(currentUser.dateOfBirth)
      : undefined,
    gender: currentUser.gender,
    phoneNumber: currentUser.phoneNumber,
    address: currentUser.address,
  });
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined,
  );
  const [Loading, setLoading] = useState(false);

  const handleHeaderClick = () => {
    fileInputRef.current.click();
  };
  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show immediate local preview for better UX
    const localPreview = URL.createObjectURL(file);
    setNewCredentials({
      ...NewCredentials,
      profileImage: localPreview,
    });

    setLoading(true); // Start loading while uploading to Cloudinary

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_Upload_Preset_Name,
      ); // Your preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloud_Name}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        // Update state with the REAL Cloudinary URL
        setNewCredentials((prev) => ({
          ...prev,
          profileImage: data.secure_url,
        }));
        HandeResults(true, "Image uploaded successfully");
      }
    } catch (error) {
      HandeResults(false, `Failed to upload image to cloud: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (NewCredentials.profileImage.startsWith("blob:")) {
      HandeResults(false, "Please wait for the image to finish uploading");
      return;
    }

    setLoading(true);

    const { success, message } = await updateUser(
      currentUser._id,
      NewCredentials,
    );

    HandeResults(success, message);

    if (success === true) {
      router.push("/account/profile");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
      <header
        className="flex flex-col justify-center items-center border-2 rounded-2xl border-dotted border-black w-40 h-40 my-4 hover:opacity-70 cursor-pointer text-gray-600 overflow-hidden relative"
        onClick={handleHeaderClick} // Updated click handler
      >
        {/* If there is a preview, show it, otherwise show icon */}
        {NewCredentials.profileImage ? (
          <>
            <Image
              src={NewCredentials.profileImage}
              width={160}
              height={160}
              className={`object-cover rounded-xl w-full h-full transition-all ease-in-out duration-300 hover:scale-110 ${Loading ? "opacity-30" : ""}`}
              alt="Preview"
            />
            {Loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner className={"size-10"} />
              </div>
            )}
          </>
        ) : (
          <>
            <TbPhotoPlus className="text-3xl mb-3" />
            <h3 className="font-bold -mb-1">Add Image</h3>
            <p className="font-semibold">png, jpeg, jpg</p>
          </>
        )}
      </header>
      <form className="my-4">
        {/* user name */}
        <Label htmlFor="username" className={"w-full mb-1 text-lg"}>
          Your User Name
        </Label>
        <Input
          id="username"
          value={NewCredentials.userName}
          onChange={(e) =>
            setNewCredentials({ ...NewCredentials, userName: e.target.value })
          }
          type="text"
          placeholder="User Name"
          className="mb-4"
        />
        {/*  */}
        <div className="flex w-full gap-2.5">
          {/* date of Birth */}
          <div className="w-1/2">
            <Label htmlFor="birth" className={"w-full mb-1 text-lg"}>
              Your Date of Birth
            </Label>
            <div className="flex flex-col gap-3 mb-4" id="birth">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select a Date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                      setNewCredentials({
                        ...NewCredentials,
                        dateOfBirth: date,
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* gender */}
          <div className="w-1/2">
            <Label htmlFor="gender" className={"w-full mb-1 text-lg"}>
              Your Gender
            </Label>
            <Select
              value={NewCredentials.gender}
              onValueChange={(e) =>
                setNewCredentials({
                  ...NewCredentials,
                  gender: e,
                })
              }
              id="gender"
            >
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/*  */}
        {/* phone */}
        <Label htmlFor="phone" className={"w-full mb-1 text-lg"}>
          Your Phone Number
        </Label>
        <Input
          id="phone"
          value={NewCredentials.phoneNumber}
          onChange={(e) =>
            setNewCredentials({
              ...NewCredentials,
              phoneNumber: e.target.value,
            })
          }
          type="number"
          placeholder="Phone Number"
          className="mb-4"
        />
        {/* address */}
        <Label htmlFor="address" className={"w-full mb-1 text-lg"}>
          Your Address
        </Label>
        <Input
          id="address"
          value={NewCredentials.address}
          onChange={(e) =>
            setNewCredentials({
              ...NewCredentials,
              address: e.target.value,
            })
          }
          type="text"
          placeholder="Address"
          className="mb-4"
        />
        <div className="w-full flex justify-end">
          {Loading === false ? (
            <Button type="submit" onClick={(e) => handleSubmitUser(e)}>
              Submit Changes
            </Button>
          ) : (
            <Button variant="outline" className={"cursor-not-allowed"} disabled>
              <Spinner />
              Processing ...
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountEditForm;
