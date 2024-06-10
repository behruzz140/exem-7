import { useState } from "react";
import * as Yup from "yup";
import axios from 'axios';
import { Button, Drawer, Input, Upload } from "antd";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { toast } from "react-toastify";
import { getCookies } from "@coocse";

interface FormValues {
  quantity: string;
  description: string;
  discount: string;
  colors: string;
  product_id: any;
  files: File[];
}

export const postProductSchema2 = Yup.object().shape({
  quantity: Yup.number().required("Please enter quantity"),
  description: Yup.string().required("Please enter description"),
  discount: Yup.number().required("Please enter discount"),
  colors: Yup.string().required("Please enter color"),
});

const Testdraever = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const initialValues: FormValues = {
    quantity: "",
    description: "",
    discount: "",
    colors: "",
    product_id: id || "",
    files: [],
  };

  const handleSubmit = async (values: FormValues) => {
    const productId: any = id || "";
    const formData = new FormData();
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("discount", values.discount);
    formData.append("colors", values.colors);
    formData.append("product_id", productId);

    values.files.forEach((file) => {
      formData.append("files", file);
    });

    const access_token = getCookies("access_token");

    try {
      const response = await axios.post("https://ecomapi.ilyosbekdev.uz/product-detail/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`
        },
      });
      if (response && response.status === 201) {
        toast.success("Product added successfully");
        onClose();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        aria-label="ADD A FAVORITE"
        onClick={showDrawer}
        className="py-2 px-5 rounded-md bg-[#1E90FF] text-white font-medium hover:bg-[#1C86EE] duration-300 active:bg-[#1E90FF]"
      >
        Create
      </button>

      <Drawer
        title="Add Product Details"
        onClose={onClose}
        open={open}
        className="pt-[60px]"
        bodyStyle={{ backgroundColor: "#F0F8FF" }} // Light blue background for drawer
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postProductSchema2}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <Field
                type="number"
                name="quantity"
                as={Input}
                placeholder="Quantity"
                className="border-[#1E90FF] focus:border-[#1C86EE]"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-[#FF4500] mt-0"
              />
              <Field
                type="text"
                name="description"
                as={Input}
                placeholder="Description"
                className="border-[#1E90FF] focus:border-[#1C86EE]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-[#FF4500]"
              />
              <Field
                type="number"
                name="discount"
                as={Input}
                placeholder="Discount"
                className="border-[#1E90FF] focus:border-[#1C86EE]"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-[#FF4500]"
              />
              <Field
                type="text"
                name="colors"
                as={Input}
                placeholder="Color"
                className="border-[#1E90FF] focus:border-[#1C86EE]"
              />
              <ErrorMessage
                name="colors"
                component="div"
                className="text-[#FF4500]"
              />
              <Field name="files">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    multiple
                    beforeUpload={(file) => {
                      setFieldValue(
                        "files",
                        field.value ? [...field.value, file] : [file]
                      );
                      return false;
                    }}
                  >
                    <Button style={{ backgroundColor: "#318CE7", color: "white", borderColor: "#1E90FF" }}>Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage
                name="files"
                component="div"
                className="text-[#FF4500]"
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  backgroundColor: "#1E90FF",
                  color: "white",
                  borderColor: "#1E90FF",
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default Testdraever;
