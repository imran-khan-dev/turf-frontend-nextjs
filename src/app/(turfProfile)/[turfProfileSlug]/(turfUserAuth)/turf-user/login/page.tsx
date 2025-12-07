import TurfUserLoginForm from "@/components/turf-user-login-form";

const TurfUserLoginPage = async ({
  params,
  searchParams,
}: {
  params: { turfProfileSlug: string };
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const qs = (await searchParams) || {};
  const resolvedParams = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back, Login as Turf User</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Pass turfPublicId to form */}
        <TurfUserLoginForm
          redirect={qs.redirect}
          turfProfileSlug={resolvedParams.turfProfileSlug}
        />
      </div>
    </div>
  );
};

export default TurfUserLoginPage;
