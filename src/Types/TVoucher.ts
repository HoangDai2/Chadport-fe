export type Voucher = {
  id: number; // bigint(20)
  code: string; // varchar(255)
  discount_type: "percentage" | "fixed"; // enum('percentage', 'fixed')
  discount_value: number; // decimal(10,2)
  expires_at: string; // datetime (ISO 8601 format: YYYY-MM-DDTHH:mm:ss)
  usage_limit: number; // int(11)
  used_count: number; // int(11)
  created_at: string; // timestamp (ISO 8601 format)
  updated_at: string; // timestamp (ISO 8601 format)
};
