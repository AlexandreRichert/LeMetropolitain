"use client";

import { useQRCode } from "next-qrcode";

export default function TicketQrCode({ value, size = 44 }) {
  const { SVG } = useQRCode();

  return (
    <SVG
      text={value}
      options={{
        margin: 0,
        width: size,
        color: { dark: "#23211e", light: "#00000000" },
      }}
    />
  );
}
