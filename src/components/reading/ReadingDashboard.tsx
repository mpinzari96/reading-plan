import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  BookOpen,
  Calendar,
  ChevronRight,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ReadingDashboardProps {
  userName?: string;
  currentCycle?: number;
  currentDay?: number;
  streak?: number;
  isCheckedInToday?: boolean;
}

const ReadingDashboard = ({
  userName = "Reader",
  currentCycle = 1,
  currentDay = 1,
  streak = 0,
  isCheckedInToday = false,
}: ReadingDashboardProps) => {
  const [checkedIn, setCheckedIn] = useState(isCheckedInToday);
  const [showAnimation, setShowAnimation] = useState(false);

  // Mock data for the current cycle
  const cycleData = {
    cycleNumber: currentCycle,
    startDate: "Mar 13, 2025",
    endDate: "Apr 11, 2025",
    section: "Matthew 1-7",
    chapters: 7,
    readingTime: "10-15 min/day",
  };

  // Calculate progress percentage
  const progressPercentage = (currentDay / 30) * 100;

  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      setShowAnimation(true);
      // Here you would typically call an API to update the check-in status
      setTimeout(() => setShowAnimation(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
          <p className="text-muted-foreground">Your NT Reading Journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award size={14} />
            <span>Streak: {streak} days</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Reading Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Current Reading</span>
              <Badge>{`Cycle ${cycleData.cycleNumber}/36`}</Badge>
            </CardTitle>
            <CardDescription>
              {cycleData.startDate} - {cycleData.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary" size={20} />
                <span className="text-xl font-semibold">
                  {cycleData.section}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Day {currentDay} of 30</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>~{cycleData.readingTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleCheckIn}
              disabled={checkedIn}
              className="relative"
            >
              {checkedIn ? "Completed Today" : "Mark as Read"}
              {showAnimation && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CheckCircle className="text-green-500" size={24} />
                </motion.div>
              )}
            </Button>
            <Link to="/progress">
              <Button variant="outline" className="flex items-center gap-1">
                <span>View Progress</span>
                <ChevronRight size={16} />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Reading Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Reading Stats</CardTitle>
            <CardDescription>Your journey so far</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-primary" size={18} />
                  <span>Current Cycle</span>
                </div>
                <span className="font-semibold">{currentCycle}/36</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={18} />
                  <span>Days Completed</span>
                </div>
                <span className="font-semibold">
                  {(currentCycle - 1) * 30 + currentDay - 1}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <Award className="text-primary" size={18} />
                  <span>Current Streak</span>
                </div>
                <span className="font-semibold">{streak} days</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/calendar" className="w-full">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2" size={16} />
                View Calendar
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Next Up Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Coming Up Next</CardTitle>
          <CardDescription>
            After you complete the current cycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Cycle {currentCycle < 36 ? currentCycle + 1 : "Review"}
              </p>
              <p className="text-muted-foreground">
                {currentCycle < 36
                  ? currentCycle === 1
                    ? "Matthew 8-14"
                    : "Next section"
                  : "Review Period"}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingDashboard;
