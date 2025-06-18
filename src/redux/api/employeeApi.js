import { toast } from "react-toastify";
import supabase from "../../supabaseClient";

const checkExistingEmployee = async (phone) => {
  try {
    const { data, error } = await supabase
      .from("employees")
      .select("phone")
      .eq("phone", phone);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error to checking existing employees", error);
  }
};

const uploadEmployeePhoto = async (
  employee_id,
  section,
  seller_id,
  employeePhoto
) => {
  try {
    console.log(employeePhoto);
    console.log(employee_id);

    const filePath = `${section}/${seller_id}/${employee_id}/profile_pic`;

    const { error } = await supabase.storage
      .from("employees")
      .upload(filePath, employeePhoto, { upsert: true });
    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }
    const { data } = await supabase.storage
      .from("employees")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
};

const uploadAadhar = async (employee_id, section, seller_id, aadharPhoto) => {
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
        const filePath = `${section}/${seller_id}/${employee_id}/${fileName}`;

        const { error } = await supabase.storage
          .from("employees")
          .upload(filePath, file, { upsert: true });

        if (error) {
          console.error("Error uploading image", error);
          return null;
        } else {
          toast.success("Aadhar Uploaded Successfully");
        }
        return supabase.storage.from("employees").getPublicUrl(filePath).data
          .publicUrl;
      })
    );
    return uploadUrls.filter((url) => url !== null);
  } catch (error) {
    console.error("Unexpected error uploading Aadhar:", error);
    return null;
  }
};

const uploadPanCardPhoto = async (
  employee_id,
  section,
  seller_id,
  employeePanCard
) => {
  try {
    const filePath = `${section}/${seller_id}/${employee_id}/PanCard_image`;

    const { error } = await supabase.storage
      .from("employees")
      .upload(filePath, employeePanCard, { upsert: true });
    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }
    const { data } = await supabase.storage
      .from("employees")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
};

const uploadPassbookPhoto = async (
  employee_id,
  section,
  seller_id,
  employeePassBook
) => {
  try {
    const filePath = `${section}/${seller_id}/${employee_id}/Passbook`;

    const { error } = await supabase.storage
      .from("employees")
      .upload(filePath, employeePassBook, { upsert: true });
    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }
    const { data } = await supabase.storage
      .from("employees")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
};

const addEmployeeApi = async (formData) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    console.log(formData);
    
    const employee_id = user.id;
    const section = formData.section;
    const seller_id = formData.seller_id;
    const employeePhoto = formData.profile_image;
    console.log(employeePhoto);
    const aadharPhoto = formData.aadhar_image;
    console.log(aadharPhoto);
    const employeePanCard = formData.panCard_image;
    const employeePassBook = formData.passbook_image;
    console.log(employeePassBook);
    const ProfileImageUrl = await uploadEmployeePhoto(
      employee_id,
      section,
      seller_id,
      employeePhoto
    );
    const AadharImageUrl = await uploadAadhar(
      employee_id,
      section,
      seller_id,
      aadharPhoto
    );
    const PanCardUrl = await uploadPanCardPhoto(
      employee_id,
      section,
      seller_id,
      employeePanCard
    );
    const PassBookUrl = await uploadPassbookPhoto(
      employee_id,
      section,
      seller_id,
      employeePassBook
    );
    console.log(PassBookUrl);

    console.log("Profile Image URL:", ProfileImageUrl);

    const employee_data = {
      id: employee_id,
      name: formData.name,
      seller_id: seller_id,
      phone: formData.phone,
      email: formData.email,
      section: section,
      role: formData.designation,
      aadhaar_number: formData.aadhar_no,
      pan_number: formData.pan_no,
      bank_account_number: formData.account_no,
      ifsc_code: formData.bank_ifsc,
      account_holder_name: formData.bank_account_name,
      bank_name: formData.bank_name,
      passbook_image_url: PassBookUrl,
      profile_image_url: ProfileImageUrl,
      address: formData.address,
      date_of_birth: formData.dateOfBirth,
      pan_card_image_url: PanCardUrl,
      aadhaar_image_urls: AadharImageUrl,
    };

    const { data, error } = await supabase
      .from("employees")
      .insert([employee_data]);

    if (!error) {
      console.log("Post successful", data);
    } else {
      console.log("Error when posting data", error);
    }

    return data;
  } catch (error) {
    console.log("Data not posted", error);
  }
};

