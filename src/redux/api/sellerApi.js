import { toast } from "react-toastify";
import supabase from "../../supabaseClient";

export const fetchSingleSellerapi = async(seller_id) =>{
  try {
    const { data, error } = await supabase
      .from("sellers")
      .select("seller_name, seller_contact")
      .eq("id", seller_id)
    if (!error) {
      console.log("Fetched data successfully", data);
    } else {
      console.log("Error to fetching seller data", error);
    }
    return data;
  } catch (error) {
    console.log("Error to fetching seller", error);
  }
}

export const fetchSellerApi = async () => {
  try {
    const { data, error } = await supabase
      .from("sellers")
      .select(`*`)
      .order("seller_name", {ascending:true});
    if (!error) {
      console.log("Fetched data successfully", data);
    } else {
      console.log("Error to fetching seller data", error);
    }
    return data;
  } catch (error) {
    console.log("Error to fetching seller", error);
  }
};

export const checkExistingSeller = async(phone) =>{
  try {
    const {data, error} = await supabase
    .from("sellers")
    .select("seller_contact")
    .eq("seller_contact", phone)

    if (error) throw error;

    return data;
  } catch (error) {
    console.log("Error to checkin existing seller", error);
  }
}

const uploadSellerPhoto = async (id, sellerPhoto) => {
  try {
    const filePath = `profile_pics/${id}`;

    const { error } = await supabase.storage
      .from("sellers")
      .upload(filePath, sellerPhoto, { upsert: true });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }else{
      toast.success("Profile Pic Uploaded Successfully")
    }

    const { data } = await supabase.storage
      .from("sellers")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return null;
  }
};

const uploadAadhaar = async(id, aadhaarPhoto) =>{
  try {
    const uploadUrls = await Promise.all(
      aadhaarPhoto.map(async(file, index)=> {
        if (!file || !file.name) {
          console.error("Invalid file detected:", file);
          return null;
        }

        let fileLabel = ""
        if (index === 0) {
          fileLabel = `${id}_Front_Side`
        } else if (index === 1){
          fileLabel = `${id}_Back_Side`
        }else{
          fileLabel = `other_${id}`
        }
        const fileName = fileLabel
        const filePath = `aadhaar_documents/${fileName}`

        const {error} = await supabase.storage
        .from("sellers")
        .upload(filePath, file , { upsert: true })

        if (error) {
          console.error("Error uploading image", error)
          return null
        }else{
          toast.success("Addhar Uploaded Successfully")
        }
        return supabase.storage.from("sellers").getPublicUrl(filePath).data.publicUrl
      })
    )
    return uploadUrls.filter((url)=> url !== null)

  } catch (error) {
    console.error("Unexpected error uploading Aadhaar:", error);
    return null;
  }
}

