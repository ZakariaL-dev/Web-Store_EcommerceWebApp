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
import { MdOutlineLockOpen } from "react-icons/md";
import { TbLockCancel } from "react-icons/tb";

// Utils
import { HandeResults } from "@/lib/HandeResults";
import DashAlertDelete from "../DashAlertDelete";
import { useSearchStore } from "@/utils/SearchStore";

const DashCustomersTable = () => {
  const { Users, deleteUser, toggleBlockUser } = useUserStore();
  const { orders, getAllOrders } = useOrderStore();
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const { searchRslts } = useSearchStore();

  const handleDeleteUser = async (id) => {
    const { success, message } = await deleteUser(id);
    HandeResults(success, message);
  };

  const handleBlockUser = async (id) => {
    const { success, message } = await toggleBlockUser(id);
    HandeResults(success, message);
  };

  if (!Users) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading Users...
      </div>
    );
  }

  const displayedUsers =
    searchRslts && searchRslts.length > 0 ? searchRslts : Users;

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
            <TableHead>Block Status</TableHead>
            <TableHead className="text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedUsers.length > 0 ? (
            displayedUsers.map((u) => {
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

                  {/* address */}
                  <TableCell className="text-sm whitespace-normal">
                    <div>{u.address || "Not Provided"}</div>
                  </TableCell>

                  {/* orders */}
                  <TableCell className="text-center font-medium">
                    {orders.filter((o) => o.user._id === u._id).length ||
                      "none"}
                  </TableCell>

                  {/* user role */}
                  <TableCell>
                    {u.role === "admin" ? (
                      <Badge className="px-2 py-1 bg-cyan-50 text-cyan-700">
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </Badge>
                    ) : (
                      <Badge className="px-2 py-1" variant={"secondary"}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </Badge>
                    )}
                  </TableCell>

                  {/* block status */}
                  <TableCell>
                    {u.blocked ? (
                      <Badge variant="destructive" className="px-2 py-1">
                        Blocked
                      </Badge>
                    ) : (
                      <Badge className="px-2 py-1 bg-green-50 text-green-700">
                        Active
                      </Badge>
                    )}
                  </TableCell>

                  {/* Actions aligned to the right */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 text-red-600 hover:bg-red-100 hover:text-red-700"
                        asChild
                      >
                        {u.blocked ? (
                          <MdOutlineLockOpen
                            className="h-9 w-9"
                            onClick={() => handleBlockUser(u._id)}
                          />
                        ) : (
                          <TbLockCancel
                            className="h-9 w-9"
                            onClick={() => handleBlockUser(u._id)}
                          />
                        )}
                      </Button>
                      <DashAlertDelete id={u._id} onDelete={handleDeleteUser} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-4 text-muted-foreground"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashCustomersTable;
