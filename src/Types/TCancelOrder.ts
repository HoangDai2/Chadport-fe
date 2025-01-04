export type AccountInfo = {
  account_number: string;
  bank_name: string;
  account_holder: string;
};

export type Note = {
  reason: string;
  account_info: AccountInfo;
};

type RefundRequest = {
  order_id: number;
  note: Note;
  check_refund: number; // 0: Chờ xử lý, 1: Đã hoàn tiền
};

export default RefundRequest;
