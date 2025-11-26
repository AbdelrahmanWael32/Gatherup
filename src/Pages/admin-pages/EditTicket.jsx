import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";

export default function EditTicketDesign() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-50">
      <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
        Edit Ticket
      </Typography>

      <Card color="transparent" shadow={false} className="p-6 w-full max-w-lg">
        <form className="flex flex-col gap-6">
          <Input label="Event Title" placeholder="Enter ticket title" />

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Event Category</label>
            <select className="w-full border rounded-md p-2 border-gray-300">
              <option value="">Select event category</option>
              <option value="Concert">Concert</option>
              <option value="Theater">Theater</option>
              <option value="Sports">Sports</option>
              <option value="Movie_night">Movie night</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Ticket Categories</label>
            <div className="flex gap-2 mb-2 items-center">
              <select className="border p-2 rounded-md">
                <option value="">Select type</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
              <Input type="number" placeholder="Price" className="w-24" />
              <Button className="bg-brand-dark">Remove</Button>
            </div>
            <Button className="bg-blue-500 w-full mt-2">Add Ticket Category</Button>
          </div>

          <Input type="date" label="Event Date" />
          <div className="flex gap-4">
            <Input type="time" label="Start Time" className="flex-1" />
            <Input type="time" label="End Time" className="flex-1" />
          </div>

          <Input label="Location" placeholder="Enter location" />
          <Textarea label="Description" placeholder="Enter description" />
          <Input label="Image URL" placeholder="Enter image URL" />
         
          <Button className="bg-brand-primary mt-4" fullWidth>
            Edit Ticket
          </Button>
        </form>
      </Card>
    </div>
  );
}
