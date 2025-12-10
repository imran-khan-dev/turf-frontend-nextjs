import Link from "next/link";

function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 justify-center text-center">
          <div>
            <h3 className="font-bold mb-2">Turf Booking App</h3>
            <p className="text-sm text-muted-foreground">
              Best Turf booking management app for free
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Jhighatola
              <br />
              Dhanmondddi, Dhaka
              <br />
              contact@turfapp.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Turf App. All Rights Reserved. 
          <br />
          <Link href="/admin/login">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;
