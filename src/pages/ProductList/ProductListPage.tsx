import "./product-list-page.css";
import SearchIcon from "../../assets/searchIcon.png";
import Button from "../../components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as PencilIcon } from "../../assets/pencilIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { ReactComponent as LeftArrow } from "../../assets/arrowLeft.svg";
import { ReactComponent as RightArrow } from "../../assets/arrowRight.svg";
import { ReactComponent as ProductsIcon } from "../../assets/productsIcon.svg"
import { ReactComponent as ProductPhotoIcon } from "../../assets/productPhotoIcon.svg"
import { ReactComponent as CategoryIcon } from "../../assets/shoppingIcon.svg"
import { ReactComponent as PriceIcon } from "../../assets/dollarIcon.svg"
import { ReactComponent as CompanyIcon } from "../../assets/bagIcon.svg"
import { ReactComponent as StatusIcon } from "../../assets/checkIcon.svg"
import { ReactComponent as DropDownIcon } from "../../assets/chevronDownBig.svg";
import CustomCheckbox from "../../components/CustomCheckbox/CustomCheckbox";
import { productList } from "../../data/productList";
import { companyList } from "../../data/productList";
import { categoryList } from "../../data/productList";
import { stockList } from "../../data/productList";
import Input from "../../components/Input/Input";
import { InputSelectField } from "../../components/InputSelectField/InputSelectField";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    company: string;
    status: string;
    image: string;
}

