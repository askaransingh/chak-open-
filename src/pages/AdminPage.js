import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="p-6" style={{ margin : "200px" }}>
        {/* Your admin routes render here */}
      </div>
    </>
  );
}

export default AdminLayout;