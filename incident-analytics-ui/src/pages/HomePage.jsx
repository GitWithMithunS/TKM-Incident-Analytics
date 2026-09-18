import Navbar from "../components/layout/Navbar";
import UploadCard from "../components/upload/UploadCard";
import UploadTable from "../components/upload/UploadTable";

function HomePage() {
  return (
    <>
      <Navbar />

      <div className="p-8 bg-gray-100 min-h-screen">

        <UploadCard />

        <div className="mt-8">
          <UploadTable />
        </div>

      </div>
    </>
  );
}

export default HomePage;