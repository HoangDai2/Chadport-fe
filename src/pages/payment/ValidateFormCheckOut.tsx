
export interface Errors {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
}

// Validation function
export const validateForm = (
  formData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
  },
  setErrors: (errors: Errors) => void
): boolean => {
  const newErrors: Errors = {};

  if (!formData.first_name.trim()) {
    newErrors.first_name = "First name is required.";
  }
  if (!formData.last_name.trim()) {
    newErrors.last_name = "Last name is required.";
  }
  if (!formData.phone_number.trim()) {
    newErrors.phone_number = "Phone number is required.";
  } else if (!/^\d+$/.test(formData.phone_number.trim())) {
    newErrors.phone_number = "Phone number must contain only numbers.";
  }
  if (!formData.address.trim()) {
    newErrors.address = "Address is required.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

