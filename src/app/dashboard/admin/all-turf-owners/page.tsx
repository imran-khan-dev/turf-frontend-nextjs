// /* eslint-disable @typescript-eslint/no-explicit-any */
// import serverFetch from "@/lib/server-fetch";
// import Image from "next/image";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";

// export default async function AllTurfOwnersPage() {
//   const res = await serverFetch.get("user/get-owners", {}, "adminAccess");
//   const data = await res.json();

//   const owners = data?.data ?? [];

//   const noOwners = owners.length === 0;

//   return (
//     <div className="rounded-xl border border-[#1A80E3]/30 shadow-lg p-4">
//       <h2 className="text-xl font-semibold mb-4 text-[#1A80E3]">
//         All Turf Owners
//       </h2>

//       <div className="overflow-x-auto">
//         {noOwners ? (
//           <div className="text-center py-10 text-gray-500 font-medium">
//             No owners found.
//           </div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-[#1A80E3] hover:bg-[#1A80E3]">
//                 <TableHead className="text-white">Photo</TableHead>
//                 <TableHead className="text-white">Name</TableHead>
//                 <TableHead className="text-white">Email</TableHead>
//                 <TableHead className="text-white">Phone</TableHead>
//                 <TableHead className="text-white">Profile Slug</TableHead>
//                 <TableHead className="text-white">Created</TableHead>
//                 <TableHead className="text-white">Status</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {owners.map((owner: any) => {
//                 const profileId = owner.turfProfileIds?.[0] || null;

//                 return (
//                   <TableRow
//                     key={owner.id}
//                     className="hover:bg-blue-50 transition"
//                   >
//                     {/* PHOTO */}
//                     <TableCell>
//                       <Image
//                         src={
//                           owner.photo ||
//                           "/assets/images/default-user.png"
//                         }
//                         alt={owner.name}
//                         width={40}
//                         height={40}
//                         className="rounded-full border w-10 h-10 object-cover"
//                       />
//                     </TableCell>

//                     {/* NAME */}
//                     <TableCell className="font-medium">
//                       {owner.name}
//                     </TableCell>

//                     {/* EMAIL */}
//                     <TableCell>{owner.email}</TableCell>

//                     {/* PHONE */}
//                     <TableCell>{owner.phone}</TableCell>

//                     {/* PROFILE ID (FIRST ONLY) */}
//                     <TableCell>
//                       {profileId ?? "No Profile"}
//                     </TableCell>

//                     {/* CREATED AT */}
//                     <TableCell>
//                       {new Date(owner.createdAt).toLocaleDateString()}
//                     </TableCell>

//                     {/* STATUS */}
//                     <TableCell>
//                       <Badge
//                         className={
//                           profileId ? "bg-green-600" : "bg-gray-600"
//                         }
//                       >
//                         {profileId ? "ACTIVE" : "NO PROFILE"}
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         )}
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import GetAllOwnersTable from "@/components/modules/Admin/GetAllOwnersTable";
import serverFetch from "@/lib/server-fetch";

export default async function AllTurfOwnersPage() {
  const res = await serverFetch.get("user/get-owners", {}, "adminAccess");
  const data = await res.json();

  const owners = data?.data ?? [];

  return (
    <div className="rounded-xl border border-[#1A80E3]/30 shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#1A80E3]">
        All Turf Owners
      </h2>

      <GetAllOwnersTable owners={owners} />
    </div>
  );
}
