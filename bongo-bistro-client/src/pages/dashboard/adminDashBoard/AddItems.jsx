/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_imageHosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_api);

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  console.log(image_hosting_api);
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    console.log();
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res);
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosSecure.post("/api/bb/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Add a Items</h1>
      </div>
      <div className="w-10/12 mx-auto  p-10 rounded-lg bg-slate-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900 ">
                Peoduct Information
              </h2>

              <div className="mt-5 grid grid-cols-12 gap-y-3  gap-3">
                <div className="col-span-12">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Recipe Name
                  </label>
                  <input
                    required
                    {...register("name")}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Type
                  </label>
                  <select
                    required
                    {...register("category")}
                    placeholder="select category"
                    name="category"
                    id="category"
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 px-2"
                  >
                    <option value="salad">Salad</option>
                    <option value="pizza">Pizza</option>
                    <option value="soup">Soup</option>
                    <option value="dessert">Dessert</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    required
                    type="text"
                    name="price"
                    {...register("price")}
                    id="price"
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="recipe"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Recipe Details
                  </label>
                  <textarea
                    required
                    {...register("recipe")}
                    name="recipe"
                    id="recipe"
                    rows={5}
                    cols={5}
                    placeholder="Recipe Details"
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Image
                  </label>
                  <input
                    required
                    type="file"
                    {...register("image")}
                    name="image"
                    id="image"
                    className="block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <input
              type="submit"
              className="rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
