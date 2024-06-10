import * as React from 'react';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { auth } from "@service-auth";
import { removeCookiesAll } from "@coocse";

export default function FadeMenu({ id }: { id: number }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const response = await auth.deleteAdminId(id);
      if (response.status === 200) {
        toast.success("Admin removed successfully");
        removeCookiesAll(["access_token", "refresh_token", "admin_id", "admin_data"]);
        handleClose();
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
      handleClose();
    }
  };

  return (
    <div>
      <button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="py-2 px-5 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 duration-300 active:bg-blue-500"
      >
        Delete
      </button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        sx={{ marginTop: 1 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div className='px-4 py-2 bg-blue-100 rounded-md'>
          <h3 className='text-blue-700'>Do you want to delete your account?</h3>
          <div className='flex items-center justify-end gap-3 mt-2'>
            <button onClick={handleClose} className='py-1 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700'>No</button>
            <button onClick={deleteData} className='py-1 px-2 rounded-md bg-blue-500 text-white hover:bg-blue-700'>Yes</button>
          </div>
        </div>
      </Menu>
    </div>
  );
}