const uploadStoreDocument = async (id, storeDocument) => {
  try {
    const filePath = `store_documents/${id}`;
    console.log(storeDocument);
    

    const { error } = await supabase.storage
      .from("sellers")
      .upload(filePath, storeDocument,  { upsert: true });

    if (error) {
      console.error("Error uploading store Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("sellers")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading store documents:", error);
  }
};

const uploadBankDocument = async (id, bankDocument) => {
  try {
    const filePath = `bank_documents/${id}`;
    console.log(bankDocument);
    

    const { error } = await supabase.storage
      .from("sellers")
      .upload(filePath, bankDocument,  { upsert: true });

    if (error) {
      console.error("Error uploading bank Documents:", error);
      return null;
    }

    const { data } = await supabase.storage
      .from("sellers")
      .getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Unexpected error uploading Bank documents:", error);
  }
};

// Step 3: Save seller details

export const sellerRegisterApi = async ({
  sellerInfo,
  storeInfo,
  bankInfo,
}) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    const id = user.id;
    // console.log(user);

    // Optional: upload files first to Supabase Storage and get their URLs
    const sellerPhoto = sellerInfo.profile_pic;
    const aadhaarPhoto = sellerInfo.aadhaar_urls
    console.log(aadhaarPhoto);
    
    const storeDocument = storeInfo.address_document;
    const bankDocument = bankInfo.bank_document;

    const profilePicUrl = await uploadSellerPhoto(id, sellerPhoto);
    console.log(profilePicUrl);
    const aadhaarUrls = await uploadAadhaar(id, aadhaarPhoto)
    console.log(aadhaarUrls);
    const storeDocumentUrl = await uploadStoreDocument(id, storeDocument);
    console.log(storeDocumentUrl);
    const bankDocumentUrl = await uploadBankDocument(id, bankDocument);
    console.log(bankDocumentUrl);

    // Upload files if needed, e.g.:
    // const photoUpload = await supabase.storage.from('profile-pics').upload(`seller_${user_id}`, sellerPhoto)

    const { data, error } = await supabase
      .from("sellers")
      .insert([
        { 
          id,
          seller_name: sellerInfo.seller_name,
          seller_email: sellerInfo.seller_email,
          seller_contact: sellerInfo.seller_contact,
          seller_address: sellerInfo.seller_address,
          seller_city: sellerInfo.seller_city,
          seller_district: sellerInfo.seller_district,
          seller_state: sellerInfo.seller_state,
          seller_postal_code: sellerInfo.seller_postal_code,
          profile_urls: profilePicUrl,
          aadhaar_number: sellerInfo.aadhaar_no,
          aadhaar_urls: aadhaarUrls,
          store_name: storeInfo.store_name,
          segment: storeInfo.sagment,
          business_pan_number: storeInfo.business_pan_number,
          gst_type: storeInfo.gst_type,
          gst_number: storeInfo.gst_number,
          address_line_1: storeInfo.address_line_1,
          store_landmark: storeInfo.store_landmark,
          store_city: storeInfo.store_city,
          store_district: storeInfo.store_district,
          store_state: storeInfo.store_state,
          address_doc_url: storeDocumentUrl,
          store_address_url: storeInfo.store_address_url,
          latitude: storeInfo.store_latitude,
          longitude: storeInfo.store_longitude,
          store_postal_code: storeInfo.store_postal_code,
          bank_name: bankInfo.bank_name,
          account_number: bankInfo.account_number,
          bank_ifsc_code: bankInfo.bank_ifsc_code,
          bank_account_name: bankInfo.bank_account_name,
          bank_doc_url: bankDocumentUrl,
        },
      ])
      .single();

    if (error) {
      console.error("Error to register seller", error);
      return
    } else{
      toast.success("Seller Register successfully")
    };

    return data;
  } catch (error) {
    console.error("Error registering seller:", error);
    throw error;
  }
};


export const sellerUpdateApi = async(updateData) =>{
  try {
    console.log(updateData);
    const sellerId = updateData.id;
    const bank_doc_file = await uploadBankDocument(sellerId, updateData.bank_doc_url);
    const store_address_file = await uploadStoreDocument(sellerId, updateData.store_address_url)
    console.log("seller id",sellerId);
    console.log("bank doc file",bank_doc_file);
    console.log("store address doc file",store_address_file);

    const sellerData = {
      segment: updateData.segment,
      address_line_1: updateData.store_address_line,
      store_city: updateData.store_city,
      store_district: updateData.store_district,
      store_landmark: updateData.store_landmark,
      store_state: updateData.store_state,
      store_postal_code: updateData.store_postal_code,
      address_doc_url: store_address_file,
      bank_name: updateData.bank_name,
      bank_ifsc_code: updateData.ifsc_code,
      bank_doc_url: bank_doc_file
    }

    const {data, error} = await supabase
    .from("sellers")
    .update(sellerData)
    .eq("id", updateData.id)
    .single()
    
    if (error) {
      console.log("Error to update seller information");
      toast.error("Error to update seller information")
      return
    } else {
      console.log("Seller information updated Successfully",data);
      toast.success("Seller information updated Successfully");
    }
    
  } catch (error) {
    console.error("Error registering seller:", error);
    throw error;
  }
}

export  const fetchSellerSectionWiseApi = async(section) =>{
  try {
    if (!section) {
     toast.warning("Please select the section")        
    }     
    const { data, error } = await supabase.from("sellers").select("id, seller_name").eq("segment", section)
    if (!data) {
      toast.error("There is not any seller in this section");
    }
    if (error) {
      console.log("Error to fetching seller data ");
    }
    return data 
  } catch (error) {
    console.log("error from supabase", error);
  }
}