const fetchEmployeeApi = async () => {
  try {
    const { data, error } = await supabase
    .from("employees")
    .select('*')
    if (!error) {
      console.log("fetching data succesfully", data);
    } else {
      console.log("fetching data from supabse", error);
    }
    return data;
  } catch (error) {
    console.log("supabase error", error);
  }
};

const fetchEmployeeRequestsApi = async () => {
  try {
    const { data, error } = await supabase
    .from("employees")
    .select('*')
    .eq("is_verified", false)
    if (!error) {
      console.log("fetching data succesfully", data);
    } else {
      console.log("fetching data from supabse", error);
    }
    return data;
  } catch (error) {
    console.log("supabase error", error);
  }
};

const acceptEmployeeApi = async(id) =>{
  try {
    if (!id) return console.log("Id not provided");
    console.log(id);
    
    const { data, error } = await supabase
      .from("employees")
      .update({is_verified: true})
      .eq("id", id);

    if (error) throw new Error(error);
    toast.success("Employee verified")
    return data;
  } catch (error) {
    console.log("Error to accept Employee request");
  }
}



const deleteImage = async ( oldUrl ) => {
  try {
    console.log(oldUrl);
    
    if (oldUrl) {
      const path = oldUrl.split("/employees/")[1];
      const { error } = await supabase.storage.from("employees").remove([path]);
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

const employeeUpdateApi = async (formData) => {
  try {
    console.log(formData);
    const id = formData.id;
    console.log(id);

    const aadharPhoto = [
      formData.aadhaar_image_front,
      formData.aadhaar_image_back,
    ];
    console.log("Addhar images", aadharPhoto);
    const panCardPhoto = formData.panCard_image;
    const passBookPhoto = formData.passbook_image;
    const employeePhoto = formData.profile_image;

    let updateData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      date_of_birth:formData.dateOfBirth,
      aadhaar_number: formData.aadhaar_number,
      pan_number: formData.pan_no,
      role: formData.designation,
      bank_name: formData.bank_name,
      account_holder_name: formData.bank_account_name,
      bank_account_number: formData.account_no,
      ifsc_code: formData.bank_ifsc,
    };

    if (employeePhoto) {
      await deleteImage(formData.old_profile_image);
      const ProfilePicUrl = await uploadEmployeePhoto(
        id,
        formData.section,
        formData.seller_id,
        employeePhoto
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
      updateData.aadhaar_image_urls = AadharUrl;
    }

    if (panCardPhoto) {
      await deleteImage(formData.old_pan_card);
      const panCardUrl = await uploadPanCardPhoto(
        id,
        formData.section,
        formData.seller_id,
        panCardPhoto
      );
      updateData.pan_card_image_url = panCardUrl;
    }

    if (passBookPhoto) {
      await deleteImage(formData.old_passbook);
      const passBookUrl = await uploadPassbookPhoto(
        id,
        formData.section,
        formData.seller_id,
        passBookPhoto
      );
      updateData.passbook_image_url = passBookUrl;
    }

    const { data, error } = await supabase
      .from("employees")
      .update(updateData)
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error to employee updation", error);
      toast.error("Error to employee updation");
    } else {
      toast.success("employee Updated successfully");
    }
    return data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export { checkExistingEmployee, addEmployeeApi, fetchEmployeeApi, fetchEmployeeRequestsApi, acceptEmployeeApi, employeeUpdateApi };
