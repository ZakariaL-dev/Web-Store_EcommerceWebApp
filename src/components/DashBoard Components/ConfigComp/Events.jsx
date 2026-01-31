"use client";
// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// My Components
import EventsAddForm from "./EventsComp/EventsAddForm";
import EventsDisplays from "./EventsComp/EventsDisplays";

// React
import { useState } from "react";

const Events = () => {
  const { config } = useConfigureStore();

  const [editingEvent, setEditingEvent] = useState(null);

  if (!config || !config.events)
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading events...
      </div>
    );
  return (
    <div className="w-full border-2 rounded-lg p-3 bg-slate-50">
      <header className="text-lg mb-3 font-semibold">Store Events</header>
      <EventsAddForm
        key={editingEvent?._id || "new-event"}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />
      <EventsDisplays
        events={config.events}
        setEditingEvent={setEditingEvent}
      />
    </div>
  );
};

export default Events;
