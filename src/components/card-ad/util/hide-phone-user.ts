import { findPhoneNumbersInText } from "libphonenumber-js";
import { AsYouType } from "libphonenumber-js/max";


export const hidePhoneUser = (phone: string ) => {
  const clearPhone = phone.replace(/[-()\s]/g,"");


  const infoNumber =   findPhoneNumbersInText(clearPhone.startsWith("8")
    ? `+7${clearPhone.slice(1)}`
    : (clearPhone.startsWith("+1")
      ? `1${clearPhone.slice(2)}`
      : clearPhone));

  if(!infoNumber.length) {
    return;
  }

  const maskPhone = new AsYouType(infoNumber[0].number.country);
  const showPhone = maskPhone.input(infoNumber[0].number.number);

  return {
    hidePhone: maskPhone.getTemplate(),
    showPhone,
  };
};
