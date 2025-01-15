import * as Yup from "yup";

const ValidationVoucher = Yup.object({
    code: Yup.string()
        .required('Mã giảm giá không được để trống.')
        .max(50, 'Mã giảm giá không được vượt quá 50 ký tự.'),
    discount_type: Yup.string()
        .required('Vui lòng chọn kiểu giảm giá.')
        .oneOf(['fixed', 'percentage'], 'Kiểu giảm giá không hợp lệ.'),
    discount_value: Yup.number()
        .required('Vui lòng nhập giá trị giảm giá.')
        .min(1, 'Giá trị giảm giá phải lớn hơn 0.')
        .test(
            'max-percentage',
            'Giá trị giảm giá không được vượt quá 100% cho kiểu phần trăm.',
            function (value) {
                return !(this.parent.discount_type === 'percentage' && value > 100);
            }
        ),
    expires_at: Yup.date()
        .required('Vui lòng chọn ngày kết thúc.')
        .min(new Date(), 'Ngày kết thúc phải lớn hơn hoặc bằng ngày hôm nay.'),
    usage_limit: Yup.number()
        .required('Vui lòng nhập số lượng mã.')
        .integer('Số lượng mã phải là số nguyên.')
        .min(1, 'Số lượng mã phải lớn hơn hoặc bằng 1.'),
});

export default ValidationVoucher;