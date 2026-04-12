import React from "react";
import ClassAttendanceClient from "./ClassAttendanceClient";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32, room: 'Room 4B', time: '09:00 - 10:30', days: 'Mon, Wed, Fri', performance: 84.5, attendance: 97.2 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28, room: 'Room 2C', time: '11:00 - 12:30', days: 'Tue, Thu', performance: 78.1, attendance: 94.8 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24, room: 'Theatre II', time: '14:00 - 15:30', days: 'Mon, Wed', performance: 91.2, attendance: 98.4 },
];

export async function generateStaticParams() {
  return COHORTS.map((c) => ({
    id: c.id,
  }));
}

export default function ClassAttendancePage({ params }: { params: { id: string } }) {
  return <ClassAttendanceClient params={params} />;
}
