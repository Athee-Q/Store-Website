const AddressInput = ({ addressProps, setAddressProps, disabled = false }) => {
  const { phone, street, town, city, state, postalCode, country } =
    addressProps;
  // const {setPhone,setStreet,setTown,setCity,setstate,setPostalCode,setCountry} = setAddressProps;

  return (
    <>
      <label htmlFor="phone">Phone Number</label>
      <input
        disabled={disabled}
        type="tel"
        id="phone"
        name="phone"
        placeholder="Phone Number"
        value={phone || ''}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        // onChange={(e) => setPhone(e.target.value)}
      />

      <label htmlFor="street">Street Address</label>
      <input
        disabled={disabled}
        type="text"
        id="street"
        name="street"
        placeholder="Street Address"
        value={street || ''}
        onChange={(e) => setAddressProps("street", e.target.value)}
        // onChange={(e) => setStreet(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="town">Town/Village</label>
          <input
            disabled={disabled}
            type="text"
            id="town"
            name="town"
            placeholder="Town/village"
            value={town || ''}
            onChange={(e) => setAddressProps("town", e.target.value)}
            // onChange={(e) => setTown(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            disabled={disabled}
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={city || ''}
            onChange={(e) => setAddressProps("city", e.target.value)}
            // onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="state">State</label>
          <input
            disabled={disabled}
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={state || ''}
            onChange={(e) => setAddressProps("state", e.target.value)}
            // onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode || ''}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
            // onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>

      <label htmlFor="country">Country</label>
      <input
        disabled={disabled}
        type="text"
        id="country"
        name="country"
        placeholder="Country"
        value={country || ''}
        onChange={(e) => setAddressProps("country", e.target.value)}
        // onChange={(e) => setCountry(e.target.value)}
      />
    </>
  );
};

export default AddressInput;
