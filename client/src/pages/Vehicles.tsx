import { HeaderDashboard } from "../components/layout/HeaderDashboard";

export default function VehiclesPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-64 h-full p-2 bg-sidebar border-r border-sidebar-border"></div>
      <div className="flex-1 px-6 py-4 flex flex-col gap-6 ">
        <HeaderDashboard
          title="My Vehicles"
          description="Manage and track all your vehicles"
          buttonText="Add Vehicle"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Vehicle cards will go here */}
          <VehicleCard
            name="jeep "
            model="Trackhawk"
            year={2021}
            image="https://cdn-hednb.nitrocdn.com/yYolPsxkHfeoqRKSyqGQlaFpLZMHhVYI/assets/images/optimized/rev-9cddd2c/hpe-photos.s3.us-east-2.amazonaws.com/wp-content/uploads/20220316132050/hennessey-hpe900-jeep-trackhawk-1-scaled.webp"
            mileage={94000}
            totalCost={110000}
          />
          <VehicleCard
            name="BMW M3"
            model="Serie 3"
            year={2021}
            image="https://spicymotor.fr/wp-content/uploads/jet-form-builder/f7ffbf22afdd9e39127c07c589338a72/2023/12/DSC8738-scaled.jpg"
            mileage={32000}
            totalCost={150000}
          />
          <VehicleCard
            name="BMW M3"
            model="Serie 3"
            year={2021}
            image="https://spicymotor.fr/wp-content/uploads/jet-form-builder/f7ffbf22afdd9e39127c07c589338a72/2023/12/DSC8738-scaled.jpg"
            mileage={32000}
            totalCost={150000}
          />
          <VehicleCard
            name="BMW M3"
            model="Serie 3"
            year={2021}
            mileage={32000}
            totalCost={150000}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleCard({
  name,
  model,
  year,
  image,
  mileage,
  totalCost,
}: {
  name: string;
  model: string;
  year: number;
  image?: string;
  mileage: number;
  totalCost: number;
}) {
  return (
    <div className="col-span-1 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-500">
      <div className="h-45 bg-muted relative overflow-hidden rounded-t-xl">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-xl "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground ">
            {model} • {year}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <VehicleStats
            label="Mileage"
            value={`${mileage.toLocaleString()} km`}
          />

          <VehicleStats
            label="Total Cost"
            value={`${totalCost.toLocaleString()}`}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleStats({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