const ProductListPage: React.FC = () => {

    const [products, setProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : productList;
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const companyOptions = companyList.map((company) => ({
        label: company.name,
        value: company.name,
    }));
    const categoryOptions = categoryList.map((cat) => ({
        label: cat.name,
        value: cat.name,
    }));
    const stockOptions = stockList.map((stock) => ({
        label: stock.name,
        value: stock.name,
    }));

    // CRUD create

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)



    const handleAddNewProduct = () => {
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        const addNewProduct: Product = {
            id: lastId + 1,
            name: "",
            category: categoryList[0].name,
            price: 0,
            company: companyList[0].name,
            status: stockList[0].name,
            image: "",
        };

        setCreateModalOpen(true);
        setEditingProduct(addNewProduct);
    };

    // CRUD update

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editingProduct) return;
        const { name, value } = e.target;
        setEditingProduct({
            ...editingProduct,
            [name]: value,
        });
    };

    const [showError, setShowError] = useState<boolean>(false)
    const handleSaveEdit = () => {
        if (!editingProduct) return;

        const { name, price, image } = editingProduct;


        if (!name.trim() || price < 0 || !image.trim()) {
            setShowError(true)
            return;
        }

        const isExisting = products.some(p => p.id === editingProduct.id);

        if (isExisting) {
            setProducts(products.map(p => (p.id === editingProduct.id ? editingProduct : p)));
        } else {
            setProducts(prev => [...prev, editingProduct]);
        }


        setEditingProduct(null);
    };

    // CRUD delete

    const handleDelete = (id: number) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    let fileInputRef = useRef<HTMLInputElement | null>(null);

    // image upload handler

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingProduct) return;
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setEditingProduct(prev =>
                prev ? { ...prev, image: reader.result as string } : null
            );
        };
        reader.readAsDataURL(file);
    };




    // search
    const [searchQuery, setSearchQuery] = useState("");
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // pagination 
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 9;
    const pageCount = Math.ceil(filteredProducts.length / pageSize);
    const currentPageData = filteredProducts.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    const goToPreviousPage = () => {
        if (pageIndex > 0) setPageIndex(pageIndex - 1);
    };
    const goToNextPage = () => {
        if (pageIndex < pageCount - 1) setPageIndex(pageIndex + 1);
    };

    return (
        <div className="product-page-container">
            <div className="sub-container-product-page">
                <div className="inner-container">
                    <div className="heading-product">
                        <div className="left">
                            <span className="title">Product List</span>
                            <div className="search-container">
                                <div className="search-icon">
                                    <img src={SearchIcon} alt="Search" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for product..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setPageIndex(0);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <Button onClick={handleAddNewProduct}>Add new product</Button>
                        </div>
                    </div>

                    <div className="product-table-container">
                        <div className="product-table-header">
                            <span className="table-header-title">All products</span>
                        </div>

                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th className="narrow-column check"><CustomCheckbox /></th>
                                    <th className="headers"><ProductsIcon className="header-icon" /> <span>Product Name</span></th>
                                    <th className="headers"><CategoryIcon className="header-icon" /> <span>Category</span></th>
                                    <th className="headers"><PriceIcon className="header-icon" /> <span>Price</span></th>
                                    <th className="headers"><CompanyIcon className="header-icon" /> <span>Company</span></th>
                                    <th className="headers"><StatusIcon className="header-icon" /> <span>Status</span></th>
                                    <th className="narrow-column edit" />
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map(product => (
                                    <tr key={product.id}>
                                        <td className="narrow-column check"><CustomCheckbox /></td>

                                        <td className="product-name-data">
                                            <div className="product-name">
                                                {product.image ?
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="product-image"
                                                    /> : <></>}
                                                <span>{product.name}</span>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td>$ {product.price}</td>
                                        <td>
                                            <div className="product-company">
                                                <img
                                                    src={`/companies/${product.company}.png`}
                                                    alt={product.company}
                                                    className="company-logo"
                                                />
                                                <span>{product.company}</span>
                                            </div>
                                        </td>
                                        <td>{
                                            product.status === "In stock" ? (
                                                <div className="in-stock">
                                                    <div className="live-icon in" />
                                                    <span>In stock</span>
                                                </div>
                                            ) : product.status === "Out of stock" ? (
                                                <div className="out-of-stock">
                                                    <div className="live-icon out" />
                                                    <span>Out of stock</span>
                                                </div>
                                            ) : (
                                                <div>Unknown status</div>
                                            )}</td>
                                        <td className="narrow-column edit">
                                            <div className="edit"
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                }}
                                            ><PencilIcon /></div>
                                            <div className="delete" onClick={() => handleDelete(product.id)}><DeleteIcon /></div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/** the edit modal window */}

                        {editingProduct && (
                            <div className="modal-overlay"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                        setShowError(false);
                                        setCreateModalOpen(false);
                                        setEditingProduct(null);
                                    }
                                }} >
                                <div className="modal-content">
                                    {createModalOpen ?
                                        <span className="modal-title">Add new product</span>
                                        :
                                        <span className="modal-title">Edit product</span>
                                    }
                                    <div className="modal-card">
                                        <div className="modal-option-container">
                                            {/* NAME  */}
                                            <div className="option-name">
                                                <ProductsIcon />
                                                <span>Product name</span>
                                            </div>
                                            <Input
                                                name="name"
                                                placeholder="Name"
                                                value={editingProduct.name}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="modal-option-container">
                                            {/* PHOTO  */}
                                            <div className="option-name">
                                                <ProductPhotoIcon />
                                                <span>Product photo</span>
                                            </div>
                                            <div className="photo-upload">
                                                {editingProduct.image ?
                                                    <img
                                                        src={editingProduct.image}
                                                        alt={editingProduct.name}
                                                        className="product-image modal"
                                                    />
                                                    :
                                                    <div className="no-photo">
                                                        <div className="click-to-upload" onClick={() => fileInputRef.current?.click()}>
                                                            <div className="upload-icon">
                                                                <ProductPhotoIcon />

                                                            </div>
                                                            <span className="click-to-upload line-one">
                                                                <span className="click-to-upload highlight">Click to upload </span>
                                                                <span>or drag and drop</span>
                                                            </span>
                                                            <span> SVG, PNG, JPG or GIF (max. 800 x</span>

                                                            <span>400px)</span>
                                                        </div>
                                                    </div>
                                                }
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    ref={fileInputRef}
                                                />

                                                {editingProduct.image ?
                                                    <div className="modal-edit-delete">
                                                        <span className="modal-edit" onClick={() => fileInputRef.current?.click()}>Edit</span>
                                                        <span>| </span>
                                                        <span
                                                            className="modal-delete"
                                                            onClick={() => {
                                                                setEditingProduct(prev =>
                                                                    prev ? { ...prev, image: "" } : null
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </span>
                                                    </div>
                                                    :
                                                    <></>}
                                            </div>
                                        </div>
                                        <div className="modal-option-container">
                                            {/* CATEGORY */}
                                            <div className="option-name">
                                                <CategoryIcon />
                                                <span>Category</span>
                                            </div>
                                            <InputSelectField
                                                rightIcon={<DropDownIcon />}
                                                options={categoryOptions}
                                                value={editingProduct.category}
                                                onChange={(newValue) =>
                                                    setEditingProduct((prev) => ({ ...prev!, category: newValue }))
                                                }
                                            />
                                        </div>
                                        <div className="modal-option-container">
                                            {/* PRICE  */}
                                            <div className="option-name">
                                                <PriceIcon />
                                                <span>Price (in $)</span>
                                            </div>
                                            <Input
                                                name="price"
                                                placeholder="Price"
                                                value={editingProduct.price}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="modal-option-container">
                                            {/* COMPANY  */}
                                            <div className="option-name">
                                                <CompanyIcon />
                                                <span>Company</span>
                                            </div>
                                            <InputSelectField
                                                leftIcon={
                                                    <img
                                                        src={`/companies/${editingProduct.company}.png`}
                                                        alt={editingProduct.company}
                                                        className="company-logo modal"
                                                    />
                                                }
                                                rightIcon={<DropDownIcon />}
                                                options={companyOptions}
                                                value={editingProduct.company}
                                                onChange={(newValue) =>
                                                    setEditingProduct((prev) => ({ ...prev!, company: newValue }))
                                                }
                                            />
                                        </div>
                                        <div className="modal-option-container end">
                                            {/* STATUS  */}
                                            <div className="option-name">
                                                <StatusIcon />
                                                <span>Status</span>
                                            </div>
                                            <InputSelectField
                                                rightIcon={<DropDownIcon />}
                                                options={stockOptions}
                                                value={editingProduct.status}
                                                onChange={(newValue) =>
                                                    setEditingProduct((prev) => ({ ...prev!, status: newValue }))
                                                }
                                            />
                                        </div>

                                    </div>
                                    {showError && <div className="error">
                                        Please enter valid inputs or image
                                    </div>}
                                    <div className="modal-buttons">
                                        <Button
                                            variant="modal"
                                            onClick={handleSaveEdit}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                    <div className="pagination-controls">
                        <div className={pageIndex === 0 ? "pagination-button disabled" : "pagination-button"} onClick={goToPreviousPage}>
                            <LeftArrow />
                        </div>

                        <div className={pageIndex >= pageCount - 1 ? "pagination-button disabled" : "pagination-button"} onClick={goToNextPage}>
                            <RightArrow />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;