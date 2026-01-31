"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// Lucide React
import { ChevronDownIcon } from "lucide-react";

// React
import { useState } from "react";

const EventsAddForm = ({ editingEvent, setEditingEvent }) => {
  const [OpenStart, setOpenStart] = useState(false);
  const [StartDate, setStartDate] = useState(editingEvent?.start || "");

  const [OpenEnd, setOpenEnd] = useState(false);
  const [EndDate, setEndDate] = useState(editingEvent?.end || "");

  const { addNewEvent, fetchConfigure, updateEvent } = useConfigureStore();

  const [loading, setLoading] = useState(false);

  const [NewEvent, setNewEvent] = useState({
    _id: editingEvent?._id || null,
    title: editingEvent?.title || "",
    start: StartDate,
    end: EndDate,
    description: editingEvent?.description || "",
  });

  const handleSubmitEvent = async () => {
    setLoading(true);

    let res;
    if (editingEvent) {
      res = await await updateEvent(process.env.NEXT_PUBLIC_Store_Config, {
        ...NewEvent,
        _id: editingEvent._id,
      });
    } else {
      res = await addNewEvent(NewEvent);
    }

    HandeResults(res.success, res.message);

    if (res.success) {
      setNewEvent({ title: "", start: "", end: "", description: "" });
      setStartDate("");
      setEndDate("");
      setEditingEvent(null);
    }

    setLoading(false);
    fetchConfigure("events");
  };

  return (
    <div className="my-2 bg-white p-3 rounded-lg mx-2">
      <div>
        <Label htmlFor="title" className="mb-2">
          Event Title
        </Label>
        <Input
          id="title"
          placeholder="Enter Event Title"
          value={NewEvent.title}
          onChange={(e) => setNewEvent({ ...NewEvent, title: e.target.value })}
        />
      </div>
      {/*  */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-3">
        <div>
          <Label htmlFor="stDate" className="mb-2">
            Start Date
          </Label>
          <Popover open={OpenStart} onOpenChange={setOpenStart} id="stDate">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="stDate"
                className="w-full justify-between font-normal"
              >
                {StartDate
                  ? new Date(StartDate).toLocaleDateString()
                  : "Select a Date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={StartDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setStartDate(date);
                  setOpenStart(false);
                  setNewEvent((prev) => ({ ...prev, start: date }));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/*  */}
        <div>
          <Label htmlFor="enDate" className="mb-2">
            End Date
          </Label>
          <Popover open={OpenEnd} onOpenChange={setOpenEnd} id="enDate">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="enDate"
                className="w-full justify-between font-normal"
              >
                {EndDate
                  ? new Date(EndDate).toLocaleDateString()
                  : "Select a Date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={EndDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setEndDate(date);
                  setOpenEnd(false);
                  setNewEvent((prev) => ({ ...prev, end: date }));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/*  */}
      <div>
        <Label htmlFor="desc" className="mb-2">
          Description
        </Label>
        <Textarea
          id="desc"
          placeholder="Enter Event Description"
          value={NewEvent.description}
          onChange={(e) =>
            setNewEvent({ ...NewEvent, description: e.target.value })
          }
        />
      </div>
      {/*  */}
      <footer className="w-full text-right space-x-3 mt-5">
        <Button
          className=" bg-green-600 hover:bg-green-700"
          onClick={handleSubmitEvent}
          disabled={loading}
        >
          {loading ? <Spinner /> : editingEvent ? "Update Event" : "Add Event"}
        </Button>
        {editingEvent && (
          <Button
            className={"bg-red-700 hover:bg-red-500"}
            onClick={() => setEditingEvent(null)}
          >
            Cancel
          </Button>
        )}
      </footer>
    </div>
  );
};

export default EventsAddForm;
