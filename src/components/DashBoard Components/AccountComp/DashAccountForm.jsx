"use client";

// React
import { useRef, useState } from "react";

// Shadcn Comp
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// React Icons
import { TbPhotoPlus } from "react-icons/tb";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useUserStore } from "@/utils/UserStore";

// Lucide React
import { ChevronDownIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const DashAccountForm = () => {
  const router = useRouter();

  const { currentUser, updateUser } = useUserStore();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined,
  );

  const [AdminForm, setAdminForm] = useState({
    profileImage: currentUser?.profileImage || "",
    userName: currentUser?.userName || "",
    email: currentUser?.email || "",
    phoneNumber: currentUser?.phoneNumber || "",
    address: currentUser?.address || "",
    dateOfBirth: date,
    role: currentUser?.role || "user",
    gender: currentUser?.gender || "male",
    oldPassword: "",
    newPassword: "",
    ConfirmNewPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleHeaderClick = () => {
    fileInputRef.current.click();
  };

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadImage(formData);

    if (result.success) {
      console.log(result.message);
      setAdminForm({
        ...AdminForm,
        profileImage: URL.createObjectURL(file),
      });
    } else {
      console.error(result.error);
    }
  }

  const [Loading, setLoading] = useState(false);

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (currentUser.provider === "credentials" && AdminForm.newPassword) {
      if (AdminForm.ConfirmNewPassword != AdminForm.newPassword) {
        HandeResults(
          "warning",
          "Your Confirm New Password have to be identical to Your new Password",
        );
        return;
      }
      if (AdminForm.oldPassword === AdminForm.newPassword) {
        HandeResults(
          "warning",
          "Your New Password must not be identical to Your old Password",
        );
        return;
      }
      if (!AdminForm.oldPassword) {
        HandeResults(
          "warning",
          "Please enter your old password to make changes",
        );
        return;
      }
    }

    setLoading(true);

    let payload = {
      userName: AdminForm.userName,
      email: AdminForm.email,
      phoneNumber: AdminForm.phoneNumber,
      address: AdminForm.address,
      dateOfBirth: date,
      gender: AdminForm.gender,
      role: AdminForm.role,
      profileImage: AdminForm.profileImage,
    };

    // 3. Add password fields only if provider is credentials
    if (currentUser.provider === "credentials") {
      payload.oldPassword = AdminForm.oldPassword;
      payload.newPassword = AdminForm.newPassword;
    }

    const { success, message } = await updateUser(currentUser._id, payload);

    HandeResults(success, message);

    if (success === true) {
      router.push("/admin/dashboard");
    }

    setLoading(false);
  };

  return (
    <form className="max-width mx-auto bg-slate-100 rounded-2xl px-3 py-5 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Profile Informations</h1>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
      <header
        className="flex flex-col justify-center items-center border-2 rounded-2xl border-dotted border-black w-40 h-40 p-6 my-4 hover:opacity-70 cursor-pointer text-gray-600 relative overflow-hidden"
        onClick={handleHeaderClick} // Updated click handler
      >
        {/* If there is a preview, show it, otherwise show icon */}
        {AdminForm.profileImage ? (
          <Image
            src={AdminForm.profileImage}
            fill
            className="object-cover rounded-xl w-full h-full transition-all ease-in-out duration-300 hover:scale-125"
            alt="Preview"
          />
        ) : (
          <>
            <TbPhotoPlus className="text-3xl mb-3" />
            <h3 className="font-bold -mb-1">Add Image</h3>
            <p className="font-semibold">png, jpeg, jpg</p>
          </>
        )}
      </header>
      {/* user name */}
      <div className="mb-4 space-y-1">
        <p className="font-semibold">Full Name</p>
        <Input
          type="text"
          value={AdminForm.userName}
          onChange={(e) =>
            setAdminForm({ ...AdminForm, userName: e.target.value })
          }
        />
      </div>
      {/* email */}
      <div className="mb-4 space-y-1">
        <p className="font-semibold">Email Address</p>
        <Input
          type="email"
          value={AdminForm.email}
          onChange={(e) =>
            setAdminForm({ ...AdminForm, email: e.target.value })
          }
        />
      </div>
      {/* phone */}
      <div className="mb-4 space-y-1">
        <p className="font-semibold">Phone Number</p>
        <Input
          type="text"
          value={AdminForm.phoneNumber}
          onChange={(e) =>
            setAdminForm({ ...AdminForm, phoneNumber: e.target.value })
          }
        />
      </div>
      {/* role and gender */}
      <div className="mb-4 space-y-1">
        <Label htmlFor="address" className={"w-full mb-1 text-lg"}>
          Your Address
        </Label>
        <Input
          id="address"
          value={AdminForm.address}
          onChange={(e) =>
            setAdminForm({
              ...AdminForm,
              address: e.target.value,
            })
          }
          type="text"
          placeholder="Address"
          className="mb-4"
        />
      </div>
      <div className="grid-container w-full gap-2.5">
        {/* role */}
        <div>
          <Label htmlFor="role" className={"w-full mb-1 text-lg"}>
            Role
          </Label>
          <Select
            value={AdminForm.role}
            onValueChange={(e) =>
              setAdminForm({
                ...AdminForm,
                role: e,
              })
            }
            id="role"
          >
            <SelectTrigger className="mb-4 w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* gender */}
        <div>
          <Label htmlFor="gender" className={"w-full mb-1 text-lg"}>
            Your Gender
          </Label>
          <Select
            value={AdminForm.gender}
            onValueChange={(e) =>
              setAdminForm({
                ...AdminForm,
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
        {/* date of birth */}
        <div>
          <Label htmlFor="birth" className={"w-full mb-1 text-lg"}>
            Your Date of Birth
          </Label>
          <div className="flex flex-col gap-3 mb-4 bg-none" id="birth">
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
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {currentUser.provider === "credentials" && (
        <>
          <div className="mb-4 space-y-1">
            <p className="font-semibold">Old Password</p>
            <Input
              type="password"
              placeholder="••••••••••••"
              value={AdminForm.oldPassword}
              onChange={(e) =>
                setAdminForm({ ...AdminForm, oldPassword: e.target.value })
              }
            />
          </div>
          <div className="mb-4 space-y-1">
            <p className="font-semibold">New Password</p>
            <Input
              type="password"
              placeholder="••••••••••••"
              value={AdminForm.newPassword}
              onChange={(e) =>
                setAdminForm({ ...AdminForm, newPassword: e.target.value })
              }
            />
          </div>
          <div className="mb-4 space-y-1">
            <p className="font-semibold">Confirm New Password</p>
            <Input
              type="password"
              placeholder="••••••••••••"
              value={AdminForm.ConfirmNewPassword}
              onChange={(e) =>
                setAdminForm({
                  ...AdminForm,
                  ConfirmNewPassword: e.target.value,
                })
              }
            />
          </div>
        </>
      )}
      <div className="w-full flex justify-end items-center">
        <Button
          type="submit"
          className="bg-gray-600"
          onClick={(e) => handleSubmitUser(e)}
          disabled={Loading}
        >
          {Loading ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};

export default DashAccountForm;
