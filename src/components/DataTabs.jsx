//Here is a working version for reference https://codeinterview.io/EDGAIDNSLT

import { useMemo } from "react";
import { useState } from "react";

// i will continue with component after that I will try to see if there is some issue with rendering the App.jsx
export const DataTabs = ({ bankData }) => {
  const tabs = ["Personal Details", "Raw Transaction History", "Results"];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const verificationHelper = (verification, isDebit) =>
    isDebit
      ? verification
        ? "HIGH"
        : "LOW"
      : verification
      ? "verified"
      : "unverified";
  const TabBody = useMemo(() => {
    let copyBankObject = { ...bankData };
    const { Accounts, ...personalData } = copyBankObject;

    switch (selectedTabIndex) {
      // personal data

      case 0: {
        return (
          <table>
            {Object.entries(personalData).map(({ key, value }) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </table>
        );
      }
      // transactions
      case 1: {
        return (
          <table>
            {Object.entries(Accounts.Transactions).map(({ key, value }) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </table>
        );
      }

      // results
      case 2: {
        const verificationObject = {
          "IBAN Check": verificationHelper(
            personalData.IBAN.includes(personalData.Country)
          ),
          DEBT_RISK: verificationHelper(Accounts.CurrentBalance < 0, true),
          GAMBLING: verificationHelper(
            Accounts.Transaction.any((item) =>
              item.Description.includes("gambling")
            )
          ),
          CHILD_SUPPORT: verificationHelper(
            Accounts.Transaction.any((item) =>
              item.Description.includes("support")
            )
          ),
        };

        const getColor = (label) => {
          switch (label) {
            case "verified":
              return "green";
            case "unverified":
              return "yellow";
            case "HIGH":
              return "yellow";
          }
        };

        return (
          <table>
            {Object.entries(verificationObject).map(({ key, value }) => {
              return (
                <tr key={key} style={{ backgroundColor: getColor(value) }}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </table>
        );
      }
    }
  }, [selectedTabIndex, bankData]);

  // do not display if there is an error during fetching

  if (bankData === null) {
    return <></>;
  }

  return (
    <>
      {tabs.map((item, index) => {
        return (
          <div key={item} onClick={() => setSelectedTabIndex(index)}>
            {item}
          </div>
        );
      })}
      <TabBody />
    </>
  );
};
