"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ShieldCheck, ShieldX, Scan, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CLASSROOM_RADIUS_METERS = 50;

interface Coords { lat: number; lng: number }
interface ScanResult { studentName: string; distance: number; passed: boolean }

// Haversine formula — returns distance in metres between two GPS coordinates
function haversine(a: Coords, b: Coords): number {
  const R = 6_371_000;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// In production: QR payload is a signed JWT containing { studentId, lat, lng, issuedAt }
// generated on the student's device at scan time. Here we mock two cases.
const MOCK_SCANS: Record<string, { name: string; offsetMeters: number }> = {
  "STU-NEAR": { name: "Catherine Great",   offsetMeters: 12  }, // same classroom
  "STU-FAR":  { name: "David Copperfield", offsetMeters: 340 }, // different building
};

function mockStudentCoords(teacher: Coords, offsetMeters: number): Coords {
  // Shift latitude north by offsetMeters (1° lat ≈ 111,139 m)
  return { lat: teacher.lat + offsetMeters / 111_139, lng: teacher.lng };
}

export default function GeoFencedScanner() {
  const [teacherCoords, setTeacherCoords] = useState<Coords | null>(null);
  const [geoStatus, setGeoStatus] = useState<"acquiring" | "ready" | "denied">("acquiring");
  const [scanning, setScanning]     = useState(false);
  const [result, setResult]         = useState<ScanResult | null>(null);

  // Step 1 — lock the Teacher Node ID to a GPS position on mount
  useEffect(() => {
    if (!navigator.geolocation) { setGeoStatus("denied"); return; }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setTeacherCoords({ lat: coords.latitude, lng: coords.longitude });
        setGeoStatus("ready");
      },
      () => setGeoStatus("denied"),
      { enableHighAccuracy: true, timeout: 8_000 }
    );
  }, []);

  // Step 2 — decode QR payload, Step 3 — run geo-fence check, Step 4 — accept or reject
  function handleScan(stuId: string) {
    if (!teacherCoords || scanning) return;
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      const { name, offsetMeters } = MOCK_SCANS[stuId];
      const studentCoords = mockStudentCoords(teacherCoords, offsetMeters);
      const distance      = Math.round(haversine(teacherCoords, studentCoords));
      setResult({ studentName: name, distance, passed: distance <= CLASSROOM_RADIUS_METERS });
      setScanning(false);
    }, 1_000);
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-2xl border border-lns-border/10 shadow-sm max-w-sm">

      {/* Teacher Node lock status */}
      <div className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
        geoStatus === "ready"     && "bg-green-50  text-green-700 border-green-100",
        geoStatus === "denied"    && "bg-red-50    text-lns-red   border-red-100",
        geoStatus === "acquiring" && "bg-lns-light-grey text-lns-mid-grey border-lns-border/10",
      )}>
        {geoStatus === "acquiring" && <Loader2 size={12} className="animate-spin" />}
        {geoStatus === "ready"     && <MapPin   size={12} />}
        {geoStatus === "denied"    && <ShieldX  size={12} />}
        <span>
          {geoStatus === "acquiring" && "Acquiring teacher node location…"}
          {geoStatus === "ready"     && `Node locked · ${teacherCoords!.lat.toFixed(4)}, ${teacherCoords!.lng.toFixed(4)}`}
          {geoStatus === "denied"    && "Location denied — geo-fence inactive"}
        </span>
      </div>

      {/* Scanner viewport */}
      <div className={cn(
        "relative h-44 rounded-2xl bg-slate-900 flex items-center justify-center border-2 transition-all duration-500 overflow-hidden",
        result?.passed === true  && "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.25)]",
        result?.passed === false && "border-lns-red   shadow-[0_0_20px_rgba(230,57,70,0.25)]",
        !result                  && "border-white/10",
      )}>
        {!scanning && !result && <Scan size={40} className="text-white/20 animate-pulse" />}
        {scanning              && <Loader2 size={36} className="text-white/50 animate-spin" />}
        {!scanning && result   && (
          <div className="text-center px-6">
            {result.passed
              ? <ShieldCheck size={44} className="text-green-400 mx-auto mb-2 stroke-[2.5]" />
              : <ShieldX     size={44} className="text-lns-red   mx-auto mb-2 stroke-[2.5]" />}
            <p className="text-white font-black text-sm tracking-tight">{result.studentName}</p>
            <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1",
              result.passed ? "text-green-400/80" : "text-lns-red/80"
            )}>
              {result.passed
                ? `Verified · ${result.distance}m from node`
                : `Rejected · ${result.distance}m — outside ${CLASSROOM_RADIUS_METERS}m radius`}
            </p>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lns-red to-transparent animate-scanning" />
      </div>

      {/* Test controls (replace with real QR camera feed in production) */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => handleScan("STU-NEAR")}
          disabled={geoStatus !== "ready" || scanning}
          className="h-10 text-[9px] font-black uppercase tracking-widest bg-lns-navy text-white rounded-xl"
        >
          Test: In Range
        </Button>
        <Button
          onClick={() => handleScan("STU-FAR")}
          disabled={geoStatus !== "ready" || scanning}
          variant="outline"
          className="h-10 text-[9px] font-black uppercase tracking-widest rounded-xl"
        >
          Test: Out of Range
        </Button>
      </div>
    </div>
  );
}
