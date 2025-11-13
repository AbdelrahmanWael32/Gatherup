
import { Input, Button, Typography } from "@material-tailwind/react";

function EditTickets() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
<div className="w-full max-w-5xl rounded-2xl shadow-lg p-8">


        <Typography variant="h5" className="text-center  text-brand-dark mb-6 font-semibold">
  Edit this Tickets
        </Typography>

        <form className="space-y-6">
     
          <div>
            <Typography variant="small" className="mb-1  text-brand-dark ">
              ticket title
            </Typography>
            <Input type="text "
             placeholder="enter ticket title" />
          </div>


           <div>
            <Typography variant="small" className="text-brand-dark mb-1">
             ticket price
            </Typography>
            <Input type="number" 
             placeholder=" enter ticket price"/>
          </div>



      
          <div>
            <Typography variant="small" className="text-brand-dark mb-1">
             ticket cateogry
            </Typography>
            <Input type="text" 
             placeholder="enter ticket category"/>
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="small" className="mb-1  text-brand-dark">
       description
              </Typography>
              <Input type="text" 
              placeholder="enter description"/>
            </div>


 
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography variant="small" className="mb-1  text-brand-dark">
       event type 
              </Typography>
              <Input type="text" 
              placeholder="enter price "/>
            </div>
</div>





     
          <div>
            <Typography variant="small" className="mb-0  text-brand-dark">
            event date
            </Typography>
            <Input type="date"
            placeholder="MM/DD/YY"/>
          </div>
          </div>


        

          <Button fullWidth className="bg-brand-dark text-white mt-4">
edit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditTickets;