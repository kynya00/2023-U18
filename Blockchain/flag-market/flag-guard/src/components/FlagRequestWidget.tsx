"use client";

import { useCallback, useEffect, useReducer } from "react";
import {
  BrowserProvider,
  Eip1193Provider,
  JsonRpcSigner,
} from "ethers/types/providers";

import MetamaskLogo from "@/assets/metamask-logo.svg";
import Image from "next/image";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

type FlagRequestWidgetState =
  | { status: "not-connected" }
  | {
      status: "connected";
      wallets: string[];
      error?: string;
      loading?: boolean;
      flag?: string;
    };
type FlagRequestWidgetAction =
  | { type: "connect"; wallets: string[] }
  | { type: "update-wallets"; wallets: string[] }
  | { type: "error"; message: string }
  | { type: "success"; flag: string }
  | { type: "submit" };

export function FlagRequestWidget({ challenge }: { challenge: string }) {
  const [state, dispatch] = useReducer(
    (
      state: FlagRequestWidgetState,
      action: FlagRequestWidgetAction
    ): FlagRequestWidgetState => {
      if (action.type === "connect") {
        return { status: "connected", wallets: action.wallets };
      }
      if (action.type === "update-wallets") {
        return {
          ...(state as FlagRequestWidgetState & { status: "connected" }),
          wallets: action.wallets,
        };
      }
      if (action.type === "error") {
        return {
          status: "connected",
          wallets: (state as FlagRequestWidgetState & { status: "connected" })
            .wallets,
          error: action.message,
        };
      }
      if (action.type === "submit") {
        return {
          status: "connected",
          wallets: (state as FlagRequestWidgetState & { status: "connected" })
            .wallets,
          loading: true,
        };
      }
      return {
        status: "connected",
        wallets: (state as FlagRequestWidgetState & { status: "connected" })
          .wallets,
        flag: action.flag,
      };
    },
    { status: "not-connected" }
  );
  useEffect(() => {
    if (state.status !== "connected") {
      return;
    }
    const listener = (accounts: string[]) =>
      dispatch({ type: "update-wallets", wallets: accounts });
    window.ethereum.on("accountsChanged", listener);
    return () => {
      window.ethereum.removeListener("accountsChanged", listener);
    };
  }, [state]);

  const requestFlag = useCallback(
    async (account: string) => {
      const result = await window.ethereum.request({
        method: "personal_sign",
        params: [challenge, account],
      });
      dispatch({ type: "submit" });
      try {
        const response = await fetch("/api/flag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        });
        if (response.status !== 200) {
          dispatch({ type: "error", message: await response.text() });
        } else {
          dispatch({
            type: "success",
            flag: await response.json().then((data) => data.flag),
          });
        }
      } catch {
        dispatch({ type: "error", message: "Something went wrong :(" });
      }
    },
    [challenge]
  );

  if (typeof window === "undefined") {
    return null;
  }
  if (typeof window.ethereum === "undefined") {
    return <p>Oh no! Do you have a Metamask?</p>;
  }
  if (state.status === "not-connected") {
    return (
      <button
        className="flex items-center gap-4 border border-gray-400 p-4 rounded-xl"
        onClick={async () => {
          await (window.ethereum as any).enable();
          const wallets = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          dispatch({ type: "connect", wallets });
        }}
      >
        <Image width={32} src={MetamaskLogo} alt="Metamask logo" />
        Connect wallet
      </button>
    );
  }

  return (
    <div>
      {state.flag && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="break-all">{state.flag}</span>
        </div>
      )}
      {state.error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 max-w-5xl"
          role="alert"
        >
          <span className="break-all">{state.error}</span>
        </div>
      )}
      {state.loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <p>
        {
          "Please choose a wallet to request a flag (do this only if you bought it):"
        }
      </p>
      <div className="flex flex-col">
        {state.wallets.map((account) => (
          <button
            key={account}
            className="border border-gray-400 rounded-xl py-2"
            onClick={() => requestFlag(account)}
          >
            {account}
          </button>
        ))}
      </div>
    </div>
  );
}
