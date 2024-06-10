import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";

import useBrandStore from "@store-brand";
import useBrandCategoryStore from "@store-brand-category";
import { postData } from "@brand-category";

// Updated modal styles for a blue theme
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #004f97",  // Blue border
  boxShadow: 24,
  p: 4,
};

interface propsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({ title, id, data }: propsData) {
  const { postBrandCategory, updateBrandCategory } = useBrandCategoryStore();
  const { getBrand, dataBrands } = useBrandStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBrand({ search: "" });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    brand_id: Yup.number().min(0, "Must be at least greater than 0"),
  });

  const initialValues: postData = {
    name: data?.name || "",
    brand_id: data?.brand_id || "",
  };

  const handelSubmit = async (value: postData) => {
    if (!id) {
      const status = await postBrandCategory(value);
      if (status === 201) {
        toast.success("Successfully added");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    } else {
      const updateData = { id: id, putData: value };
      const status = await updateBrandCategory(updateData);
      if (status === 200) {
        toast.success("Successfully updated");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    }
  };

  return (
    <div>
      {title === "post" ? (
        <button
          onClick={handleOpen}
          className="py-2 px-6 text-white font-semibold bg-[#0074cc] hover:bg-[#005c99] active:bg-[#004080] duration-200 rounded-lg"
        >
          ADD BRAND CATEGORY
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={handleOpen}
          sx={{ color: '#0074cc' }}
        >
          <EditIcon />
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                {title === "post" ? "Add a brand category" : "Edit a brand category"}
              </h1>
              <Field
                as={TextField}
                label="Category name"
                sx={{ "& input": { color: "#000000", fontSize: "20px" } }}
                type="text"
                name="name"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mb-3 text-blue-500 text-center"
                  />
                }
              />

              <Field
                name="brand_id"
                type="text"
                as={TextField}
                label="Brand ID"
                select
                className="relative"
                margin="none"
                variant="outlined"
                fullWidth
                helperText={
                  <ErrorMessage
                    name="brand_id"
                    component="p"
                    className="text-[blue] text-[15px]"
                  />
                }
              >
                {dataBrands?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>

              <Button
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#0074cc",
                  "&:hover": { background: "#005c99" },
                }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                {title === "post" ? "Add" : "Update"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
