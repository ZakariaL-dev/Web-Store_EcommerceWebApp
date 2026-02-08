"use client";

// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

// React
import { useEffect } from "react";

// React Icons
import { FaCaretRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

// Stores
import { useProductStore } from "@/utils/ProductStore";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const DashProductTable = () => {
  const router = useRouter();

  const { products, deleteProduct } = useProductStore();
  
  if (!products) {
    return (
      <div className="flex h-32 items-center justify-center text-muted-foreground">
        Loading products...
      </div>
    );
  }

  const HandleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    HandeResults(success, message);
  };

  const HandleEditProduct = async (slg) => {
    redirect(`/admin/dashboard/product/editing/${slg}`);
  };

  const StatusSwitch = (stts) => {
    switch (stts) {
      case "normal":
        return <Badge variant={"outline"}>Normal</Badge>;
      case "on sale":
        return (
          <Badge variant={"outline"} className="text-red-600 border">
            On Sale
          </Badge>
        );
      case "new":
        return (
          <Badge variant={"outline"} className="text-green-800">
            New
          </Badge>
        );

      default:
        break;
    }
  };

  const getTotalQuantity = (items) => {
    return items.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[600px]">ID / Name / Description</TableHead>
            <TableHead>Image / Price / Quantity</TableHead>
            <TableHead> Status / Category</TableHead>
            <TableHead className="text-right px-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products["all"].length > 0 ? (
            products["all"].map((p, i) => {
              return (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">ID: {p._id.slice(-6)}</h1>
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-wrap text-[16px]">{p.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="flex gap-2 w-60">
                    <Image
                      src={p.previewImages[0]}
                      alt={`product n°: ${i}`}
                      width={56}
                      height={56}
                      className="rounded-lg"
                    ></Image>
                    <div>
                      {p.status === "on sale" ? (
                        <>
                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold text-sm text-gray-500 line-through">
                              {p.price} Dz
                            </h1>
                            <h1 className="font-bold text-lg">
                              {(p.price - (p.price * p.discount) / 100).toFixed(
                                2
                              )}
                              Dz
                            </h1>
                          </div>
                          <h1 className="font-bold text-lg text-red-500">
                            {p.discount} %
                          </h1>
                        </>
                      ) : (
                        <h1 className="font-bold text-lg">{p.price} Dz</h1>
                      )}
                      <p>
                        {getTotalQuantity(p.variants) > 0 ? (
                          <>
                            <span className="text-green-500 font-semibold">
                              {getTotalQuantity(p.variants)}
                            </span>{" "}
                            in Stock
                          </>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-start">
                    {StatusSwitch(p.status)}
                    <h4 className="text-xs font-medium px-1 text-muted-foreground pt-1">
                      {p.category}
                    </h4>
                  </TableCell>

                  <TableCell className="flex items-center justify-end gap-1 ">
                    {/*  */}
                    <Button
                      variant="ghost"
                      className="p-2 hover:bg-gray-200 text-blue-600 hover:text-blue-800"
                      asChild
                      onClick={() => HandleEditProduct(p.slug)}
                    >
                      <FiEdit className="w-8 h-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-2 hover:bg-gray-200 text-red-600 hover:text-red-800"
                      asChild
                      onClick={() => HandleDeleteProduct(p._id)}
                    >
                      <MdOutlineDeleteForever className="w-10 h-10" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-2 hover:bg-gray-200 "
                      asChild
                      onClick={()=> router.push(`/products/${p.slug}`)}
                    >
                      <FaCaretRight className="w-9 h-9" />
                    </Button>
                    {/*  */}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>No products found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashProductTable;
