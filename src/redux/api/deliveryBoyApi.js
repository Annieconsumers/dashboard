import { toast } from "react-toastify";
import supabase from "../../supabaseClient";

const checkExistingDeliveryBoy = async (phone) => {
  try {
    const { data, error } = await supabase
      .from("delivery_boys")
      .select("phone_number")
      .eq("phone_number", phone);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error to checking existing delivery boys", error);
  }
};

const uploadDeliveryBoyPhoto = async (
  id,
  section,
  seller_id,
  deliveryBoyPhoto
) => {
  try {
    const filepath = `${section}/${seller_id}/${id}/deliveryBoy_profile`;

    const { error } = await supabase.storage
      .from("delivery-boys")
      .upload(filepath, deliveryBoyPhoto, { upsert: true });

    if (error) {
      console.log("Error uploading image:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("delivery-boys")
      .getPublicUrl(filepath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
};

const uploadAadhar = async (id, section, seller_id, aadharPhoto) => {
  try {
    console.log(aadharPhoto);

    const uploadUrls = await Promise.all(
      aadharPhoto.map(async (file, index) => {
        if (!file || !file.name) {
          console.error("Invalid file detected:", file);
          return null;
        }

        let fileLabel = "";
        if (index === 0) {
          fileLabel = `AadharCardFront`;
        } else {
          fileLabel = `AadharCardBack`;
        }
        const fileName = fileLabel;
        const filePath = `${section}/${seller_id}/${id}/${fileName}`;

        const { error } = await supabase.storage
          .from("delivery-boys")
          .upload(filePath, file, { upsert: true });

        if (error) {
          console.error("Error uploading image", error);
          return null;
        } else {
          toast.success("Addhar Uploaded Successfully");
        }
        return supabase.storage.from("delivery-boys").getPublicUrl(filePath)
          .data.publicUrl;
      })
    );
    return uploadUrls.filter((url) => url !== null);
  } catch (error) {
    console.error("Unexpected error uploading Aadhar:", error);
    return null;
  }
};

const uploadPanCardPhoto = async (id, section, seller_id, panCardPhoto) => {
  try {
    const filePath = `${section}/${seller_id}/${id}/panCard`;

    const { error } = await supabase.storage
      .from("delivery-boys")
      .upload(filePath, panCardPhoto, { upsert: true });

    if (error) {
      console.error("Error uploading panCard Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("delivery-boys")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading panCard documents:", error);
  }
};

const uploadRcPhoto = async (id, section, seller_id, rcPhoto) => {
  try {
    const filePath = `${section}/${seller_id}/${id}/rcPhoto`;

    const { error } = await supabase.storage
      .from("delivery-boys")
      .upload(filePath, rcPhoto, { upsert: true });

    if (error) {
      console.error("Error uploading Rc Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("delivery-boys")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading Rc documents:", error);
  }
};

const uploadDrivingLicensePhoto = async (
  id,
  section,
  seller_id,
  drivingLicensePhoto
) => {
  try {
    const filePath = `${section}/${seller_id}/${id}/driving_License`;

    const { error } = await supabase.storage
      .from("delivery-boys")
      .upload(filePath, drivingLicensePhoto, { upsert: true });

    if (error) {
      console.error("Error uploading driving License Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("delivery-boys")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error(
      "Unexpected error uploading driving License documents:",
      error
    );
  }
};

const uploadPassBookPhoto = async (id, section, seller_id, passBookPhoto) => {
  try {
    const filePath = `${section}/${seller_id}/${id}/passBook_image`;

    const { error } = await supabase.storage
      .from("delivery-boys")
      .upload(filePath, passBookPhoto, { upsert: true });

    if (error) {
      console.error("Error uploading passBook Photo Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("delivery-boys")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error(
      "Unexpected error uploading passBook Photo documents:",
      error
    );
  }
};

const deliveryBoyRegisterApi = async ({ formData }) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    const section = formData.section;
    const id = user.id;
    const seller_id = formData.seller_id;
    const aadharPhoto = formData.aadhar_image;
    const rcPhoto = formData.rc_image;
    const panCardPhoto = formData.panCard_image;
    const drivingLicensePhoto = formData.driving_license_image;
    const passBookPhoto = formData.passbook_image;
    const deliveryBoyPhoto = formData.profile_image;
    const ProfilePicUrl = await uploadDeliveryBoyPhoto(
      id,
      section,
      seller_id,
      deliveryBoyPhoto
    );
    const AadharUrl = await uploadAadhar(id, section, seller_id, aadharPhoto);
    const RcUrl = await uploadRcPhoto(id, section, seller_id, rcPhoto);
    const panCardUrl = await uploadPanCardPhoto(
      id,
      section,
      seller_id,
      panCardPhoto
    );
    const drivingLicenseUrl = await uploadDrivingLicensePhoto(
      id,
      section,
      seller_id,
      drivingLicensePhoto
    );
    const passBookUrl = await uploadPassBookPhoto(
      id,
      section,
      seller_id,
      passBookPhoto
    );

    const { data, error } = await supabase
      .from("delivery_boys")
      .insert([
        {
          id,
          seller_id,
          full_name: formData.name,
          phone_number: formData.phone,
          email: formData.email,
          profile_image_url: ProfilePicUrl,
          vehicle_type: formData.vehicle_type,
          vehicle_number: formData.vehicle_no,
          aadhaar_number: formData.aadhar_no,
          aadhaar_image_url: AadharUrl,
          pan_number: formData.pan_no,
          pan_image_url: RcUrl,
          rc_number: formData.rc_no,
          rc_image_url: panCardUrl,
          driving_license_number: formData.driving_license_no,
          driving_license_image_url: drivingLicenseUrl,
          bank_name: formData.bank_name,
          bank_account_name: formData.bank_account_name,
          account_number: formData.account_no,
          ifsc_code: formData.bank_ifsc,
          bank_passbook_image_url: passBookUrl,
          section: section,
          is_verified: true,
          address: formData.address,
        },
      ])
      .single();
    if (error) {
      console.log("Error to delivery boy registration", error);
      toast.error("Error to deliveryboy registration");
    } else {
      toast.success("Delivery Boy Registered successfully");
    }
    return data;
  } catch (error) {
    console.error("Error registering seller:", error);
    throw error;
  }
};

const fetchVerifiedDeliveryBoyApi = async () => {
  try {
    const { data, error } = await supabase
      .from("delivery_boys")
      .select("*")
      .eq("is_verified", true);
    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};

const fetchActiveVerifiedDeliveryBoyApi = async () => {
  try {
    const { data, error } = await supabase
      .from("delivery_boys")
      .select("*")
      .eq("is_verified", true)
      .eq("is_active", true);
    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};

const fetchInactiveVerifiedDeliveryBoyApi = async () => {
  try {
    const { data, error } = await supabase
      .from("delivery_boys")
      .select("*")
      .eq("is_verified", true)
      .eq("is_active", false);
    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};

const fetchNotVerifiedDeliveryBoysApi = async () => {
  try {
    const { data, error } = await supabase
      .from("delivery_boys")
      .select("*")
      .eq("is_verified", false);
    if (!error) {
      console.log("fetch succefully", data);
    } else {
      console.log("error when fetching data", error);
    }
    return data;
  } catch (error) {
    console.log("error from supabase", error);
  }
};

const acceptDeliveryBoyApi = async (id) => {
  try {
    if (!id) return console.log("Id not provided");
    console.log(id);

    const { data, error } = await supabase
      .from("delivery_boys")
      .update({ is_verified: true, is_active: true })
      .eq("id", id);

    if (error) throw new Error(error);
    toast.success("Delivery boy accepted");
    return data;
  } catch (error) {
    console.log("Error to accept Delivery boy");
  }
};

const rejectDeliveryBoyApi = async (id) => {
  try {
    if (!id) return console.log("Id not provided");
    console.log(id);

    const { data, error } = await supabase
      .from("delivery_boys")
      .update({ is_verified: false })
      .eq("id", id);

    if (error) throw new Error(error);
    toast.success("Delivery boy accepted");
    return data;
  } catch (error) {
    console.log("Error to accept Delivery boy");
  }
};

const deleteImage = async ( oldUrl ) => {
  try {
    console.log(oldUrl);
    
    if (oldUrl) {
      const path = oldUrl.split("/sections/")[1];
      const { error } = await supabase.storage.from("sections").remove([path]);
      if (!error) {
        console.log("image deleted succesfully")
      } else{
        console.log("Error to delete image")        
      }
      return 
    } else {
      console.log("Provide valid url");
    }
  } catch (error) {
    console.log("Error to delete image", error);
    
  }
};

const deliveryBoyUpdateApi = async (formData) => {
  try {
    console.log(formData);
    const id = formData.id;
    console.log(id);

    const aadharPhoto = [
      formData.aadhaar_image_front,
      formData.aadhaar_image_back,
    ];
    console.log("Addhar images", aadharPhoto);

    const rcPhoto = formData.rc_image;
    const panCardPhoto = formData.panCard_image;
    const drivingLicensePhoto = formData.driving_license_image;
    const passBookPhoto = formData.passbook_image;
    const deliveryBoyPhoto = formData.profile_image;

    let updateData = {
      full_name: formData.name,
      phone_number: formData.contact,
      email: formData.email,
      address: formData.address,
      aadhaar_number: formData.aadhaar_number,
      pan_number: formData.pan_number,
      vehicle_type: formData.vehicle_type,
      vehicle_number: formData.vehicle_number,
      rc_number: formData.rc_number,
      driving_license_number: formData.driving_license_number,
      bank_name: formData.bank_name,
      bank_account_name: formData.bank_account_name,
      account_number: formData.account_number,
      ifsc_code: formData.ifsc_code,
    };

    if (deliveryBoyPhoto) {
      await deleteImage(formData.old_profile_pic);
      const ProfilePicUrl = await uploadDeliveryBoyPhoto(
        id,
        formData.section,
        formData.seller_id,
        deliveryBoyPhoto
      );
      updateData.profile_image_url = ProfilePicUrl;
    }

    if (aadharPhoto.some((item) => item !== null)) {
      const AadharUrl = await uploadAadhar(
        id,
        formData.section,
        formData.seller_id,
        aadharPhoto
      );
      updateData.aadhaar_image_url = AadharUrl;
    }

    if (rcPhoto) {
      await deleteImage(formData.old_rc);
      const RcUrl = await uploadRcPhoto(
        id,
        formData.section,
        formData.seller_id,
        rcPhoto
      );
      updateData.rc_image_url = RcUrl;
    }

    if (panCardPhoto) {
      await deleteImage(formData.old_panCard);
      const panCardUrl = await uploadPanCardPhoto(
        id,
        formData.section,
        formData.seller_id,
        panCardPhoto
      );
      updateData.pan_image_url = panCardUrl;
    }

    if (drivingLicensePhoto) {
      await deleteImage(formData.old_driving_license);
      const drivingLicenseUrl = await uploadDrivingLicensePhoto(
        id,
        formData.section,
        formData.seller_id,
        drivingLicensePhoto
      );
      updateData.driving_license_image_url = drivingLicenseUrl;
    }

    if (passBookPhoto) {
      await deleteImage(formData.old_passbook);
      const passBookUrl = await uploadPassBookPhoto(
        id,
        formData.section,
        formData.seller_id,
        passBookPhoto
      );
      updateData.bank_passbook_image_url = passBookUrl;
    }

    const { data, error } = await supabase
      .from("delivery_boys")
      .update(updateData)
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error to delivery boy updation", error);
      toast.error("Error to deliveryboy updation");
    } else {
      toast.success("Delivery Boy Updated successfully");
    }
    return data;
  } catch (error) {
    console.error("Error updating delivery boy:", error);
    throw error;
  }
};

export {
  checkExistingDeliveryBoy,
  deliveryBoyRegisterApi,
  fetchVerifiedDeliveryBoyApi,
  fetchNotVerifiedDeliveryBoysApi,
  fetchActiveVerifiedDeliveryBoyApi,
  fetchInactiveVerifiedDeliveryBoyApi,
  acceptDeliveryBoyApi,
  rejectDeliveryBoyApi,
  deliveryBoyUpdateApi,
};
