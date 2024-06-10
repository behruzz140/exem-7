import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";

import useSubCategoryStore from "@store-sub-category";
import { postCategory } from "@category";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#E3F2FD", // Light blue background color
  border: "2px solid #64B5F6", // Blue border color
  boxShadow: 24,
  p: 4,
};

interface propsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({ title, id, data }: propsData) {
  const { postDataSubCatigory, updateDataSubCatigory } = useSubCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { subcategory } = useParams();
  const parentCategoryId = Number(subcategory);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const initialValues: postCategory = {
    name: data?.name || "",
  };

  const handleSubmit = async (values: postCategory) => {
    const postValue = { ...values, parent_category_id: parentCategoryId };

    if (!id) {
      const status = await postDataSubCatigory(postValue);
      if (status === 201) {
        toast.success("Successfully added");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    } else {
      const updateData = { id: id, updateData: postValue };
      const status = await updateDataSubCatigory(updateData);
      if (status === 200) {
        toast.success("Update successful");
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
          className="py-2 px-6 text-white font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-600 duration-200 rounded-lg"
        >
          To add
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={handleOpen}
          sx={{ color: "#1976D2" }} // Blue icon color
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
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold text-blue-600">
                {title === "post" ? "Add a Subcategory" : "Edit a Subcategory"}
              </h1>
              <Field
                as={TextField}
                label="Subcategory name"
                sx={{
                  "& input": { color: "#00000", fontSize: "20px" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#1976D2", // Blue border for the text field
                    },
                    "&:hover fieldset": {
                      borderColor: "#115293", // Darker blue on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0D47A1", // Darkest blue on focus
                    },
                  },
                }}
                type="text"
                name="name"
                className="w-[100%] mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                }
              />
              <Button
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#1976D2", // Blue button color
                  "&:hover": { backgroundColor: "#115293" }, // Darker blue on hover
                }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                To add
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
