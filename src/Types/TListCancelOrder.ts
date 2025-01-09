export interface CancelOrders {
  oder_number: string;
  created_at: string;
  payment_method: string;
  status: string;
  total_money: number;
  check_refund: 0;
  user: {
    firt_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
  };
  order_details: {
    product_item: {
      product: {
        name: string;
        image_product: string;
      };
      color: {
        name: string;
        hex: string;
      };
      size: {
        name: string;
      };
    };
    quantity: number;
    price: string;
  }[];
  note_user: {
    reason: string;
    account_info: {
      account_number: string;
      bank_name: string;
      account_holder: string;
      file_note: string;
      extra_file: string;
    };
  };
}
