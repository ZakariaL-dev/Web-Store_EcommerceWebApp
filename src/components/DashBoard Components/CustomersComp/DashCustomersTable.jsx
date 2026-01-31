"use client";

// Shadcn Comp
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useOrderStore } from "@/utils/OrderStore";

// React
import { useEffect } from "react";

// React Icons
import { MdOutlineDeleteForever } from "react-icons/md";
import { TbLockCancel } from "react-icons/tb";

// Utils
import { HandeResults } from "@/lib/HandeResults";

const DashCustomersTable = () => {
  const { Users, getAllUsers, deleteUser } = useUserStore();
  const { orders, getAllOrders } = useOrderStore();
  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, [getAllUsers, getAllOrders]);

  const handleDeleteUser = async (id) => {
    const { success, message } = await deleteUser(id);
    HandeResults(success, message);
  };

  if (!Users) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading Users...
      </div>
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[210px]">Customer</TableHead>
            <TableHead className="w-40">Contact Info</TableHead>
            <TableHead className="w-[260px]">Location</TableHead>
            <TableHead className="text-center w-[180px]">Orders</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users.length > 0 ? (
            Users.map((u) => {
              return (
                <TableRow key={u._id}>
                  {/* Customer Cell */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={u.profileImage}
                          alt={u.userName.slice(0, 2)}
                        />
                        <AvatarFallback>
                          {u.userName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{u.userName}</span>
                    </div>
                  </TableCell>

                  {/* Contact Info - Stacked layout */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{u.email}</span>
                      <span className="text-xs text-muted-foreground">
                        {u.phoneNumber}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm whitespace-normal">
                    <div>{u.address || "Not Provided"}</div>
                  </TableCell>
                  {/* orders */}
                  <TableCell className="text-center font-medium">
                    {orders.filter((o) => o.user._id === u._id).length || "none"}
                  </TableCell>

                  <TableCell>
                    {u.role === "admin" ? (
                      <Badge variant="destructive" className="px-2 py-1">
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </Badge>
                    ) : (
                      <Badge className="px-2 py-1" variant={"secondary"}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Actions aligned to the right */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-100 hover:text-red-700"
                      >
                        <TbLockCancel className="h-7 w-7" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-800 hover:bg-red-100 hover:text-red-700"
                        onClick={() => handleDeleteUser(u._id)}
                      >
                        <MdOutlineDeleteForever className="h-7 w-7" />
                      </Button>
                      {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FaCaretRight className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashCustomersTable;
