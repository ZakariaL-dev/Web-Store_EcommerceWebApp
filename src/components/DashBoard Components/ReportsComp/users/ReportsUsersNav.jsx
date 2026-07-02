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
import { RxReload } from "react-icons/rx";

// Stores
import { useReportStore } from "@/utils/ReportStore";

// React
import { useEffect, useState } from "react";
import { useSearchStore } from "@/utils/SearchStore";
import DashFilterSideBar from "../../DashFilterSideBar";

const ReportsUsersNav = () => {
  const { UserReports, fetchReports } = useReportStore();
  useEffect(() => {
    fetchReports("users");
  }, [fetchReports]);

  // search system
  const { getAllSearchRslts, searchRslts, filterRslts, clearSearch, clearAll } =
    useSearchStore();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.trim() !== "") {
      getAllSearchRslts("userReports", searchValue);
    } else {
      clearSearch();
    }
  }, [searchValue]);

  const isSearching = searchValue && searchValue.trim() !== "" && searchRslts;
  const isFiltering = filterRslts;

  let TotalNum = UserReports.length;

  if (isSearching) {
    TotalNum = searchRslts.length;
  } else if (isFiltering) {
    TotalNum = filterRslts.length;
  }

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(TotalNum / itemsPerPage) || 1;

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);

    const nextTotalPages = Math.ceil(TotalNum / newItemsPerPage) || 1;

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

  //filter
  const [filterToggle, setFilterToggle] = useState(false);

  return (
    <>
      <div className="flex lg:items-center lg:justify-between mb-3 relative lg:flex-row flex-col gap-3">
        <div className="lg:max-w-1/3 flex items-center gap-2">
          <div>
            <InputGroup>
              <InputGroupInput
                placeholder="Search by comment"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <InputGroupAddon>
                <MdSearch />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                {TotalNum} results
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              fetchReports("users");
              setSearchValue("");
              clearAll();
            }}
          >
            <RxReload />
          </Button>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => setFilterToggle(!filterToggle)}
          >
            <FaFilter />
            Filters
          </Button>
          <NativeSelect
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <NativeSelectOption value="10">10</NativeSelectOption>
            <NativeSelectOption value="20">20</NativeSelectOption>
            <NativeSelectOption value="30">30</NativeSelectOption>
            <NativeSelectOption value="40">40</NativeSelectOption>
            <NativeSelectOption value="50">50</NativeSelectOption>
          </NativeSelect>
          Per page
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
      <DashFilterSideBar
        toggle={filterToggle}
        setToggle={setFilterToggle}
        type={"userReports"}
      />
    </>
  );
};

export default ReportsUsersNav;
