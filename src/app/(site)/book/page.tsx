"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

export default function Book() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", reason: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Generate calendar grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send request");

      setStatus("success");
      setMessage("Booking request sent! Check your email for confirmation.");
      setFormData({ name: "", email: "", reason: "" });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">Book a Meeting</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Select a date and time to schedule a Google Meet call.
      </p>

      {status === "success" ? (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-8 rounded-lg text-center border border-green-200 dark:border-green-800">
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Request Sent Successfully!</h2>
          <p>{message}</p>
          <button 
            onClick={() => setStatus("idle")} 
            className="mt-6 underline hover:opacity-70"
          >
            Book another meeting
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Calendar Side */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) => {
                const isPast = isBefore(d, startOfDay(new Date()));
                const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
                const isCurrentMonth = isSameMonth(d, monthStart);
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                const disabled = isPast || !isCurrentMonth || isWeekend;

                return (
                  <button
                    key={i}
                    disabled={disabled}
                    onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`
                      aspect-square rounded-full flex items-center justify-center text-sm transition-all
                      ${disabled ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-zinc-800"}
                      ${isSelected ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-md hover:bg-black dark:hover:bg-white" : ""}
                    `}
                  >
                    {format(d, "d")}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-8 animate-in fade-in slide-in-from-top-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Available times for {format(selectedDate, "MMM d")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-md border text-sm font-medium transition-all ${
                        selectedTime === time 
                          ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black" 
                          : "border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className={`transition-opacity duration-300 ${!selectedTime ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
            <h3 className="font-semibold mb-6">Your Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Topic / Reason for meeting</label>
                <textarea
                  required
                  rows={4}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === "loading" || !selectedTime}
                className="w-full rounded-md bg-black dark:bg-white px-4 py-3 font-medium text-white dark:text-black hover:opacity-90 disabled:opacity-50 transition-opacity mt-4"
              >
                {status === "loading" ? "Confirming..." : "Confirm Booking"}
              </button>
              
              {status === "error" && (
                <p className="text-red-500 text-sm mt-2 text-center">{message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
