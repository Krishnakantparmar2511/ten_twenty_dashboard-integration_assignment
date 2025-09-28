import { getAllDashboardDataUseCase } from "@/modules/dashboard/domain/usecase/getDashboardDataUseCase";
import { TableViewDashboard } from "./components/TableView";
import { Suspense } from "react";
import { Spinner } from "@/components/atoms/spinner/Spinner";

export default async function Page() {
  const data = await getAllDashboardDataUseCase();
  return (
    <div className=" max-w-7xl shadow-md mx-auto p-6 bg-white  rounded-lg">
   <Suspense fallback={<Spinner />}>
       <TableViewDashboard data={data} />
   </Suspense>
    </div>
  );
}
