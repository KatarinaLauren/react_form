import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "./FormError";

const schema = yup.object().shape({
  name: yup.string().required("Please enter the name of the property"),
  description: yup.string().min(20, "Must be minimum 20 characters long").required(),
  location: yup.string().required("Please enter the general location of the property"),
  category: yup.mixed().oneOf(["Hotel", "BB", "Guesthouse"]),
  email: yup.string().email("Please enter a valid email address").required("Please enter the email address of the property"),
  facilities: yup.object().required(),
});

function TestForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState(false);

  function onSubmit(data) {
    console.log(data);
    setMessage(true);
    reset();
  }

  const facilityNames = ["bar", "pool", "reception", "seaview", "parking"];

  return (
    <>
      <Form className="test_form p-5 m-auto mb-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <p className="fst-italic text-center mb-4">All fields are required*</p>
        {message && <p className="success">Property added</p>}

        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Accommodation name</Form.Label>
          <Form.Control {...register("name")} />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-2" controlId="ControlInput1">
          <Form.Label>Location</Form.Label>
          <Form.Control {...register("location")} />
          {errors.location && <FormError>{errors.location.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Form.Group>

        <Form.Group className="m-auto mb-3" controlId="controlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Select category" {...register("category")} className="m-auto">
            <option>Select one option</option>
            <option value="Hotel">Hotel</option>
            <option value="BB">B&amp;B</option>
            <option value="Guesthouse">Guesthouse</option>
            {errors.category && <FormError>{errors.category.message}</FormError>}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={10} {...register("description")} />
          {errors.description && <FormError>{errors.description.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3 d-flex flex-wrap justify-content-between justify-content-md-start" controlId="formBasicCheckbox">
          <Form.Label>Facilities</Form.Label>
          <Form.Text className="d-block w-100 mt-0 mb-3" muted>
            Check the facilities that are available at your accommodation. Leave the other ones empty.
          </Form.Text>
          {facilityNames.map(function (name) {
            return (
              <Controller
                key={name}
                control={control}
                name={`facilities.${name}`}
                render={({ field: { value, onChange } }) => (
                  <Form.Check
                    {...register(`facilities.${name}`)}
                    type="checkbox"
                    id={name}
                    name={name}
                    label={name}
                    checked={value}
                    onChange={(e) => {
                      onChange(e.target.checked);
                    }}
                  />
                )}
              />
            );
          })}
        </Form.Group>

        <div className="text-center">
          <Button variant="success" type="submit" className="mt-4 pe-5 ps-5">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

export default TestForm;
