import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

import useBrandStore from '@store-brand';
import useCategoryStore from '@stor-category';
import useBrandCategoryStore from '@store-brand-category';
import useSubCategoryStore from '@store-sub-category';
import useProductStore from '@store-product';

export default function FadeMenu({ id, title }: { id: number; title: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define store functions
  const { deleteBrand } = useBrandStore();
  const { deleteDataCategory } = useCategoryStore();
  const { deleteBrandCategory } = useBrandCategoryStore();
  const { deleteDataSubCatigory } = useSubCategoryStore();
  const { deleteProduct } = useProductStore();

  // Delete data function
  const deleteData = async () => {
    try {
      let status;
      switch (title) {
        case 'brand':
          status = await deleteBrand(id);
          break;
        case 'category':
          status = await deleteDataCategory(id);
          break;
        case 'brand-category':
          status = await deleteBrandCategory(id);
          break;
        case 'sub-category':
          status = await deleteDataSubCatigory(id);
          break;
        case 'product':
          status = await deleteProduct(id);
          break;
        default:
          throw new Error('Invalid title');
      }

      if (status === 200) {
        handleClose();
        toast.success(`${title.charAt(0).toUpperCase() + title.slice(1)} deleted successfully`);
      } 
    } catch (err: any) {
      toast.error(`Error: ${err?.message}`);
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <DeleteIcon style={{ color: '#007BFF' }} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ marginTop: 1, '& .MuiPaper-root': { borderRadius: '8px', backgroundColor: '#E3F2FD' } }}
      >
        <div className='px-4 py-2'>
          <h3 className='text-blue-600'>Are you sure you want to delete?</h3>
          <div className='flex items-center justify-end gap-3 mt-2'>
            <button onClick={handleClose} className='py-1 px-2 rounded-md bg-blue-600 text-white hover:bg-blue-800'>
              No
            </button>
            <button onClick={deleteData} className='py-1 px-2 rounded-md bg-blue-600 text-white hover:bg-blue-800'>
              Yes
            </button>
          </div>
        </div>
      </Menu>
    </div>
  );
}
