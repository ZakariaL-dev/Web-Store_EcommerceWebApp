"use client";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// Date FNS
import { format } from "date-fns";

// React Icons
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const EventsDisplays = ({ events, setEditingEvent }) => {
  const DisplayTime = (t) => {
    if (!t) return "N/A";
    const time = t.split("T", 1);
    return format(new Date(time), "MMM dd, yyy");
  };

  const { deleteEvent } = useConfigureStore();

  const handleDelete = async (eventId) => {
    const res = await deleteEvent(
      process.env.NEXT_PUBLIC_Store_Config,
      eventId,
    );
    HandeResults(res.success, res.message);
  };

  return (
    <div className="my-5 mx-2">
      {events.map((e, i) => {
        return (
          <div
            key={i}
            className="flex justify-between items-start bg-white rounded-lg p-3 border-2 border-gray-300 mb-2.5"
          >
            <div>
              <h1 className="text-lg font-bold">{e.title}</h1>
              <h5 className="text-sm text-gray-700 font-semibold">
                From {DisplayTime(e.start)} to {DisplayTime(e.end)}
              </h5>
              <p className="text-sm font-medium text-gray-500">
                {e.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <CiEdit
                className="text-[20px] cursor-pointer text-gray-500 hover:text-blue-800"
                onClick={() => {
                  setEditingEvent(e);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              <RiDeleteBin6Line
                className="text-[20px] cursor-pointer text-gray-500 hover:text-red-800"
                onClick={() => handleDelete(e._id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsDisplays;
