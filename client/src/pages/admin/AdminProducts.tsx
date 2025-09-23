import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const AdminProducts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold font-poppins uppercase">Admin products page</h1>

      <div className="flex justify-end mt-4">
        <Button asChild>
          <Link to="/admin/products/add">add a product + </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminProducts;
