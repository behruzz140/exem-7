// --------- Authorization  -------------

export interface Signin {
    email: string;
    password: string | number;
  }
  
  export interface Signup extends Signin {
    first_name: string;
    last_name: string;
    phone_number: string;
  }
  
  export interface Request {
    sign_in: (data: Signin) => any;
    sign_up: (data: Signup) => any;
    get_admin: (id:any) => any;
    update_admin: (id:any, data: any) => any;
  }
  
  export interface AuthStore {
    data: any;
    getData: (data: Signin) => Promise<any>;
    createData: (data: Signup) => Promise<any>;
    getAdmin: (id:any) => Promise<any>;
    updateAdmin: (id:any, data: any) => Promise<any>;
  }
  
  // ------------ Category ----------------
  
  export interface CategoryRequest {
    get_categories: (params: any) => any;
    create_category: (data: any) => any;
    update_category: (id: number, data: any) => any;
    delete_category: (id: number) => any;
    get_subcategory: (id: any, params: any) => any;
    create_subcategory: (data: any) => any;
    delete_subcategory: (id: number) => any;
    update_subcategory: (id: number, data: any) => any;
  }
  
  export interface CategoryStore {
    categories: any[];
    subCategories: any[];
    isLoading: boolean;
    getCategories: (params: any) => Promise<any>;
    createCategory: (data: any) => Promise<any>;
    updateCategory: (id: number, data: any) => Promise<any>;
    deleteCategory: (id: number) => Promise<any>;
    getSubCategory: (id:any, params:any) => Promise<any>;
    createSubCategory: (data: any) => Promise<any>;
    deleteSubCategory: (id: number) => Promise<any>;
    updateSubCategory: (id: number, data: any) => Promise<any>;
  }
  
  // ------------ Brands ----------------
  
  export interface Brand {
    brand_name: string;
    brand_description: string;
  }
  
  export interface BrandRequest {
    get_brands: (params: any) => any;
    get_brands_by_category: (id: any) => any;
    create_brand: (data: Brand) => any;
    delete_brand: (id: string) => any;
    update_brand: (id: string, data: Brand) => any;
  }
  
  export interface BrandStore {
    brand: any[];
    isLoading: boolean;
    getBrands: (params: any) => Promise<any>;
    getBrandsByCategory: (id: any) => Promise<any>;
    createBrand: (data: Brand) => Promise<any>;
    deleteBrand: (id: string) => Promise<any>;
    updateBrand: (id: string, data: Brand) => Promise<any>;
  }
  
  // ------------ Brand Category ----------------
  
  export interface BrandCategoryRequest {
    get_brand_category: (params: any) => any;
    get_brand_category_by_brand: (id: any) => any;
    create_brand_category: (data: any) => any;
    delete_brand_category: (id: number) => any;
    update_brand_category: (id: number, data: any) => any;
  }
  
  export interface BrandCategoryStore {
    brand_category: any[];
    isLoading: boolean;
    totalCount: number;
    getBrandCategory: (params: any) => Promise<any>;
    getBrandCategoryByBrand: (id: any) => Promise<any>;
    createBrandCategory: (data: any) => Promise<any>;
    deleteBrandCategory: (id: number) => Promise<any>;
    updateBrandCategory: (id: number, data: any) => Promise<any>;
  }
  
  // ------------ Product ----------------
  
  export interface Product {
    name: string;
    price: number;
    category_id: number;
    brand_category_id: number;
    brand_id: number;
  }
  export interface ProductParams {
    search: string;
    limit: number;
    page: number;
  }
  
  export interface ProductRequest {
    get_products: (params: ProductParams) => any;
    create_product: (data: Product) => any;
    delete_product: (id: number) => any;
    update_product: (id: number, data: any) => any;
  }
  
  export interface ProductStore {
    products: any[];
    isLoading: boolean;
    totalCount: number;
    getProducts: (params: ProductParams) => Promise<any>;
    createProduct: (data: Product) => Promise<any>;
    deleteProduct: (id: number) => Promise<any>;
    updateProduct: (id: number, data: any) => Promise<any>;
  }
  
  // ------------ Global ----------------
  
  export interface TableProps {
    columns: {
      title: string;
      dataIndex: string;
      key: string;
      render?: any;
    }[];
    data: { key: string; name: string }[];
    boolean: boolean;
  }
  
  export interface SomeComponentProps {
    record: any;
  }