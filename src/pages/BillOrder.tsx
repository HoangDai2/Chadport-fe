import React from "react";

const BillOrder = () => {
  return (
    <>
      <div>
        <div id="page" className="hfeed page-wrapper">
          <div id="site-main" className="site-main ">
            <div id="main-content" className="main-content">
              <div id="primary" className="content-area">
                <div id="title" className="page-title ">
                  <div className="section-container">
                    <div className="content-title-heading">
                      <h1 className="text-title-heading">Bill</h1>
                    </div>
                    <div className="breadcrumbs">
                      <a href="index.php">Home</a>
                      <span className="delimiter" />
                      Bill
                    </div>
                  </div>
                </div>
                <div id="content" className="site-content" role="main">
                  <div className="content-bill">
                    <div
                      className="grid mt-5 mb-5 text-center"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                      }}
                    >
                      <div className="g-col-6">
                        <div
                          className="fw-semibold text-uppercase mb-1 fs-6"
                          style={{
                            color: "black",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Thông tin người nhận
                        </div>
                        <div className="mb-1">
                          Recipient Name: Nguyen Van A<br />
                          Address: Số xx, đường xx, Hoàn Kiếm, Hà Nội
                          <br />
                          Phone: 0123456789
                        </div>
                        <div
                          className="fw-semibold text-uppercase mt-3 fs-6"
                          style={{
                            color: "black",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Ngày tạo
                        </div>
                        <div className="mt-1">01-01-2023</div>
                      </div>
                      <div className="g-col-6">
                        <div
                          className="fw-semibold text-uppercase mb-1 fs-6"
                          style={{
                            color: "black",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Phương thức thanh toán
                        </div>
                        <div className="mb-3">Credit Card</div>
                        <div
                          className="fw-semibold text-uppercase mt-4 fs-6"
                          style={{
                            color: "black",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Phương thức giao hàng
                        </div>
                        <div className="mt-1">Express Delivery</div>
                        <div
                          className="fw-semibold text-uppercase mt-4 fs-6"
                          style={{
                            color: "black",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Tình trạng đơn hàng
                        </div>
                        <div className="text-red mt-1">Completed</div>
                      </div>
                    </div>
                    <hr />
                    <table className="table-bill ">
                      <thead>
                        <tr>
                          <th
                            style={{
                              width: "10%",
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            #
                          </th>
                          <th style={{ width: "40%", color: "black" }}>
                            Description
                          </th>
                          <th
                            style={{
                              width: "15%",
                              textAlign: "center",
                              color: "black",
                            }}
                          >
                            Qty
                          </th>
                          <th
                            style={{
                              width: "17.5%",
                              textAlign: "end",
                              color: "black",
                            }}
                          >
                            Unit price
                          </th>
                          <th
                            className="text-end px-4"
                            style={{ textAlign: "end", color: "black" }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th style={{ color: "black" }}>1</th>
                          <td>
                            <div className="text-product text-product_main">
                              Product 1
                            </div>
                            <div className="text-product text-product_sub">
                              Category 1
                            </div>
                          </td>
                          <td
                            className="text-center"
                            style={{ textAlign: "center" }}
                          >
                            2
                          </td>
                          <td style={{ textAlign: "end" }}>$10.00</td>
                          <td
                            className="text-end px-4"
                            style={{ textAlign: "end" }}
                          >
                            $20.00
                          </td>
                        </tr>
                        <tr>
                          <th style={{ color: "black" }}>2</th>
                          <td>
                            <div className="text-product text-product_main">
                              Product 2
                            </div>
                            <div className="text-product text-product_sub">
                              Category 2
                            </div>
                          </td>
                          <td
                            className="text-center"
                            style={{ textAlign: "center" }}
                          >
                            1
                          </td>
                          <td style={{ textAlign: "end" }}>$30.00</td>
                          <td
                            className="text-end px-4"
                            style={{ textAlign: "end" }}
                          >
                            $30.00
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td
                            className="text-end"
                            style={{ textAlign: "end", color: "black" }}
                          >
                            Subtotal
                          </td>
                          <td
                            className="text-end px-4"
                            style={{ textAlign: "end", color: "black" }}
                          >
                            $50.00
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td
                            className="text-end"
                            style={{ textAlign: "end", color: "black" }}
                          >
                            Ship
                          </td>
                          <td
                            className="text-end px-4"
                            style={{ textAlign: "end", color: "black" }}
                          >
                            $5.00
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td
                            className="text-end fw-bolder fs-5"
                            style={{
                              textAlign: "end",
                              fontSize: "1.75rem",
                              fontWeight: 500,
                              color: "black",
                            }}
                          >
                            Total
                          </td>
                          <td
                            className="text-end fw-bolder fs-5 px-4"
                            style={{
                              textAlign: "end",
                              fontSize: "1.75rem",
                              fontWeight: 500,
                              color: "black",
                            }}
                          >
                            $55.00
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <div className="flex justify-content-between mt-3">
                      <div />
                      <div className="flex flex-column align-items-end ml-5">
                        <div className="fw-semibold">Have a Question?</div>
                        support@abcapp.com
                      </div>
                    </div>
                  </div>
                </div>
                {/* #content */}
              </div>
              {/* #primary */}
            </div>
            {/* #main-content */}
          </div>
        </div>
        {/* Page Loader
  <div className="page-preloader">
    <div className="loader">
      <div />
      <div />
    </div>
  </div> */}
      </div>
    </>
  );
};
export default BillOrder;
