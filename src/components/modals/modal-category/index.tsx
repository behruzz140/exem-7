import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import useCategoryStore from "@stor-category";
import { postCategory } from "@category";

// Modal style with blue theme
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  outline: 'none'
};

// Props interface
interface PropsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({ title, id, data }: PropsData) {
  const { postDatacategory, updateDataCategory } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
  });

  // Initial form values
  const initialValues: postCategory = {
    name: data?.name || ""
  };

  // Form submission handler
  const handleSubmit = async (value: postCategory) => {
    if (!id) {
      const status = await postDatacategory(value);
      if (status === 201) {
        toast.success("Category added successfully");
        handleClose();
      } else {
        toast.error("Error: " + status);
        handleClose();
      }
    } else {
      const updateData = { id: id, updateData: value };
      const status = await updateDataCategory(updateData);
      if (status === 200) {
        toast.success("Category updated successfully");
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
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ backgroundColor: "#007BFF", "&:hover": { backgroundColor: "#0056b3" } }}
        >
          Add Category
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          color="inherit"
          sx={{ color: "#007BFF", "&:hover": { color: "#0056b3" } }}
        >
          <EditIcon />
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="modal-form">
              <Typography
                variant="h5"
                component="h1"
                sx={{ textAlign: "center", mb: 2, color: "#007BFF" }}
              >
                {title === "post" ? "Add a Category" : "Edit Category"}
              </Typography>
              <Field
                as={TextField}
                label="Category Name"
                name="name"
                fullWidth
                variant="outlined"
                error={Boolean((formik:any) => formik.errors.name && formik.touched.name)}
                helperText={<ErrorMessage name="name" />}
                InputLabelProps={{ style: { color: "#007BFF" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#007BFF",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0056b3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0056b3",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    textAlign: "center",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#007BFF", "&:hover": { backgroundColor: "#0056b3" } }}
                fullWidth
              >
                {title === "post" ? "Add Category" : "Update Category"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
