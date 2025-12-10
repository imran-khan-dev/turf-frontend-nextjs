"use client";
import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  itemName: string;
  userName: string;
  startTime: string;
  endTime: string;
  paymentAmount: number;
  status: string;
}

interface Props {
  initialBookings: Booking[];
}

export default function BookingsTable({ initialBookings }: Props) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [minAmount, setMinAmount] = useState<number | "">("");
  const [maxAmount, setMaxAmount] = useState<number | "">("");

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((b) => {
      if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
      if (minAmount !== "" && b.paymentAmount < minAmount) return false;
      if (maxAmount !== "" && b.paymentAmount > maxAmount) return false;
      return true;
    });
  }, [initialBookings, statusFilter, minAmount, maxAmount]);

  if (!initialBookings || initialBookings.length === 0)
    return <div className="text-center py-10 text-gray-500 font-medium">No bookings found.</div>;

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value ? Number(e.target.value) : "")}
          className="border p-1 rounded w-24"
        />

        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value ? Number(e.target.value) : "")}
          className="border p-1 rounded w-24"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#1A80E3]">
            <TableHead className="text-white">Item</TableHead>
            <TableHead className="text-white">User</TableHead>
            <TableHead className="text-white">Start</TableHead>
            <TableHead className="text-white">End</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-blue-50 transition">
              <TableCell>{booking.itemName}</TableCell>
              <TableCell>{booking.userName}</TableCell>
              <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
              <TableCell>{booking.paymentAmount} ৳</TableCell>
              <TableCell>
                <Badge
                  className={
                    booking.status === "PENDING"
                      ? "bg-yellow-600"
                      : booking.status === "CONFIRMED"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
