import { useState } from "react";
import CheckoutAccordion from "./CheckoutAccordion";
import { TbCurrencyTaka } from "react-icons/tb";
import { useSelector } from "react-redux";

const OrderDetails = ({ isAgree, setIsAgree, handleToggle, openIndex, bankDetails, handleChangeBank, errors, bankErrors }) => {
  const agroCartProduct = useSelector((state) => state.agroCart);

  const calculateSubtotal = () => {
    return agroCartProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };

  // Define the options for the dropdowns
  const bankOptions = [
    { value: "", label: "Select a Bank" },
    { value: "Bank Asia", label: "Bank Asia" },
    { value: "City Bank", label: "City Bank" }
  ];

  const paymentMethods = [
    { value: "TRANSFER", label: "TRANSFER" },
    { value: "BEFTN", label: "BEFTN" },
    { value: "NPSB", label: "NPSB" },
    { value: "RTGS", label: "RTGS" },
    { value: "CASH DEPOSIT", label: "CASH DEPOSIT" },
    { value: "CHEQUE DEPOSIT", label: "CHEQUE DEPOSIT" }
  ];

  return (
    <div className="w-full mx-auto px-4 py-12 border border-black rounded-xl top-0">
      <h2 className="text-base font-medium mb-2 text-gray-600">Your Order</h2>
      <div className="border mb-6"></div>
      <div className="mb-4">
        <div className="flex justify-between font-bold text-gray-600 mb-2">
          <span>Product</span>
          <span>Subtitle</span>
        </div>
        <div className="border border-b-0 mb-5"></div>
        {agroCartProduct.map((product, index) => (
          <div key={product._id} className="mb-3">
            <div className="flex justify-between mb-4">
              <span>
                {product.title} x <span className="font-bold">{product.quantity}</span>
              </span>
              <span>
                <TbCurrencyTaka className="inline font-bold text-lg m-0 p-0" />
                {product.price * product.quantity}
              </span>
            </div>

            {/* Divider between products */}
            {index < agroCartProduct.length - 1 && (
              <div className="border border-b-0 mb-2"></div>
            )}
          </div>
        ))}

        <div className="border border-b-0 mb-2"></div>
        <div className="flex justify-between font-bold mb-10">
          <span>Subtotal</span>
          <span>
            <TbCurrencyTaka className="inline font-bold text-lg m-0 p-0" />
            {calculateSubtotal()}
          </span>
        </div>
      </div>

      <div className="border border-b-0 mb-3"></div>

      <div className="flex justify-between font-bold mb-4">
        <span className="text-lg">Total</span>
        <span className="text-xl text-gray-900">
          <TbCurrencyTaka className="inline font-extrabold text-xl m-0 p-0" />
          {calculateSubtotal()}
        </span>
      </div>

      <div className="mb-4 mt-8">
        <h3 className="text-lg font-bold mb-2">Payment Methods</h3>
        <div className="border border-b-0 mb-4"></div>

        {/* Payment options */}
        <CheckoutAccordion
          title="Direct bank transfer"
          content="Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account."
          isOpen={openIndex === 0}
          isSelected={openIndex === 0}
          onToggle={() => handleToggle(0)}
          name="accordion"
        />
        {openIndex === 0 && (
          <>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <select
                name="bank"
                value={bankDetails.bank}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              >
                {bankOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {bankErrors.bank && <p className="text-red-500 text-sm">{bankErrors.bank}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Method <span className="text-red-500">*</span>
              </label>
              <select
                name="method"
                value={bankDetails.method}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              >
                {paymentMethods.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {bankErrors.method && <p className="text-red-500 text-sm">{bankErrors.method}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Acc Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountName"
                value={bankDetails.accountName}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Account Name"
              />
              {bankErrors.accountName && <p className="text-red-500 text-sm">{bankErrors.accountName}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Acc No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Account Number"
              />
              {bankErrors.accountNumber && <p className="text-red-500 text-sm">{bankErrors.accountNumber}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Date Of Payment <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfPayment"
                value={bankDetails.dateOfPayment}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Date of Payment"
              />
              {bankErrors.dateOfPayment && <p className="text-red-500 text-sm">{bankErrors.dateOfPayment}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Upload Pay Voucher <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
              />
              {bankErrors.photo && <p className="text-red-500 text-sm">{bankErrors.photo}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Bank Ref/Message <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bankReference"
                value={bankDetails.bankReference}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Bank Reference"
              />
              {bankErrors.bankReference && <p className="text-red-500 text-sm">{bankErrors.bankReference}</p>}
            </div>
            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Promo
              </label>
              <input
                type="text"
                name="promo"
                value={bankDetails.promo}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Promo"
              />
            </div>

            <div className="mb-4 w-full relative">
              <label className="block text-gray-700 mb-2 text-sm">
                Submission Date {bankDetails.method === "CHEQUE DEPOSIT" && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                name="chequeSubmissionDate"
                value={bankDetails.chequeSubmissionDate}
                onChange={handleChangeBank}
                className="w-full p-3 rounded bg-slate-100 outline-none text-sm"
                placeholder="Submission Date"
                required={bankDetails.method === "CHEQUE DEPOSIT"} // Add required attribute based on the method
              />
              {bankDetails.method === "CHEQUE DEPOSIT" && bankErrors.chequeSubmissionDate && (
                <p className="text-red-500 text-sm">{bankErrors.chequeSubmissionDate}</p>
              )}
            </div>

          </>
        )}

        <CheckoutAccordion
          title="Cash on delivery"
          content="Pay with cash upon delivery."
          isOpen={openIndex === 2}
          isSelected={openIndex === 2}
          onToggle={() => handleToggle(2)}
          name="accordion"
        />
        {errors.selectedPaymentMethod && <p className="text-red-500 text-sm">{errors.selectedPaymentMethod}</p>}
      </div>

      <div className="mb-6 text-sm">
        <p>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our{" "}
          <span className="text-rose-600 hover:underline cursor-pointer">
            privacy policy.
          </span>
        </p>
      </div>

      {/* Terms and Conditions Agreement */}
      <div className="mb-4 text-sm">
        <input
          type="checkbox"
          onClick={() => setIsAgree(!isAgree)}
          className="mr-2"
        />
        <span>
          I have read and agree to the website{" "}
          <span className="text-rose-600 hover:underline cursor-pointer">
            terms and conditions
          </span>
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
