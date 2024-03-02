import { styles } from "../../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useCreateDealerMutation } from "@/redux/features/user/userApi";
// import { Result } from "postcss";
import toast from "react-hot-toast";
type Props = {};

const CreateDealer = (props: Props) => {
  //   const [active, setActive] = useState(0);
  const [dealerInfo, setDealerInfo] = useState({
    dealerName: "",
    aliseName: "",
    starRating: 0,
    role: "",
    salesmanName: "",
    designerName: "",
    address: "",
    pincode: 0,
    state: "",
    district: "",
    city: "",
    gstNo: "",
    panNo: "",
    email: "",
    phoneNo: ["", "", "", ""],
    thumbnail: "",
  });
  const [createDealer, { isSuccess, error }] = useCreateDealerMutation();

  const handlePincodeChange = async (e: any) => {
    const pincode = e.target.value;

    // Make an API call to fetch details based on pincode
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/get-pincode-details?pincode=${pincode}`
      );
      const data = response.data;

      if (response.status === 200 && data.success) {
        setDealerInfo({
          ...dealerInfo,
          pincode: pincode,
          state: data.data.state,
          district: data.data.district,
          city: data.data.city,
        });
      } else {
        // Handle error response from the server
        console.error(data.message);
      }
    } catch (error: any) {
      console.error("Error fetching pincode details:", error.message);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createDealer(dealerInfo);
    console.log(dealerInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Dealer Created Successfully!!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className="w-[80%] m-auto mt-24">
      {" "}
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div className="w-[45%]">
          <label htmlFor="" className={`${styles.label}`}>
            Dealer Name
          </label>
          <input
            type="dealerName"
            name=""
            required
            value={dealerInfo.dealerName}
            onChange={(e: any) =>
              setDealerInfo({ ...dealerInfo, dealerName: e.target.value })
            }
            id="dealerName"
            placeholder="John Doe"
            className={`
          ${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5 w-[45%]">
          <label htmlFor="" className={`${styles.label}`}>
            Alise Name
          </label>
          <input
            type="aliseName"
            name=""
            required
            value={dealerInfo.aliseName}
            onChange={(e: any) =>
              setDealerInfo({ ...dealerInfo, aliseName: e.target.value })
            }
            id="aliseName"
            placeholder="ABC Corporation"
            className={`
          ${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Star Rating
            </label>
            <input
              type="number"
              name="starRating"
              required
              value={dealerInfo.starRating}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, starRating: e.target.value })
              }
              id="starRating"
              placeholder="5"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Role(Customer Type)
            </label>
            <input
              type="text"
              required
              name="role"
              value={dealerInfo.role}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, role: e.target.value })
              }
              id="role"
              placeholder="dealer/ user"
              className={`
            ${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-[45%]">
          <label className={`${styles.label}`} htmlFor="email">
            Salesman Name
          </label>
          <input
            type="text"
            required
            name="salesmanName"
            value={dealerInfo.salesmanName}
            onChange={(e: any) =>
              setDealerInfo({ ...dealerInfo, salesmanName: e.target.value })
            }
            id="salesmanName"
            placeholder="Salesman XYZ"
            className={`
            ${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full justify-between">
          <div className="w-[45%] ">
            <label htmlFor="" className={`${styles.label}`}>
              Designer Name
            </label>
            <input
              type="text"
              name="designerName"
              required
              value={dealerInfo.designerName}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, designerName: e.target.value })
              }
              id="designerName"
              placeholder="Designer ABC"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              address
            </label>
            <textarea
              rows={3}
              cols={10}
              name="address"
              required
              value={dealerInfo.address}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, address: e.target.value })
              }
              id="address"
              placeholder="123 Main Street"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Pincode
            </label>
            <input
              type="number"
              name="pincode"
              required
              onChange={handlePincodeChange}
              id="pincode"
              placeholder="111001"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              State
            </label>
            <input
              type="text"
              name="state"
              required
              value={dealerInfo.state}
              readOnly
              id="state"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              District
            </label>
            <input
              type="text"
              name="district"
              required
              value={dealerInfo.district}
              readOnly
              id="district"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={dealerInfo.city}
              readOnly
              id="city"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="" className={`${styles.label}`}>
              GST NO
            </label>
            <input
              type="text"
              name="gstNo"
              required
              value={dealerInfo.gstNo}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, gstNo: e.target.value })
              }
              id="gstNo"
              placeholder="GST123456789"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="" className={`${styles.label}`}>
              PAN NO
            </label>
            <input
              type="text"
              name="panNo"
              required
              value={dealerInfo.panNo}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, panNo: e.target.value })
              }
              id="panNo"
              placeholder="PANABC1234"
              className={`
            ${styles.input}`}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="email" className={`${styles.label}`}>
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              value={dealerInfo.email}
              onChange={(e: any) =>
                setDealerInfo({ ...dealerInfo, email: e.target.value })
              }
              id="email"
              placeholder="loginmail@gmail.com"
              className={` ${styles.input}`}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="phoneNo" className={`${styles.label}`}>
              Enter Your Phone Nos (up to 4)
            </label>
            {dealerInfo.phoneNo.map((phone, index) => (
              <input
                key={index}
                type="text"
                name={`phoneNo[${index}]`}
                value={phone}
                onChange={(e: any) => {
                  const updatedPhoneNos = [...dealerInfo.phoneNo];
                  updatedPhoneNos[index] = e.target.value;
                  setDealerInfo({
                    ...dealerInfo,
                    phoneNo: updatedPhoneNos,
                  });
                }}
                placeholder={`Phone No ${index + 1}`}
                className={` ${styles.input}`}
              />
            ))}
          </div>
        </div>
        <br />

        <br />
        <div className="w-full flex items-center justify-start">
          <input
            type="submit"
            value="Submit"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CreateDealer;
