import React from 'react';
import { useEffect , useState , useRef } from 'react';
import AdminSidebar from "../../Components/Admin/AdminSidebar";
// import useScript from "../../Hooks/jsLoader"; 
import CategoryForm from '../../Components/Admin/CategoryForm'; 

const CreateProduct = ()=>{
    const [images, setImages] = useState([]);
    
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

      const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newImageUrls = selectedFiles.map(file => URL.createObjectURL(file));
        
        setImages(prev => [...prev, ...newImageUrls]);
        setFiles(prev => [...prev, ...selectedFiles]);
    
        // Reset the file input so we can select the same file again if needed
        event.target.value = '';
      };
    
      const handleRemoveImage = (indexToRemove) => {
        // Remove image preview
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
    
        // Remove file from files array
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(updatedFiles);
    
        // Reset the input field completely
        fileInputRef.current.value = '';
      };
    
      const [sizeOptions] = useState(["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]);
      const [selectedSizes, setSelectedSizes] = useState([]);

      const handleSizeChange = (event) => {
        const size = event.target.value;
        if (!selectedSizes.some(s => s.size === size)) {
            setSelectedSizes([...selectedSizes, { size, price: '', stock: '' }]);
        }
      };

    const handleSizeInputChange = (index, field, value) => {
        const updatedSizes = selectedSizes.map((s, i) => (
            i === index ? { ...s, [field]: value } : s
        ));
        setSelectedSizes(updatedSizes);
        console.log(selectedSizes);
    };
    const removeSize = (index) => {
      const updatedSizes = selectedSizes.filter((_, i) => i !== index);
      setSelectedSizes(updatedSizes);
    };
    const [colorOptions] = useState([
        { id: "sp-1", class: "c-1" },
        { id: "sp-2", class: "c-2" },
        { id: "sp-3", class: "c-3" },
        { id: "sp-4", class: "c-4" },
        { id: "sp-5", class: "c-5" },
        { id: "sp-6", class: "c-6" },
        { id: "sp-7", class: "c-7" },
        { id: "sp-8", class: "c-8" },
        { id: "sp-9", class: "c-9" }
    ]);
    const [selectedColor, setSelectedColor] = useState([]);
      const handleSubmit = () => {
        const formData = new FormData();
        files.forEach(file => formData.append('images[]', file));
        // Send formData via fetch / axios etc.
      };
      
    return(
        <>
         <form id="productform" class="productform">
            <div class="box">
                <label>Product Title</label>
                <input type="text" name="title" placeholder="Peter England Yellow Stripe"></input>
                <label>Product Slug</label>
                <input type="text" name="slug" placeholder="Peter England Yellow Stripe"></input>
                <div class="form-group">
                <label>Product Category</label>
                <select name="title">
                    <option>cat1</option>
                    <option>cat2</option>
                    <option>cat3</option>
                </select>
                </div>
                <label>Sizes</label>
                <div class="form-group">
                <select onChange={handleSizeChange}>
                    <option value="">Select Size</option>
                    {sizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                </div>
                {selectedSizes.map((item, index) => (
                  <>
                  
                    <div key={index} className="size-inputs">
                        <span>{item.size}</span>
                        <img class="size-remove" alt="remove" onClick={(e) => removeSize(index)} width="20" height="20" src="https://img.icons8.com/ios/50/close-window--v1.png" />
                        <input type="number" placeholder="Price" value={item.price}
                            onChange={(e) => handleSizeInputChange(index, 'price', e.target.value)} />
                        <input type="number" placeholder="Stock" value={item.stock}
                            onChange={(e) => handleSizeInputChange(index, 'stock', e.target.value)} />
                            
                    </div>
                    </>
                ))}


                <label>Colors</label>
                <div class="shop__sidebar__color">
                  {colorOptions.map((item , index)=>(
                    <>
                    
                    <label class={item.class} for={item.id} >
                    <span className="checkmark">✓</span>
                    <input type="radio" id={item.id} />
                    </label>
                    </>
                  ))}
                       
                       
                </div>
            </div>
            <div class="box">
                <label>Product Featured Image</label>
                <input type="file" name="feat_image"></input>
                <div className="image-upload-box">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="image-preview" >
        {images.length > 0 ? (
          images.map((imgSrc, index) => (
            <div className="gall-image" key={index}>
              <img
                src={imgSrc}
                width="100"
                height="80"
                className="gall-image-uploaded"
                alt={`preview-${index}`}
              />
              <img
                className="gall-image-remove"
                src="https://img.icons8.com/ios/50/close-window--v1.png"
                alt="remove"
                width="20"
                height="20"
                onClick={(e) => {
                  e.stopPropagation(); // prevent input click
                  handleRemoveImage(index);
                }}
              />
            </div>
          ))
        ) : (
          <img onClick={() => fileInputRef.current.click()}
            width="64"
            height="64"
            src="https://img.icons8.com/dusk/64/gallery.png"
            alt="gallery"
          />
        )}
      </div>
    </div>
            </div>
         </form>

        </>
       
    );
}
export default CreateProduct;