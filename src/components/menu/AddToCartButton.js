const AddToCartButton = ({ hasSizesOrExtras, onClick, price }) => {
  

  
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white rounded-full mt-4 px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add&nbsp;to&nbsp;cart (from&nbsp;₹{price})</span>
      ) : (
        <span>Add&nbsp;to&nbsp;cart&nbsp;₹{price}</span>
      )}
    </button> 
  );
};

export default AddToCartButton;
