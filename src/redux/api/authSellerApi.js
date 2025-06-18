// import supabase from "../../supabaseClient"

// const sellerRegisterWithOtp = async(phone) =>{
//     const { data, error } = await supabase.auth.signInWithOtp({
//         phone: phone,
//       })
// }

// const sellerVerifyOtp = async() =>{
//     const {
//         data: { session },
//         error,
//       } = await supabase.auth.verifyOtp({
//         phone: '13334445555',
//         token: '123456',
//         type: 'sms',
//       })
// }

// const updateSellerContact = async() =>{
//     const { data, error } = await supabase.auth.updateUser({
//         phone: '123456789',
//       })
// }