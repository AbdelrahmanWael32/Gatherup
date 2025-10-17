import { Select, Option, Textarea } from "@material-tailwind/react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
const Contact = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="font-extrabold text-3xl">Contact us</h1>
      <p> fill in this form and we will get back to you.</p>

      <Card color="transparent" shadow={false}>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            {" "}
            <Select label="Select ">
              <Option>Technical support </Option>
              <Option>Suggestion</Option>
              <Option>complaint</Option>
            </Select>
            <Input label="Name" />
            <Input type="email" label="Email Address" />
            <Textarea label="Message" />
          </div>

          <Button className="mt-6" fullWidth>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
