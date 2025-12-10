import TurfUserUpdateProfileForm from "@/components/modules/TurfUser/TurfUserUpdateForm";
import { getUserFromToken } from "@/services/auth/getUserFromToken";
import { getCookie } from "@/services/auth/tokenHandlers";

export default async function TurfUserProfileUdpatePage() {
  const token = await getCookie("turfUserAccess");
  const turfUser = token ? getUserFromToken(token) : null;

  if (!turfUser) return <div>Loading</div>;

  return (
    <div>
      <TurfUserUpdateProfileForm turfUser={turfUser} />
    </div>
  );
}

