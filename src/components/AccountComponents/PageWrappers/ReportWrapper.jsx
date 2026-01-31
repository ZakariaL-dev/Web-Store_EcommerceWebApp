"use client";

// My Components
import AccountReports from "@/components/AccountComponents/AccountReports";
import StoreEmptyState from "@/components/StoreComponents/StoreEmptyState";

// Stores
import { useReportStore } from "@/utils/ReportStore";
import { useUserStore } from "@/utils/UserStore";

// React
import { useEffect } from "react";

// React Icons
import { BsExclamationOctagon } from "react-icons/bs";

const ReportWrapper = () => {
  const { ProductReports, UserReports, fetchReports } = useReportStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    fetchReports("products");
    fetchReports("users");
  }, [fetchReports]);

  const hasUserReports = [...ProductReports, ...UserReports].some(
    (report) => report.reportedBy?._id === currentUser?._id,
  );

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      {hasUserReports ? (
        <AccountReports />
      ) : (
        <>
          <header className="flex items-center justify-between mb-5 text-4xl font-bold">
            Reports
          </header>
          <StoreEmptyState
            Icon={BsExclamationOctagon}
            txt={
              "Thank you for helping us keep our community safe and high-quality! If you do, you can track the progress and resolution right here."
            }
            link={"/"}
            btnMessage={"Return to Shop"}
          />
        </>
      )}
    </div>
  );
};

export default ReportWrapper;
