import React, { useState } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProgressCalendarProps {
  completedDays?: Date[];
  currentCycle?: number;
  startDate?: Date;
  onDayClick?: (date: Date) => void;
}

const ProgressCalendar = ({
  completedDays = [],
  currentCycle = 1,
  startDate = new Date(2025, 2, 13), // March 13, 2025
  onDayClick = () => {},
}: ProgressCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startDate);

  // Calculate the end date (36 cycles of 30 days each)
  const endDate = addDays(startDate, 36 * 30);

  // Get cycle information based on the date
  const getCycleInfo = (date: Date) => {
    if (date < startDate || date > endDate) return null;

    const daysSinceStart = Math.floor(
      (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const cycle = Math.floor(daysSinceStart / 30) + 1;
    const dayInCycle = (daysSinceStart % 30) + 1;

    return { cycle, dayInCycle };
  };

  // Get the reading section for a specific cycle
  const getReadingSection = (cycle: number) => {
    const sections = [
      "Matthew 1-7",
      "Matthew 8-14",
      "Matthew 15-21",
      "Matthew 22-28",
      "Mark 1-8",
      "Mark 9-16",
      "Luke 1-8",
      "Luke 9-16",
      "Luke 17-24",
      "John 1-7",
      "John 8-14",
      "John 15-21",
      "Acts 1-7",
      "Acts 8-14",
      "Acts 15-21",
      "Acts 22-28",
      "Romans 1-8",
      "Romans 9-16",
      "1 Corinthians 1-8",
      "1 Corinthians 9-16",
      "2 Corinthians 1-7",
      "2 Corinthians 8-13",
      "Galatians 1-6",
      "Ephesians 1-6",
      "Philippians 1-4 + Colossians 1-4",
      "1 Thessalonians 1-5 + 2 Thess. 1-3",
      "1 Timothy 1-6 + 2 Timothy 1-4",
      "Titus 1-3 + Philemon",
      "Hebrews 1-7",
      "Hebrews 8-13",
      "James 1-5 + 1 Peter 1-5",
      "2 Peter 1-3 + 1 John 1-5",
      "2 John + 3 John + Jude",
      "Revelation 1-7",
      "Revelation 8-14",
      "Revelation 15-22",
    ];

    return cycle > 0 && cycle <= sections.length
      ? sections[cycle - 1]
      : "Review Period";
  };

  // Get the reading time for a specific cycle
  const getReadingTime = (cycle: number) => {
    const readingTimes = [
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "10-15 min/day",
      "8-12 min/day",
      "8-12 min/day",
      "8-12 min/day",
      "12-15 min/day",
      "12-15 min/day",
      "15-18 min/day",
      "5-8 min/day",
      "10-15 min/day",
      "8-12 min/day",
      "15-18 min/day",
      "12-15 min/day",
      "3-5 min/day",
      "10-15 min/day",
      "10-15 min/day",
      "12-15 min/day",
    ];

    return cycle > 0 && cycle <= readingTimes.length
      ? readingTimes[cycle - 1]
      : "Reflection time";
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth((prevState) => {
      const newDate = new Date(prevState);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((prevState) => {
      const newDate = new Date(prevState);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Get days of the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day names for the header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Check if a day is completed
  const isDayCompleted = (date: Date) => {
    return completedDays.some((completedDate) =>
      isSameDay(completedDate, date),
    );
  };

  // Check if a day is within the reading plan period
  const isInReadingPlan = (date: Date) => {
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Reading Progress</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Current Cycle: {currentCycle}
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Reading: {getReadingSection(currentCycle)}
          </Badge>
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 border-purple-300"
          >
            {getReadingTime(currentCycle)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day) => {
            const cycleInfo = getCycleInfo(day);
            const isCompleted = isDayCompleted(day);
            const isInPlan = isInReadingPlan(day);

            return (
              <TooltipProvider key={day.toString()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`
                        h-10 w-full rounded-md flex items-center justify-center text-sm
                        ${!isSameMonth(day, currentMonth) ? "text-gray-300" : ""}
                        ${isCompleted ? "bg-green-100 text-green-800" : ""}
                        ${isInPlan && !isCompleted ? "bg-blue-50 hover:bg-blue-100" : ""}
                        ${!isInPlan ? "cursor-default" : "cursor-pointer"}
                      `}
                      onClick={() => isInPlan && onDayClick(day)}
                      disabled={!isInPlan}
                    >
                      {format(day, "d")}
                      {isCompleted && (
                        <CheckCircle2 className="h-3 w-3 ml-1 text-green-600" />
                      )}
                    </button>
                  </TooltipTrigger>
                  {isInPlan && (
                    <TooltipContent>
                      <div className="text-xs">
                        <p className="font-bold">
                          {format(day, "MMMM d, yyyy")}
                        </p>
                        {cycleInfo && (
                          <>
                            <p>Cycle: {cycleInfo.cycle}</p>
                            <p>Day: {cycleInfo.dayInCycle}/30</p>
                            <p>Reading: {getReadingSection(cycleInfo.cycle)}</p>
                          </>
                        )}
                        <p>
                          {isCompleted ? "Completed ✓" : "Not completed yet"}
                        </p>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-100 border border-green-600 mr-1"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-50 border border-blue-300 mr-1"></div>
            <span>Current Plan</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-1"></div>
            <span>Outside Plan</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 36 }, (_, i) => i + 1).map((cycle) => {
              const isCurrentCycle = cycle === currentCycle;
              const isFutureCycle = cycle > currentCycle;
              const isPastCycle = cycle < currentCycle;

              return (
                <TooltipProvider key={cycle}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                          ${isCurrentCycle ? "bg-blue-500 text-white" : ""}
                          ${isFutureCycle ? "bg-gray-100 text-gray-500" : ""}
                          ${isPastCycle ? "bg-green-500 text-white" : ""}
                          cursor-default
                        `}
                      >
                        {cycle}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <p className="font-bold">Cycle {cycle}</p>
                        <p>Reading: {getReadingSection(cycle)}</p>
                        <p>{getReadingTime(cycle)}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCalendar;
