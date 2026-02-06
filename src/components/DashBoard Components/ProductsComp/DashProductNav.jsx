"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";

// React Icons
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

// React
import { useEffect, useState } from "react";

// Stores
import { useProductStore } from "@/utils/ProductStore";


const DashProductNav = () => {
  const { products, getAllProducts } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products["all"].length / itemsPerPage) || 1;

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);

    const nextTotalPages =
      Math.ceil(products["all"].length / newItemsPerPage) || 1;

    if (currentPage > nextTotalPages) {
      setCurrentPage(nextTotalPages);
    }
  };

  const handlePageInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="max-w-1/4">
        <InputGroup>
          <InputGroupInput placeholder="Search Product" />
          <InputGroupAddon>
            <MdSearch />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {products["all"].length} results
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex items-center gap-2.5">
        <Button variant="outline">
          <FaFilter />
          Filter
        </Button>
        <NativeSelect value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <NativeSelectOption value="10">10</NativeSelectOption>
          <NativeSelectOption value="20">20</NativeSelectOption>
          <NativeSelectOption value="30">30</NativeSelectOption>
          <NativeSelectOption value="40">40</NativeSelectOption>
          <NativeSelectOption value="50">50</NativeSelectOption>
        </NativeSelect>
        <p>Per page </p>
        <Input
          type="number"
          value={currentPage}
          onChange={handlePageInputChange}
          max={totalPages}
          min={1}
          className="w-16"
        />
        of
        <Input type="number" value={totalPages} disabled className="w-16" />
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <IoMdArrowRoundBack />
        </Button>
        <Button
          variant="ghost"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <IoMdArrowRoundForward />
        </Button>
      </div>
    </div>
  );
};

export default DashProductNav;
