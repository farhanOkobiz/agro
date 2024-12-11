import { useEffect, useState } from "react";
import BillingDetails from "../components/checkout/BillingDetails";
import OrderDetails from "../components/checkout/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import api from "../components/axios/Axios";
import { Link, useNavigate } from "react-router-dom";
import { resetAgroCart } from "../redux/slices/cart/agroCartSlice";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAgree, setIsAgree] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    upazilla: "",
    area: "",
    postCode: "",
    streetAddress: "",
  });
  const [bankDetails, setBankDetails] = useState({
    bank: "",
    method: "",
    accountName: "",
    accountNumber: "",
    dateOfPayment: "",
    chequeSubmissionDate: "",
    bankReference: "",
    photo: "",
    promo: "",
  })
  const [errors, setErrors] = useState({});
  const [bankErrors, setBankErrors] = useState({});
  const [openIndex, setOpenIndex] = useState(null);  // For payment method accordion
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");  // Track selected payment method
  const agroCartProduct = useSelector((state) => state.agroCart);

  const userData = JSON.parse(localStorage.getItem('user'));
  console.log("userData", userData);
  console.log("userData?.token", userData?.token);


  const userDetailsHandler = async () => {
    try {
      const userDetails = await api.get('/users/getMe', {
        'headers': {
          'Authorization': `Bearer ${userData?.token}`,
        },
      })
      console.log("userDetails", userDetails?.data?.data?.doc);
      const data = userDetails?.data?.data?.doc
      setBillingDetails({
        name: data?.name,
        email: data?.email,
        phone: data?.phone?.replace(/^(\+88)/, ''),
      })
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    userDetailsHandler();
  }, [])

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    // Map openIndex to payment method names
    const paymentMethods = ["bank_transfer", "check_payment", "cash_on_delivery"];
    setSelectedPaymentMethod(paymentMethods[index]);
  };

  const handleChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBank = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      setBankDetails({
        ...bankDetails,
        [name]: files[0], 
      });
    } else {
      setBankDetails({
        ...bankDetails,
        [name]: value,  
      });
    }
  };



  const validateForm = () => {
    const newErrors = {};

    if (!billingDetails.name) newErrors.name = "Name is required";
    if (!billingDetails.email) newErrors.email = "Email is required";
    if (!billingDetails.phone) newErrors.phone = "Phone is required";
    if (!billingDetails.district) newErrors.district = "District is required";
    if (!billingDetails.upazilla) newErrors.upazilla = "Upazilla is required";
    if (!billingDetails.area) newErrors.area = "Area is required";
    if (!billingDetails.postCode) newErrors.postCode = "Post Code is required";
    if (!billingDetails.streetAddress) newErrors.streetAddress = "Street Address is required";
    if (!selectedPaymentMethod) newErrors.selectedPaymentMethod = "Payment Method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validatePayment = () => {
    const newErrors = {};
    console.log("photo =====", bankDetails.photo)
    console.log("photo =====", !bankDetails.photo)
    if (!bankDetails.bank) newErrors.bank = "Bank name is required";
    if (!bankDetails.method) newErrors.method = "Method is required";
    if (!bankDetails.accountName) newErrors.accountName = "Account name is required";
    if (!bankDetails.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!bankDetails.dateOfPayment) newErrors.dateOfPayment = "Date of payment is required";
    if (!bankDetails.bankReference) newErrors.bankReference = "Bank reference is required";
    if (!bankDetails.photo) newErrors.photo = "Photo is required";
    if (bankDetails.method === "CHEQUE DEPOSIT" && !bankDetails.chequeSubmissionDate) {
      newErrors.chequeSubmissionDate = "Cheque submission date is required";
    }
    setBankErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const prepareProductData = () => {
    return agroCartProduct?.map((product) => ({
      product: product._id,
      quantity: product.quantity,
    }));
  };
  const calculateSubtotal = () => {
    return agroCartProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  };
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (selectedPaymentMethod == "cash_on_delivery") {
      const orderData = {
        name: billingDetails?.name,
        email: billingDetails?.email,
        phone: billingDetails?.phone,
        district: billingDetails?.district,
        upazilla: billingDetails?.upazilla,
        area: billingDetails?.area,
        postCode: billingDetails?.postCode,
        streetAddress: billingDetails?.streetAddress,
        shippingCost: await calculateSubtotal(),
        notes: billingDetails?.notes,
        products: await prepareProductData(),
      };
      try {
        const response = await api.post('orders', orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == "201") {
          dispatch(resetAgroCart());
          navigate("/thank-you");
        } else {
          console.error("Error placing order:", response);
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else if (selectedPaymentMethod == "bank_transfer") {
      if (!validatePayment()) return;

      const formData = new FormData();

      // Append billing details
      formData.append("name", billingDetails?.name);
      formData.append("email", billingDetails?.email);
      formData.append("phone", billingDetails?.phone);
      formData.append("district", billingDetails?.district);
      formData.append("upazilla", billingDetails?.upazilla);
      formData.append("area", billingDetails?.area);
      formData.append("postCode", billingDetails?.postCode);
      formData.append("streetAddress", billingDetails?.streetAddress);
      const shippingCost = await calculateSubtotal();
      formData.append("shippingCost", shippingCost);
      formData.append("notes", billingDetails?.notes);
      formData.append("bankDetails[bank]", bankDetails?.bank);
      formData.append("bankDetails[method]", bankDetails?.method);
      formData.append("bankDetails[accountName]", bankDetails?.accountName);
      formData.append("bankDetails[accountNumber]", bankDetails?.accountNumber);
      formData.append("bankDetails[dateOfPayment]", bankDetails?.dateOfPayment);
      formData.append("bankDetails[chequeSubmissionDate]", bankDetails?.chequeSubmissionDate);
      formData.append("bankDetails[bankReference]", bankDetails?.bankReference);
      formData.append("bankDetails[promo]", bankDetails?.promo);

      const products = prepareProductData();
      products.forEach((product, index) => {
        formData.append(`products[${index}][product]`, product.product); 
        formData.append(`products[${index}][quantity]`, product.quantity); 
      });
      if (bankDetails?.photo) {
        formData.append("photo", bankDetails.photo); 
      }

      console.log("order order====", formData);

      try {
        const response = await api.post('/orders', formData, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`,
           },
        });
        console.log("Response:", response.data);
        if (response?.data?.status == "success") {
          console.log("Order placed successfully:", response);
          dispatch(resetAgroCart());
          navigate("/thank-you");
        } else {

          console.error("Error placing order:", response);
        }
      } catch (error) {
        console.error("Error while placing order:", error);
      }

    }

  };

  return (
    <div className="font-robo">
      <div className="h-[89.4px] bg-primary mb-10"></div>
      <div className="flex flex-col md:flex-row w-full gap-4 text-gray-600 px-2 md:px-20 mt-20">
        <div className="w-full md:w-2/3 border rounded-xl">
          <BillingDetails
            billingDetails={billingDetails}
            handleChange={handleChange}
            errors={errors}
          />
        </div>
        <div className="w-full md:w-1/3 relative ">
          <div className="sticky top-10">
            <OrderDetails
              isAgree={isAgree}
              setIsAgree={setIsAgree}
              openIndex={openIndex}
              handleToggle={handleToggle}
              bankDetails={bankDetails}
              handleChangeBank={handleChangeBank}
              errors={errors}
              bankErrors={bankErrors}
            />
            {/* <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white py-3 mt-4 rounded-lg"
          >
            Place Order
          </button> */}
            <button
              className={`${isAgree ? "bg-red-500 text-white block" : "bg-gray-300 text-gray-800 block"
                } w-full p-2 rounded mt-3`}
              disabled={!isAgree}
              onClick={handlePlaceOrder} // Place order logic
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <div className="pl-20 mb-20 flex justify-between">
        <Link to="/shoping-cart">
          <button className="mt-4 px-12 py-2 bg-gray-500 hover:bg-white text-white border hover:text-gray-500 hover:border hover:border-gray-500 rounded-lg font-bold">
            Back To Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOut;
