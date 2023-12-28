import {useState,useEffect} from "react";
import { formatNumber } from "../../utils/data/essential";
import { toastError, toastSuccess } from "../../utils/toastrResponse";
import moment from "moment";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

const DashboardCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Fetch monthly payments
  const firstdate = moment().startOf("month").format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");
  const url = `payments/collections?location=${user?.location_id}&startdate=${firstdate}&enddate=${today}`;
  const { data: monthlyPayments } = useFetchData(
    ["fetch--monthly-payments"],
    url
  );
  let totalPayments = 0;
  if (monthlyPayments) {
      totalPayments = monthlyPayments?.filter((payment) => payment.status.id === 2)
    .reduce(
      (accumulator, currentPayment) => accumulator + currentPayment.amount,
      0
    );
  }

  // Fetch today payments
  const url1 = `payments/collections?location=${user?.location_id}&startdate=${today}&enddate=${today}`;
  const { data: todayPayments } = useFetchData(
    ["fetch-daily-payments"],
    url1
  );
  const totalDailyPayments = todayPayments
    ?.filter((payment) => payment.status.id === 2)
    .reduce(
      (accumulator, currentPayment) => accumulator + currentPayment.amount,
      0
  );
  // Fetching targets
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const targetUrl = `reports/monthly?location=${user.location_id}&month=${month}&year=${year}`;
  const { data:target } = useFetchData(
    ["fetch-target"],
    targetUrl
  );
  // Fetch accounts data
  const accountsUrl = `accounts?locationId=${user.location_id}`;
  const { isAccountLoading,data:accountsData } = useFetchData(
    ["fetch-accounts-data"],
    accountsUrl
  );
  let paidAccounts = null
  let unPaidAccounts = null;
  let activeAccounts = null
  let totalPaidAccounts = null;
  let totalUnpaidAccounts = null;
  if (accountsData) {
    activeAccounts = accountsData?.filter(
      (account) => account.status.id === 1
    );
    totalPaidAccounts = accountsData
      ?.filter(
        (account) => account.outstandingAmount <= 0 && account.status.id === 1
      )
      .reduce((acc, currentAccount) => acc + currentAccount.monthlyFee, 0);
    paidAccounts = accountsData?.filter(
      (account) => account.outstandingAmount <= 0 && account.status.id === 1
    );
    unPaidAccounts = accountsData?.filter(
      (account) => account.outstandingAmount > 0 && account.status.id === 1
    );
    totalUnpaidAccounts = accountsData?.filter(
      (account) => account.outstandingAmount > 0 && account.status.id === 1
    ).reduce((acc, currentAccount) => acc + currentAccount.outstandingAmount, 0)
    console.log("Paid accounts:", paidAccounts);
  }
  const Loading = () => (
    <img src='/assets/img/loading.gif' alt='loading' width={100} height={100} />
  );
  return (
    <div className='d-flex flex-wrap p-3' style={{ gap: 20 }}>
      <div className='card mt-3 dashboard-card-width'>
        <div>
          <div className='d-flex justify-content-center'>
            <h4>Ayakusanijwe</h4>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <div className='d-flex flex-column' style={{ gap: "10" }}>
              <h5 style={{ color: "#696060" }}>Intego</h5>
              <h6
                className='d-flex justify-content-end'
                style={{ color: "#3a3952", fontSize: 20 }}
              >
                <b>{target && formatNumber(target[0]?.currentTargetAmount)}</b>
              </h6>
            </div>
            <Link to={`/loggedin/monthly-payments/${user.location_id}`}>
              <div className='d-flex flex-column' style={{ gap: "10" }}>
                <h5 style={{ color: "#696060" }}>Uku kwezi</h5>
                {totalPayments === 0 ? (
                  <Loading />
                ) : (
                  <h6
                    className='d-flex justify-content-end'
                    style={{ color: "#3a3952", fontSize: 20 }}
                  >
                    <b>{formatNumber(totalPayments)}</b>
                  </h6>
                )}
              </div>
            </Link>
            <Link to={`/loggedin/daily-payments/${user.location_id}`}>
              <div className='d-flex flex-column' style={{ gap: "10" }}>
                <h5 style={{ color: "#696060" }}>Uyu munsi</h5>
                <h6
                  className='d-flex justify-content-end'
                  style={{ color: "#3a3952", fontSize: 20 }}
                >
                  <b>{formatNumber(totalDailyPayments)}</b>
                </h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='card mt-3 dashboard-card-width'>
        <div>
          <div className='d-flex justify-content-center'>
            <h4>
              Konti(
              {activeAccounts && (
                <b style={{ fontSize: 18, color: "#000" }}>
                  {formatNumber(activeAccounts?.length)}
                </b>
              )}
              )
            </h4>
          </div>
          <div className='d-flex justify-content-between mt-3'>
            <Link to={`/loggedin/paid-accounts/${user.location_id}`}>
              <div className='d-flex flex-column' style={{ gap: "10" }}>
                <h5 style={{ color: "#696060" }}>
                  Izishyuye(
                  {activeAccounts !== null && (
                    <b style={{ fontSize: 18, color: "#000" }}>
                      {formatNumber(paidAccounts?.length)}
                    </b>
                  )}
                  )
                </h5>
                <h6 className='ml-1' style={{ color: "#3a3952", fontSize: 20 }}>
                  <b>
                    {totalPaidAccounts ? (
                      totalPaidAccounts && (
                        <b>{formatNumber(totalPaidAccounts) + " Rwf"}</b>
                      )
                    ) : (
                      <Loading />
                    )}
                  </b>
                </h6>
              </div>
            </Link>
            <Link to={`/loggedin/unpaid-accounts/${user.location_id}`}>
              <div className='d-flex flex-column' style={{ gap: "10" }}>
                <h5 style={{ color: "#696060" }}>
                  Ibirarane(
                  {unPaidAccounts && (
                    <b style={{ fontSize: 18, color: "#000" }}>
                      {formatNumber(unPaidAccounts?.length)}
                    </b>
                  )}
                  )
                </h5>
                <h6 className='ml-1' style={{ color: "#3a3952", fontSize: 20 }}>
                  <b>
                    {totalUnpaidAccounts !== null ? (
                      totalUnpaidAccounts &&
                      formatNumber(totalUnpaidAccounts + " Rwf")
                    ) : (
                      <Loading />
                    )}
                  </b>
                </h6>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
