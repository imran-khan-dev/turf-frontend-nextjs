/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function GetAllOwnersTable({ owners }: { owners: any[] }) {
  const noOwners = owners.length === 0;

  if (noOwners) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No owners found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#1A80E3] hover:bg-[#1A80E3]">
            <TableHead className="text-white">Photo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Phone</TableHead>
            <TableHead className="text-white">Profile Slug</TableHead>
            <TableHead className="text-white">Created</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {owners.map((owner: any) => {
            const profileSlug = owner.turfProfileSlug?.[0] || null;

            return (
              <TableRow
                key={owner.id}
                className="hover:bg-blue-50 transition"
              >
                {/* PHOTO */}
                <TableCell>
                  <Image
                    src={owner.photo || "/assets/images/default-user.png"}
                    alt={owner.name}
                    width={40}
                    height={40}
                    className="rounded-full border w-10 h-10 object-cover"
                  />
                </TableCell>

                {/* NAME */}
                <TableCell className="font-medium">{owner.name}</TableCell>

                {/* EMAIL */}
                <TableCell>{owner.email}</TableCell>

                {/* PHONE */}
                <TableCell>{owner.phone}</TableCell>

                {/* PROFILE SLUG */}
                <TableCell>{profileSlug ?? "No Profile"}</TableCell>

                {/* CREATED AT */}
                <TableCell>
                  {new Date(owner.createdAt).toLocaleDateString()}
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <Badge
                    className={
                      profileSlug ? "bg-green-600" : "bg-gray-600"
                    }
                  >
                    {profileSlug ? "ACTIVE" : "NO PROFILE"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
