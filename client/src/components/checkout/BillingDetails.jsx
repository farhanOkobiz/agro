
const BillingDetails = ({ billingDetails, handleChange, errors }) => {

  return (
    <form className="w-full mx-auto p-4">
      <h2 className="text-base font-medium mb-2 text-gray-600">Billing Details</h2>
      <div className="border mb-4"></div>

        <div className="w-full mb-4 relative">
          <label className="block text-gray-700 mb-2 text-sm">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={billingDetails.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
            placeholder="First name"
            // disabled
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        

      <div className="mb-4 w-full relative">
        <label className="block text-gray-700 mb-2 text-sm">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={billingDetails.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="Email address"
          // disabled
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4 w-full relative">
        <label className="block text-gray-700 mb-2 text-sm">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="phone"
          value={billingDetails.phone}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="Phone"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm">District *</label>
        <input
          type="text"
          name="district"
          value={billingDetails.district}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="District"
        />
        {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm">Upazilla *</label>
        <input
          type="text"
          name="upazilla"
          value={billingDetails.upazilla}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="Upazilla"
        />
        {errors.upazilla && <p className="text-red-500 text-sm">{errors.upazilla}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm">Area *</label>
        <input
          type="text"
          name="area"
          value={billingDetails.area}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="Area"
        />
        {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm">Post Code *</label>
        <input
          type="text"
          name="postCode"
          value={billingDetails.postCode}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="Post Code"
        />
        {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm">Street Address *</label>
        <input
          type="text"
          name="streetAddress"
          value={billingDetails.streetAddress}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
          placeholder="House number and street name"
        />
        {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress}</p>}
      </div>
      <div className="border border-b-0 mb-4 "></div>
        <div className="mb-2">
          <label className="block text-gray-700 mb-2 text-sm">
            Order notes (optional) (optional)
          </label>
          <textarea
            type="text"
            value={billingDetails.notes}
            onChange={handleChange}
            className="w-full h-32 p-3 rounded bg-slate-100 outline-none text-sm"
            placeholder="Company name"
          />
        </div>
    </form>
  );
};

export default BillingDetails;

